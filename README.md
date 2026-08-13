# AJN Engenharia — Site Institucional

Aplicação institucional da **AJN Engenharia**, desenvolvida com React e Vite para apresentar serviços, conteúdo técnico, contato e presença digital da empresa em uma experiência moderna e responsiva.

O projeto combina navegação por rotas, SEO por página, conteúdo institucional, blog e recursos visuais com **Three.js**, **React Three Fiber**, **Drei**, **Lottie** e **tsParticles**.

## Páginas e rotas

A aplicação possui as seguintes rotas principais:

- `/` — Home;
- `/servicos` — listagem de serviços;
- `/servicos/:slug` — detalhe de serviço;
- `/blog` — conteúdo e artigos;
- `/blog/:slug` — artigo individual;
- `/contato` — contato;
- `/mapa-do-site` — mapa do site;
- rota fallback com página `404`.

Também fazem parte da experiência global:

- header e footer reutilizáveis;
- botão de contato via WhatsApp;
- gerenciamento de SEO;
- retorno automático ao topo em trocas de rota.

## Stack

| Camada | Tecnologia |
|---|---|
| UI | React 19 |
| Build tool | Vite 8 |
| Roteamento | React Router 7 |
| Estilos | Tailwind CSS 4 |
| 3D | Three.js + React Three Fiber + Drei |
| Motion / efeitos | Lottie + tsParticles |
| Qualidade | Oxlint |

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

O comando de build executa o Vite e, em seguida, o script de prerenderização definido em `scripts/prerender.mjs`.

## Validação

```bash
npm run lint
```

## Preview local

```bash
npm run preview
```

## Estrutura de navegação

```text
src/
├── components/   componentes reutilizáveis e elementos globais
├── pages/        páginas da aplicação
└── App.jsx       roteamento e composição principal
```

---

Projeto desenvolvido para a presença digital da **AJN Engenharia**.