/**
 * Perguntas Frequentes — AJN Engenharia
 * 
 * Conteúdo real, útil para o cliente e otimizado para SEO (FAQPage Schema).
 * Inclui categorização, metadata e helpers para busca e renderização.
 * 
 * @module data/faq
 */

// ═══════════════════════════════════════════════════════════════════
// CATEGORIAS DE FAQ
// ═══════════════════════════════════════════════════════════════════

export const faqCategories = [
  { id: 'todas', label: 'Todas', icon: 'FaQuestionCircle' },
  { id: 'documentos', label: 'Laudos e Documentos', icon: 'FaFileAlt' },
  { id: 'treinamentos', label: 'Treinamentos NR', icon: 'FaGraduationCap' },
  { id: 'bombeiros', label: 'Combate a Incêndio', icon: 'FaFire' },
  { id: 'esocial', label: 'eSocial', icon: 'FaLaptopCode' },
  { id: 'comercial', label: 'Orçamento e Atendimento', icon: 'FaHandshake' },
]

// ═══════════════════════════════════════════════════════════════════
// PERGUNTAS FREQUENTES
// ═══════════════════════════════════════════════════════════════════

export const faq = [
  // ── LAUDOS E DOCUMENTOS ──────────────────────────────────────
  {
    id: 1,
    q: 'O PCMSO é obrigatório para a minha empresa?',
    a: 'Sim. O <strong>PCMSO</strong> (Programa de Controle Médico de Saúde Ocupacional) é exigido pela <strong>NR-07</strong> para praticamente toda empresa que tenha empregados regidos pela CLT, independentemente do porte. Ele deve estar sempre integrado ao PGR e atualizado conforme os riscos da atividade.',
    category: 'documentos',
    tags: ['pcmso', 'nr-07', 'obrigatoriedade', 'aso'],
    priority: 'alta',
  },
  {
    id: 2,
    q: 'Qual a diferença entre o PGR e o antigo PPRA?',
    a: 'Com a atualização da NR-01, o PPRA foi substituído pelo <strong>PGR</strong> (Programa de Gerenciamento de Riscos). O PGR é mais amplo: além dos riscos ambientais, abrange todos os riscos ocupacionais (incluindo ergonômicos e de acidentes), com inventário de riscos e plano de ação contínuo.',
    category: 'documentos',
    tags: ['pgr', 'ppra', 'nr-01', 'inventario-riscos'],
    priority: 'alta',
  },
  {
    id: 3,
    q: 'O que é o LTCAT e quem precisa emitir?',
    a: 'O <strong>LTCAT</strong> (Laudo Técnico das Condições Ambientais de Trabalho) comprova a exposição do trabalhador a agentes nocivos e fundamenta a <strong>aposentadoria especial</strong> junto ao INSS. É necessário para empresas cujos colaboradores estejam expostos a agentes acima dos limites de tolerância e para alimentar corretamente o eSocial (evento S-2240).',
    category: 'documentos',
    tags: ['ltcat', 'inss', 'aposentadoria-especial', 'previdenciario'],
    priority: 'alta',
  },
  {
    id: 4,
    q: 'Qual a validade dos laudos técnicos (PGR, PCMSO, LTCAT)?',
    a: 'As validades variam: o <strong>PGR</strong> deve ser revisado bienalmente ou sempre que houver mudanças no processo; o <strong>PCMSO</strong> é atualizado anualmente através do relatório analítico; e o <strong>LTCAT</strong> precisa ser revisado sempre que houver alteração nos ambientes ou processos. A AJN oferece <strong>gestão contínua</strong> para manter todos os documentos em dia.',
    category: 'documentos',
    tags: ['validade', 'atualizacao', 'gestao-documental'],
    priority: 'media',
  },
  {
    id: 5,
    q: 'O que é o PPP e quando minha empresa precisa emiti-lo?',
    a: 'O <strong>PPP</strong> (Perfil Profissiográfico Previdenciário) é o documento histórico-laboral individual do trabalhador. A empresa deve emiti-lo no <strong>desligamento</strong> do colaborador, quando solicitado por ele, ou quando requerido pelo INSS. Desde 2023, o PPP é gerado eletronicamente a partir dos dados do eSocial.',
    category: 'documentos',
    tags: ['ppp', 'inss', 'previdenciario', 'desligamento'],
    priority: 'media',
  },
  {
    id: 6,
    q: 'Qual a diferença entre laudo de insalubridade e de periculosidade?',
    a: 'O laudo de <strong>insalubridade</strong> (NR-15) avalia exposição a agentes nocivos à saúde (ruído, calor, químicos) e gera adicional de 10%, 20% ou 40%. O de <strong>periculosidade</strong> (NR-16) avalia risco acentuado (inflamáveis, explosivos, energia elétrica) e gera adicional de 30%. Ambos exigem perícia técnica com ART.',
    category: 'documentos',
    tags: ['insalubridade', 'periculosidade', 'nr-15', 'nr-16', 'adicional'],
    priority: 'media',
  },

  // ── TREINAMENTOS NR ──────────────────────────────────────────
  {
    id: 7,
    q: 'Os treinamentos de NR têm certificado válido em todo o Brasil?',
    a: 'Sim. Todos os nossos treinamentos (NR-35, NR-10, NR-33, NR-18, entre outros) são ministrados por <strong>profissionais habilitados</strong> e geram certificado em conformidade com a Norma Regulamentadora correspondente, com <strong>validade nacional</strong>. Disponíveis nas modalidades presencial e online (semipresencial quando permitido pela NR).',
    category: 'treinamentos',
    tags: ['nr-35', 'nr-10', 'nr-33', 'certificado', 'treinamento'],
    priority: 'alta',
  },
  {
    id: 8,
    q: 'Qual a carga horária e quando preciso fazer a reciclagem?',
    a: 'A carga horária varia por NR: <strong>NR-35</strong> (8h inicial, bienal), <strong>NR-10</strong> (40h básico, bienal), <strong>NR-33</strong> (16h, anual), entre outras. A reciclagem é obrigatória conforme cada norma — manter a equipe em dia evita autuações e acidentes. A AJN controla os vencimentos e agenda as reciclagens automaticamente.',
    category: 'treinamentos',
    tags: ['carga-horaria', 'reciclagem', 'nr'],
    priority: 'media',
  },
  {
    id: 9,
    q: 'A AJN oferece treinamentos in company?',
    a: 'Sim! Realizamos <strong>treinamentos in company</strong> em toda a região metropolitana de Belo Horizonte e em outras cidades de MG conforme demanda. Levamos toda a estrutura didática e prática até sua empresa, com turmas personalizadas conforme os riscos da sua atividade.',
    category: 'treinamentos',
    tags: ['in-company', 'treinamento-personalizado'],
    priority: 'media',
  },

  // ── COMBATE A INCÊNDIO ───────────────────────────────────────
  {
    id: 10,
    q: 'Qual a diferença entre AVCB e CLCB?',
    a: 'O <strong>CLCB</strong> (Certificado de Licença do Corpo de Bombeiros) é para edificações de menor risco, com processo simplificado via sistema online. O <strong>AVCB</strong> (Auto de Vistoria do Corpo de Bombeiros) é para edificações de maior porte ou risco, exigindo projeto técnico (PPCI) assinado por engenheiro e vistoria presencial. A AJN cuida de ambos os processos.',
    category: 'bombeiros',
    tags: ['avcb', 'clcb', 'ppci', 'bombeiros'],
    priority: 'alta',
  },
  {
    id: 11,
    q: 'Quanto tempo leva para regularizar o imóvel e obter o AVCB?',
    a: 'O prazo varia conforme o porte, o risco da edificação e a demanda do Corpo de Bombeiros. Em geral envolve: elaboração do projeto (PPCI), aprovação, instalação dos sistemas (extintores, hidrantes, sinalização) e vistoria. A AJN conduz todo o processo e informa um <strong>prazo realista</strong> após avaliação presencial do seu imóvel — geralmente entre <strong>30 e 90 dias</strong>.',
    category: 'bombeiros',
    tags: ['prazo', 'regularizacao', 'vistoria'],
    priority: 'alta',
  },
  {
    id: 12,
    q: 'Meu imóvel já tem AVCB vencido. Posso ser multado?',
    a: 'Sim. Manter edificação com <strong>AVCB vencido</strong> gera multa do Corpo de Bombeiros, pode <strong>interromper atividades comerciais</strong> e, em caso de sinistro, comprometer a cobertura do seguro. A renovação deve ser solicitada antes do vencimento — a AJN monitora as datas e agenda a renovação automaticamente.',
    category: 'bombeiros',
    tags: ['multa', 'renovacao', 'risco-legal'],
    priority: 'media',
  },

  // ── eSOCIAL ──────────────────────────────────────────────────
  {
    id: 13,
    q: 'O que são os eventos S-2220 e S-2240 do eSocial?',
    a: 'O <strong>S-2220</strong> registra os exames médicos ocupacionais (ASOs) do PCMSO. O <strong>S-2240</strong> informa as condições ambientais de trabalho com base no LTCAT e no PGR. Ambos são obrigatórios para todas as empresas com empregados e devem ser enviados até o dia 7 do mês seguinte ao fato gerador.',
    category: 'esocial',
    tags: ['s-2220', 's-2240', 'esocial', 'sst'],
    priority: 'alta',
  },
  {
    id: 14,
    q: 'Minha empresa pode ser multada por erros no eSocial SST?',
    a: 'Sim. O envio incorreto, incompleto ou atrasado dos eventos de SST gera <strong>multas que podem ultrapassar R$ 5.000 por trabalhador</strong>, além de comprometer o PPP eletrônico e o direito a benefícios previdenciários dos colaboradores. A AJN assume a gestão completa do eSocial SST, com auditoria mensal e garantia de conformidade.',
    category: 'esocial',
    tags: ['multa', 'fiscalizacao', 'conformidade'],
    priority: 'alta',
  },
  {
    id: 15,
    q: 'A AJN integra os dados do PCMSO e LTCAT com o eSocial?',
    a: 'Sim. Trabalhamos com <strong>gestão integrada</strong>: os dados do PCMSO, LTCAT e PGR geridos pela AJN são automaticamente transcritos para os eventos do eSocial, eliminando retrabalho e inconsistências. Você recebe relatórios mensais transparentes de tudo que foi enviado.',
    category: 'esocial',
    tags: ['integracao', 'automacao', 'relatorio'],
    priority: 'media',
  },

  // ── COMERCIAL / ATENDIMENTO ──────────────────────────────────
  {
    id: 16,
    q: 'A AJN atende empresas fora de Belo Horizonte?',
    a: 'Sim. Nossa base é em <strong>Belo Horizonte/MG</strong>, mas atendemos toda a <strong>Região Metropolitana</strong> (Contagem, Betim, Nova Lima, Santa Luzia, Ribeirão das Neves) e demais cidades de Minas Gerais conforme o projeto. Para outras regiões do estado ou do país, fale conosco para avaliar a viabilidade.',
    category: 'comercial',
    tags: ['atendimento', 'regiao', 'bh', 'mg'],
    priority: 'alta',
  },
  {
    id: 17,
    q: 'Como funciona o orçamento? Tem taxa de visita?',
    a: 'O orçamento é <strong>gratuito e sem compromisso</strong>. Após contato inicial, agendamos uma visita técnica (quando necessária) para avaliar o escopo e apresentar proposta detalhada em até <strong>48 horas úteis</strong>. Não cobramos taxa de visita para orçamentos na região metropolitana de BH.',
    category: 'comercial',
    tags: ['orcamento', 'visita-tecnica', 'gratuito'],
    priority: 'alta',
  },
  {
    id: 18,
    q: 'Quais formas de pagamento a AJN aceita?',
    a: 'Aceitamos <strong>PIX, boleto bancário, transferência e cartão de crédito</strong> (em até 12x para projetos maiores). Para contratos de gestão contínua, oferecemos mensalidades fixas com boleto recorrente. Condições especiais para empresas de grande porte ou contratos anuais.',
    category: 'comercial',
    tags: ['pagamento', 'pix', 'boleto', 'parcelamento'],
    priority: 'media',
  },
  {
    id: 19,
    q: 'Por que contratar a AJN em vez de um profissional autônomo?',
    a: 'A AJN oferece <strong>equipe multidisciplinar</strong> (engenheiros, médicos, técnicos), gestão centralizada de todos os documentos, controle de prazos automatizado, suporte contínuo e <strong>responsabilidade técnica compartilhada</strong>. Você tem um único ponto de contato para PGR, PCMSO, LTCAT, eSocial, treinamentos e bombeiros — em vez de lidar com 5 ou 6 prestadores diferentes.',
    category: 'comercial',
    tags: ['diferenciais', 'consultoria', 'gestao-integrada'],
    priority: 'alta',
  },
  {
    id: 20,
    q: 'A AJN oferece contratos de gestão contínua?',
    a: 'Sim. Temos planos de <strong>gestão mensal de SST</strong> que incluem atualização de documentos, controle de prazos de exames e ASOs, envio de eventos do eSocial, relatórios gerenciais e suporte técnico ilimitado. Ideal para empresas que querem <strong>tranquilidade total</strong> com conformidade e foco no seu negócio.',
    category: 'comercial',
    tags: ['contrato-mensal', 'gestao-continua', 'mensalidade'],
    priority: 'media',
  },
]

// ═══════════════════════════════════════════════════════════════════
// HELPERS UTILITÁRIOS
// ═══════════════════════════════════════════════════════════════════

/**
 * Busca FAQ por ID
 * @param {number} id 
 * @returns {Object|undefined}
 */
export const getFaqById = (id) => faq.find((f) => f.id === id)

/**
 * Lista FAQs por categoria
 * @param {string} categoryId - ID da categoria ou 'todas'
 * @param {Object} options
 * @param {number} options.limit - Máximo de FAQs
 * @param {string} options.priority - Filtrar por prioridade ('alta', 'media', 'baixa')
 * @returns {Array}
 */
export const getFaqByCategory = (categoryId, { limit, priority } = {}) => {
  let filtered = !categoryId || categoryId === 'todas'
    ? faq
    : faq.filter((f) => f.category === categoryId)

  if (priority) {
    filtered = filtered.filter((f) => f.priority === priority)
  }

  // Prioriza FAQs de alta prioridade primeiro
  filtered = [...filtered].sort((a, b) => {
    const priorityOrder = { alta: 0, media: 1, baixa: 2 }
    return (priorityOrder[a.priority] || 1) - (priorityOrder[b.priority] || 1)
  })

  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Busca textual em FAQs (título e resposta)
 * @param {string} query 
 * @param {number} limit 
 * @returns {Array}
 */
export const searchFaq = (query, limit = 10) => {
  if (!query || query.trim().length < 2) return []

  const terms = query.toLowerCase().trim().split(/\s+/)

  return faq
    .map((item) => {
      let score = 0
      const qLower = item.q.toLowerCase()
      const aLower = item.a.toLowerCase()
      const tagsText = (item.tags || []).join(' ').toLowerCase()

      terms.forEach((term) => {
        if (qLower.includes(term)) score += 10
        if (aLower.includes(term)) score += 3
        if (tagsText.includes(term)) score += 5
      })

      return { ...item, score }
    })
    .filter((f) => f.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Retorna FAQs em destaque (prioridade alta)
 * @param {number} limit 
 * @returns {Array}
 */
export const getFeaturedFaq = (limit = 5) =>
  faq
    .filter((f) => f.priority === 'alta')
    .slice(0, limit)

/**
 * Estatísticas do FAQ
 * @returns {Object}
 */
export const getFaqStats = () => {
  const byCategory = {}
  faqCategories.forEach((cat) => {
    if (cat.id !== 'todas') {
      byCategory[cat.id] = faq.filter((f) => f.category === cat.id).length
    }
  })

  return {
    total: faq.length,
    byCategory,
    featured: faq.filter((f) => f.priority === 'alta').length,
    allTags: [...new Set(faq.flatMap((f) => f.tags || []))],
  }
}

/**
 * Gera Schema.org FAQPage para SEO (Rich Snippets no Google)
 * @param {Array} items - Array de FAQs (ou usa todos se não fornecido)
 * @returns {Object}
 */
export const generateFaqSchema = (items = faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q.replace(/<[^>]*>/g, ''), // Remove HTML
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a.replace(/<[^>]*>/g, ''),
    },
  })),
})

/**
 * FAQs relacionadas baseado em tags em comum
 * @param {Object} currentFaq 
 * @param {number} limit 
 * @returns {Array}
 */
export const getRelatedFaq = (currentFaq, limit = 3) => {
  if (!currentFaq) return []

  return faq
    .filter((f) => f.id !== currentFaq.id)
    .map((f) => {
      let score = 0
      if (f.category === currentFaq.category) score += 10
      const commonTags = (f.tags || []).filter((t) => currentFaq.tags?.includes(t))
      score += commonTags.length * 5
      if (f.priority === 'alta') score += 2
      return { ...f, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}