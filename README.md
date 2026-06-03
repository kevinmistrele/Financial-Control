# Financial Control

Aplicação web de controle financeiro pessoal. Registre, categorize e visualize seus gastos em um dashboard simples e direto.

---

## Stack

**Frontend** — React 19 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Recharts  
**Backend** — NestJS 11 · TypeScript · Prisma ORM  
**Banco de dados** — PostgreSQL 15 (Docker)

---

## Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- npm

---

## Setup

### 1. Banco de dados

```bash
docker-compose up -d
```

Isso sobe um container PostgreSQL na porta `5433`.

### 2. Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` dentro de `backend/`:

```env
DATABASE_URL="postgresql://admin:admin@localhost:5433/financas"
```

Execute as migrações e inicie o servidor:

```bash
npx prisma migrate deploy
npm run start:dev
```

O servidor sobe em `http://localhost:3000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

O app abre em `http://localhost:5173`.

---

## Estrutura do projeto

```
Financial-Control/
├── frontend/                  # SPA React + Vite
│   └── src/
│       ├── design-system/     # Tokens de cor, tipagem de categorias
│       ├── components/        # Componentes de UI e dashboard
│       ├── contexts/          # TransactionContext (estado global)
│       ├── pages/             # Dashboard, NotFound
│       ├── types/             # Interfaces de domínio
│       └── constants/         # Categorias, meses, dados mockados
├── backend/                   # API REST NestJS
│   └── src/
│       ├── expenses/          # Controller, Service, DTOs
│       └── prisma.service.ts
├── docs/
│   ├── product.md             # Documentação de produto
│   └── technical.md          # Documentação técnica
└── docker-compose.yml
```

---

## API

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/expenses` | Criar despesa |
| `GET` | `/expenses?page=&limit=&order=` | Listar com paginação |
| `GET` | `/expenses/dashboard-report?days=7\|15\|30` | Relatório do dashboard |
| `GET` | `/expenses/:id` | Buscar por ID |
| `PATCH` | `/expenses/:id` | Atualizar despesa |
| `DELETE` | `/expenses?ids=id1,id2` | Excluir (máx. 10 por vez) |

---

## Categorias disponíveis

`food` · `transportation` · `bills` · `entertainment` · `healthcare` · `education` · `shopping` · `general`

---

## Scripts

### Backend

| Comando | Descrição |
|---------|-----------|
| `npm run start:dev` | Modo watch (desenvolvimento) |
| `npm run build` | Build de produção |
| `npm run test` | Testes unitários |
| `npm run test:e2e` | Testes end-to-end |

### Frontend

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Dev server |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |

---

## Documentação

- [Documentação de Produto](./docs/product.md)
- [Documentação Técnica](./docs/technical.md)
