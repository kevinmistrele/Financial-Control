# Financial Control — Documentação de Produto

## Visão Geral

Financial Control é uma aplicação web de controle financeiro pessoal. Seu objetivo é dar ao usuário uma visão clara e rápida de como está gastando seu dinheiro, permitindo registrar, categorizar, visualizar e gerenciar despesas de forma simples.

O produto é voltado para pessoas que querem organizar suas finanças sem depender de planilhas ou aplicativos complexos. Tudo acontece em um único dashboard, sem necessidade de aprender múltiplas telas.

---

## Problema que Resolve

Manter controle dos gastos do dia a dia é difícil. A maioria das pessoas perde a noção do quanto gasta em categorias específicas ao longo da semana ou do mês. Financial Control centraliza esse controle em uma interface visual direta, com gráficos e listagem de transações acessíveis de imediato.

---

## Público-Alvo

- Pessoas físicas que querem controlar despesas pessoais
- Usuários com familiaridade básica com computadores e navegadores web
- Quem prefere uma ferramenta simples e focada em vez de soluções complexas de finanças pessoais

---

## Funcionalidades

### Dashboard Principal

A tela principal concentra todas as informações relevantes:

- **Cards de resumo**: exibem o total gasto nos últimos 7 dias, nos últimos 30 dias e o gasto total histórico
- **Gráfico de gastos diários**: barra por dia, com filtro de período (7, 15 ou 30 dias)
- **Lista de transações recentes**: exibe as últimas despesas registradas com categoria, descrição e valor

### Registro de Despesas

O usuário pode adicionar uma nova despesa por um modal acessível no header. O formulário coleta:

- **Descrição**: texto livre identificando o gasto (ex: "Almoço no restaurante")
- **Valor**: valor monetário em decimal
- **Categoria**: uma das 8 categorias disponíveis

### Categorias de Despesas

O sistema suporta 8 categorias de classificação:

| Categoria       | Label          |
|-----------------|----------------|
| food            | Food           |
| transportation  | Transportation |
| bills           | Utilities      |
| entertainment   | Entertainment  |
| healthcare      | Healthcare     |
| education       | Education      |
| shopping        | Shopping       |
| general         | General        |

### Gerenciamento de Transações

- Visualização de todas as transações com paginação
- Edição de transações existentes (descrição, valor, categoria)
- Exclusão de transações — suporte a exclusão em lote (até 10 por vez)
- Modal de detalhes e edição por transação

### Relatório do Dashboard

A API gera um relatório agregado por período (7, 15 ou 30 dias) com:

- Total gasto no período
- Detalhamento diário dos valores
- Contagem total de registros no período

---

## Fluxos Principais

### Adicionar uma Despesa

1. Usuário clica em "Add Expense" no header
2. Modal abre com formulário (descrição, valor, categoria)
3. Campos preenchidos — botão "Add Expense" fica visível
4. Ao confirmar, a despesa é salva e aparece na lista de transações recentes

### Visualizar Gastos por Período

1. No card de gráfico, o usuário seleciona o período desejado (7D, 15D, 30D)
2. O gráfico atualiza mostrando os gastos diários do período
3. Os cards de resumo refletem os totais correspondentes

### Editar ou Excluir uma Transação

1. Na lista de transações recentes, o usuário clica em uma transação
2. Modal de edição abre com os dados atuais
3. Usuário edita os campos desejados e salva, ou exclui o registro

---

## Estado Atual do Produto

O produto está em fase de desenvolvimento ativo. A interface visual está construída e funcional com dados mockados. A integração com a API backend está parcialmente implementada — os endpoints estão prontos, mas a conexão entre frontend e backend ainda está sendo finalizada.

### O que já funciona
- Dashboard com layout completo e responsivo
- Formulário de cadastro de despesa com validação de campos
- Lista de transações com suporte a edição e exclusão (via estado local)
- Gráfico de barras com seleção de período
- API REST com todos os endpoints principais

### O que está em progresso
- Integração real do frontend com a API (substituição dos dados mockados)
- Persistência de criação de despesas via API
- Filtro do gráfico conectado ao endpoint `/dashboard-report`

---

## Limitações Conhecidas

- Não há autenticação — a aplicação é single-user
- Não há suporte a múltiplas moedas (valores em USD por padrão na UI)
- Exclusão em lote limitada a 10 registros por requisição
- Sem funcionalidade de exportação de dados

---

## Roadmap Sugerido

1. Finalizar integração frontend ↔ API
2. Adicionar autenticação (login/logout)
3. Filtros avançados na listagem de transações (por categoria, por período)
4. Suporte a receitas além de despesas (balanço positivo/negativo)
5. Exportação de relatórios em CSV ou PDF
6. Suporte a múltiplas moedas
