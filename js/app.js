/* ==========================================================
   App: splash, roteamento por hash e telas
   Rotas:  #/                     início
           #/servicos             serviços do hotel
           #/c/:categoria         subcategorias
           #/c/:categoria/:sub    recomendações
   ========================================================== */
(function () {
  const { $, esc, store, waLink, igLink, wifiCard, bindWifi } = window.UI;
  const H = window.HOTEL;
  const CATS = window.CATEGORIES;
  const view = $('#view');
  const topbar = $('#topbar');

  /* ---------- Helpers ---------- */
  const saudacao = () => {
    const h = new Date().getHours();
    return h < 5 ? 'Boa noite' : h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  };
  const pad = (n) => String(n).padStart(2, '0');
  const countLabel = (n) => `<b>${n}</b> ${n === 1 ? 'indicação' : 'indicações'}`;

  const QUICK = [
    { action: 'recepcao', icon: 'concierge', label: 'Recepção', sub: '24 horas' },
    { action: 'limpeza', icon: 'broom', label: 'Limpeza', sub: 'Solicitar' },
    { action: 'wifi', icon: 'wifi', label: 'Wi-Fi', sub: 'Ver senha' },
    { action: 'toalhas', icon: 'towel', label: 'Toalhas', sub: 'Solicitar' },
    { action: 'cafe', icon: 'coffee', label: 'Café', sub: H.horarios.cafe.replace(/\s/g, '') },
    { action: 'checkout', icon: 'door', label: 'Check-out', sub: `até ${H.horarios.checkout}` }
  ];

  const SERVICES = [
    { action: 'recepcao', icon: 'concierge', name: 'Falar com a recepção', text: 'WhatsApp ou telefone, 24 horas' },
    { action: 'limpeza', icon: 'broom', name: 'Solicitar limpeza', text: 'Escolha o melhor horário' },
    { action: 'toalhas', icon: 'towel', name: 'Solicitar toalhas', text: 'Entregues no seu quarto' },
    { action: 'ferro', icon: 'iron', name: 'Solicitar ferro', text: 'Ferro e tábua de passar' },
    { action: 'delivery', icon: 'scooter', name: 'Avisar delivery', text: 'Pediu comida? Avise a recepção' }
  ];

  /* ---------- Topbar ---------- */
  function renderTopbar(opts) {
    if (opts.home) {
      topbar.innerHTML = `
        <div class="container topbar__row">
          <span></span>
          <a class="topbar__brand" href="#/" aria-label="Início">${logo()}<span class="topbar__name">${esc(H.nome)}</span></a>
          <button class="icon-btn" type="button" data-action="recepcao" aria-label="Falar com a recepção">${icon('bell')}</button>
        </div>`;
    } else {
      topbar.innerHTML = `
        <div class="container topbar__row">
          <a class="icon-btn" href="${opts.back}" aria-label="Voltar">${icon('back')}</a>
          <a class="topbar__brand" href="#/" aria-label="Início">${logo()}<span class="topbar__name">${esc(opts.title || H.nome)}</span></a>
          <a class="icon-btn" href="#/" aria-label="Início">${icon('home')}</a>
        </div>`;
    }
  }

  /* ---------- Telas ---------- */
  function homeView() {
    const quarto = store.get('th_quarto');
    renderTopbar({ home: true });

    const cats = CATS.map((c) => `
      <a class="cat-card" href="#/c/${c.id}" style="--tint:${c.tint}">
        <span class="cat-card__icon">${icon(c.icon)}</span>
        <span class="cat-card__arrow" aria-hidden="true">→</span>
        <div>
          <h3 class="cat-card__name">${esc(c.nome).replace('Bem-estar', 'Bem&#8209;estar')}</h3>
          <p class="cat-card__meta">${esc(c.meta)}</p>
        </div>
        <span class="cat-card__watermark" aria-hidden="true">${icon(c.icon)}</span>
      </a>`).join('');

    const quick = QUICK.map((q) => `
      <button class="quick__item" type="button" data-action="${q.action}">
        <span class="quick__icon">${icon(q.icon)}</span>
        <span class="quick__label">${q.label}</span>
        <span class="quick__sub">${esc(q.sub)}</span>
      </button>`).join('');

    const bandWords = ['Conforto', 'Hospitalidade', 'Sabor', 'Descanso', 'Teresina'];
    const bandItems = bandWords.map((w) => `<span class="band__item">${w} ${icon('spark')}</span>`).join('');

    return `
      <section class="hero">
        <div class="stars" aria-hidden="true"></div>
        <div class="container hero__inner">
          <div class="hero__logo">${logo()}</div>
          <p class="eyebrow eyebrow--center">Bem-vindo à sua estadia</p>
          <h1 class="display">Teresina Hotel</h1>
          <p class="lead">Tudo o que você precisa durante a sua estadia, na palma da mão.</p>
          <span class="hero__chip">
            ${saudacao()}
            ${icon('spark').replace('<svg', '<svg class="spark"')}
            <span data-room>${quarto ? `Quarto <b>${esc(quarto)}</b>` : 'Aproveite a cidade'}</span>
          </span>
        </div>
      </section>

      <div class="container">${deliveryCta()}</div>

      <section class="section container" aria-labelledby="explore-title">
        <div class="section__head">
          <p class="eyebrow">Explore a cidade</p>
          <h2 class="title" id="explore-title">Descubra Teresina</h2>
        </div>
        <div class="grid-cats">${cats}</div>

        <a class="service-banner" href="#/servicos">
          <span class="service-banner__logo">${logo()}</span>
          <div>
            <span class="service-banner__eyebrow">Para você</span>
            <h3 class="service-banner__title">Serviços do hotel</h3>
            <p class="service-banner__text">Recepção, limpeza, toalhas, delivery e Wi-Fi</p>
          </div>
          <span class="service-banner__go" aria-hidden="true">→</span>
        </a>
      </section>

      <div class="band" aria-hidden="true">
        <div class="band__track">${bandItems.repeat(4)}</div>
      </div>

      <section class="section container" aria-labelledby="quick-title">
        <div class="section__head">
          <p class="eyebrow">Na palma da mão</p>
          <h2 class="title" id="quick-title">Acesso rápido</h2>
        </div>
        <div class="quick">${quick}</div>
      </section>

      ${footer()}`;
  }

  function categoryView(cat) {
    renderTopbar({ back: '#/', title: cat.nome });
    const subs = cat.subs.map((s) => `
      <a class="sub-card" href="#/c/${cat.id}/${s.id}">
        <span class="sub-card__icon">${icon(s.icon)}</span>
        <span class="cat-card__arrow" aria-hidden="true">→</span>
        <h3 class="sub-card__name">${esc(s.nome)}</h3>
        <span class="sub-card__count">${countLabel(s.lugares.length)}</span>
      </a>`).join('');

    return `
      <section class="page-hero container">
        <div class="page-hero__icon">${icon(cat.icon)}</div>
        <p class="eyebrow">${esc(cat.nome)}</p>
        <h1 class="title">${cat.titulo}</h1>
        <p class="lead">${esc(cat.lead)}</p>
      </section>
      <section class="section container" aria-label="Categorias">
        ${cat.id === 'alimentacao' ? deliveryCta() : ''}
        <div class="grid-subs">${subs}</div>
      </section>
      ${footer()}`;
  }

  function placesView(cat, sub) {
    renderTopbar({ back: `#/c/${cat.id}`, title: sub.nome });

    const cards = sub.lugares.map((l, i) => {
      const meta = [
        l.nota && `<li>${icon('star')}${esc(l.nota)}</li>`,
        (l.endereco || l.bairro) && `<li>${icon('pin')}${esc(l.endereco || l.bairro)}</li>`,
        l.dist && l.dist !== '—' && `<li>${icon('walk')}${esc(l.dist)}</li>`,
        l.preco && `<li>${icon('wallet')}${esc(l.preco)}</li>`,
        l.horario && `<li>${icon('clock')}${esc(l.horario)}</li>`
      ].filter(Boolean).join('');
      const msg = `Olá! Vi a indicação de vocês no guia do ${H.nome} e gostaria de mais informações.`;
      const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${l.nome} ${l.endereco || l.bairro || ''} Teresina PI`)}`;

      return `
        <article class="place">
          <div class="place__top">
            <span class="place__num">${pad(i + 1)}</span>
            ${l.tag ? `<span class="tag">${icon('spark')}${esc(l.tag)}</span>` : ''}
          </div>
          <h2 class="place__name">${esc(l.nome)}</h2>
          <p class="place__desc">${esc(l.desc)}</p>
          <ul class="place__meta">${meta}</ul>
          <div class="place__actions">
            ${l.whatsapp
              ? `<a class="btn btn--wa" href="${waLink(l.whatsapp, msg)}" target="_blank" rel="noopener" aria-label="WhatsApp de ${esc(l.nome)}">${icon('whatsapp')} WhatsApp</a>`
              : l.telefone
                ? `<a class="btn btn--gold" href="tel:${esc(l.telefone)}" aria-label="Ligar para ${esc(l.nome)}">${icon('phone')} Ligar</a>`
                : ''}
            ${l.instagram ? `<a class="btn btn--ghost" href="${igLink(l.instagram)}" target="_blank" rel="noopener" aria-label="Instagram de ${esc(l.nome)}">${icon('instagram')} Instagram</a>` : ''}
          </div>
          <a class="place__map" href="${mapa}" target="_blank" rel="noopener">
            ${icon('pin')} Ver no mapa e conferir se está aberto
          </a>
        </article>`;
    }).join('');

    return `
      <section class="page-hero container">
        <ol class="crumbs">
          <li><a href="#/">Início</a></li>
          <li><a href="#/c/${cat.id}">${esc(cat.nome)}</a></li>
        </ol>
        <p class="eyebrow">Indicações do hotel</p>
        <h1 class="title">${esc(sub.nome)}</h1>
        <p class="lead">${esc(sub.lead)}</p>
      </section>
      <section class="section container" aria-label="Recomendações">
        ${cat.id === 'alimentacao' ? deliveryCta() : ''}
        <div class="places">${cards || '<p class="empty">Em breve novas indicações por aqui.</p>'}</div>
      </section>
      ${footer()}`;
  }

  function servicesView() {
    renderTopbar({ back: '#/', title: 'Serviços' });
    const items = SERVICES.map((s) => `
      <button class="service" type="button" data-action="${s.action}">
        <span class="service__icon">${icon(s.icon)}</span>
        <span>
          <span class="service__name">${s.name}</span>
          <span class="service__text">${s.text}</span>
        </span>
        <span class="service__go" aria-hidden="true">→</span>
      </button>`).join('');

    return `
      <section class="page-hero container">
        <div class="page-hero__icon">${icon('bell')}</div>
        <p class="eyebrow">Para você</p>
        <h1 class="title">Serviços do hotel</h1>
        <p class="lead">Faça sua solicitação em poucos toques — ela chega direto na nossa recepção.</p>
      </section>
      <section class="section container" aria-label="Serviços">
        <div class="services">
          ${items}
          ${wifiCard()}
        </div>
      </section>
      <section class="section container" aria-labelledby="hours-title">
        <div class="section__head">
          <p class="eyebrow">Horários</p>
          <h2 class="title" id="hours-title">Sua rotina</h2>
        </div>
        <ul class="info-list">
          <li><span>Café da manhã (todos os dias)</span><b>${esc(H.horarios.cafe)}</b></li>
          <li><span>Check-in</span><b>${esc(H.horarios.checkin)}</b></li>
          <li><span>Check-out</span><b>${esc(H.horarios.checkout)}</b></li>
        </ul>
      </section>
      ${footer()}`;
  }

  function notFoundView() {
    renderTopbar({ back: '#/' });
    return `
      <section class="page-hero container" style="text-align:center">
        <p class="eyebrow eyebrow--center">Ops</p>
        <h1 class="title">Página não encontrada</h1>
        <p class="lead" style="margin-inline:auto">O conteúdo que você procura não está disponível.</p>
        <p style="margin-top:24px"><a class="btn btn--gold" href="#/">Voltar ao início</a></p>
      </section>`;
  }

  function deliveryCta() {
    return `
      <button class="delivery-cta" type="button" data-action="delivery">
        <span class="delivery-cta__icon">${icon('scooter')}</span>
        <span class="delivery-cta__body">
          <span class="delivery-cta__title">Pediu delivery?</span>
          <span class="delivery-cta__text">Avise a recepção com o nome do pedido e o número do quarto</span>
        </span>
        <span class="delivery-cta__go" aria-hidden="true">→</span>
      </button>`;
  }

  function footer() {
    return `
      <footer class="footer container">
        ${logo()}
        <p><strong style="color:var(--cream-dim);font-weight:600">${esc(H.nome)}</strong></p>
        <p>${esc(H.endereco)}</p>
        <p>Recepção 24h · Ramal ${esc(H.ramalRecepcao)}</p>
      </footer>`;
  }

  /* ---------- Roteador ---------- */
  function route() {
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean);
    let html;
    let dock = '';

    if (parts.length === 0) {
      html = homeView(); dock = 'home';
    } else if (parts[0] === 'servicos') {
      html = servicesView(); dock = 'servicos';
    } else if (parts[0] === 'c') {
      const cat = CATS.find((c) => c.id === parts[1]);
      const sub = cat && parts[2] ? cat.subs.find((s) => s.id === parts[2]) : null;
      if (cat && !parts[2]) html = categoryView(cat);
      else if (cat && sub) html = placesView(cat, sub);
      else html = notFoundView();
    } else {
      html = notFoundView();
    }

    UI.sheet.close();
    view.classList.remove('is-entering');
    view.innerHTML = html;
    void view.offsetWidth; // reinicia a animação
    view.classList.add('is-entering');
    bindWifi(view);
    startMarquee();

    document.querySelectorAll('[data-dock]').forEach((a) => {
      const active = a.dataset.dock === dock;
      a.classList.toggle('is-active', active);
      if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });

    const titleEl = view.querySelector('h1');
    document.title = parts.length ? `${titleEl ? titleEl.textContent : ''} · ${H.nome}` : `${H.nome} · Guia do Hóspede`;
    window.scrollTo({ top: 0, behavior: 'instant' });
    onScroll();
  }

  /* ---------- Topbar sólida ao rolar ---------- */
  /* ---------- Faixa dourada ----------
     Movida por requestAnimationFrame com velocidade fixa em px/s,
     para não depender de duração de animação CSS (que alguns
     celulares encurtam no modo "reduzir movimento"). */
  const MARQUEE_SPEED = 24; // px por segundo
  let marqueeRaf = 0;

  function startMarquee() {
    cancelAnimationFrame(marqueeRaf);
    const track = view.querySelector('.band__track');
    if (!track || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = 0;
    let last = performance.now();
    const step = (now) => {
      if (!track.isConnected) return;
      const dt = Math.min(now - last, 64) / 1000; // evita saltos ao voltar para a aba
      last = now;
      const half = track.scrollWidth / 2;
      x -= MARQUEE_SPEED * dt;
      if (half > 0 && -x >= half) x += half;
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      marqueeRaf = requestAnimationFrame(step);
    };
    marqueeRaf = requestAnimationFrame(step);
  }

  function onScroll() {
    topbar.classList.toggle('is-solid', window.scrollY > 8);
  }

  /* ---------- Splash ---------- */
  function splash() {
    const el = $('#splash');
    if (store.session('th_splash') || location.hash.length > 2) return;
    el.querySelector('[data-logo]').innerHTML = logo({ reveal: true });
    el.hidden = false;
    document.body.classList.add('is-locked');
    const leave = () => {
      store.session('th_splash', '1');
      el.classList.add('is-leaving');
      document.body.classList.remove('is-locked');
      setTimeout(() => { el.hidden = true; }, 700);
    };
    $('#splash-start').addEventListener('click', leave, { once: true });
  }

  /* ---------- Init ---------- */
  document.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
  document.addEventListener('room:updated', () => {
    const room = view.querySelector('[data-room]');
    if (room) room.innerHTML = `Quarto <b>${esc(store.get('th_quarto'))}</b>`;
  });
  window.addEventListener('hashchange', route);
  window.addEventListener('scroll', onScroll, { passive: true });
  splash();
  route();
})();
