/* ==========================================================
   UI: armazenamento, toast, bottom sheet e solicitações
   ========================================================== */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (str) => String(str ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Armazenamento seguro ---------- */
  const store = {
    get(key, fallback = '') {
      try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch { /* modo privado */ }
    },
    session(key, value) {
      try {
        if (value === undefined) return sessionStorage.getItem(key);
        sessionStorage.setItem(key, value);
      } catch { return null; }
    }
  };

  /* ---------- Links ---------- */
  const waLink = (numero, texto) =>
    `https://wa.me/${String(numero).replace(/\D/g, '')}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;
  const igLink = (usuario) => `https://instagram.com/${String(usuario).replace(/^@/, '')}`;

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2400);
  }

  /* ---------- Copiar ---------- */
  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      ta.remove();
    }
    toast('Copiado ✓');
  }

  /* ---------- Bottom sheet ---------- */
  const sheet = {
    el: null, body: null, lastFocus: null, timer: null,
    open(html, onMount) {
      this.el = this.el || $('#sheet');
      this.body = this.body || $('#sheet-body');
      clearTimeout(this.timer);
      if (this.el.hidden) this.lastFocus = document.activeElement;
      this.body.innerHTML = html;
      this.el.hidden = false;
      document.body.classList.add('is-locked');
      requestAnimationFrame(() => {
        this.el.classList.add('is-open');
        const first = this.body.querySelector('input, button, a');
        (first || $('.sheet__close', this.el)).focus({ preventScroll: true });
      });
      if (onMount) onMount(this.body);
    },
    close() {
      if (!this.el || this.el.hidden) return;
      this.el.classList.remove('is-open');
      document.body.classList.remove('is-locked');
      this.timer = setTimeout(() => { this.el.hidden = true; this.body.innerHTML = ''; }, 380);
      if (this.lastFocus) this.lastFocus.focus({ preventScroll: true });
    }
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) sheet.close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') sheet.close();
  });

  /* ---------- Blocos reutilizáveis ---------- */
  const H = window.HOTEL;

  const head = (ic, titulo, texto) => `
    <div class="page-hero__icon" style="margin-bottom:14px">${icon(ic)}</div>
    <h2 class="sheet__title" id="sheet-title">${titulo}</h2>
    ${texto ? `<p class="sheet__text">${texto}</p>` : ''}`;

  const roomField = () => `
    <label class="field">
      <span class="field__label">Número do quarto</span>
      <input class="input" name="quarto" inputmode="numeric" autocomplete="off"
        placeholder="Ex: 204" maxlength="6" value="${esc(store.get('th_quarto'))}" required>
    </label>`;

  const chips = (name, label, options, selected = 0) => `
    <div class="field" role="group" aria-label="${label}">
      <span class="field__label">${label}</span>
      <div class="chips" data-chips="${name}">
        ${options.map((o, i) => `<button type="button" class="chip" aria-pressed="${i === selected}" data-value="${esc(o)}">${esc(o)}</button>`).join('')}
      </div>
    </div>`;

  const noteField = (placeholder) => `
    <label class="field">
      <span class="field__label">Observação (opcional)</span>
      <textarea class="input" name="obs" rows="2" placeholder="${placeholder}"></textarea>
    </label>`;

  const waSubmit = (label = 'Enviar pelo WhatsApp') => `
    <div class="sheet__actions">
      <button type="submit" class="btn btn--wa btn--block">${icon('whatsapp')} ${label}</button>
    </div>`;

  function bindChips(root) {
    root.querySelectorAll('[data-chips]').forEach((group) => {
      group.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        group.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      });
    });
  }
  const chipValue = (root, name) =>
    root.querySelector(`[data-chips="${name}"] [aria-pressed="true"]`)?.dataset.value || '';

  /* Formulário genérico que termina em mensagem no WhatsApp da recepção */
  function requestSheet({ ic, titulo, texto, campos, mensagem, sucesso }) {
    sheet.open(`
      ${head(ic, titulo, texto)}
      <form class="request" novalidate>
        ${roomField()}
        ${campos || ''}
        ${waSubmit()}
      </form>`, (root) => {
      bindChips(root);
      const form = root.querySelector('form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const quarto = form.quarto.value.trim();
        if (!quarto) {
          form.quarto.focus();
          form.quarto.style.borderColor = '#E07A5F';
          toast('Informe o número do quarto');
          return;
        }
        store.set('th_quarto', quarto);
        const obs = form.obs?.value.trim();
        let msg = `Olá! Sou hóspede do ${H.nome}, quarto ${quarto}. ${mensagem(root)}`;
        if (obs) msg += `\nObservação: ${obs}`;
        window.open(waLink(H.whatsappRecepcao, msg), '_blank', 'noopener');
        sheet.close();
        toast(sucesso || 'Solicitação enviada à recepção');
        document.dispatchEvent(new CustomEvent('room:updated'));
      });
    });
  }

  /* ---------- Ações ---------- */
  const actions = {
    recepcao() {
      sheet.open(`
        ${head('concierge', 'Falar com a recepção', 'Nossa equipe está disponível 24 horas para ajudar no que precisar.')}
        <ul class="info-list">
          <li><span>Do telefone do quarto</span><b>Ramal ${esc(H.ramalRecepcao)}</b></li>
          <li><span>Telefone</span><b>${esc(H.telefoneExibicao)}</b></li>
        </ul>
        <div class="sheet__actions">
          <a class="btn btn--wa btn--block" href="${waLink(H.whatsappRecepcao, `Olá! Sou hóspede do ${H.nome}${store.get('th_quarto') ? `, quarto ${store.get('th_quarto')}` : ''}.`)}" target="_blank" rel="noopener">${icon('whatsapp')} Conversar no WhatsApp</a>
          <a class="btn btn--ghost btn--block" href="tel:${esc(H.telefoneRecepcao)}">${icon('phone')} Ligar para a recepção</a>
        </div>`);
    },

    limpeza() {
      requestSheet({
        ic: 'broom',
        titulo: 'Solicitar limpeza',
        texto: 'Escolha o melhor horário e nossa governança cuidará do seu quarto.',
        campos: chips('horario', 'Quando?', ['Agora', 'Até 12h', 'Após 14h', 'Enquanto estiver fora']) +
          noteField('Ex: trocar roupa de cama, repor amenities…'),
        mensagem: (r) => `Gostaria de solicitar a limpeza do quarto. Horário de preferência: ${chipValue(r, 'horario')}.`,
        sucesso: 'Pedido de limpeza enviado'
      });
    },

    toalhas() {
      requestSheet({
        ic: 'towel',
        titulo: 'Solicitar toalhas',
        texto: 'Levamos toalhas limpas até o seu quarto.',
        campos: `
          <div class="field">
            <span class="field__label">Quantidade</span>
            <div class="stepper">
              <button type="button" data-step="-1" aria-label="Diminuir">−</button>
              <output name="qtd" aria-live="polite">2</output>
              <button type="button" data-step="1" aria-label="Aumentar">+</button>
            </div>
          </div>
          ${chips('tipo', 'Tipo', ['Banho', 'Rosto', 'Piscina', 'Banho e rosto'])}`,
        mensagem: (r) => {
          const qtd = r.querySelector('output[name="qtd"]').textContent;
          return `Gostaria de solicitar ${qtd} toalha(s) — tipo: ${chipValue(r, 'tipo').toLowerCase()}.`;
        },
        sucesso: 'Pedido de toalhas enviado'
      });
      const root = $('#sheet-body');
      const out = root.querySelector('output[name="qtd"]');
      const [minus, plus] = root.querySelectorAll('[data-step]');
      const sync = () => { minus.disabled = +out.textContent <= 1; plus.disabled = +out.textContent >= 6; };
      root.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => {
        out.textContent = Math.min(6, Math.max(1, +out.textContent + +b.dataset.step));
        sync();
      }));
      sync();
    },

    ferro() {
      requestSheet({
        ic: 'iron',
        titulo: 'Solicitar ferro',
        texto: 'Enviaremos ferro de passar e tábua ao seu quarto.',
        campos: chips('item', 'O que você precisa?', ['Ferro e tábua', 'Apenas ferro', 'Serviço de passadoria']) +
          noteField('Ex: preciso até as 19h'),
        mensagem: (r) => `Gostaria de solicitar: ${chipValue(r, 'item').toLowerCase()}.`,
        sucesso: 'Pedido enviado à recepção'
      });
    },

    wifi() {
      sheet.open(`
        ${head('wifi', 'Wi-Fi cortesia', 'Conexão gratuita em todas as áreas do hotel.')}
        ${wifiCard()}`, bindWifi);
    },

    cafe() {
      sheet.open(`
        ${head('coffee', 'Café da manhã', `Servido no ${esc(H.horarios.cafeLocal)}.`)}
        <ul class="info-list">
          <li><span>Segunda a sexta</span><b>${esc(H.horarios.cafe)}</b></li>
          <li><span>Sábados, domingos e feriados</span><b>${esc(H.horarios.cafeFds)}</b></li>
        </ul>
        <p class="sheet__text" style="margin-top:14px">Incluso na sua diária. Temos opções regionais, sem glúten e sem lactose — é só pedir à equipe.</p>`);
    },

    checkout() {
      sheet.open(`
        ${head('door', 'Horário de check-out', 'Para uma saída tranquila, deixe as chaves na recepção.')}
        <ul class="info-list">
          <li><span>Check-out</span><b>até ${esc(H.horarios.checkout)}</b></li>
          <li><span>Check-in</span><b>a partir das ${esc(H.horarios.checkin)}</b></li>
          <li><span>Late check-out</span><b style="font-size:16px;white-space:normal;text-align:right">${esc(H.horarios.lateCheckout)}</b></li>
        </ul>
        <div class="sheet__actions">
          <button type="button" class="btn btn--gold btn--block" data-action="late">Solicitar late check-out</button>
        </div>`);
    },

    late() {
      requestSheet({
        ic: 'clock',
        titulo: 'Late check-out',
        texto: 'Consultaremos a disponibilidade e responderemos pelo WhatsApp.',
        campos: chips('ate', 'Até que horas?', ['13h', '14h', '15h']),
        mensagem: (r) => `Gostaria de solicitar late check-out até as ${chipValue(r, 'ate')}. Há disponibilidade?`,
        sucesso: 'Solicitação enviada'
      });
    }
  };

  /* ---------- Wi-Fi (usado no sheet e na página de serviços) ---------- */
  function wifiCard() {
    return `
      <div class="wifi" data-wifi>
        <div class="wifi__head">
          <div class="service__icon">${icon('wifi')}</div>
          <div>
            <span class="service__name">Wi-Fi</span>
            <span class="service__text">Toque para ver a senha</span>
          </div>
        </div>
        <div class="wifi__row">
          <div>
            <span class="wifi__label">Rede</span>
            <span class="wifi__value">${esc(H.wifi.rede)}</span>
          </div>
        </div>
        <div class="wifi__row">
          <button type="button" class="wifi__secret" aria-pressed="false" aria-label="Mostrar senha do Wi-Fi">
            <span style="flex:1">
              <span class="wifi__label">Senha</span>
              <span class="wifi__value">${esc(H.wifi.senha)}</span>
            </span>
            <span class="wifi__hint">${icon('eye').replace('<svg', '<svg style="width:16px;height:16px;display:inline;vertical-align:-3px;margin-right:4px"')}<span data-hint>Ver</span></span>
          </button>
        </div>
        <button type="button" class="btn btn--gold btn--block" data-copy-wifi>${icon('copy')} Copiar senha</button>
      </div>`;
  }

  function bindWifi(root) {
    root.querySelectorAll('[data-wifi]').forEach((card) => {
      const secret = card.querySelector('.wifi__secret');
      secret.addEventListener('click', () => {
        const on = secret.getAttribute('aria-pressed') !== 'true';
        secret.setAttribute('aria-pressed', String(on));
        secret.setAttribute('aria-label', on ? 'Ocultar senha do Wi-Fi' : 'Mostrar senha do Wi-Fi');
        secret.querySelector('[data-hint]').textContent = on ? 'Ocultar' : 'Ver';
      });
      card.querySelector('[data-copy-wifi]').addEventListener('click', () => {
        secret.setAttribute('aria-pressed', 'true');
        secret.querySelector('[data-hint]').textContent = 'Ocultar';
        copy(H.wifi.senha);
      });
    });
  }

  /* Delegação global para qualquer [data-action] */
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-action]');
    if (!trigger) return;
    const fn = actions[trigger.dataset.action];
    if (!fn) return;
    e.preventDefault();
    if (!$('#sheet').hidden) {
      sheet.close();
      setTimeout(fn, 400);
    } else {
      fn();
    }
  });

  window.UI = { $, esc, store, waLink, igLink, toast, copy, sheet, actions, wifiCard, bindWifi };
})();
