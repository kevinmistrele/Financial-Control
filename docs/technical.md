# Financial Control — Documentação Técnica

## Visão Geral da Arquitetura

O projeto é um monorepo com dois diretórios independentes: `frontend` e `backend`. Ambos são aplicações TypeScript separadas, cada uma com seu próprio `package.json`, configurações e pipeline de build.

```
Financial-Control/
├── frontend/          # React + Vite (SPA)
├── backend/           # NestJS REST API
├── docker-compose.yml # PostgreSQL via Docker
└── docs/
    ├── product.md
    └── technical.md
```

A comunicação ocorre via HTTP REST. O banco de dados é gerenciado exclusivamente pelo backend via Prisma ORM.

---

## Stack Tecnológica

### Frontend

| Tecnologia        | Versão   | Função                              |
|-------------------|----------|-------------------------------------|
| React             | 19.2     | UI framework                        |
| TypeScript        | 5.9      | Tipagem estática                    |
| Vite              | 7.x      | Build tool e dev server             |
| Tailwind CSS      | 3.4      | Estilização utilitária              |
| Radix UI          | Variadas | Componentes de UI acessíveis        |
| shadcn/ui         | —        | Camada de componentes sobre Radix   |
| Recharts          | 2.15     | Gráficos (BarChart)                 |
| React Router DOM  | 7.13     | Roteamento client-side              |
| React Hook Form   | 7.x      | Gerenciamento de formulários        |
| Zod               | 4.x      | Validação de schemas                |
| Lucide React      | 0.563    | Ícones                              |
| date-fns          | 4.x      | Utilitários de data                 |
| Sonner            | 2.x      | Notificações toast                  |

### Backend

| Tecnologia        | Versão   | Função                              |
|-------------------|----------|-------------------------------------|
| NestJS            | 11       | Framework HTTP                      |
| TypeScript        | 5.7      | Tipagem estática                    |
| Prisma            | 7.3      | ORM e migrações                     |
| PostgreSQL        | 15       | Banco de dados relacional           |
| class-validator   | 0.14     | Validação de DTOs                   |
| class-transformer | 0.5      | Transformação de payloads           |

### Infraestrutura

| Tecnologia   | Versão | Função                          |
|--------------|--------|---------------------------------|
| Docker       | —      | Container do banco de dados     |
| Docker Compose | 3.8  | Orquestração local              |

---

## Configuração e Setup Local

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- npm

### 1. Banco de Dados

```bash
docker-compose up -d
```

Isso sobe um container PostgreSQL com:

- Host: `localhost`
- Porta: `5433`
- Usuário: `admin`
- Senha: `admin`
- Database: `financas`

### 2. Backend

```bash
cd backend
npm install
```

Criar o arquivo `.env` na raiz de `backend/`:

```env
DATABASE_URL="postgresql://admin:admin@localhost:5433/financas"
```

Executar as migrações:

```bash
npx prisma migrate deploy
```

Iniciar o servidor:

```bash
npm run start:dev   # modo watch
npm run start       # modo padrão
```

O servidor sobe na porta `3000` por padrão.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

O dev server sobe em `http://localhost:5173` por padrão.

---

## Modelo de Dados

### Tabela `expenses`

| Coluna        | Tipo              | Descrição                          |
|---------------|-------------------|------------------------------------|
| `id`          | `String` (UUID)   | Identificador único (auto-gerado)  |
| `description` | `String`          | Descrição textual da despesa       |
| `amount`      | `Decimal(10, 2)`  | Valor monetário                    |
| `type`        | `String`          | Categoria da despesa               |
| `createdAt`   | `DateTime`        | Data do gasto e do registro        |
| `updatedAt`   | `DateTime`        | Última atualização                 |

Schema Prisma:

```prisma
model Expense {
  id          String   @id @default(uuid())
  description String
  amount      Decimal  @db.Decimal(10, 2)
  type        String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("expenses")
}
```

---

## API REST

**Base URL:** `http://localhost:3000`

### Criar Despesa

```
POST /expenses
```

**Body:**
```json
{
  "description": "Almoço",
  "amount": 35.50,
  "category": "food"
}
```

**Validações (class-validator):**
- `description`: string, obrigatório
- `amount`: número, obrigatório
- `category`: string, obrigatório

---

### Listar Despesas

```
GET /expenses?page=1&limit=10&order=desc
```

**Query params:**

| Parâmetro | Tipo             | Padrão | Descrição                    |
|-----------|------------------|--------|------------------------------|
| `page`    | number           | `1`    | Página atual                 |
| `limit`   | number           | `10`   | Itens por página             |
| `order`   | `asc` \| `desc`  | `desc` | Ordenação por `createdAt`    |

**Resposta:**
```json
{
  "data": [...],
  "meta": {
    "total": 42,
    "page": 1,
    "lastPage": 5
  }
}
```

---

### Relatório do Dashboard

```
GET /expenses/dashboard-report?days=7
```

**Query params:**

| Parâmetro | Valores aceitos | Padrão | Descrição           |
|-----------|-----------------|--------|---------------------|
| `days`    | `7`, `15`, `30` | `7`    | Período do relatório |

Valores fora do conjunto aceito são redefinidos para `7`.

**Resposta:**
```json
{
  "period": "7 days",
  "totalSpent": 215.80,
  "dailyBreakdown": [
    { "date": "2026-06-01", "amount": 45.00 },
    { "date": "2026-06-02", "amount": 170.80 }
  ],
  "rawCount": 8
}
```

---

### Buscar Despesa por ID

```
GET /expenses/:id
```

---

### Atualizar Despesa

```
PATCH /expenses/:id
```

**Body (todos os campos opcionais):**
```json
{
  "description": "Novo texto",
  "amount": 50.00,
  "category": "shopping"
}
```

---

### Excluir Despesas

```
DELETE /expenses?ids=id1,id2,id3
```

- `ids`: string com IDs separados por vírgula
- Mínimo: 1 ID
- Máximo: 10 IDs por requisição

**Erros:**
- `404 Not Found` — nenhum ID fornecido
- `400 Bad Request` — mais de 10 IDs enviados

---

## Estrutura do Frontend

```
frontend/src/
├── components/
│   ├── dashboard/
│   │   ├── Cards/
│   │   │   └── CardsTracker.tsx        # Cards de resumo (totais)
│   │   ├── Graphic/
│   │   │   └── CardsGraph.tsx          # Gráfico de barras diário
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── modal/
│   │   │       └── ModalExpenses.tsx   # Modal de nova despesa
│   │   └── Transactions/
│   │       ├── CardsRecentTransactions.tsx
│   │       ├── IconComponent.tsx
│   │       ├── ItemsCard.tsx
│   │       └── modal/
│   │           └── Transactions-Modal.tsx
│   └── ui/                             # Componentes shadcn/ui
├── constants/
│   ├── Calendar-constant.ts
│   ├── Category-Constant.ts            # Lista das 8 categorias
│   └── Transactions-Constant.ts        # Dados mockados de transações
├── contexts/
│   └── TransactionContext.tsx          # Estado global de transações
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.tsx
├── lib/
│   ├── date-config.ts
│   └── utils.ts
├── pages/
│   ├── Dashboard.tsx                   # Página principal
│   └── NotFound.tsx
├── types/
│   └── expense.ts                      # Interfaces e tipos de domínio
├── App.tsx
└── main.tsx
```

### Gerenciamento de Estado

O estado de transações é centralizado em `TransactionContext`, que expõe:

- `transactions`: lista de transações ativas
- `onDelete(id)`: remove uma transação pelo ID
- `onSave(data)`: atualiza os dados de uma transação existente

Atualmente, o estado é inicializado com dados estáticos de `Transactions-Constant.ts`. A integração com a API substituirá essa inicialização por chamadas HTTP.

### Tipos Principais (`src/types/expense.ts`)

```typescript
type ExpenseCategory =
  "food" | "transportation" | "bills" | "entertainment" |
  "healthcare" | "education" | "shopping" | "general";

interface TransactionItemType {
  id: number;
  description: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
}

interface CreateExpenseDTO {
  description: string;
  amount: number;
  category: ExpenseCategory;
}
```

---

## Estrutura do Backend

```
backend/src/
├── expenses/
│   ├── dto/
│   │   ├── create-expense.dto.ts
│   │   └── update-expense.dto.ts
│   ├── entities/
│   │   └── expense.entity.ts
│   ├── expenses.controller.ts
│   ├── expenses.module.ts
│   └── expenses.service.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
└── prisma.service.ts
```

### Fluxo de Requisição

```
Cliente HTTP
    ↓
ExpensesController   (roteamento, extração de params/query/body)
    ↓
ExpensesService      (lógica de negócio, agregações, validações)
    ↓
PrismaService        (acesso ao banco de dados)
    ↓
PostgreSQL
```

---

## Scripts Disponíveis

### Backend

| Script              | Descrição                              |
|---------------------|----------------------------------------|
| `npm run start:dev` | Inicia em modo watch (desenvolvimento) |
| `npm run start`     | Inicia em modo padrão                  |
| `npm run start:prod`| Inicia o build de produção             |
| `npm run build`     | Compila para `dist/`                   |
| `npm run test`      | Executa testes unitários               |
| `npm run test:e2e`  | Executa testes end-to-end              |
| `npm run lint`      | Lint + fix automático                  |

### Frontend

| Script          | Descrição                        |
|-----------------|----------------------------------|
| `npm run dev`   | Inicia o dev server (Vite)       |
| `npm run build` | Gera build de produção em `dist/`|
| `npm run lint`  | Executa ESLint                   |
| `npm run preview` | Preview do build de produção   |

---

## Pontos de Atenção Técnica

- O campo `type` no banco de dados corresponde ao campo `category` nos DTOs do frontend — há inconsistência de nomenclatura que deve ser resolvida
- O método `remove` em `ExpensesService` retorna apenas uma string de placeholder em vez de executar a exclusão real; o método `removeMany` contém a implementação correta mas não é chamado pelo controller
- O método `findOne` usa `this.prisma.findUnique` incorretamente — deveria ser `this.prisma.expense.findUnique`
- Os dados de dashboard no frontend ainda são estáticos (`$495.99`, `$70.856`) — aguardando integração com a API
