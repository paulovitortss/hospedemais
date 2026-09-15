/* ==========================================================
   DADOS DO HOTEL E RECOMENDAÇÕES
   ⚠ Todos os estabelecimentos, telefones e @ abaixo são
   EXEMPLOS FICTÍCIOS. Substitua pelos parceiros reais.
   WhatsApp: só números, com DDI + DDD (ex: 5586999998888)
   Instagram: apenas o usuário, sem @
   ========================================================== */

window.HOTEL = {
  nome: 'Teresina Hotel',
  cidade: 'Teresina · PI',
  endereco: 'Av. Frei Serafim, 1000 — Centro, Teresina · PI',
  whatsappRecepcao: '558632141504',
  telefoneRecepcao: '+558632141504',
  telefoneExibicao: '(86) 3214-1504',
  ramalRecepcao: '9',
  wifi: { rede: 'TeresinaHotel_Hospedes', senha: 'bemvindo2026' },
  horarios: {
    cafe: '06h30 – 10h00',
    cafeFds: '07h00 – 10h30',
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
    tint: 'rgba(233, 168, 92, .22)',
    meta: 'Regional, pizzas, burgers e japonês',
    titulo: 'O que vamos comer hoje?',
    lead: 'Selecionamos lugares que nossos hóspedes amam — do sabor piauiense ao japonês.',
    subs: [
      {
        id: 'regional', nome: 'Comida Regional', icon: 'regional',
        lead: 'Maria Isabel, capote, paçoca de carne de sol e cajuína gelada.',
        lugares: [
          p('Casa Mandacaru', 'Cozinha piauiense afetiva: Maria Isabel, carne de sol na nata e baião de dois.', 'Centro', '800 m', '$$', '11h – 15h · 18h – 23h', '5586900000101', 'casamandacaru.the', 'Favorito dos hóspedes'),
          p('Quintal da Cajuína', 'Almoço servido em quintal arborizado, com capote ao molho pardo e doces caseiros.', 'Ilhotas', '2,1 km', '$$', '11h – 16h', '5586900000102', 'quintaldacajuina'),
          p('Sabor do Parnaíba', 'Peixes de rio, galinha caipira e o clássico arroz de capote à beira do rio.', 'Poti Velho', '6 km', '$$$', '11h – 22h', '5586900000103', 'sabordoparnaiba')
        ]
      },
      {
        id: 'pizzarias', nome: 'Pizzarias', icon: 'pizza',
        lead: 'Massa de fermentação natural, forno a lenha e delivery até o hotel.',
        lugares: [
          p('Forno Chapada', 'Pizza napolitana em forno a lenha, com opção de carne de sol com queijo coalho.', 'Jóquei', '3,4 km', '$$', '18h – 23h30', '5586900000201', 'fornochapada', 'Entrega no hotel'),
          p('Nonna Piauí', 'Ambiente familiar, bordas recheadas e rodízio às terças e quartas.', 'Fátima', '2,8 km', '$$', '18h – 00h', '5586900000202', 'nonnapiaui'),
          p('Pizza da Praça', 'Fatias generosas e opções veganas. Ótima para pedir no quarto.', 'Centro', '600 m', '$', '17h – 23h', '5586900000203', 'pizzadapraca.the')
        ]
      },
      {
        id: 'hamburguerias', nome: 'Hamburguerias', icon: 'burger',
        lead: 'Smash, artesanais na brasa e combos para matar a fome.',
        lugares: [
          p('Brasa 86', 'Blend da casa na brasa, pão brioche e batata rústica com alecrim.', 'Jóquei', '3,1 km', '$$', '18h – 00h', '5586900000301', 'brasa86burger', 'Mais pedido'),
          p('Smash do Poti', 'Smash burger duplo, milkshakes e cardápio kids.', 'Noivos', '4 km', '$', '17h30 – 23h30', '5586900000302', 'smashdopoti'),
          p('Chapa Quente', 'Hambúrguer de costela e opções com queijo coalho e mel de engenho.', 'Centro', '1 km', '$$', '18h – 23h', '5586900000303', 'chapaquente.the')
        ]
      },
      {
        id: 'japones', nome: 'Japonês', icon: 'sushi',
        lead: 'Sushi, temakis e rodízios para todos os gostos.',
        lugares: [
          p('Kaiyō Sushi', 'Omakase no balcão e peixes frescos selecionados todos os dias.', 'Jóquei', '3,6 km', '$$$', '18h30 – 23h30', '5586900000401', 'kaiyosushi.the', 'Experiência'),
          p('Sakura Poti', 'Rodízio completo com pratos quentes, yakisoba e sobremesas.', 'Fátima', '2,9 km', '$$', '11h30 – 15h · 18h – 23h', '5586900000402', 'sakurapoti'),
          p('Temaki Bar 86', 'Temakis generosos, poke bowls e delivery rápido até o hotel.', 'Ilhotas', '1,9 km', '$', '17h – 23h', '5586900000403', 'temakibar86')
        ]
      }
    ]
  },

  {
    id: 'mobilidade',
    nome: 'Mobilidade',
    icon: 'car',
    tint: 'rgba(122, 160, 190, .2)',
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
          p('Transfer Senador', 'Busca no aeroporto com placa de identificação e acompanhamento do voo.', 'Aeroporto', '6 km', 'A partir de R$ 45', 'Agendamento 24h', '5586900000601', 'transfersenador', 'Recomendado'),
          p('Executivo Piauí', 'Sedans e vans executivas para grupos e eventos.', 'Centro', '—', 'Sob consulta', '05h – 23h', '5586900000602', 'executivopiaui')
        ]
      },
      {
        id: 'aluguel', nome: 'Aluguel de Carros', icon: 'key',
        lead: 'Retire o carro no hotel e explore a região.',
        lugares: [
          p('Rota 86 Locadora', 'Entrega e retirada do veículo no hotel, sem custo adicional.', 'Entrega no hotel', '—', 'A partir de R$ 120/dia', '07h – 20h', '5586900000701', 'rota86locadora', 'Entrega no hotel'),
          p('Parnaíba Rent a Car', 'Carros compactos, SUVs e opções para viagens ao litoral.', 'Aeroporto', '6 km', 'A partir de R$ 140/dia', '06h – 22h', '5586900000702', 'parnaibarentacar')
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
    tint: 'rgba(231, 166, 196, .2)',
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
    tint: 'rgba(140, 120, 210, .22)',
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
