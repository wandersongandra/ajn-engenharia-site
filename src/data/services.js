/**
 * Serviços — AJN Engenharia
 * 
 * Catálogo completo de serviços técnicos oferecidos pela AJN.
 * Inclui metadata SEO, Schema.org, FAQs específicas e helpers.
 * 
 * @module data/services
 */

import {
  FaHardHat, FaFileAlt, FaUserMd, FaSearch, FaFire,
  FaClipboardCheck, FaBolt, FaChalkboardTeacher, FaTools,
  FaShieldAlt, FaChartLine, FaCertificate, FaIndustry,
  FaBuilding, FaHospital, FaSchool, FaWarehouse, FaHome,
  FaCheckCircle, FaExclamationTriangle, FaClock, FaAward,
} from 'react-icons/fa'

// ═══════════════════════════════════════════════════════════════════
// MAPEAMENTO DE ÍCONES E CORES
// ═══════════════════════════════════════════════════════════════════

export const iconMap = {
  FaHardHat, FaFileAlt, FaUserMd, FaSearch, FaFire,
  FaClipboardCheck, FaBolt, FaChalkboardTeacher, FaTools,
  FaShieldAlt, FaChartLine, FaCertificate, FaIndustry,
  FaBuilding, FaHospital, FaSchool, FaWarehouse, FaHome,
  FaCheckCircle, FaExclamationTriangle, FaClock, FaAward,
}

export const colorMap = {
  blue: { bar: 'bg-blue-500', icon: 'bg-blue-50 text-blue-600', link: 'text-blue-600', accent: '#3b82f6', bg: '#eff6ff' },
  green: { bar: 'bg-[#4a9e10]', icon: 'bg-[#e8f5d8] text-[#4a9e10]', link: 'text-[#4a9e10]', accent: '#4a9e10', bg: '#f0f9e8' },
  indigo: { bar: 'bg-indigo-500', icon: 'bg-indigo-50 text-indigo-600', link: 'text-indigo-600', accent: '#6366f1', bg: '#eef2ff' },
  purple: { bar: 'bg-purple-500', icon: 'bg-purple-50 text-purple-600', link: 'text-purple-600', accent: '#9333ea', bg: '#faf5ff' },
  teal: { bar: 'bg-teal-500', icon: 'bg-teal-50 text-teal-600', link: 'text-teal-600', accent: '#14b8a6', bg: '#f0fdfa' },
  orange: { bar: 'bg-orange-500', icon: 'bg-orange-50 text-orange-600', link: 'text-orange-600', accent: '#f97316', bg: '#fff7ed' },
  red: { bar: 'bg-red-500', icon: 'bg-red-50 text-red-600', link: 'text-red-600', accent: '#ef4444', bg: '#fef2f2' },
  yellow: { bar: 'bg-yellow-500', icon: 'bg-yellow-50 text-yellow-600', link: 'text-yellow-600', accent: '#eab308', bg: '#fefce8' },
  gray: { bar: 'bg-gray-400', icon: 'bg-gray-50 text-gray-600', link: 'text-gray-600', accent: '#6b7280', bg: '#f9fafb' },
}

// ═══════════════════════════════════════════════════════════════════
// SEGMENTOS DE MERCADO (para filtros e SEO)
// ═══════════════════════════════════════════════════════════════════

export const marketSegments = [
  { id: 'industria', label: 'Indústria', icon: 'FaIndustry' },
  { id: 'construcao', label: 'Construção Civil', icon: 'FaHardHat' },
  { id: 'comercio', label: 'Comércio', icon: 'FaBuilding' },
  { id: 'saude', label: 'Saúde', icon: 'FaHospital' },
  { id: 'educacao', label: 'Educação', icon: 'FaSchool' },
  { id: 'logistica', label: 'Logística', icon: 'FaWarehouse' },
  { id: 'residencial', label: 'Residencial', icon: 'FaHome' },
  { id: 'servicos', label: 'Serviços', icon: 'FaBuilding' },
]

// ═══════════════════════════════════════════════════════════════════
// SERVIÇOS
// ═══════════════════════════════════════════════════════════════════

export const services = [
  {
    id: 'assessoria-seguranca',
    slug: 'assessoria-consultoria-seguranca-do-trabalho',
    title: 'Assessoria e Consultoria em Segurança do Trabalho',
    shortTitle: 'Segurança do Trabalho',
    metaTitle: 'Assessoria em Segurança do Trabalho em BH | Consultoria NR | AJN',
    metaDescription: 'Consultoria especializada em segurança do trabalho em Belo Horizonte. PGR, PCMSO, LTCAT, laudos técnicos e fornecimento de engenheiros e técnicos de segurança.',
    icon: 'FaHardHat',
    color: 'blue',
    featured: true,
    summary: 'Suporte técnico e estratégico para identificar, avaliar e controlar riscos ocupacionais com conformidade às NRs.',
    description: `Oferecemos suporte técnico e estratégico completo para identificar, avaliar e controlar riscos ocupacionais em sua empresa. Nossa atuação inclui elaboração de programas de prevenção, laudos técnicos, treinamentos específicos e implementação de medidas corretivas conforme as Normas Regulamentadoras (NRs).

Também fornecemos mão de obra técnica especializada: Técnicos de Segurança do Trabalho, Engenheiros de Segurança e especialistas para atuação in loco, garantindo que sua empresa esteja sempre em conformidade legal e protegida contra autuações e passivos trabalhistas.`,

    // Benefícios para o cliente (usados em cards e páginas de vendas)
    benefits: [
      { icon: 'FaShieldAlt', title: 'Proteção Legal', description: 'Evite multas e autuações do Ministério do Trabalho' },
      { icon: 'FaChartLine', title: 'Redução de Custos', description: 'Diminua afastamentos e ações trabalhistas' },
      { icon: 'FaAward', title: 'Conformidade Total', description: 'Esteja sempre em dia com as NRs vigentes' },
    ],

    // Normas técnicas relacionadas (SEO + autoridade E-E-A-T)
    relatedNorms: ['NR-01', 'NR-04', 'NR-05', 'NR-06', 'NR-07', 'NR-09', 'NR-15', 'NR-16'],

    // Segmentos atendidos
    segments: ['industria', 'construcao', 'comercio', 'servicos', 'logistica'],

    keywords: [
      'assessoria segurança do trabalho BH',
      'consultoria NR Belo Horizonte',
      'engenheiro de segurança BH',
      'técnico segurança trabalho BH',
      'SESMT terceirizado',
    ],

    items: [
      'Elaboração de programas de prevenção (PGR, PCMSO, LTCAT)',
      'Laudos técnicos e análises de risco ocupacional',
      'Treinamentos específicos por Norma Regulamentadora',
      'Implementação de medidas corretivas e preventivas',
      'Fornecimento de técnicos e engenheiros de segurança',
      'Acompanhamento técnico in loco (diário, semanal ou mensal)',
      'Gestão do SESMT (Serviço Especializado em Segurança)',
      'CIPA — orientação e acompanhamento',
      'Investigação e análise de acidentes de trabalho',
      'Auditorias internas de conformidade',
    ],

    // Entregáveis tangíveis (usados em propostas comerciais)
    deliverables: [
      'Documento-base do PGR com inventário de riscos',
      'Plano de ação com cronograma de implementação',
      'Laudos técnicos com ART (Anotação de Responsabilidade Técnica)',
      'Relatórios mensais de indicadores de SST',
      'Certificados de treinamentos realizados',
    ],

    // FAQs específicas deste serviço (aparecem na página do serviço)
    faq: [
      {
        q: 'Minha empresa é obrigada a ter um engenheiro de segurança?',
        a: 'Depende do grau de risco e do número de empregados. Empresas com grau de risco 3 ou 4 e mais de 100 empregados devem constituir SESMT próprio ou terceirizado. A AJN avalia seu caso e oferece a solução mais adequada.',
      },
      {
        q: 'Qual a diferença entre assessoria e consultoria?',
        a: 'A consultoria é pontual (elaboração de documentos específicos). A assessoria é contínua, com acompanhamento mensal, gestão de prazos e suporte técnico permanente. Recomendamos assessoria para empresas que buscam tranquilidade total.',
      },
      {
        q: 'Vocês atendem empresas de pequeno porte?',
        a: 'Sim! Temos planos específicos para micro e pequenas empresas, com custos acessíveis e toda a conformidade necessária. O investimento em SST se paga com a redução de riscos trabalhistas.',
      },
    ],
  },

  {
    id: 'esocial',
    slug: 'gestao-esocial',
    title: 'Gestão do eSocial SST',
    shortTitle: 'eSocial SST',
    metaTitle: 'Gestão eSocial SST em BH | S-2220 e S-2240 | AJN Engenharia',
    metaDescription: 'Gestão completa dos eventos de SST do eSocial (S-2220 e S-2240). Envio correto, no prazo e com total transparência. Evite multas e inconsistências.',
    icon: 'FaFileAlt',
    color: 'purple',
    featured: true,
    summary: 'Envio de eventos S-2220 e S-2240, transcrição de dados e acompanhamento com total transparência.',
    description: `Gerenciamos integralmente os eventos de saúde e segurança no eSocial, garantindo o envio correto e no prazo dos dados obrigatórios. Nossa gestão inclui transcrição de dados históricos, correção de inconsistências e acompanhamento mensal com relatórios transparentes ao cliente.

Evite multas que podem ultrapassar R$ 5.000 por trabalhador e garanta que o PPP eletrônico dos seus colaboradores seja gerado corretamente.`,

    benefits: [
      { icon: 'FaShieldAlt', title: 'Zero Multas', description: 'Envio correto e no prazo, evitando autuações' },
      { icon: 'FaChartLine', title: 'Transparência Total', description: 'Relatórios mensais de tudo que foi enviado' },
      { icon: 'FaCheckCircle', title: 'PPP Correto', description: 'Dados coerentes para aposentadoria especial' },
    ],

    relatedNorms: ['NR-01', 'NR-07', 'NR-09', 'NR-15', 'NR-16'],
    segments: ['industria', 'construcao', 'comercio', 'servicos', 'logistica', 'saude'],

    keywords: [
      'gestão eSocial BH',
      'S-2220 S-2240 Belo Horizonte',
      'eSocial segurança do trabalho',
      'envio eSocial SST',
      'PPP eletrônico',
    ],

    items: [
      'Envio dos eventos S-2220 (Monitoramento da Saúde Ocupacional)',
      'Envio dos eventos S-2240 (Condições Ambientais do Trabalho)',
      'Transcrição e importação de dados históricos',
      'Acompanhamento mensal com relatório detalhado ao cliente',
      'Correção de inconsistências e retificações no eSocial',
      'Suporte especializado em dúvidas e auditorias fiscais',
      'Integração com sistemas de folha de pagamento',
      'Gestão de prazos e alertas de vencimentos',
      'Backup e arquivamento de todos os envios',
      'Consultoria para adequação de processos internos',
    ],

    deliverables: [
      'Relatório mensal de eventos enviados',
      'Comprovantes de transmissão do eSocial',
      'Dashboard de indicadores de SST',
      'Alertas de prazos e pendências',
      'Suporte técnico ilimitado por email e WhatsApp',
    ],

    faq: [
      {
        q: 'Quais eventos de SST são obrigatórios no eSocial?',
        a: 'Os principais são o S-2220 (Monitoramento da Saúde do Trabalhador, com dados dos ASOs) e o S-2240 (Condições Ambientais do Trabalho, com dados do LTCAT e PGR). Ambos devem ser enviados até o dia 7 do mês seguinte ao fato gerador.',
      },
      {
        q: 'Qual o valor da multa por erro no eSocial SST?',
        a: 'As multas variam de R$ 402,54 a R$ 4.025,33 por trabalhador, dependendo da infração. Erros no S-2240 podem comprometer o PPP eletrônico e o direito à aposentadoria especial dos colaboradores, gerando passivos ainda maiores.',
      },
      {
        q: 'Minha contabilidade já envia o eSocial. Por que contratar vocês?',
        a: 'Muitas contabilidades não possuem expertise técnica em SST. Nós garantimos que os dados enviados estejam tecnicamente corretos, baseados em laudos atualizados e em conformidade com as NRs. Trabalhamos em parceria com sua contabilidade.',
      },
    ],
  },

  {
    id: 'pcmso',
    slug: 'pcmso-asos',
    title: 'PCMSO e Gestão de ASOs',
    shortTitle: 'PCMSO e ASOs',
    metaTitle: 'PCMSO e ASOs em BH | Saúde Ocupacional | AJN Engenharia',
    metaDescription: 'Gestão completa do PCMSO em Belo Horizonte. Controle de exames, ASOs, afastamentos e integração com PGR e eSocial. Saúde ocupacional sem dor de cabeça.',
    icon: 'FaUserMd',
    color: 'teal',
    featured: true,
    summary: 'Programa de Controle Médico de Saúde Ocupacional completo, com gerenciamento de ASOs e afastamentos.',
    description: `Gerenciamos o PCMSO da sua empresa de forma integrada ao PGR, controlando prazos de exames, ASOs e toda a saúde ocupacional dos seus colaboradores com máxima eficiência.

Nosso serviço inclui agendamento de exames, emissão de ASOs, controle de vencimentos, gestão de afastamentos e retornos ao trabalho, além de relatórios analíticos para o médico coordenador. Tudo com transparência e conformidade à NR-07.`,

    benefits: [
      { icon: 'FaClock', title: 'Zero Atrasos', description: 'Controle rigoroso de prazos e vencimentos' },
      { icon: 'FaChartLine', title: 'Indicadores de Saúde', description: 'Relatórios analíticos da saúde da equipe' },
      { icon: 'FaCheckCircle', title: 'NR-07 em Dia', description: 'Conformidade total com a norma' },
    ],

    relatedNorms: ['NR-07', 'NR-01', 'NR-09', 'NR-15', 'NR-16'],
    segments: ['industria', 'construcao', 'comercio', 'servicos', 'logistica', 'saude', 'educacao'],

    keywords: [
      'PCMSO BH',
      'PCMSO preço Belo Horizonte',
      'ASO Belo Horizonte',
      'saúde ocupacional BH',
      'exame admissional BH',
      'exame demissional BH',
    ],

    items: [
      'Elaboração e atualização do PCMSO conforme PGR',
      'Gerenciamento de cronograma e vencimentos de exames',
      'Agendamento e envio de funcionários para ASO',
      'Emissão de ASOs (admissional, periódico, retorno, mudança, demissional)',
      'Monitoramento da saúde ocupacional da equipe',
      'Gestão de afastamentos e retornos ao trabalho',
      'Relatórios periódicos ao médico coordenador',
      'Controle de exames complementares (audiometria, espirometria, etc.)',
      'Acompanhamento de trabalhadores com restrições',
      'Integração com eSocial (evento S-2220)',
    ],

    deliverables: [
      'Documento-base do PCMSO atualizado',
      'Cronograma anual de exames',
      'ASOs digitais e arquivados',
      'Relatório analítico anual de saúde',
      'Indicadores de absenteísmo e afastamentos',
    ],

    faq: [
      {
        q: 'Quais exames são obrigatórios no PCMSO?',
        a: 'Depende dos riscos identificados no PGR. O exame clínico é obrigatório para todos. Exames complementares (audiometria, espirometria, raio-X, sangue) são definidos conforme a exposição a agentes específicos. A AJN elabora o PCMSO com base nos riscos reais da sua empresa.',
      },
      {
        q: 'Qual a periodicidade dos exames?',
        a: 'Admissional (antes de iniciar), periódico (anual para maiores de 18 e menores de 45 anos; bienal para maiores de 45), retorno ao trabalho (após afastamento ≥ 30 dias), mudança de função (quando há novos riscos) e demissional (até 10 dias após o desligamento).',
      },
      {
        q: 'Vocês realizam os exames ou só gerenciam?',
        a: 'Gerenciamos todo o processo e temos parcerias com clínicas credenciadas em toda BH e região metropolitana. Podemos levar a equipe médica até sua empresa para exames em grupo, otimizando tempo e custos.',
      },
    ],
  },

  {
    id: 'pericias',
    slug: 'pericias-insalubridade-periculosidade',
    title: 'Perícias de Insalubridade e Periculosidade',
    shortTitle: 'Perícias Técnicas',
    metaTitle: 'Perícia de Insalubridade e Periculosidade em BH | Laudos NR-15 e NR-16',
    metaDescription: 'Laudos técnicos de insalubridade (NR-15) e periculosidade (NR-16) com ART. Defenda sua empresa em ações trabalhistas com perícia técnica de excelência.',
    icon: 'FaSearch',
    color: 'orange',
    featured: false,
    summary: 'Laudos técnicos de insalubridade e periculosidade com emissão de ART por engenheiro habilitado.',
    description: `Realizamos perícias técnicas para identificar e classificar agentes nocivos e riscos iminentes no ambiente de trabalho, emitindo laudos técnicos fundamentados conforme a legislação trabalhista vigente.

Nossos laudos são assinados por engenheiros de segurança habilitados, com emissão de ART (Anotação de Responsabilidade Técnica), servindo como defesa técnica robusta em processos trabalhistas e orientando medidas de controle que podem neutralizar ou eliminar adicionais.`,

    benefits: [
      { icon: 'FaShieldAlt', title: 'Defesa Técnica', description: 'Laudos robustos para ações trabalhistas' },
      { icon: 'FaChartLine', title: 'Redução de Custos', description: 'Neutralize adicionais com medidas de controle' },
      { icon: 'FaCertificate', title: 'ART Incluída', description: 'Responsabilidade técnica garantida' },
    ],

    relatedNorms: ['NR-15', 'NR-16', 'NR-09'],
    segments: ['industria', 'construcao', 'logistica'],

    keywords: [
      'laudo insalubridade BH',
      'laudo periculosidade Belo Horizonte',
      'NR-15 NR-16 BH',
      'perícia trabalhista',
      'adicional insalubridade',
      'adicional periculosidade',
    ],

    items: [
      'Perícia de Insalubridade (NR-15 — agentes nocivos à saúde)',
      'Perícia de Periculosidade (NR-16 — riscos iminentes)',
      'Medições técnicas com equipamentos calibrados',
      'Emissão de laudos técnicos assinados por engenheiro',
      'Emissão de ART (Anotação de Responsabilidade Técnica)',
      'Defesa técnica em processos trabalhistas',
      'Orientação de medidas de controle para neutralizar adicionais',
      'LTCAT (Laudo Técnico das Condições Ambientais)',
      'Parecer técnico para assistentes judiciais',
      'Acompanhamento de perícias judiciais',
    ],

    deliverables: [
      'Laudo técnico detalhado com fundamentação legal',
      'ART registrada no CREA-MG',
      'Relatório fotográfico do ambiente',
      'Certificados de calibração dos equipamentos',
      'Plano de ação para neutralização de agentes (quando aplicável)',
    ],

    faq: [
      {
        q: 'Qual a diferença entre insalubridade e periculosidade?',
        a: 'Insalubridade (NR-15) avalia exposição a agentes nocivos à saúde (ruído, calor, químicos, biológicos) acima dos limites de tolerância, gerando adicional de 10%, 20% ou 40%. Periculosidade (NR-16) avalia risco acentuado (inflamáveis, explosivos, energia elétrica, violência), gerando adicional de 30%. Um trabalhador não pode receber ambos simultaneamente.',
      },
      {
        q: 'O laudo técnico pode eliminar o pagamento de adicionais?',
        a: 'Sim! Se o laudo identificar que as medidas de controle (EPC ou EPI) neutralizam o agente, o adicional pode ser eliminado. Muitas empresas pagam adicionais indevidamente por falta de laudo atualizado. Nossa perícia pode gerar economia significativa.',
      },
      {
        q: 'Vocês atuam como assistente técnico em processos?',
        a: 'Sim. Atuamos como assistente técnico da empresa em perícias judiciais, elaborando quesitos, acompanhando a perícia oficial e apresentando parecer técnico divergente quando necessário. Isso aumenta significativamente as chances de êxito na ação.',
      },
    ],
  },

  {
    id: 'combate-incendio',
    slug: 'projetos-combate-incendio-ppci',
    title: 'Projetos de Combate a Incêndio (PPCI)',
    shortTitle: 'Combate a Incêndio',
    metaTitle: 'Projeto de Combate a Incêndio PPCI em BH | AVCB e CLCB | AJN',
    metaDescription: 'Elaboração de projetos PPCI, regularização e renovação de AVCB/CLCB junto ao Corpo de Bombeiros de MG. Projetos aprovados com garantia técnica.',
    icon: 'FaFire',
    color: 'red',
    featured: true,
    summary: 'Elaboração de PPCI, regularização e renovação de AVCB/CLCB junto ao Corpo de Bombeiros de MG.',
    description: `Elaboramos projetos de prevenção e proteção contra incêndio (PPCI) conforme as Instruções Técnicas do Corpo de Bombeiros Militar de Minas Gerais (CBMMG), garantindo a regularização completa do seu imóvel.

Nosso serviço inclui desde o levantamento inicial e elaboração do projeto até o acompanhamento da aprovação, instalação dos sistemas e obtenção do AVCB ou CLCB. Atuamos em edificações comerciais, industriais, residenciais e de uso público.`,

    benefits: [
      { icon: 'FaShieldAlt', title: 'Imóvel Regular', description: 'AVCB/CLCB em mãos, sem risco de interdição' },
      { icon: 'FaCheckCircle', title: 'Projeto Aprovado', description: 'Garantia de aprovação junto ao CBMMG' },
      { icon: 'FaClock', title: 'Prazo Garantido', description: 'Cumprimento rigoroso dos prazos' },
    ],

    relatedNorms: ['IT-01 a IT-42 do CBMMG', 'NR-23', 'NBR 14276'],
    segments: ['industria', 'construcao', 'comercio', 'servicos', 'residencial'],

    keywords: [
      'PPCI BH',
      'combate a incêndio Belo Horizonte',
      'AVCB CLCB BH',
      'projeto incêndio BH',
      'bombeiros MG',
      'regularização bombeiros',
    ],

    items: [
      'Elaboração de projetos PPCIP conforme ITs do CBMMG',
      'Regularização de imóveis junto ao Corpo de Bombeiros',
      'Emissão e renovação de AVCB (Auto de Vistoria)',
      'Emissão e renovação de CLCB (Certificado de Licença)',
      'Dimensionamento de sistemas de sprinklers e hidrantes',
      'Dimensionamento e instalação de extintores',
      'Sinalização de emergência e rotas de fuga',
      'Iluminação de emergência e detecção de fumaça',
      'Acompanhamento da aprovação junto ao CBMMG',
      'Treinamento de brigada de incêndio',
    ],

    deliverables: [
      'Projeto técnico completo com memorial de cálculo',
      'ART do projeto registrada no CREA-MG',
      'Pranchas e plantas em formato digital e impresso',
      'Acompanhamento da tramitação no sistema InfoSeg',
      'AVCB ou CLCB emitido',
    ],

    faq: [
      {
        q: 'Qual a diferença entre AVCB e CLCB?',
        a: 'O CLCB (Certificado de Licença do Corpo de Bombeiros) é para edificações de menor risco (até 750m², baixo risco), com processo simplificado via sistema online. O AVCB (Auto de Vistoria) é para edificações maiores ou de maior risco, exigindo projeto técnico assinado por engenheiro e vistoria presencial. A AJN avalia seu caso e indica o caminho mais adequado.',
      },
      {
        q: 'Qual a validade do AVCB/CLCB?',
        a: 'A validade varia de 1 a 5 anos, dependendo do risco da edificação e da carga de incêndio. Edificações de alto risco têm validade menor. A renovação deve ser solicitada com antecedência para evitar multas e interdições.',
      },
      {
        q: 'Meu imóvel já está construído. Ainda posso regularizar?',
        a: 'Sim! A maioria dos imóveis que atendemos já estão construídos. Elaboramos o projeto de regularização, indicamos as adequações necessárias (extintores, sinalização, etc.) e acompanhamos todo o processo até a obtenção do AVCB/CLCB.',
      },
    ],
  },

  {
    id: 'regularizacao-imoveis',
    slug: 'regularizacao-imoveis-bombeiros',
    title: 'Regularização de Imóveis junto ao Corpo de Bombeiros',
    shortTitle: 'Regularização de Imóveis',
    metaTitle: 'Regularização de Imóveis Bombeiros BH | AVCB CLCB | AJN Engenharia',
    metaDescription: 'Regularização completa de imóveis junto ao Corpo de Bombeiros de MG. Obtenha AVCB e CLCB com garantia de aprovação. Atendimento em toda BH.',
    icon: 'FaClipboardCheck',
    color: 'red',
    featured: false,
    summary: 'Regularização de edificações junto ao Corpo de Bombeiros com emissão e renovação de AVCB e CLCB.',
    description: `Cuidamos de toda a regularização do seu imóvel junto ao Corpo de Bombeiros Militar de Minas Gerais, garantindo conformidade com as normas de segurança contra incêndio e pânico.

Atuamos desde a análise inicial da edificação, enquadramento de risco, elaboração do projeto, instalação dos sistemas preventivos, acompanhamento da vistoria até a emissão do AVCB ou CLCB. Atendemos imóveis comerciais, residenciais, industriais e de uso público em toda BH e região metropolitana.`,

    benefits: [
      { icon: 'FaShieldAlt', title: 'Sem Interdição', description: 'Evite multas e fechamento do estabelecimento' },
      { icon: 'FaCheckCircle', title: 'Seguro Válido', description: 'Imóvel regular mantém cobertura do seguro' },
      { icon: 'FaAward', title: 'Valorização', description: 'Imóveis regulares valem mais no mercado' },
    ],

    relatedNorms: ['IT-01 a IT-42 do CBMMG', 'NR-23'],
    segments: ['comercio', 'servicos', 'residencial', 'industria'],

    keywords: [
      'regularização imóvel bombeiros BH',
      'AVCB BH',
      'CLCB Belo Horizonte',
      'vistoria bombeiros',
      'alvará bombeiros',
    ],

    items: [
      'Análise da edificação e enquadramento de risco',
      'Elaboração e aprovação do projeto (PPCI)',
      'Instalação de sistemas de prevenção e combate',
      'Acompanhamento da vistoria do Corpo de Bombeiros',
      'Emissão e renovação de AVCB e CLCB',
      'Regularização de imóveis comerciais',
      'Regularização de imóveis residenciais (condomínios)',
      'Regularização de imóveis industriais',
      'Adequação de rotas de fuga e saídas de emergência',
      'Treinamento de brigada de incêndio',
    ],

    deliverables: [
      'Relatório de conformidade inicial',
      'Projeto técnico aprovado pelo CBMMG',
      'Certificados de instalação dos sistemas',
      'AVCB ou CLCB emitido',
      'Manual de operação dos sistemas de segurança',
    ],

    faq: [
      {
        q: 'Quais imóveis precisam de AVCB/CLCB?',
        a: 'Praticamente todas as edificações de uso coletivo: comércios, indústrias, escritórios, condomínios residenciais, escolas, hospitais, igrejas, academias, restaurantes, etc. Residências unifamiliares geralmente são isentas, mas condomínios verticais precisam.',
      },
      {
        q: 'Quanto custa regularizar um imóvel?',
        a: 'O valor depende do porte, uso e risco da edificação. O projeto técnico varia de R$ 1.500 a R$ 15.000+, e as instalações de sistemas (extintores, hidrantes, etc.) são orçadas separadamente. A AJN oferece orçamento gratuito após visita técnica.',
      },
      {
        q: 'Posso ser multado se meu imóvel estiver irregular?',
        a: 'Sim. O CBMMG realiza fiscalizações e pode aplicar multas que variam de R$ 500 a R$ 50.000+, além de interditar o estabelecimento até a regularização. Em caso de sinistro, o seguro pode se recusar a pagar a indenização.',
      },
    ],
  },

  {
    id: 'projetos-eletricos',
    slug: 'projetos-eletricos',
    title: 'Projetos Elétricos',
    shortTitle: 'Projetos Elétricos',
    metaTitle: 'Projeto Elétrico em BH | Residencial, Comercial e Predial | AJN',
    metaDescription: 'Projetos elétricos residenciais de alto padrão, comerciais e prediais em Belo Horizonte. Segurança, eficiência energética e responsabilidade técnica.',
    icon: 'FaBolt',
    color: 'yellow',
    featured: false,
    summary: 'Projetos elétricos residenciais de alto padrão, comerciais e prediais com foco em segurança e economia.',
    description: `Desenvolvemos projetos elétricos completos para imóveis residenciais de alto padrão, comerciais e prediais, com ênfase em qualidade, cumprimento de prazos e eficiência energética.

Nossos projetos seguem rigorosamente as normas da ABNT (NBR 5410 e NBR 14039), garantindo segurança, confiabilidade, sustentabilidade e redução de custos operacionais. Todos os projetos incluem ART e acompanhamento de obra.`,

    benefits: [
      { icon: 'FaShieldAlt', title: 'Segurança Total', description: 'Projeto conforme NBR 5410, sem riscos' },
      { icon: 'FaChartLine', title: 'Economia', description: 'Dimensionamento otimizado reduz custos' },
      { icon: 'FaCertificate', title: 'ART Incluída', description: 'Responsabilidade técnica garantida' },
    ],

    relatedNorms: ['NBR 5410', 'NBR 14039', 'NR-10', 'NR-12'],
    segments: ['residencial', 'comercio', 'industria', 'construcao'],

    keywords: [
      'projeto elétrico BH',
      'projeto elétrico Belo Horizonte',
      'projeto elétrico residencial BH',
      'projeto elétrico comercial',
      'engenheiro eletricista BH',
    ],

    items: [
      'Projetos residenciais de alto padrão',
      'Projetos comerciais e prediais',
      'Projetos industriais de baixa e média tensão',
      'Dimensionamento de circuitos e quadros de distribuição',
      'Projeto de SPDA (para-raios)',
      'Projeto de iluminação (natural e artificial)',
      'Eficiência energética e redução de custos',
      'Responsabilidade técnica com emissão de ART',
      'Acompanhamento de obra e comissionamento',
      'Laudos técnicos de instalações elétricas (NR-10)',
    ],

    deliverables: [
      'Projeto executivo completo (plantas, diagramas, memorial)',
      'ART registrada no CREA-MG',
      'Lista de materiais e quantitativos',
      'Especificações técnicas detalhadas',
      'Acompanhamento de execução (quando contratado)',
    ],

    faq: [
      {
        q: 'Por que preciso de um projeto elétrico?',
        a: 'O projeto elétrico garante que a instalação seja segura, eficiente e conforme as normas técnicas (NBR 5410). Sem projeto, você rischia curtos-circuitos, incêndios, choques elétricos, multas do Corpo de Bombeiros e problemas com o seguro do imóvel.',
      },
      {
        q: 'Qual a diferença entre projeto residencial e comercial?',
        a: 'Projetos residenciais seguem a NBR 5410 (baixa tensão até 1000V). Projetos comerciais e industriais podem envolver média tensão (NBR 14039), demandas maiores, subestações e exigências específicas do Corpo de Bombeiros e concessionária de energia.',
      },
      {
        q: 'Vocês fazem o projeto e a execução?',
        a: 'Fazemos o projeto e oferecemos acompanhamento de execução (fiscalização da obra). Também podemos indicar eletricistas e empresas de confiança parceiras. Para projetos industriais, temos equipe própria de execução.',
      },
    ],
  },

  {
    id: 'treinamentos',
    slug: 'treinamentos-nr',
    title: 'Treinamentos de Normas Regulamentadoras',
    shortTitle: 'Treinamentos NR',
    metaTitle: 'Treinamentos NR em BH | NR-35, NR-10, NR-33 e +20 NRs | AJN',
    metaDescription: 'Treinamentos de NRs em Belo Horizonte. NR-35, NR-10, NR-33, NR-12 e mais de 20 normas. Presencial e online com certificado válido em todo Brasil.',
    icon: 'FaChalkboardTeacher',
    color: 'blue',
    featured: true,
    summary: 'Treinamentos em NR-01, NR-06, NR-10, NR-12, NR-33, NR-35 e mais de 20 NRs para sua equipe.',
    description: `Oferecemos treinamentos completos em Normas Regulamentadoras para capacitar sua equipe e manter sua empresa em conformidade legal. Todos os treinamentos são ministrados por profissionais habilitados, com emissão de certificados válidos em todo o território nacional.

Disponíveis nas modalidades presencial (em nossa estrutura ou in company) e online/semipresencial (quando permitido pela NR). Turmas abertas com calendário mensal ou turmas fechadas personalizadas.`,

    benefits: [
      { icon: 'FaCertificate', title: 'Certificado Válido', description: 'Reconhecido em todo o Brasil' },
      { icon: 'FaUserTie', title: 'Instrutores Habilitados', description: 'Profissionais com registro no CREA/CRM' },
      { icon: 'FaHome', title: 'In Company', description: 'Vamos até sua empresa' },
    ],

    relatedNorms: ['NR-01', 'NR-06', 'NR-10', 'NR-12', 'NR-33', 'NR-35'],
    segments: ['industria', 'construcao', 'comercio', 'servicos', 'logistica'],

    keywords: [
      'treinamento NR BH',
      'treinamento NR-35 BH',
      'treinamento NR-10 Belo Horizonte',
      'NR-33 BH',
      'curso NR presencial',
      'treinamento in company',
    ],

    nrs: [
      { nr: 'NR-01', title: 'Disposições Gerais e Gerenciamento de Riscos', carga: '4h', reciclagem: 'Bienal' },
      { nr: 'NR-06', title: 'Equipamento de Proteção Individual (EPI)', carga: '8h', reciclagem: 'Bienal' },
      { nr: 'NR-10', title: 'Segurança em Instalações Elétricas', carga: '40h', reciclagem: 'Bienal' },
      { nr: 'NR-11', title: 'Transporte, Movimentação e Armazenagem', carga: '8h', reciclagem: 'Anual' },
      { nr: 'NR-12', title: 'Segurança em Máquinas e Equipamentos', carga: '16h', reciclagem: 'Bienal' },
      { nr: 'NR-13', title: 'Caldeiras e Vasos de Pressão', carga: '40h', reciclagem: 'Anual' },
      { nr: 'NR-17', title: 'Ergonomia', carga: '8h', reciclagem: 'Bienal' },
      { nr: 'NR-18', title: 'Construção Civil', carga: '6h', reciclagem: 'Anual' },
      { nr: 'NR-20', title: 'Inflamáveis e Combustíveis', carga: '8h', reciclagem: 'Bienal' },
      { nr: 'NR-22', title: 'Mineração', carga: '8h', reciclagem: 'Anual' },
      { nr: 'NR-23', title: 'Proteção Contra Incêndio', carga: '8h', reciclagem: 'Anual' },
      { nr: 'NR-33', title: 'Espaço Confinado', carga: '16h', reciclagem: 'Anual' },
      { nr: 'NR-35', title: 'Trabalho em Altura', carga: '8h', reciclagem: 'Bienal' },
    ],

    items: [
      'Treinamentos presenciais em nossa estrutura',
      'Treinamentos in company (em sua empresa)',
      'Treinamentos online/semipresencial (quando permitido)',
      'Turmas abertas com calendário mensal',
      'Turmas fechadas personalizadas',
      'Emissão de certificados com validade nacional',
      'Material didático completo (apostilas, vídeos)',
      'Avaliação teórica e prática',
      'Controle de vencimentos e alertas de reciclagem',
      'Integração de novos funcionários',
    ],

    deliverables: [
      'Certificado individual para cada participante',
      'Lista de presença assinada',
      'Material didático (apostila digital ou impressa)',
      'Relatório de aproveitamento da turma',
      'Controle de vencimentos para reciclagem',
    ],

    faq: [
      {
        q: 'Os certificados são válidos em todo o Brasil?',
        a: 'Sim. Nossos certificados são emitidos conforme as exigências de cada NR, com carga horária, conteúdo programático e instrutores habilitados. São aceitos em todo o território nacional e por órgãos fiscalizadores.',
      },
      {
        q: 'Qual a diferença entre treinamento presencial e online?',
        a: 'O treinamento presencial inclui parte prática essencial para NRs como NR-35 (altura), NR-33 (espaço confinado) e NR-10 (elétrica). Algumas NRs permitem modalidade semipresencial (teoria online + prática presencial). Avaliamos cada caso conforme a norma específica.',
      },
      {
        q: 'Vocês fazem treinamento in company?',
        a: 'Sim! Levamos toda a estrutura didática e prática até sua empresa, com turmas personalizadas conforme os riscos da sua atividade. Ideal para empresas com muitos funcionários ou que precisam de treinamento em horário específico.',
      },
    ],
  },

  {
    id: 'manutencao',
    slug: 'manutencao-elevadores-equipamentos',
    title: 'Manutenção e Responsabilidade Técnica',
    shortTitle: 'Manutenção Técnica',
    metaTitle: 'Manutenção de Elevadores e PMOC em BH | Responsabilidade Técnica',
    metaDescription: 'Manutenção preventiva e corretiva de elevadores, escadas rolantes e plataformas. PMOC e responsabilidade técnica com ART em Belo Horizonte.',
    icon: 'FaTools',
    color: 'gray',
    featured: false,
    summary: 'Manutenção e responsabilidade técnica em elevadores, escadas rolantes, plataformas e PMOC.',
    description: `Prestamos serviços de manutenção preventiva e corretiva e assumimos a responsabilidade técnica em elevadores, escadas rolantes e plataformas elevatórias, além de elaborar PMOC (Planos de Manutenção, Operação e Controle) para sistemas de climatização.

Nossa equipe é composta por técnicos especializados e engenheiros mecânicos com registro no CREA, garantindo conformidade com as normas ABNT e segurança total dos equipamentos.`,

    benefits: [
      { icon: 'FaShieldAlt', title: 'Segurança', description: 'Equipamentos sempre em conformidade' },
      { icon: 'FaClock', title: 'Preventiva', description: 'Evite paradas inesperadas' },
      { icon: 'FaCertificate', title: 'ART', description: 'Responsabilidade técnica garantida' },
    ],

    relatedNorms: ['NBR 16083', 'NBR 16734', 'NBR 13974', 'NR-12', 'PMOC - Lei 13.589/2018'],
    segments: ['comercio', 'residencial', 'industria', 'servicos'],

    keywords: [
      'manutenção elevadores BH',
      'PMOC Belo Horizonte',
      'responsabilidade técnica elevador BH',
      'manutenção escada rolante',
      'plataforma elevatória',
    ],

    items: [
      'Manutenção preventiva de elevadores',
      'Manutenção corretiva de elevadores',
      'Manutenção de escadas rolantes',
      'Manutenção de plataformas elevatórias',
      'Responsabilidade técnica com emissão de ART',
      'PMOC — Plano de Manutenção, Operação e Controle',
      'Inspeções periódicas e relatórios técnicos',
      'Adequação às normas ABNT vigentes',
      'Laudo técnico de equipamentos',
      'Modernização e retrofit de elevadores',
    ],

    deliverables: [
      'Contrato de manutenção com cronograma',
      'Relatórios mensais de intervenções',
      'ART de responsabilidade técnica',
      'Documento do PMOC (quando aplicável)',
      'Certificados de inspeção periódica',
    ],

    faq: [
      {
        q: 'Qual a frequência da manutenção de elevadores?',
        a: 'A manutenção preventiva deve ser mensal, conforme NBR 16083. A responsabilidade técnica deve ser renovada anualmente. Elevadores com grande fluxo (shoppings, hospitais) podem necessitar de manutenção quinzenal.',
      },
      {
        q: 'O que é PMOC e quem precisa?',
        a: 'O PMOC (Plano de Manutenção, Operação e Controle) é obrigatório pela Lei 13.589/2018 para todos os sistemas de climatização (ar-condicionado) de uso coletivo. Deve ser elaborado por engenheiro mecânico e inclui plano de manutenção, análise de ar e relatórios.',
      },
      {
        q: 'Vocês assumem a responsabilidade técnica de elevadores existentes?',
        a: 'Sim. Fazemos uma vistoria inicial, avaliamos as condições do equipamento e, se estiver em conformidade, assumimos a responsabilidade técnica com emissão de ART. Caso precise de adequações, elaboramos um plano de ação.',
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════
// HELPERS UTILITÁRIOS
// ═══════════════════════════════════════════════════════════════════

/**
 * Busca serviço por slug
 * @param {string} slug 
 * @returns {Object|undefined}
 */
export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug)

/**
 * Busca serviço por ID
 * @param {string} id 
 * @returns {Object|undefined}
 */
export const getServiceById = (id) => services.find((s) => s.id === id)

/**
 * Retorna serviços em destaque
 * @param {number} limit 
 * @returns {Array}
 */
export const getFeaturedServices = (limit = 4) =>
  services
    .filter((s) => s.featured)
    .slice(0, limit)

/**
 * Filtra serviços por segmento de mercado
 * @param {string} segmentId 
 * @param {number} limit 
 * @returns {Array}
 */
export const getServicesBySegment = (segmentId, limit) => {
  const filtered = services.filter((s) => s.segments?.includes(segmentId))
  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Busca textual em serviços (título, descrição, keywords)
 * @param {string} query 
 * @param {number} limit 
 * @returns {Array}
 */
export const searchServices = (query, limit = 10) => {
  if (!query || query.trim().length < 2) return []

  const terms = query.toLowerCase().trim().split(/\s+/)

  return services
    .map((service) => {
      let score = 0
      const titleLower = service.title.toLowerCase()
      const summaryLower = service.summary.toLowerCase()
      const keywordsText = (service.keywords || []).join(' ').toLowerCase()

      terms.forEach((term) => {
        if (titleLower.includes(term)) score += 10
        if (summaryLower.includes(term)) score += 5
        if (keywordsText.includes(term)) score += 3
      })

      return { ...service, score }
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Serviços relacionados baseado em normas e segmentos em comum
 * @param {Object} currentService 
 * @param {number} limit 
 * @returns {Array}
 */
export const getRelatedServices = (currentService, limit = 3) => {
  if (!currentService) return []

  return services
    .filter((s) => s.id !== currentService.id)
    .map((s) => {
      let score = 0

      // Mesma cor = mesma família de serviços
      if (s.color === currentService.color) score += 5

      // Normas em comum
      const commonNorms = (s.relatedNorms || []).filter((n) =>
        currentService.relatedNorms?.includes(n)
      )
      score += commonNorms.length * 3

      // Segmentos em comum
      const commonSegments = (s.segments || []).filter((seg) =>
        currentService.segments?.includes(seg)
      )
      score += commonSegments.length * 2

      // Featured tem prioridade
      if (s.featured) score += 2

      return { ...s, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Gera Schema.org Service para SEO
 * @param {Object} service 
 * @param {string} siteUrl 
 * @returns {Object}
 */
export const generateServiceSchema = (service, siteUrl = 'https://ajnengenharia.com.br') => {
  if (!service) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    url: `${siteUrl}/servicos/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'AJN Consultoria e Engenharia',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'City',
      name: 'Belo Horizonte',
    },
    serviceType: service.title,
  }
}

/**
 * Gera breadcrumb para página de serviço
 * @param {Object} service 
 * @returns {Array}
 */
export const getServiceBreadcrumb = (service) => {
  if (!service) return []

  return [
    { name: 'Home', url: '/' },
    { name: 'Serviços', url: '/servicos' },
    { name: service.shortTitle, url: `/servicos/${service.slug}` },
  ]
}

/**
 * Estatísticas dos serviços
 * @returns {Object}
 */
export const getServicesStats = () => {
  const byColor = {}
  const allNorms = new Set()
  const allSegments = new Set()

  services.forEach((s) => {
    byColor[s.color] = (byColor[s.color] || 0) + 1
    s.relatedNorms?.forEach((n) => allNorms.add(n))
    s.segments?.forEach((seg) => allSegments.add(seg))
  })

  return {
    total: services.length,
    featured: services.filter((s) => s.featured).length,
    byColor,
    uniqueNorms: allNorms.size,
    uniqueSegments: allSegments.size,
  }
}