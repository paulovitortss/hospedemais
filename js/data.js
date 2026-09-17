/* ==========================================================
   DADOS DO HOTEL E RECOMENDAÇÕES
   ALIMENTAÇÃO: estabelecimentos reais, com dados coletados no
   Google Maps e no Instagram em 17/09/2026. Confira antes de
   publicar — horários e telefones mudam.
   ⚠ MOBILIDADE, BELEZA e VIDA NOTURNA ainda são EXEMPLOS
   FICTÍCIOS. Substitua pelos parceiros reais.
   WhatsApp: só números, com DDI + DDD (ex: 5586999998888)
   Instagram: apenas o usuário, sem @
   ========================================================== */

window.HOTEL = {
  nome: 'Teresina Hotel',
  cidade: 'Teresina · PI',
  endereco: 'Av. Centenário, 1734 - Aeroporto, Teresina - PI, 64003-700',
  whatsappRecepcao: '558632141504',
  telefoneRecepcao: '+558632141504',
  telefoneExibicao: '(86) 3214-1504',
  ramalRecepcao: '9',
  wifi: { rede: 'teresinahotel', senha: 'cidadeverde' },
  toalhasPorHospede: 2,
  horarios: {
    cafe: '07h00 – 09h30',
    cafeLocal: 'Restaurante Parnaíba · Térreo',
    checkin: '14h00',
    checkout: '12h00',
    lateCheckout: 'Até 15h, sujeito à disponibilidade'
  }
};

/* p(nome, descrição, bairro, distância, preço, horário, whatsapp, instagram, destaque?) */
const p = (nome, desc, bairro, dist, preco, horario, whatsapp, instagram, tag) =>
  ({ nome, desc, bairro, dist, preco, horario, whatsapp, instagram, tag });

window.CATEGORIES = [
  {
    id: 'alimentacao',
    nome: 'Alimentação',
    icon: 'food',
    foto: 'https://images.unsplash.com/photo-1586058584825-c1e87ed735b4?auto=format&fit=crop&w=800&q=60',
    meta: 'Regional, pizzas, burgers e japonês',
    titulo: 'O que vamos comer hoje?',
    lead: 'Selecionamos lugares que nossos hóspedes amam — do sabor piauiense ao japonês.',
    subs: [
      {
        id: 'regional', nome: 'Comida Regional', icon: 'regional',
        lead: 'Carne de sol, carneiro na brasa, baião de dois e o melhor da cozinha piauiense.',
        lugares: [
          {
            nome: 'São João Restaurante',
            desc: 'Cozinha regional em ambiente campestre, referência na carne de sol de Teresina.',
            bairro: 'Fátima',
            endereco: 'Av. Nossa Sra. de Fátima, 2616 - Fátima',
            nota: '4,6 (1.190)',
            preco: 'R$ 80–200',
            horario: 'Seg a sáb 11h – 00h · Dom 11h – 15h30',
            whatsapp: '5586994686230',
            telefone: '+558632339765',
            instagram: 'saojoaorestaurantes.leste',
            tag: 'Clássico da carne de sol'
          },
          {
            nome: 'Restaurante Malaguetta',
            desc: 'Comida caseira piauiense: carne de sol, picanha, petiscos e almoço farto.',
            bairro: 'Fátima',
            endereco: 'Av. Lindolfo Monteiro, 2060 - Fátima',
            nota: '4,5 (2.306)',
            preco: 'R$ 60–140',
            horario: 'Ter a sex 18h – 00h · Sáb e dom 11h – 15h e 18h – 00h · Seg fechado',
            telefone: '+558632163961',
            instagram: 'malaguettathe'
          },
          {
            nome: 'Carneiro na Brasa da Zefinha',
            desc: 'Filé de carneiro na brasa com baião de dois e macaxeira. Tradição desde 1999.',
            bairro: 'São Cristóvão',
            endereco: 'R. Prof. Clemente Fortes, 2260 - São Cristóvão',
            nota: '4,6 (1.381)',
            preco: 'R$ 60–180',
            horario: 'Ter a dom 10h – 00h · Seg fechado',
            whatsapp: '5586999584302',
            telefone: '+558632338843',
            instagram: 'carneironabrasadazefinha',
            tag: 'Desde 1999'
          }
        ]
      },
      {
        id: 'pizzarias', nome: 'Pizzarias', icon: 'pizza',
        lead: 'Forno a lenha, massas artesanais e cozinha italiana.',
        lugares: [
          {
            nome: 'Forno Paulista - Leste',
            desc: 'Pizzas artesanais com delivery a partir das 15h. Uma das mais pedidas da cidade.',
            bairro: 'Fátima',
            endereco: 'R. Hugo Napoleão, 1778 - Fátima',
            nota: '4,4 (1.242)',
            horario: 'Todos os dias 15h – 23h',
            whatsapp: '5586995709028',
            instagram: 'fornopaulista',
            tag: 'Delivery'
          },
          {
            nome: 'Vignoli - Teresina',
            desc: 'Casa italiana com pizzas, massas e almoço executivo em ambiente acolhedor.',
            bairro: 'Fátima',
            endereco: 'Av. Dom Severino, 1631 - Fátima',
            nota: '4,6 (864)',
            horario: 'Seg a qua 11h – 15h e 18h – 00h · Qui a dom 11h – 00h',
            instagram: 'vignoliteresina'
          },
          {
            nome: 'Forneria Favorito',
            desc: 'Pizzas em forno a lenha, massas e cozinha italiana contemporânea.',
            bairro: 'Fátima',
            endereco: 'Av. Nossa Sra. de Fátima, 1839 - Fátima',
            nota: '4,5 (691)',
            horario: 'Seg a sex 18h – 00h · Sáb e dom 12h – 15h e 18h – 00h',
            whatsapp: '5586999881607',
            telefone: '+558632341500',
            instagram: 'favorito.forneria'
          }
        ]
      },
      {
        id: 'hamburguerias', nome: 'Hamburguerias', icon: 'burger',
        lead: 'Artesanais, smash e lanches até de madrugada.',
        lugares: [
          {
            nome: "45' Burger e Pizza - Jóquei",
            desc: 'Hamburgueria premiada no Piauí, com opções de pizza na mesma casa.',
            bairro: 'Ininga',
            endereco: 'R. Visc. da Parnaíba, 1615 - Ininga',
            nota: '4,8 (1.016)',
            whatsapp: '5586998645005',
            instagram: '45burger',
            tag: 'Nota 4,8 no Google'
          },
          {
            nome: 'Bruthus Burger - Unidade Ininga',
            desc: 'Hambúrgueres artesanais, torresmo e milk-shakes em clima descontraído.',
            bairro: 'Fátima',
            endereco: 'Av. Ininga, 1570 - Fátima',
            nota: '4,5 (2.111)',
            horario: 'Seg a qui 18h – 23h · Sex a dom 18h – 00h',
            telefone: '+558633030692',
            instagram: 'bruthusburger'
          },
          {
            nome: 'Dogão Burguer Fátima',
            desc: 'Hambúrgueres e cachorro-quente servidos até de madrugada.',
            bairro: 'Fátima',
            endereco: 'Av. Nossa Sra. de Fátima, 1900 - Fátima',
            nota: '4,3 (1.320)',
            horario: 'Todos os dias 17h – 05h',
            whatsapp: '5586995563546',
            telefone: '+558633042961',
            instagram: 'dogaofatima',
            tag: 'Aberto até 5h'
          }
        ]
      },
      {
        id: 'japones', nome: 'Japonês', icon: 'sushi',
        lead: 'Sushi, combinados e culinária japonesa.',
        lugares: [
          {
            nome: 'Takashi Sushi - TK',
            desc: 'Combinados e sushi preparados na hora, em ambiente intimista no Jóquei.',
            bairro: 'Jóquei',
            endereco: 'Av. Jóquei Clube, 1473 - Jóquei',
            nota: '4,8 (58)',
            horario: 'Todos os dias 18h – 23h',
            whatsapp: '5586999112088',
            instagram: 'takashi_sushithe',
            tag: 'Nota 4,8 no Google'
          },
          {
            nome: 'Sushi Club',
            desc: 'Sushi no almoço e no jantar, com delivery e opções para viagem.',
            bairro: 'Jóquei',
            endereco: 'R. Anfrísio Lobão, 1196 - Jóquei',
            nota: '4,2 (51)',
            preco: 'R$ 40–60',
            horario: 'Almoço 11h – 14h · Jantar 17h – 22h30 (sex a dom até 23h30)',
            whatsapp: '5586999986538',
            instagram: 'sushiclubthe'
          },
          {
            nome: 'Anisan Express',
            desc: 'Culinária japonesa na praça de alimentação do Teresina Shopping.',
            bairro: 'Noivos',
            endereco: 'Av. Raul Lopes, 1000 - Teresina Shopping',
            nota: '5,0 (9)',
            horario: 'Todos os dias 10h – 22h',
            whatsapp: '5586981051982',
            instagram: 'anisanexpress',
            tag: 'No Teresina Shopping'
          }
        ]
      }
    ]
  },

  {
    id: 'mobilidade',
    nome: 'Mobilidade',
    icon: 'car',
    foto: 'https://images.unsplash.com/photo-1610886023290-6ba32b20e354?auto=format&fit=crop&w=800&q=60',
    meta: 'Táxi, transfer, aluguel e passeios',
    titulo: 'Para onde você vai?',
    lead: 'Parceiros de confiança para se deslocar com tranquilidade pela cidade.',
    subs: [
      {
        id: 'taxi', nome: 'Táxi', icon: 'taxi',
        lead: 'Cooperativas 24h com motoristas credenciados.',
        lugares: [
          p('Rádio Táxi Cajuína', 'Atendimento 24h, carros com ar-condicionado e pagamento por cartão ou Pix.', 'Ponto em frente ao hotel', '0 m', 'Taxímetro', '24 horas', '5586900000501', 'radiotaxicajuina', 'Ponto no hotel'),
          p('Cooper Táxi Poti', 'Frota executiva e corridas agendadas para compromissos.', 'Centro', '—', 'Taxímetro', '24 horas', '5586900000502', 'coopertaxipoti')
        ]
      },
      {
        id: 'transfer', nome: 'Transfer Aeroporto', icon: 'plane',
        lead: 'Traslado ao Aeroporto de Teresina com horário marcado.',
        lugares: [
          p('Transfer Senador', 'Busca no aeroporto com placa de identificação e acompanhamento do voo.', 'Aeroporto', '1,5 km', 'A partir de R$ 45', 'Agendamento 24h', '5586900000601', 'transfersenador', 'Recomendado'),
          p('Executivo Piauí', 'Sedans e vans executivas para grupos e eventos.', 'Centro', '—', 'Sob consulta', '05h – 23h', '5586900000602', 'executivopiaui')
        ]
      },
      {
        id: 'aluguel', nome: 'Aluguel de Carros', icon: 'key',
        lead: 'Retire o carro no hotel e explore a região.',
        lugares: [
          p('Rota 86 Locadora', 'Entrega e retirada do veículo no hotel, sem custo adicional.', 'Entrega no hotel', '—', 'A partir de R$ 120/dia', '07h – 20h', '5586900000701', 'rota86locadora', 'Entrega no hotel'),
          p('Parnaíba Rent a Car', 'Carros compactos, SUVs e opções para viagens ao litoral.', 'Aeroporto', '1,5 km', 'A partir de R$ 140/dia', '06h – 22h', '5586900000702', 'parnaibarentacar')
        ]
      },
      {
        id: 'passeios', nome: 'Passeios & Turismo', icon: 'map',
        lead: 'Encontro dos Rios, Parque da Cidade e roteiros pela Serra da Capivara.',
        lugares: [
          p('Rios & Trilhas Turismo', 'City tour com Encontro dos Rios, Ponte Estaiada e Centro Histórico.', 'Saída do hotel', '—', 'A partir de R$ 90', 'Saídas 08h e 15h', '5586900000801', 'riosetrilhas', 'City tour'),
          p('Piauí Raiz Expedições', 'Bate-volta e pacotes para Serra da Capivara, Sete Cidades e Delta.', 'Centro', '—', 'Sob consulta', '08h – 18h', '5586900000802', 'piauiraiz')
        ]
      }
    ]
  },

  {
    id: 'beleza',
    nome: 'Beleza & Bem-estar',
    icon: 'spa',
    foto: 'https://images.unsplash.com/photo-1696841212541-449ca29397cc?auto=format&fit=crop&w=800&q=60',
    meta: 'Salões, barbearias, spa e academias',
    titulo: 'Um momento para você',
    lead: 'Cuide de si durante a estadia com nossos parceiros de beleza e saúde.',
    subs: [
      {
        id: 'saloes', nome: 'Salões de Beleza', icon: 'scissors',
        lead: 'Cabelo, maquiagem, manicure e produção para eventos.',
        lugares: [
          p('Studio Aurora', 'Escova, maquiagem e penteados para eventos. Atende hóspedes com hora marcada.', 'Jóquei', '3,2 km', '$$$', '09h – 20h', '5586900000901', 'studioaurora.the', 'Atende no hotel'),
          p('Espaço Flor de Caju', 'Manicure, pedicure, design de sobrancelhas e tratamentos capilares.', 'Fátima', '2,6 km', '$$', '08h – 19h', '5586900000902', 'espacoflordecaju')
        ]
      },
      {
        id: 'barbearias', nome: 'Barbearias', icon: 'barber',
        lead: 'Corte, barba e toalha quente.',
        lugares: [
          p('Barbearia Dom Poti', 'Corte clássico, barba com toalha quente e cerveja gelada na espera.', 'Centro', '900 m', '$$', '09h – 21h', '5586900001001', 'barbeariadompoti', 'Perto do hotel'),
          p('Navalha 86', 'Cortes modernos, pigmentação e atendimento sem espera com agendamento.', 'Noivos', '4,2 km', '$$', '10h – 20h', '5586900001002', 'navalha86')
        ]
      },
      {
        id: 'spa', nome: 'Spa & Massagem', icon: 'massage',
        lead: 'Relaxe depois de um dia de trabalho ou passeio.',
        lugares: [
          p('Lótus Day Spa', 'Massagem relaxante, pedras quentes e day spa completo para casais.', 'Jóquei', '3,5 km', '$$$', '09h – 21h', '5586900001101', 'lotusdayspa.the', 'Relaxamento'),
          p('Mãos de Cajuína', 'Terapeuta credenciada que atende no quarto com maca portátil.', 'Atendimento no hotel', '—', '$$', '08h – 22h', '5586900001102', 'maosdecajuina')
        ]
      },
      {
        id: 'academias', nome: 'Academias', icon: 'dumbbell',
        lead: 'Treine sem sair da rotina — com diárias para hóspedes.',
        lugares: [
          p('Arena Fit Centro', 'Diária para hóspedes com apresentação da chave do quarto.', 'Centro', '700 m', 'Diária R$ 35', '05h – 23h', '5586900001201', 'arenafitcentro', 'Desconto hóspede'),
          p('Poti Crossfit', 'Aulas de cross training, funcional e yoga ao ar livre.', 'Ilhotas', '2 km', 'Aula R$ 40', '05h30 – 21h', '5586900001202', 'poticrossfit')
        ]
      }
    ]
  },

  {
    id: 'noturna',
    nome: 'Vida Noturna',
    icon: 'night',
    foto: 'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=800&q=60',
    meta: 'Bares, música ao vivo e baladas',
    titulo: 'A noite em Teresina',
    lead: 'Dos botecos tradicionais aos bares de coquetelaria — a cidade ganha vida à noite.',
    subs: [
      {
        id: 'bares', nome: 'Bares & Petiscos', icon: 'beer',
        lead: 'Cerveja gelada, petiscos regionais e mesas na calçada.',
        lugares: [
          p('Boteco do Jóquei', 'Chopp gelado, paçoca de carne de sol e mesas ao ar livre.', 'Jóquei', '3,3 km', '$$', '17h – 01h', '5586900001301', 'botecodojoquei', 'Clássico'),
          p('Bar da Ponte', 'Vista para o rio Poti, petiscos de peixe e pôr do sol imperdível.', 'Noivos', '4,5 km', '$$', '16h – 00h', '5586900001302', 'bardaponte.the')
        ]
      },
      {
        id: 'musica', nome: 'Música ao Vivo', icon: 'music',
        lead: 'Forró, MPB, samba e jazz para todas as noites.',
        lugares: [
          p('Casa do Forró Chapadão', 'Forró pé de serra ao vivo de quinta a sábado.', 'Cabral', '2,4 km', 'Couvert R$ 20', 'Qui a Sáb · 21h – 03h', '5586900001401', 'forrochapadao', 'Qui a Sáb'),
          p('Varanda MPB', 'Voz e violão, drinks autorais e cozinha aberta até tarde.', 'Fátima', '2,7 km', 'Couvert R$ 15', 'Ter a Dom · 19h – 01h', '5586900001402', 'varandampb')
        ]
      },
      {
        id: 'drinks', nome: 'Coquetelaria', icon: 'cocktail',
        lead: 'Drinks autorais com ingredientes do Piauí.',
        lugares: [
          p('Alambique 86', 'Coquetéis com cajuína, cachaças artesanais e ambiente intimista.', 'Jóquei', '3,4 km', '$$$', '18h – 01h', '5586900001501', 'alambique86', 'Drinks autorais'),
          p('Rooftop Estaiada', 'Terraço com vista da Ponte Estaiada e DJ aos fins de semana.', 'Noivos', '4,8 km', '$$$', '18h – 02h', '5586900001502', 'rooftopestaiada')
        ]
      },
      {
        id: 'baladas', nome: 'Baladas', icon: 'disco',
        lead: 'Para dançar até o dia amanhecer.',
        lugares: [
          p('Club Mandacaru', 'Música eletrônica e open bar em datas especiais.', 'Jóquei', '3,8 km', 'Entrada R$ 40', 'Sex e Sáb · 23h – 05h', '5586900001601', 'clubmandacaru', 'Sex e Sáb'),
          p('Galpão 86', 'Sertanejo, piseiro e shows nacionais em casa ampla.', 'Morada do Sol', '5,5 km', 'Sob evento', 'Consulte a agenda', '5586900001602', 'galpao86')
        ]
      }
    ]
  }
];
