/**
 * Blog Posts - AJN Engenharia
 * 
 * Estrutura de dados consolidada dos artigos técnicos do blog.
 * Inclui helpers para busca, filtragem, posts relacionados e SEO.
 * 
 * @module blog/posts
 */

import {
  FaFileAlt, FaUserMd, FaHardHat, FaFire, FaLaptopCode,
  FaExclamationTriangle, FaCheckCircle, FaLightbulb, FaQuoteLeft
} from 'react-icons/fa'

// ═══════════════════════════════════════════════════════════════════
// CATEGORIAS E ESTILOS
// ═══════════════════════════════════════════════════════════════════

export const blogCategories = [
  'Todos',
  'Laudos Técnicos',
  'Saúde Ocupacional',
  'Segurança do Trabalho',
  'Combate a Incêndio',
  'eSocial',
]

/**
 * Estilo visual por categoria (ícone + gradiente + cor de destaque)
 * Usado em cards, headers de artigo e breadcrumbs
 */
export const categoryStyle = {
  'Laudos Técnicos': {
    icon: FaFileAlt,
    from: '#3a7d0a',
    to: '#235104',
    accent: '#4a9e10',
    bg: '#f0f9e8',
    slug: 'laudos-tecnicos',
  },
  'Saúde Ocupacional': {
    icon: FaUserMd,
    from: '#0f766e',
    to: '#134e4a',
    accent: '#14b8a6',
    bg: '#f0fdfa',
    slug: 'saude-ocupacional',
  },
  'Segurança do Trabalho': {
    icon: FaHardHat,
    from: '#b45309',
    to: '#7c3a05',
    accent: '#f59e0b',
    bg: '#fffbeb',
    slug: 'seguranca-do-trabalho',
  },
  'Combate a Incêndio': {
    icon: FaFire,
    from: '#b91c1c',
    to: '#7f1d1d',
    accent: '#ef4444',
    bg: '#fef2f2',
    slug: 'combate-a-incendio',
  },
  'eSocial': {
    icon: FaLaptopCode,
    from: '#1d4ed8',
    to: '#1e3a8a',
    accent: '#3b82f6',
    bg: '#eff6ff',
    slug: 'esocial',
  },
}

// ═══════════════════════════════════════════════════════════════════
// AUTORES
// ═══════════════════════════════════════════════════════════════════

export const authors = {
  'equipe-ajn': {
    id: 'equipe-ajn',
    name: 'Equipe AJN',
    role: 'Engenheiros e Consultores',
    avatar: '/images/team/ajn-team.jpg',
    bio: 'Time multidisciplinar de engenheiros de segurança, médicos do trabalho e técnicos especializados.',
  },
  'carlos-gandra': {
    id: 'carlos-gandra',
    name: 'Carlos Gandra',
    role: 'Engenheiro de Segurança do Trabalho',
    avatar: '/images/team/carlos-gandra.jpg',
    bio: 'Engenheiro com mais de 15 anos de experiência em SST e consultoria empresarial.',
  },
}

// ═══════════════════════════════════════════════════════════════════
// TIPOS DE BLOCOS DE CONTEÚDO SUPORTADOS
// ═══════════════════════════════════════════════════════════════════

/**
 * Tipos de blocos que o ArticleRenderer deve suportar:
 * 
 * - { type: 'p',    text: '...' }                              → Parágrafo
 * - { type: 'h2',   text: '...' }                              → Subtítulo
 * - { type: 'h3',   text: '...' }                              → Sub-subtítulo
 * - { type: 'ul',   items: ['...', '...'] }                    → Lista com bullets
 * - { type: 'ol',   items: ['...', '...'] }                    → Lista numerada
 * - { type: 'callout', variant: 'info|warning|success|tip', title: '...', text: '...' }
 * - { type: 'quote', text: '...', author: '...' }              → Citação destacada
 * - { type: 'image', src: '...', alt: '...', caption: '...' }  → Imagem no corpo
 * - { type: 'cta', text: '...', href: '...' }                  → Call-to-action inline
 */

// ═══════════════════════════════════════════════════════════════════
// POSTS
// ═══════════════════════════════════════════════════════════════════

export const posts = [
  {
    id: 1,
    slug: 'ltcat-o-que-e-e-por-que-sua-empresa-precisa',
    title: 'LTCAT: o que é e por que sua empresa precisa emitir',
    metaTitle: 'LTCAT: O Que É, Quem Precisa Emitir e Como Funciona | AJN Engenharia',
    metaDescription: 'Guia completo sobre o LTCAT: entenda o que é, quem é obrigado a emitir, como funciona a elaboração e por que ele é essencial para aposentadoria especial e eSocial.',
    category: 'Laudos Técnicos',
    author: 'equipe-ajn',
    date: '2025-01-20',
    updatedAt: '2025-02-15',
    readTime: '6 min',
    difficulty: 'intermediário',
    featured: true,
    image: {
      src: '/images/blog/pericias-insalubridade-periculosidade.jpg',
      alt: 'Engenheiro de segurança realizando medição técnica para emissão de LTCAT em ambiente industrial',
    },
    excerpt:
      'O Laudo Técnico das Condições Ambientais de Trabalho é exigido pelo INSS e fundamenta a aposentadoria especial. Entenda o que é, quem precisa e como funciona a emissão.',
    keywords: ['LTCAT', 'laudo LTCAT BH', 'aposentadoria especial', 'INSS', 'PPP', 'eSocial S-2240'],
    tags: ['ltcat', 'inss', 'previdenciario', 'laudo-tecnico'],
    content: [
      { type: 'p', text: 'O LTCAT (Laudo Técnico das Condições Ambientais de Trabalho) é um documento técnico que registra a exposição dos trabalhadores a agentes nocivos no ambiente de trabalho. Ele é a base para a comprovação do direito à aposentadoria especial junto ao INSS e para o preenchimento correto do Perfil Profissiográfico Previdenciário (PPP).' },

      { type: 'callout', variant: 'info', title: 'Importante', text: 'O LTCAT só pode ser emitido por engenheiro de segurança do trabalho ou médico do trabalho, conforme Lei 8.213/91. Laudos emitidos por outros profissionais não têm validade previdenciária.' },

      { type: 'h2', text: 'Para que serve o LTCAT?' },
      { type: 'p', text: 'O laudo identifica e quantifica a presença de agentes físicos (ruído, calor, vibração, radiações), químicos (poeiras, gases, vapores) e biológicos no ambiente. Com base nele, a empresa demonstra se a atividade gera ou não direito ao benefício previdenciário diferenciado.' },

      { type: 'h2', text: 'Quem é obrigado a ter?' },
      {
        type: 'ul', items: [
          'Empresas cujos colaboradores estejam expostos a agentes nocivos acima dos limites de tolerância;',
          'Organizações que precisam alimentar corretamente o eSocial (eventos S-2240);',
          'Negócios que buscam segurança jurídica em ações trabalhistas e previdenciárias.',
        ]
      },

      { type: 'h2', text: 'Como é feita a emissão?' },
      { type: 'p', text: 'O LTCAT deve ser elaborado por engenheiro de segurança do trabalho ou médico do trabalho, com medições técnicas no ambiente real. O documento precisa ser atualizado sempre que houver mudança no layout, nos processos ou na introdução de novos agentes de risco.' },

      { type: 'callout', variant: 'success', title: 'Solução AJN', text: 'A AJN realiza todas as medições, emite o laudo com responsabilidade técnica (ART) e orienta o lançamento dos dados no eSocial, garantindo conformidade total da sua empresa.' },

      { type: 'cta', text: 'Solicite seu LTCAT agora', href: '/contato?servico=ltcat' },
    ],
  },
  {
    id: 2,
    slug: 'pcmso-guia-completo',
    title: 'PCMSO: guia completo do Programa de Controle Médico de Saúde Ocupacional',
    metaTitle: 'PCMSO: Guia Completo, Exames e Integração com PGR | AJN Engenharia',
    metaDescription: 'Tudo sobre o PCMSO (NR-07): o que é, quais exames são obrigatórios, como se integra ao PGR e por que terceirizar a gestão da saúde ocupacional da sua empresa.',
    category: 'Saúde Ocupacional',
    author: 'equipe-ajn',
    date: '2025-01-14',
    updatedAt: '2025-02-10',
    readTime: '7 min',
    difficulty: 'básico',
    featured: true,
    image: {
      src: '/images/blog/pcmso-asos.jpg',
      alt: 'Médico do trabalho realizando exame ocupacional e emitindo ASO',
    },
    excerpt:
      'O PCMSO é obrigatório para praticamente todas as empresas com empregados. Saiba o que é, como se integra ao PGR e por que ele protege a saúde da sua equipe.',
    keywords: ['PCMSO', 'PCMSO BH', 'saúde ocupacional', 'ASO', 'NR-07', 'exames ocupacionais'],
    tags: ['pcmso', 'nr-07', 'aso', 'saude-ocupacional'],
    content: [
      { type: 'p', text: 'O PCMSO (Programa de Controle Médico de Saúde Ocupacional), previsto na NR-07, é o programa que organiza o acompanhamento da saúde dos trabalhadores ao longo do vínculo com a empresa. Ele define exames, prazos e ações de prevenção a partir dos riscos identificados.' },

      { type: 'h2', text: 'Integração com o PGR' },
      { type: 'p', text: 'O PCMSO não funciona isolado: ele deve estar alinhado ao PGR (Programa de Gerenciamento de Riscos). Os riscos mapeados no PGR determinam quais exames médicos cada função exige e com que periodicidade.' },

      { type: 'h2', text: 'O que o programa inclui?' },
      {
        type: 'ul', items: [
          'Exames admissionais, periódicos, de retorno ao trabalho, de mudança de função e demissionais;',
          'Emissão dos ASOs (Atestados de Saúde Ocupacional);',
          'Controle de vencimentos e cronograma de exames;',
          'Relatório analítico anual e indicadores de saúde.',
        ]
      },

      { type: 'callout', variant: 'warning', title: 'Atenção', text: 'Empresas que não mantêm o PCMSO atualizado estão sujeitas a multas de até 30 vezes o valor de referência, além de riscos em ações trabalhistas.' },

      { type: 'h2', text: 'Por que terceirizar a gestão?' },
      { type: 'p', text: 'Gerir prazos de exames, ASOs e afastamentos manualmente gera retrabalho e risco de autuação. A AJN assume essa gestão de ponta a ponta — do agendamento ao envio dos eventos no eSocial — com transparência total ao cliente.' },
    ],
  },
  {
    id: 3,
    slug: 'fim-do-ppra-e-chegada-do-pgr',
    title: 'O fim do PPRA e a chegada do PGR: o que mudou?',
    metaTitle: 'Fim do PPRA e Chegada do PGR: O Que Mudou na NR-01 | AJN',
    metaDescription: 'Entenda a transição do PPRA para o PGR após a atualização da NR-01. Diferenças práticas, prazos e o que sua empresa precisa fazer para se adequar.',
    category: 'Segurança do Trabalho',
    author: 'carlos-gandra',
    date: '2025-01-08',
    updatedAt: '2025-01-08',
    readTime: '5 min',
    difficulty: 'intermediário',
    featured: false,
    image: {
      src: '/images/blog/assessoria-consultoria-seguranca-do-trabalho.jpg',
      alt: 'Equipe técnica elaborando Plano de Gerenciamento de Riscos (PGR)',
    },
    excerpt:
      'Com a atualização da NR-01, o PPRA deu lugar ao PGR. Entenda as diferenças e o que sua empresa precisa fazer para se adequar.',
    keywords: ['PGR', 'PPRA', 'NR-01', 'gerenciamento de riscos', 'inventário de riscos'],
    tags: ['pgr', 'ppra', 'nr-01', 'gestao-de-riscos'],
    content: [
      { type: 'p', text: 'Desde a atualização da NR-01, o antigo PPRA (Programa de Prevenção de Riscos Ambientais) foi substituído pelo PGR (Programa de Gerenciamento de Riscos). A mudança vai além do nome: representa uma nova lógica de gestão de segurança.' },

      { type: 'h2', text: 'Qual a diferença prática?' },
      { type: 'p', text: 'O PPRA focava nos riscos ambientais (físicos, químicos e biológicos). O PGR amplia o escopo: passa a abranger todos os riscos ocupacionais, incluindo ergonômicos e de acidentes, com uma abordagem contínua de identificação, avaliação e controle.' },

      { type: 'h2', text: 'O que compõe o PGR?' },
      {
        type: 'ul', items: [
          'Inventário de Riscos — levantamento de todos os perigos por função;',
          'Plano de Ação — medidas para eliminar ou reduzir cada risco;',
          'Acompanhamento e revisão periódica das ações.',
        ]
      },

      { type: 'h2', text: 'Quem precisa elaborar?' },
      { type: 'p', text: 'Todas as organizações com empregados, exceto MEIs e empresas de grau de risco 1 e 2 com até 19 funcionários que atendam a critérios específicos. A AJN avalia seu caso e elabora o PGR completo, integrado ao PCMSO.' },

      { type: 'quote', text: 'O PGR não é um documento para guardar na gaveta — é um processo vivo de gestão contínua.', author: 'Carlos Gandra, Engenheiro de Segurança' },
    ],
  },
  {
    id: 4,
    slug: 'nr-35-trabalho-em-altura',
    title: 'NR-35: trabalho em altura e segurança — tudo o que você precisa saber',
    metaTitle: 'NR-35 Trabalho em Altura: Requisitos, Treinamento e EPIs | AJN',
    metaDescription: 'Guia completo da NR-35: requisitos para trabalho em altura, capacitação obrigatória, EPIs necessários e como a AJN treina sua equipe com certificação.',
    category: 'Segurança do Trabalho',
    author: 'equipe-ajn',
    date: '2024-12-18',
    updatedAt: '2025-01-05',
    readTime: '6 min',
    difficulty: 'básico',
    featured: false,
    image: {
      src: '/images/blog/treinamentos-nr.jpg',
      alt: 'Treinamento prático de NR-35 com trabalhador utilizando cinto de segurança tipo paraquedista',
    },
    excerpt:
      'Toda atividade acima de 2 metros exige capacitação e medidas de proteção. Conheça as exigências da NR-35 e como capacitar sua equipe.',
    keywords: ['NR-35', 'trabalho em altura', 'treinamento NR-35 BH', 'cinto paraquedista'],
    tags: ['nr-35', 'trabalho-em-altura', 'treinamento', 'epis'],
    content: [
      { type: 'p', text: 'A NR-35 estabelece os requisitos mínimos para o trabalho em altura, considerado toda atividade executada acima de 2 metros do nível inferior, onde haja risco de queda. É uma das normas mais críticas para a prevenção de acidentes graves e fatais.' },

      { type: 'h2', text: 'Principais exigências' },
      {
        type: 'ul', items: [
          'Capacitação dos trabalhadores com carga horária mínima e reciclagem periódica;',
          'Análise de Risco (AR) e Permissão de Trabalho (PT) para cada atividade;',
          'Uso de EPIs adequados — cinturão tipo paraquedista, talabarte, trava-quedas;',
          'Sistemas de ancoragem e proteção coletiva.',
        ]
      },

      { type: 'callout', variant: 'warning', title: 'Dado crítico', text: 'Quedas de altura são a principal causa de acidentes fatais no trabalho no Brasil, respondendo por mais de 40% das mortes em obras.' },

      { type: 'h2', text: 'Quem pode realizar trabalho em altura?' },
      { type: 'p', text: 'Apenas trabalhadores capacitados, com treinamento teórico e prático, e considerados aptos em avaliação de saúde compatível com a atividade. O treinamento deve ser ministrado por profissionais qualificados.' },

      { type: 'h2', text: 'Treinamentos AJN' },
      { type: 'p', text: 'A AJN oferece treinamento de NR-35 (inicial e reciclagem), presencial ou online, com emissão de certificado, preparando sua equipe para atuar com segurança e em conformidade legal.' },
    ],
  },
  {
    id: 5,
    slug: 'ppp-perfil-profissiografico-previdenciario',
    title: 'PPP: o que é o Perfil Profissiográfico Previdenciário e como funciona',
    metaTitle: 'PPP Eletrônico: O Que É, Como Emitir e Consultar | AJN Engenharia',
    metaDescription: 'Entenda o PPP (Perfil Profissiográfico Previdenciário): sua importância para aposentadoria especial, como é gerado eletronicamente via eSocial e o papel da empresa.',
    category: 'Saúde Ocupacional',
    author: 'equipe-ajn',
    date: '2024-12-10',
    updatedAt: '2024-12-10',
    readTime: '5 min',
    difficulty: 'intermediário',
    featured: false,
    image: {
      src: '/images/blog/gestao-esocial.jpg',
      alt: 'Dashboard de gestão de PPP eletrônico integrado ao eSocial',
    },
    excerpt:
      'O PPP reúne o histórico laboral do trabalhador e é essencial para a aposentadoria especial. Veja o que é, como consultar e sua importância.',
    keywords: ['PPP', 'perfil profissiográfico previdenciário', 'aposentadoria especial', 'PPP eletrônico'],
    tags: ['ppp', 'inss', 'previdenciario', 'esocial'],
    content: [
      { type: 'p', text: 'O PPP (Perfil Profissiográfico Previdenciário) é um documento histórico-laboral que reúne dados sobre as atividades do trabalhador, os agentes nocivos a que esteve exposto e as medidas de proteção adotadas pela empresa ao longo do contrato.' },

      { type: 'h2', text: 'Para que serve?' },
      { type: 'p', text: 'É a principal prova para a concessão da aposentadoria especial e de outros benefícios previdenciários. Com a digitalização via eSocial, o PPP passou a ser gerado eletronicamente a partir dos dados enviados pela empresa.' },

      { type: 'h2', text: 'Responsabilidade da empresa' },
      {
        type: 'ul', items: [
          'Manter os dados de exposição atualizados (com base no LTCAT);',
          'Emitir o PPP ao trabalhador no desligamento ou quando solicitado;',
          'Garantir a coerência entre PPP, LTCAT e eventos do eSocial.',
        ]
      },

      { type: 'callout', variant: 'success', title: 'Solução AJN', text: 'A AJN estrutura toda essa cadeia de documentos — LTCAT, PGR, PCMSO e eSocial — para que o PPP da sua empresa seja gerado de forma correta e segura.' },
    ],
  },
  {
    id: 6,
    slug: 'avcb-clcb-regularizacao-bombeiros',
    title: 'AVCB e CLCB: como regularizar seu imóvel junto ao Corpo de Bombeiros',
    metaTitle: 'AVCB e CLCB: Como Obter e Renovar em Minas Gerais | AJN',
    metaDescription: 'Diferença entre AVCB e CLCB, etapas da regularização junto ao Corpo de Bombeiros de MG, e como a AJN cuida de todo o processo do projeto à vistoria.',
    category: 'Combate a Incêndio',
    author: 'equipe-ajn',
    date: '2024-12-02',
    updatedAt: '2024-12-02',
    readTime: '6 min',
    difficulty: 'básico',
    featured: false,
    image: {
      src: '/images/blog/projetos-combate-incendio-ppci.jpg',
      alt: 'Projeto técnico de combate a incêndio com hidrantes e extintores',
    },
    excerpt:
      'Toda edificação precisa estar regular junto aos Bombeiros. Entenda a diferença entre AVCB e CLCB e como obter cada um em Minas Gerais.',
    keywords: ['AVCB', 'CLCB', 'PPCI', 'regularização bombeiros BH', 'CBMMG'],
    tags: ['avcb', 'clcb', 'bombeiros', 'ppci'],
    content: [
      { type: 'p', text: 'A regularização de uma edificação junto ao Corpo de Bombeiros é obrigatória e garante que o imóvel atende às medidas de prevenção e combate a incêndio. Os dois documentos mais comuns são o AVCB e o CLCB.' },

      { type: 'h2', text: 'Qual a diferença?' },
      {
        type: 'ul', items: [
          'CLCB (Certificado de Licença do Corpo de Bombeiros) — para edificações de menor risco, com processo simplificado;',
          'AVCB (Auto de Vistoria do Corpo de Bombeiros) — para edificações de maior porte ou risco, exigindo projeto técnico (PPCI) e vistoria.',
        ]
      },

      { type: 'h2', text: 'Etapas da regularização' },
      {
        type: 'ol', items: [
          'Elaboração do projeto de combate a incêndio conforme as Instruções Técnicas do CBMMG;',
          'Aprovação do projeto junto ao Corpo de Bombeiros;',
          'Instalação dos sistemas (hidrantes, extintores, sinalização, iluminação de emergência);',
          'Vistoria e emissão do AVCB/CLCB.',
        ]
      },

      { type: 'callout', variant: 'info', title: 'Validade', text: 'O AVCB tem validade variável (geralmente de 1 a 5 anos) dependendo do risco da edificação. A renovação deve ser solicitada antes do vencimento para evitar multas.' },

      { type: 'p', text: 'A AJN cuida de todo o processo — do projeto à emissão e renovação do AVCB/CLCB — deixando seu imóvel regular e seguro.' },
    ],
  },
  {
    id: 7,
    slug: 'esocial-sst-eventos-s2220-s2240',
    title: 'eSocial SST: o que são os eventos S-2220 e S-2240',
    metaTitle: 'eSocial SST: Eventos S-2220 e S-2240 — Guia Completo | AJN',
    metaDescription: 'Entenda os eventos de SST do eSocial: S-2220 (monitoramento da saúde) e S-2240 (condições ambientais), prazos, penalidades e como evitar erros no envio.',
    category: 'eSocial',
    author: 'carlos-gandra',
    date: '2024-11-25',
    updatedAt: '2025-01-20',
    readTime: '5 min',
    difficulty: 'avançado',
    featured: true,
    image: {
      src: '/images/blog/gestao-esocial.jpg',
      alt: 'Sistema de gestão de eventos SST do eSocial',
    },
    excerpt:
      'Os eventos de Saúde e Segurança do Trabalho no eSocial são obrigatórios. Entenda o S-2220 e o S-2240 e as penalidades por erro no envio.',
    keywords: ['eSocial', 'S-2220', 'S-2240', 'SST eSocial', 'eventos SST'],
    tags: ['esocial', 's-2220', 's-2240', 'sst'],
    content: [
      { type: 'p', text: 'Com a inclusão dos eventos de SST no eSocial, as empresas passaram a ser obrigadas a transmitir digitalmente informações sobre a saúde e a exposição dos trabalhadores. Dois eventos concentram essas obrigações: o S-2220 e o S-2240.' },

      { type: 'h2', text: 'S-2220 — Monitoramento da Saúde do Trabalhador' },
      { type: 'p', text: 'Registra os dados dos exames médicos ocupacionais (ASOs) realizados, vinculados ao PCMSO. Informa tipo de exame, data, resultado e o médico responsável.' },

      { type: 'h2', text: 'S-2240 — Condições Ambientais do Trabalho' },
      { type: 'p', text: 'Informa os agentes nocivos a que o trabalhador está exposto e as medidas de proteção, com base no LTCAT e no PGR. É a fonte dos dados do PPP eletrônico.' },

      { type: 'h2', text: 'Riscos de erro no envio' },
      {
        type: 'ul', items: [
          'Multas por omissão ou atraso na transmissão;',
          'Inconsistências que comprometem o PPP e benefícios dos trabalhadores;',
          'Passivos trabalhistas e previdenciários futuros.',
        ]
      },

      { type: 'callout', variant: 'warning', title: 'Prazo crítico', text: 'Os eventos de SST devem ser enviados até o dia 7 do mês seguinte ao fato gerador. Atrasos geram multa automática.' },

      { type: 'p', text: 'A AJN faz a gestão completa do eSocial SST — transcrição de dados, envio dos eventos e acompanhamento mensal — com total transparência.' },
    ],
  },
  {
    id: 8,
    slug: 'pericias-insalubridade-periculosidade',
    title: 'Perícias de insalubridade e periculosidade: quando sua empresa precisa',
    metaTitle: 'Perícia de Insalubridade e Periculosidade: NR-15 e NR-16 | AJN',
    metaDescription: 'Entenda as perícias de insalubridade (NR-15) e periculosidade (NR-16): quando são necessárias, como funcionam e como protegem sua empresa juridicamente.',
    category: 'Laudos Técnicos',
    author: 'equipe-ajn',
    date: '2024-11-15',
    updatedAt: '2024-11-15',
    readTime: '6 min',
    difficulty: 'intermediário',
    featured: false,
    image: {
      src: '/images/blog/pericias-insalubridade-periculosidade.jpg',
      alt: 'Engenheiro realizando perícia técnica de insalubridade em ambiente industrial',
    },
    excerpt:
      'Adicionais de insalubridade e periculosidade dependem de laudo técnico. Saiba como funcionam as perícias e como elas protegem sua empresa.',
    keywords: ['insalubridade', 'periculosidade', 'NR-15', 'NR-16', 'laudo pericial', 'adicional'],
    tags: ['insalubridade', 'periculosidade', 'nr-15', 'nr-16'],
    content: [
      { type: 'p', text: 'As perícias de insalubridade e periculosidade avaliam tecnicamente as condições de trabalho para determinar se o colaborador tem direito aos respectivos adicionais — e, principalmente, para orientar a empresa sobre como eliminar ou neutralizar os riscos.' },

      { type: 'h2', text: 'Insalubridade (NR-15)' },
      { type: 'p', text: 'Avalia a exposição a agentes nocivos à saúde — ruído, calor, agentes químicos, biológicos, entre outros — acima dos limites de tolerância. O adicional varia conforme o grau (10%, 20% ou 40%).' },

      { type: 'h2', text: 'Periculosidade (NR-16)' },
      { type: 'p', text: 'Avalia atividades com risco acentuado por exposição a inflamáveis, explosivos, energia elétrica ou outras situações de risco iminente. O adicional é de 30% sobre o salário base.' },

      { type: 'h2', text: 'Por que fazer a perícia?' },
      {
        type: 'ul', items: [
          'Define corretamente os adicionais devidos, evitando pagamentos indevidos;',
          'Orienta medidas de controle que podem neutralizar o agente e reduzir custos;',
          'Serve como defesa técnica em ações trabalhistas.',
        ]
      },

      { type: 'p', text: 'A AJN emite laudos periciais assinados por engenheiro habilitado, com ART, fundamentando juridicamente a situação da sua empresa.' },
    ],
  },
  {
    id: 9,
    slug: 'laudo-de-gerenciamento-de-riscos',
    title: 'Laudo de Gerenciamento de Riscos: por que ele é essencial',
    metaTitle: 'Laudo de Gerenciamento de Riscos (PGR): O Que É e Importância | AJN',
    metaDescription: 'O Laudo de Gerenciamento de Riscos é o coração do PGR. Entenda o que ele contém, por que é essencial e como a AJN elabora o seu de forma integrada.',
    category: 'Segurança do Trabalho',
    author: 'equipe-ajn',
    date: '2024-11-06',
    updatedAt: '2024-11-06',
    readTime: '5 min',
    difficulty: 'intermediário',
    featured: false,
    image: {
      src: '/images/blog/assessoria-consultoria-seguranca-do-trabalho.jpg',
      alt: 'Documento de inventário de riscos ocupacionais sendo elaborado',
    },
    excerpt:
      'O documento-base do PGR mapeia perigos e define ações de controle. Veja por que ele é o coração da gestão de segurança da sua empresa.',
    keywords: ['laudo de gerenciamento de riscos', 'PGR', 'inventário de riscos', 'plano de ação'],
    tags: ['pgr', 'inventario-de-riscos', 'gestao-de-riscos'],
    content: [
      { type: 'p', text: 'O Laudo de Gerenciamento de Riscos é o documento técnico que sustenta o PGR. Nele são identificados, avaliados e classificados todos os perigos presentes nas atividades da empresa, com as respectivas medidas de controle.' },

      { type: 'h2', text: 'O que ele contém?' },
      {
        type: 'ul', items: [
          'Inventário de riscos por função e setor;',
          'Avaliação da probabilidade e da severidade de cada perigo;',
          'Plano de ação com prazos e responsáveis;',
          'Hierarquia de medidas de controle (eliminação, substituição, EPC e EPI).',
        ]
      },

      { type: 'h2', text: 'Por que é tão importante?' },
      { type: 'p', text: 'É a partir dele que se define o PCMSO, os adicionais, os EPIs necessários e os treinamentos obrigatórios. Sem um bom levantamento de riscos, todas as outras ações de segurança ficam comprometidas.' },

      { type: 'p', text: 'A AJN elabora o laudo com visita técnica, mantém o documento atualizado e integra os dados ao eSocial.' },
    ],
  },
  {
    id: 10,
    slug: 'consultoria-pcmso-quando-contratar',
    title: 'Consultoria em PCMSO: quando e por que contratar',
    metaTitle: 'Consultoria em PCMSO: Quando Contratar e Benefícios | AJN',
    metaDescription: 'Sinais de que sua empresa precisa de uma consultoria especializada em PCMSO, benefícios de terceirizar a gestão e como a AJN pode ajudar.',
    category: 'Saúde Ocupacional',
    author: 'equipe-ajn',
    date: '2024-10-28',
    updatedAt: '2024-10-28',
    readTime: '5 min',
    difficulty: 'básico',
    featured: false,
    image: {
      src: '/images/blog/pcmso-asos.jpg',
      alt: 'Consultoria especializada em saúde ocupacional analisando ASOs',
    },
    excerpt:
      'Manter o PCMSO em dia exige tempo e conhecimento técnico. Entenda os benefícios de contar com uma consultoria especializada.',
    keywords: ['consultoria PCMSO', 'empresa de PCMSO BH', 'gestão saúde ocupacional', 'terceirização'],
    tags: ['pcmso', 'consultoria', 'terceirizacao'],
    content: [
      { type: 'p', text: 'Muitas empresas tratam o PCMSO como uma simples obrigação de papel — e descobrem o problema só quando recebem uma autuação ou enfrentam uma ação trabalhista. Uma consultoria especializada transforma o programa em uma ferramenta real de prevenção.' },

      { type: 'h2', text: 'Sinais de que você precisa de ajuda' },
      {
        type: 'ul', items: [
          'Exames e ASOs vencidos ou sem controle de prazos;',
          'PCMSO desatualizado em relação ao PGR;',
          'Dificuldade com os eventos de SST no eSocial;',
          'Falta de um responsável técnico acompanhando a saúde ocupacional.',
        ]
      },

      { type: 'h2', text: 'O que a consultoria entrega' },
      { type: 'p', text: 'Elaboração e atualização do programa, gestão completa de exames e ASOs, controle de afastamentos e retornos, e relatórios periódicos — tudo com transparência e respaldo técnico.' },

      { type: 'callout', variant: 'tip', title: 'Dica', text: 'Ao escolher uma consultoria, exija engenheiro ou médico do trabalho responsável técnico com registro no CREA ou CRM.' },

      { type: 'p', text: 'A AJN cuida de toda a saúde ocupacional da sua empresa para que você foque no seu negócio.' },
    ],
  },
  {
    id: 11,
    slug: 'principais-laudos-de-seguranca-do-trabalho',
    title: 'Os principais laudos de segurança do trabalho que sua empresa precisa',
    metaTitle: 'Principais Laudos de Segurança do Trabalho: Guia Completo | AJN',
    metaDescription: 'LTCAT, PGR, PCMSO, insalubridade e periculosidade: entenda cada laudo obrigatório de SST, para que serve e como eles se integram.',
    category: 'Laudos Técnicos',
    author: 'carlos-gandra',
    date: '2024-10-20',
    updatedAt: '2024-10-20',
    readTime: '6 min',
    difficulty: 'básico',
    featured: false,
    image: {
      src: '/images/blog/assessoria-consultoria-seguranca-do-trabalho.jpg',
      alt: 'Conjunto de laudos técnicos de segurança do trabalho',
    },
    excerpt:
      'LTCAT, PGR, PCMSO, laudos de insalubridade e periculosidade: entenda para que serve cada documento e por que eles se conectam.',
    keywords: ['laudos de segurança do trabalho', 'documentos obrigatórios SST', 'PGR PCMSO LTCAT'],
    tags: ['laudos', 'sst', 'documentacao'],
    content: [
      { type: 'p', text: 'A segurança do trabalho se apoia em um conjunto de documentos técnicos que se complementam. Conhecer cada um ajuda a manter sua empresa em conformidade e a evitar passivos.' },

      { type: 'h2', text: 'Os documentos essenciais' },
      {
        type: 'ul', items: [
          'PGR — gerencia todos os riscos e define o plano de ação;',
          'PCMSO — controla a saúde dos trabalhadores conforme os riscos;',
          'LTCAT — comprova exposição a agentes nocivos para fins previdenciários;',
          'Laudo de Insalubridade (NR-15) e Periculosidade (NR-16) — definem adicionais;',
          'PPP — histórico laboral individual do trabalhador.',
        ]
      },

      { type: 'h2', text: 'Como eles se conectam' },
      { type: 'p', text: 'O PGR identifica os riscos; o PCMSO define os exames; o LTCAT quantifica a exposição; os laudos periciais determinam adicionais; e o PPP consolida o histórico. Uma falha em um deles compromete os demais.' },

      { type: 'p', text: 'A AJN elabora e mantém todo esse ecossistema documental de forma integrada e coerente.' },
    ],
  },
  {
    id: 12,
    slug: 'quanto-custa-um-ltcat-orcamento',
    title: 'Quanto custa um LTCAT? Como montar um orçamento eficiente',
    metaTitle: 'Quanto Custa um LTCAT? Fatores e Como Evitar Surpresas | AJN',
    metaDescription: 'Entenda os fatores que influenciam o preço de um LTCAT, cuidados com laudos genéricos baratos demais e como solicitar um orçamento transparente.',
    category: 'Laudos Técnicos',
    author: 'equipe-ajn',
    date: '2024-10-12',
    updatedAt: '2024-10-12',
    readTime: '5 min',
    difficulty: 'básico',
    featured: false,
    image: {
      src: '/images/blog/pericias-insalubridade-periculosidade.jpg',
      alt: 'Profissional elaborando orçamento técnico de LTCAT',
    },
    excerpt:
      'O valor de um LTCAT varia conforme o porte e os riscos da empresa. Veja os fatores que influenciam o preço e como evitar surpresas.',
    keywords: ['orçamento LTCAT', 'preço LTCAT BH', 'quanto custa LTCAT', 'laudo técnico valor'],
    tags: ['ltcat', 'orcamento', 'custos'],
    content: [
      { type: 'p', text: 'Uma das dúvidas mais comuns das empresas é quanto custa emitir um LTCAT. Não existe um valor único: o preço depende de fatores técnicos que precisam ser avaliados caso a caso.' },

      { type: 'h2', text: 'O que influencia o valor' },
      {
        type: 'ul', items: [
          'Número de funções e ambientes a serem avaliados;',
          'Tipos de agentes de risco e medições necessárias (ruído, calor, químicos);',
          'Porte e número de unidades da empresa;',
          'Necessidade de atualização periódica do laudo.',
        ]
      },

      { type: 'h2', text: 'Cuidado com o "barato demais"' },
      { type: 'callout', variant: 'warning', title: 'Alerta', text: 'Laudos genéricos, sem visita técnica e sem medições reais, podem ser invalidados pelo INSS e gerar problemas previdenciários graves. Um LTCAT bem feito é um investimento em segurança jurídica.' },

      { type: 'p', text: 'Solicite um orçamento à AJN: avaliamos sua empresa e apresentamos uma proposta justa e transparente.' },
    ],
  },
  {
    id: 13,
    slug: 'pgr-e-pcmso-por-que-andam-juntos',
    title: 'PGR e PCMSO: por que andam juntos e como elaborar',
    metaTitle: 'PGR e PCMSO: Por Que Andam Juntos e Como Elaborar | AJN',
    metaDescription: 'Entenda por que PGR e PCMSO devem ser elaborados de forma integrada, os benefícios dessa abordagem e como a AJN entrega conformidade total.',
    category: 'Saúde Ocupacional',
    author: 'carlos-gandra',
    date: '2024-10-04',
    updatedAt: '2024-10-04',
    readTime: '5 min',
    difficulty: 'intermediário',
    featured: false,
    image: {
      src: '/images/blog/pcmso-asos.jpg',
      alt: 'Integração entre PGR e PCMSO em sistema de gestão',
    },
    excerpt:
      'O PGR e o PCMSO são complementares e obrigatórios. Entenda como elaborá-los de forma integrada para garantir conformidade.',
    keywords: ['PGR e PCMSO', 'elaboração PGR PCMSO', 'conformidade NR', 'SST integrada'],
    tags: ['pgr', 'pcmso', 'integracao'],
    content: [
      { type: 'p', text: 'O PGR e o PCMSO são dois pilares da segurança e saúde no trabalho — e funcionam melhor quando elaborados juntos, de forma integrada.' },

      { type: 'h2', text: 'A lógica da integração' },
      { type: 'p', text: 'O PGR mapeia os riscos; o PCMSO usa esse mapa para definir quais exames cada trabalhador precisa fazer e com qual frequência. Elaborá-los separadamente, por prestadores diferentes, costuma gerar inconsistências.' },

      { type: 'h2', text: 'Benefícios de fazer junto' },
      {
        type: 'ul', items: [
          'Coerência total entre riscos identificados e exames exigidos;',
          'Menos retrabalho e custos otimizados;',
          'Dados consistentes para o eSocial e o PPP;',
          'Um único responsável técnico acompanhando tudo.',
        ]
      },

      { type: 'p', text: 'A AJN elabora PGR e PCMSO de forma integrada, com acompanhamento contínuo e atualização sempre que necessário.' },
    ],
  },
  {
    id: 14,
    slug: 'por-que-investir-em-seguranca-do-trabalho',
    title: 'Por que investir em Segurança do Trabalho? Benefícios para a empresa',
    metaTitle: 'Por Que Investir em Segurança do Trabalho: ROI e Benefícios | AJN',
    metaDescription: 'Descubra por que segurança do trabalho é investimento, não custo: benefícios diretos, redução de acidentes, economia e ganhos de produtividade.',
    category: 'Segurança do Trabalho',
    author: 'equipe-ajn',
    date: '2024-09-26',
    updatedAt: '2024-09-26',
    readTime: '5 min',
    difficulty: 'básico',
    featured: false,
    image: {
      src: '/images/blog/treinamentos-nr.jpg',
      alt: 'Equipe treinada em segurança do trabalho atuando em obra',
    },
    excerpt:
      'Segurança do trabalho não é custo, é investimento. Veja como ela reduz acidentes, processos e custos — e melhora a produtividade.',
    keywords: ['segurança do trabalho', 'benefícios SST', 'prevenção de acidentes', 'ROI SST'],
    tags: ['sst', 'investimento', 'cultura-de-seguranca'],
    content: [
      { type: 'p', text: 'Ainda há quem veja a segurança do trabalho apenas como uma exigência legal e um custo. Na prática, ela é um dos investimentos com melhor retorno para qualquer empresa.' },

      { type: 'h2', text: 'Benefícios diretos' },
      {
        type: 'ul', items: [
          'Redução de acidentes e afastamentos;',
          'Menos ações trabalhistas e passivos previdenciários;',
          'Diminuição do absenteísmo e do turnover;',
          'Aumento da produtividade e do engajamento da equipe.',
        ]
      },

      { type: 'h2', text: 'O custo de não investir' },
      { type: 'p', text: 'Um único acidente grave pode custar muito mais do que anos de prevenção: multas, indenizações, paralisação, danos à imagem e perda de talentos. A conta da negligência sempre chega.' },

      { type: 'quote', text: 'Segurança não é despesa, é o alicerce de uma empresa sustentável.', author: 'Equipe AJN' },

      { type: 'p', text: 'A AJN ajuda sua empresa a construir uma cultura de segurança sólida, com programas, treinamentos e acompanhamento técnico especializado.' },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════
// HELPERS / API DO BLOG
// ═══════════════════════════════════════════════════════════════════

/**
 * Busca post por slug
 * @param {string} slug 
 * @returns {Object|undefined}
 */
export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug)

/**
 * Lista posts por categoria
 * @param {string} category - Nome da categoria ou 'Todos'
 * @param {Object} options
 * @param {number} options.limit - Máximo de posts
 * @param {string} options.excludeSlug - Slug a excluir (ex: post atual)
 * @returns {Array}
 */
export const getPostsByCategory = (category, { limit, excludeSlug } = {}) => {
  let filtered = category === 'Todos' || !category
    ? posts
    : posts.filter((p) => p.category === category)

  if (excludeSlug) {
    filtered = filtered.filter((p) => p.slug !== excludeSlug)
  }

  // Ordena por data (mais recente primeiro)
  filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))

  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Retorna posts em destaque (featured: true)
 * @param {number} limit 
 * @returns {Array}
 */
export const getFeaturedPosts = (limit = 3) =>
  posts
    .filter((p) => p.featured)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)

/**
 * Posts relacionados baseado em tags e categoria
 * @param {Object} currentPost - Post atual
 * @param {number} limit - Quantidade de posts relacionados
 * @returns {Array}
 */
export const getRelatedPosts = (currentPost, limit = 3) => {
  if (!currentPost) return []

  return posts
    .filter((p) => p.slug !== currentPost.slug)
    .map((p) => {
      // Calcula score de relevância
      let score = 0
      if (p.category === currentPost.category) score += 10
      if (p.author === currentPost.author) score += 3
      if (p.featured) score += 2

      // Tags em comum
      const commonTags = p.tags.filter((t) => currentPost.tags?.includes(t))
      score += commonTags.length * 5

      return { ...p, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Busca textual com scoring (busca em título, excerpt, tags e keywords)
 * @param {string} query 
 * @param {number} limit 
 * @returns {Array}
 */
export const searchPosts = (query, limit = 10) => {
  if (!query || query.trim().length < 2) return []

  const terms = query.toLowerCase().trim().split(/\s+/)

  return posts
    .map((post) => {
      let score = 0
      const searchableText = [
        post.title,
        post.excerpt,
        ...(post.keywords || []),
        ...(post.tags || []),
        post.category,
      ].join(' ').toLowerCase()

      terms.forEach((term) => {
        if (post.title.toLowerCase().includes(term)) score += 10
        if (post.excerpt.toLowerCase().includes(term)) score += 5
        if (post.keywords?.some((k) => k.toLowerCase().includes(term))) score += 3
        if (searchableText.includes(term)) score += 1
      })

      return { ...post, score }
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Gera dados para Breadcrumb (Schema.org + UI)
 * @param {Object} post 
 * @returns {Array}
 */
export const getPostBreadcrumb = (post) => {
  if (!post) return []

  const style = categoryStyle[post.category]

  return [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.category, url: `/blog/categoria/${style?.slug || ''}` },
    { name: post.title, url: `/blog/${post.slug}` },
  ]
}

/**
 * Calcula estatísticas do blog
 * @returns {Object}
 */
export const getBlogStats = () => {
  const categoryCount = {}
  blogCategories.slice(1).forEach((cat) => {
    categoryCount[cat] = posts.filter((p) => p.category === cat).length
  })

  return {
    total: posts.length,
    featured: posts.filter((p) => p.featured).length,
    categories: categoryCount,
    lastUpdated: Math.max(...posts.map((p) => new Date(p.updatedAt || p.date).getTime())),
  }
}

/**
 * Gera Schema.org BlogPosting para SEO
 * @param {Object} post 
 * @param {string} siteUrl 
 * @returns {Object}
 */
export const generatePostSchema = (post, siteUrl = 'https://ajnengenharia.com.br') => {
  if (!post) return null

  const author = authors[post.author]

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}${post.image.src}`,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      '@type': 'Person',
      name: author?.name || 'Equipe AJN',
      url: `${siteUrl}/sobre`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AJN Consultoria e Engenharia',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.keywords?.join(', '),
  }
}