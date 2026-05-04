# Guia Técnico — BemCuidar

Este documento descreve a arquitetura, as tecnologias e as diretrizes de desenvolvimento do projeto BemCuidar.

## 1. Visão Geral
O BemCuidar é um aplicativo mobile-first voltado para a saúde de idosos, gestantes e pessoas com deficiência. Seu principal objetivo é facilitar a verificação da disponibilidade de medicamentos em Unidades Básicas de Saúde (UBS).

## 2. Tecnologias
- **Front-end**: HTML5, CSS3, JavaScript (Vanilla).
- **Arquitetura**: SPA (Single Page Application) simples.
- **Back-end (Futuro)**: Node.js + Express + PostgreSQL.
- **Autenticação**: JWT (JSON Web Token) via LocalStorage.

## 3. Estrutura de Pastas
```text
bemcuidar/
├── front-end/
│   ├── index.html     # Estrutura base e containers das telas
│   ├── style.css      # Sistema de design e estilos
│   ├── app.js         # Lógica de navegação e manipulação de dados
│   └── assets/        # Imagens e ícones
├── back-end/          # Estrutura para o servidor Node.js
├── docs/              # Documentação técnica e planos
└── README.md
```

## 4. Arquitetura Front-end (SPA)
O aplicativo funciona como uma SPA, onde todas as telas estão contidas no `index.html` como elementos `<section>` com a classe `.screen`.

### Navegação
A função central de navegação é a `navigate(screenId)`:
- Remove a classe `.active` de todas as telas.
- Adiciona a classe `.active` à tela correspondente ao `screenId`.
- Controla a visibilidade da barra de navegação inferior (`bottom-nav`).

### Gerenciamento de Estado
Atualmente, o estado é mantido em um objeto `currentState` no `app.js`, e os dados são mockados em arrays de objetos (ex: `MOCK_MEDICAMENTOS`).

## 5. Identidade Visual
- **Primária**: `#639CBF` (Azul)
- **Secundária**: `#64798C` (Slate)
- **Fundo**: `#F2F2F2`
- **Superfícies**: `#FFFFFF` (Cards e Brancos)
- **Tipografia**: 
  - Títulos/Logo: *Playfair Display*
  - Corpo: *Nunito*

## 6. Modelo de Dados (Schema)
### Usuário
```javascript
{
  id: Number,
  nome: String,
  email: String,
  telefone: String,
  ubs_id: Number
}
```

### Medicamento
```javascript
{
  id: Number,
  nome: String,
  dosagem: String,
  estoque: Number,
  status: "disponivel" | "esgotado" | "chegando"
}
```

## 7. Diretrizes de Desenvolvimento
1. **Mobile-First**: O layout deve ser otimizado para larguras entre 375px e 430px.
2. **Acessibilidade**:
   - Contraste adequado.
   - Fontes legíveis.
   - Área de toque mínima de 44px para botões.
3. **Padrão de Commits**:
   - `feat:` para novas funcionalidades.
   - `fix:` para correções.
   - `style:` para mudanças de estilo/CSS.
   - `docs:` para documentação.
