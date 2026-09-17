/* Ícones em linha (24x24, stroke = currentColor) e logo do hotel */
(function () {
  const s = (paths, extra = '') =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${paths}</svg>`;

  const ICONS = {
    home: s('<path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9v11h13V9"/><path d="M10 20v-6h4v6"/>'),
    bell: s('<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
    wifi: s('<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path d="M8.7 15.8a5 5 0 0 1 6.6 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/>'),
    concierge: s('<path d="M3 18h18"/><path d="M4.5 18a7.5 7.5 0 0 1 15 0"/><path d="M12 10.5V8"/><path d="M10 8h4"/><path d="M2.5 21h19"/>'),
    back: s('<path d="M15 5 8 12l7 7"/>'),
    close: s('<path d="M6 6l12 12M18 6 6 18"/>'),
    arrow: s('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'),

    // Categorias
    food: s('<path d="M7 3v8"/><path d="M4.5 3v5a2.5 2.5 0 0 0 5 0V3"/><path d="M7 11v10"/><path d="M17 21V3c-2.2 1.2-3.5 4-3.5 7.5 0 1.9 1.2 3 3.5 3"/>'),
    car: s('<path d="M4 16.5V12l2-5.2A2 2 0 0 1 7.9 5.5h8.2a2 2 0 0 1 1.9 1.3L20 12v4.5"/><path d="M3 12h18v4.5H3z"/><circle cx="7.5" cy="16.5" r="2"/><circle cx="16.5" cy="16.5" r="2"/>'),
    spa: s('<path d="M12 20c-4.5 0-8-3-8.5-8 3 0 6.2 1.2 8.5 4 2.3-2.8 5.5-4 8.5-4-.5 5-4 8-8.5 8Z"/><path d="M12 16c-1.8-2-2.5-4.3-2.5-6.5S10.5 5 12 3.5c1.5 1.5 2.5 3.8 2.5 6S13.8 14 12 16Z"/>'),
    night: s('<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z"/><path d="M17 3.5v3M15.5 5h3"/>'),

    // Alimentação
    regional: s('<path d="M3.5 11h17"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M8.5 21h7"/><path d="M12 18v3"/><path d="M9 7.5c0-1.5 1-1.5 1-3M13 7.5c0-1.5 1-1.5 1-3"/>'),
    pizza: s('<path d="M12 21 3.2 6.2a14 14 0 0 1 17.6 0Z"/><path d="M5 9.2a11 11 0 0 1 14 0"/><circle cx="10" cy="11.5" r="1"/><circle cx="14" cy="13" r="1"/><circle cx="12" cy="16.5" r=".8"/>'),
    burger: s('<path d="M4 10a8 5 0 0 1 16 0Z"/><path d="M3.5 13.5h17"/><path d="M4.5 16.5h15a0 0 0 0 1 0 0 3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3Z"/><path d="M9 7h.01M12 6h.01M15 7h.01"/>'),
    sushi: s('<ellipse cx="12" cy="9" rx="8" ry="3.5"/><path d="M4 9v6c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5V9"/><ellipse cx="12" cy="9" rx="3.5" ry="1.4"/><path d="m16 3 4.5 3M18.5 2l3 2.5"/>'),

    // Mobilidade
    taxi: s('<path d="M9 5.5h6l.8 2"/><path d="M4 17V13l1.8-4.2A2 2 0 0 1 7.6 7.5h8.8a2 2 0 0 1 1.8 1.3L20 13v4"/><path d="M3 13h18v4H3z"/><circle cx="7.5" cy="17" r="1.8"/><circle cx="16.5" cy="17" r="1.8"/>'),
    plane: s('<path d="M10.5 13.5 3 11l1.5-1.5 8 .5 4-4.5c1-1 2.5-1.5 3.5-.5s.5 2.5-.5 3.5l-4.5 4 .5 8L14 22l-2.5-7.5"/><path d="m6 17-2 2M8.5 19.5 7 21"/>'),
    key: s('<circle cx="8" cy="15" r="4.5"/><path d="m11.2 11.8 8.3-8.3"/><path d="m16.5 6.5 2.5 2.5M14 9l2 2"/>'),
    map: s('<path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Z"/><path d="M9 4v14M15 6v14"/>'),

    // Beleza & bem-estar
    scissors: s('<circle cx="6" cy="6.5" r="2.5"/><circle cx="6" cy="17.5" r="2.5"/><path d="M8 8 20 19M8 16 20 5"/>'),
    barber: s('<rect x="8" y="3" width="8" height="18" rx="4"/><path d="m8 9 8-3M8 14l8-3M8 19l8-3"/>'),
    massage: s('<circle cx="17" cy="6" r="2"/><path d="M3 15h13.5a3 3 0 0 0 0-6h-2"/><path d="M3 18.5h18"/><path d="M6 12c1-2 2.5-3 4.5-3"/>'),
    dumbbell: s('<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>'),

    // Vida noturna
    beer: s('<path d="M5 8h10v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/><path d="M15 10.5h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/><path d="M5 8a2.5 2.5 0 0 1 2-4 3 3 0 0 1 5 0 2.5 2.5 0 0 1 3 4"/><path d="M8.5 12v5M11.5 12v5"/>'),
    music: s('<path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/><path d="M9 9.5l11-2"/>'),
    cocktail: s('<path d="M4 4h16l-8 9Z"/><path d="M12 13v8M8 21h8"/><path d="M15.5 4 18 1.5"/><circle cx="17.5" cy="7.5" r="1.5"/>'),
    disco: s('<circle cx="12" cy="13" r="7.5"/><path d="M12 5.5V2.5"/><path d="M4.5 13h15M12 5.5c-2 2-3 4.5-3 7.5s1 5.5 3 7.5M12 5.5c2 2 3 4.5 3 7.5s-1 5.5-3 7.5"/>'),

    // Serviços
    broom: s('<path d="M14 3 9.5 11"/><path d="M6.5 10.5 13 14l-1.5 7c-3-1-7-3.5-8.5-6.5Z"/><path d="m7 17 2-2.5M10 19l1-2.5"/>'),
    towel: s('<path d="M6 3h12a2 2 0 0 1 2 2v3H4V5a2 2 0 0 1 2-2Z"/><path d="M5 8v11.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8"/><path d="M5 16h14M5 18.5h14"/>'),
    iron: s('<path d="M3 17.5h17V15a6 6 0 0 0-6-6H9"/><path d="M3 17.5C3 13 6 10 10.5 10"/><path d="M9 9V6h8"/><path d="M8 13.5h.01M11 13.5h.01M14 13.5h.01"/>'),
    scooter: s('<circle cx="6" cy="17.5" r="2.5"/><circle cx="18" cy="17.5" r="2.5"/><path d="M8.5 17.5h6.5l2-6h-3.5"/><path d="M3.5 17.5V13a2 2 0 0 1 2-2H10v6.5"/><path d="M15.5 5.5h2l1.5 6"/><rect x="3.5" y="4.5" width="6.5" height="5" rx="1"/>'),
    coffee: s('<path d="M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 2.5c0 1.5 1 1.5 1 3M12 2.5c0 1.5 1 1.5 1 3"/>'),
    door: s('<path d="M13 3.5 5.5 5v15l7.5 1.5Z"/><path d="M13 5h5.5v15H13"/><circle cx="10.5" cy="12.5" r=".6" fill="currentColor"/><path d="M3 20h2.5M18.5 20H21"/>'),
    phone: s('<path d="M5 3.5h3.5l1.8 4.5-2.3 1.4a10.5 10.5 0 0 0 5.6 5.6l1.4-2.3 4.5 1.8V18A2.5 2.5 0 0 1 17 20.5 14.5 14.5 0 0 1 2.5 6 2.5 2.5 0 0 1 5 3.5Z"/>'),
    copy: s('<rect x="8.5" y="8.5" width="12" height="12" rx="2.5"/><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"/>'),
    eye: s('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>'),

    // Meta
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6L12 16.8 6.6 19.6l1.2-6L3.3 9.4l6.1-.8L12 3Z"/></svg>',
    pin: s('<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>'),
    walk: s('<circle cx="13" cy="4.5" r="1.8"/><path d="m7 21 3-7 2.5 2V21"/><path d="M9 11.5 10.5 8l3 1 2 3.5 3 1"/><path d="M10.5 8 7 9.5 5.5 13"/>'),
    clock: s('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    wallet: s('<path d="M4 7.5h14.5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2H16"/><circle cx="16" cy="13.5" r="1" fill="currentColor"/>'),

    // Marcas (preenchidas)
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-3-.4-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2 .7 2.8.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.3-.3Z"/></svg>',
    instagram: s('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/>'),
    spark: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c.6 6.8 5.2 11.4 12 12-6.8.6-11.4 5.2-12 12-.6-6.8-5.2-11.4-12-12C6.8 11.4 11.4 6.8 12 0Z"/></svg>'
  };

  /* Logo oficial do hotel (assets/logo.png, monograma creme com fundo transparente) */
  function logo(opts = {}) {
    const reveal = opts.reveal ? ' logo--reveal' : '';
    return `<span class="logo${reveal}"><img src="assets/logo.png?v=7" alt="Teresina Hotel" decoding="async"></span>`;
  }

  window.ICONS = ICONS;
  window.icon = (name) => ICONS[name] || '';
  window.logo = logo;
})();
