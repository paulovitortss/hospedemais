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

  const markInvalid = (input, msg) => {
    input.focus();
    input.classList.add('is-invalid');
    input.addEventListener('input', () => input.classList.remove('is-invalid'), { once: true });
    toast(msg);
  };

  /* Stepper numérico: max pode ser função (limite dinâmico) */
  const stepperField = (name, label, value, hint = '') => `
    <div class="field">
      <span class="field__label">${label}</span>
      <div class="stepper" data-stepper="${name}">
        <button type="button" data-step="-1" aria-label="Diminuir ${label.toLowerCase()}">−</button>
        <output name="${name}" aria-live="polite">${value}</output>
        <button type="button" data-step="1" aria-label="Aumentar ${label.toLowerCase()}">+</button>
      </div>
      ${hint ? `<span class="field__hint" data-hint-for="${name}">${hint}</span>` : ''}
    </div>`;

  function bindStepper(root, name, { min = 1, max, onChange }) {
    const box = root.querySelector(`[data-stepper="${name}"]`);
    const out = box.querySelector('output');
    const [minus, plus] = box.querySelectorAll('[data-step]');
    const limit = () => (typeof max === 'function' ? max() : max);
    const set = (v, notify = true) => {
      out.textContent = Math.max(min, Math.min(limit(), v));
      minus.disabled = +out.textContent <= min;
      plus.disabled = +out.textContent >= limit();
      if (notify && onChange) onChange(+out.textContent);
    };
    box.addEventListener('click', (e) => {
      const b = e.target.closest('[data-step]');
      if (b) set(+out.textContent + +b.dataset.step);
    });
    set(+out.textContent, false);
    return { get: () => +out.textContent, refresh: () => set(+out.textContent, false) };
  }

  /* Formulário genérico que termina em mensagem no WhatsApp da recepção */
  function requestSheet({ ic, titulo, texto, antes, campos, mensagem, validar, aoEnviar, sucesso, botao, onMount }) {
    sheet.open(`
      ${head(ic, titulo, texto)}
      ${antes || ''}
      <form class="request" novalidate>
        ${roomField()}
        ${campos || ''}
        ${waSubmit(botao)}
      </form>`, (root) => {
      bindChips(root);
      const form = root.querySelector('form');
      if (onMount) onMount(root, form);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const quarto = form.quarto.value.trim();
        if (!quarto) return markInvalid(form.quarto, 'Informe o número do quarto');
        if (validar && validar(root, form) === false) return;
        store.set('th_quarto', quarto);
        const obs = form.obs?.value.trim();
        let msg = `Olá! Sou hóspede do ${H.nome}, quarto ${quarto}. ${mensagem(root, form)}`;
        if (obs) msg += `\nObservação: ${obs}`;
        window.open(waLink(H.whatsappRecepcao, msg), '_blank', 'noopener');
        if (aoEnviar) aoEnviar(root, form, quarto);
        sheet.close();
        toast(sucesso || 'Solicitação enviada à recepção');
        document.dispatchEvent(new CustomEvent('room:updated'));
      });
    });
  }

  /* Controle local de toalhas pedidas hoje (por quarto) */
  const hoje = () => new Date().toLocaleDateString('sv-SE'); // AAAA-MM-DD
  const toalhasHoje = (quarto) => {
    try {
      const d = JSON.parse(store.get('th_toalhas', '{}'));
      return d.data === hoje() && d.quarto === quarto ? d.qtd : 0;
    } catch { return 0; }
  };
  const registrarToalhas = (quarto, qtd) =>
    store.set('th_toalhas', JSON.stringify({ data: hoje(), quarto, qtd: toalhasHoje(quarto) + qtd }));

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

    /* Limite: H.toalhasPorHospede × hóspedes no quarto, descontando o que já foi pedido hoje */
    toalhas() {
      const porHospede = H.toalhasPorHospede;
      let hospedes, qtd;

      requestSheet({
        ic: 'towel',
        titulo: 'Solicitar toalhas',
        texto: `Levamos toalhas limpas até o seu quarto. Limite de ${porHospede} toalhas por hóspede.`,
        campos: `
          ${stepperField('hospedes', 'Hóspedes no quarto', Math.min(6, Math.max(1, +store.get('th_hospedes', '1') || 1)))}
          ${stepperField('qtd', 'Quantidade de toalhas', 1, ' ')}
          ${chips('tipo', 'Tipo', ['Banho', 'Rosto', 'Banho e rosto'])}
          <div class="notice" data-limite hidden>
            ${icon('towel')}
            <span>Você já atingiu o limite de toalhas de hoje para este quarto. Se precisar de mais, <button type="button" class="link" data-action="recepcao">fale com a recepção</button>.</span>
          </div>`,
        onMount: (root, form) => {
          const hint = root.querySelector('[data-hint-for="qtd"]');
          const aviso = root.querySelector('[data-limite]');
          const submit = form.querySelector('[type="submit"]');
          const disponivel = () => Math.max(0, hospedes.get() * porHospede - toalhasHoje(form.quarto.value.trim()));
          const atualizar = () => {
            const total = hospedes.get() * porHospede;
            const livre = disponivel();
            const jaPediu = total - livre;
            hint.textContent = jaPediu > 0
              ? `Limite de ${total} para ${hospedes.get()} hóspede(s) — ${jaPediu} já solicitada(s) hoje, restam ${livre}.`
              : `Limite de ${total} toalha(s) para ${hospedes.get()} hóspede(s).`;
            aviso.hidden = livre > 0;
            submit.disabled = livre === 0;
            if (qtd) qtd.refresh();
          };
          hospedes = bindStepper(root, 'hospedes', { min: 1, max: 6, onChange: atualizar });
          qtd = bindStepper(root, 'qtd', { min: 1, max: () => Math.max(1, disponivel()) });
          form.quarto.addEventListener('input', atualizar);
          atualizar();
        },
        validar: (root, form) => {
          const livre = hospedes.get() * porHospede - toalhasHoje(form.quarto.value.trim());
          if (qtd.get() > livre) { toast('Quantidade acima do limite por hóspede'); return false; }
        },
        mensagem: () => {
          const tipo = chipValue($('#sheet-body'), 'tipo').toLowerCase();
          return `Gostaria de solicitar ${qtd.get()} toalha(s) — tipo: ${tipo}. ` +
            `Hóspedes no quarto: ${hospedes.get()} (limite de ${porHospede} por hóspede).`;
        },
        aoEnviar: (root, form, quarto) => {
          store.set('th_hospedes', String(hospedes.get()));
          registrarToalhas(quarto, qtd.get());
        },
        sucesso: 'Pedido de toalhas enviado'
      });
    },

    delivery() {
      const quarto = store.get('th_quarto');
      const complemento = `${H.nome}${quarto ? ` · Quarto ${quarto}` : ' · Quarto ___'}`;
      requestSheet({
        ic: 'scooter',
        titulo: 'Avisar delivery',
        texto: 'Pediu comida por aplicativo ou direto no restaurante? Avise a recepção para que o entregador encontre você sem demora.',
        botao: 'Avisar a recepção',
        antes: `
          <div class="address">
            <div>
              <span class="field__label">Endereço para o app</span>
              <p class="address__text">${esc(H.endereco)}</p>
              <p class="address__sub">Complemento: <b data-complemento>${esc(complemento)}</b></p>
            </div>
            <button type="button" class="icon-btn" data-copy-address aria-label="Copiar endereço">${icon('copy')}</button>
          </div>`,
        campos: `
          <label class="field">
            <span class="field__label">Nome que está no pedido</span>
            <input class="input" name="nome" autocomplete="name" placeholder="Ex: Maria Souza" maxlength="60" value="${esc(store.get('th_nome_pedido'))}">
            <span class="field__hint">Às vezes o pedido está em nome de outra pessoa — informe o nome que aparece no app.</span>
          </label>
          ${chips('app', 'Por onde pediu?', ['iFood', '99Food', 'Direto no restaurante', 'Outro'])}
          <label class="field">
            <span class="field__label">Restaurante (opcional)</span>
            <input class="input" name="restaurante" placeholder="Ex: Brasa 86" maxlength="60">
          </label>
          ${chips('previsao', 'Previsão de chegada', ['Até 20 min', '30 min', '45 min', '1 hora ou mais'], 1)}
          ${chips('pagamento', 'Pagamento', ['Já pago no app', 'Pagar na entrega'])}
          ${noteField('Ex: vou descer para buscar na recepção')}`,
        onMount: (root, form) => {
          const alvo = root.querySelector('[data-complemento]');
          form.quarto.addEventListener('input', () => {
            const q = form.quarto.value.trim();
            alvo.textContent = `${H.nome} · Quarto ${q || '___'}`;
          });
          root.querySelector('[data-copy-address]').addEventListener('click', () =>
            copy(`${H.endereco} — Complemento: ${alvo.textContent}`));
        },
        validar: (root, form) => {
          if (!form.nome.value.trim()) {
            markInvalid(form.nome, 'Informe o nome que está no pedido');
            return false;
          }
        },
        mensagem: (root, form) => {
          const restaurante = form.restaurante.value.trim();
          return [
            '\n🛵 *Aviso de delivery*',
            `• Nome no pedido: ${form.nome.value.trim()}`,
            `• Pedido via: ${chipValue(root, 'app')}`,
            restaurante && `• Restaurante: ${restaurante}`,
            `• Previsão de chegada: ${chipValue(root, 'previsao')}`,
            `• Pagamento: ${chipValue(root, 'pagamento').toLowerCase()}`
          ].filter(Boolean).join('\n');
        },
        aoEnviar: (root, form) => store.set('th_nome_pedido', form.nome.value.trim()),
        sucesso: 'Recepção avisada sobre seu delivery'
      });
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
          <li><span>Todos os dias, inclusive fins de semana e feriados</span><b>${esc(H.horarios.cafe)}</b></li>
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
