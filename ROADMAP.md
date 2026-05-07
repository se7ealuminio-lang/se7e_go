# Status de Desenvolvimento - Versailles

Este arquivo documenta o progresso do desenvolvimento, o estado atual do projeto e os próximos passos para guiar futuras interações e o planejamento de novas funcionalidades.

## 🛠️ Tecnologias Principais

- **Framework**: Next.js 16 (App Router)
- **Banco de Dados**: Turso (SQLite) com Drizzle ORM
- **Estilos e UI**: Tailwind CSS + Shadcn/UI (lucide-react, cards, etc)
- **Hospedagem (Assets/Imagens)**: Vercel Blob API

---

## ✅ Funcionalidades Implementadas (O que já está pronto)

### Fase 1: Segurança e Dívida Técnica

- Implementado hashing real **SHA-256** para as senhas (em `src/lib/auth.ts`).
- Criação e ativação do `src/middleware.ts` para proteção segura das rotas do painel.
- Centralização de código (`formatDate` e `formatCurrency`) para o `src/lib/formatters.ts`, limpando o PDF e a listagem.

### Fase 2: Automação Numérica

- Foi criada a rota dinâmica para **Numeração Automática**. Ao iniciar um novo formulário, o sistema descobre autonomamente o último orçamento criado e preenche a numeração com lógica limpa (ex: preenche `013`).

### Fase 3: Acompanhamento e Agilidade (Status & Duplicação)

- Adicionado campo de **Status** (`rascunho`, `enviado`, `aprovado`, `recusado`, `concluído`) direto no Banco de Dados (`schema.ts`).
- Interface do formulário e tabelas atualizada para exibir os status com cores.
- Botão mágico de **Duplicar Orçamento**. Ele clona o orçamento principal junto de todos os itens do orçamento para evitar retrabalho com variações do cliente.

### Fase 4: Busca Rápida

- Inserido um campo de pesquisa e filtros na tela inicial (`orcamentos/page.tsx`), conseguindo varrer instantaneamente a busca por "Nome do Cliente" ou "Número do Orçamento".

### Fase 5: Memória do Cliente (Autocomplete)

- Foi criado o endpoint dinâmico `/api/clients`.
- No formulário de orçamento, usar o input "Nome do Cliente" agora sugere clientes já salvos anteriormente na base, autocompletando o `Endereço` e `Telefone` dinamicamente com base nas consultas prévias.

### Fase 6: Flexibilidade Financeira e WhatsApp

- Inserção de novos campos cruciais no DB: **Descontos (R$)**, **Condições de Pagamento** e **Observações**.
- O **Preview em PDF** (`quote-preview.tsx`) foi completamente expandido e agora exibe com elegância o desconto de abates (e recálculo da diferença), as parcelas acordadas, e o campo formatado de nota final.
- Botão **"Enviar para WhatsApp"** na tela de listagem, configurado para puxar o telefone salvo do cliente e enviar uma pré-mensagem educada formatada e gerada pela própria ferramenta com o link / resumo do orçamento na web (usando o `wa.me`).

### Fase 7: Dashboard Financeiro

- Implementação de um poderoso **Dashboard Pessoal** na página inicial (`/`).
- O formulário de criação de orçamentos foi transferido para uma rota filha (`/novo`).
- Exibição de métricas e gráficos de faturamento (status 'Aprovado' / 'Concluído').
- Contabilização de orçamentos parados em "Rascunho" ou "Enviado".

### Fase 10: UX/UI da Tela de Formulário de Orçamento

- **Total sticky na barra inferior**: Barra fixa no rodapé da tela exibindo subtotal, desconto e total final enquanto o usuário preenche.
- **"Especificações Técnicas" colapsável**: Campos de Cor do Vidro, Alumínio e Ferragens dentro de um acordeão/collapsible para reduzir poluição visual.
- **Nome do cliente com destaque visual**: Input destacado.
- **Preview PDF em Drawer lateral**: Abertura do preview num painel deslizante lateral.
- **Reorganização da ordem das seções**: Cliente → Itens → Condições de Pagamento → Datas/Status → Total.
- **Animações e hierarquia visual**: Animações ao adicionar/remover itens, animação de contador no campo "Total do Item", e hierarquia visual para inputs editáveis vs calculados.

---
