# 🏦 Credit Now - Frontend (MVP)

Este repositório contém o Frontend do sistema de gestão financeira **Credit Now**.
O projeto foi desenvolvido como um MVP (Produto Mínimo Viável) simulando um SaaS de crédito completo com funcionalidades de gestão de empréstimos, inadimplência, afiliados e segurança.

---

## 🚀 Tecnologias e Stack

- **Core:** React 18 (Vite) + TypeScript
- **Estilização:** Tailwind CSS + Lucide React Icons
- **Infraestrutura:** Docker & Docker Compose (Node 22-alpine)
- **Roteamento:** React Router Dom v6
- **Qualidade de Código:** ESLint + TypeScript Strict Mode

---

## 📦 Como Rodar o Projeto (Docker)

O projeto está totalmente containerizado para garantir o mesmo ambiente em qualquer máquina.

1. **Clone o repositório** para sua máquina local.
2. Na raiz do projeto (onde está o `docker-compose.yml`), execute:

   ```bash
   docker-compose up --build

    3. Aguarde o build finalizar. O servidor de desenvolvimento iniciará automaticamente.

    4.Acesse no navegador: http://localhost:3000

Nota: O container suporta Hot Reload. Qualquer alteração nos arquivos locais será refletida instantaneamente no navegador.

📂 Estrutura de Pastas

frontend/
├── src/
│   ├── components/     # Componentes reutilizáveis (Layout, Modal, Sidebar)
│   ├── pages/          # Telas do sistema (Dashboard, Clientes, Cobrança, etc.)
│   ├── index.css       # Configuração global do Tailwind e Scrollbars
│   └── App.tsx         # Definição de rotas
├── Dockerfile          # Configuração da imagem Node Alpine
└── tailwind.config.js  # Configuração de temas e cores

🔌 Guia de Integração para o Backend (Go)
Atualmente, o Frontend opera com dados mockados (simulados no estado local do React). Para tornar o sistema funcional em produção, o Backend em Go deve implementar os seguintes endpoints RESTful, substituindo os useState do Frontend:

1. Autenticação
POST /api/login

Payload: { email, password }

Response: { token, user: { name, role } }

2. Dashboard & KPIs
GET /api/summary

Response: Totais de valor investido, recebido, inadimplência e lucro líquido.

3. Gestão de Clientes (/clients)
GET /api/clients: Listar clientes (com paginação).

POST /api/clients: Cadastrar novo cliente.

DELETE /api/clients/:id: Remover/Inativar cliente.

4. Cobrança e Contratos (/billing)
GET /api/loans: Listar contratos ativos.

POST /api/loans: Criar novo contrato (Validar cálculo de juros no back).

Regra: O Front envia valor, parcelas e taxa; o Back deve confirmar a tabela Price/SAC.

5. Inadimplência (/overdue)
GET /api/debtors: Listar contratos vencidos.

POST /api/debtors/:id/agreement: Registrar acordo/promessa de pagamento.

6. Afiliados (/affiliates)
GET /api/affiliates: Listar parceiros.

POST /api/affiliates: Cadastrar parceiro.

Regra: O Backend deve gerar o code único (ex: REF-NOME-123).

7. Segurança (/blacklist)
GET /api/blacklist: Listar CPFs bloqueados.

POST /api/blacklist: Adicionar CPF à lista de restrição (Risco Alto/Médio).

🎨 Padrões de Interface (UI/UX)
Login Moderno: Layout com card flutuante, glassmorphism e background animado.

Identidade Visual:

Primary: Slate-900 (#0f172a) - Usado em sidebars e botões principais.

Accent: Yellow-400 (#facc15) - Usado para destaques e ações de atenção.

Background: Slate-50 (#f8fafc) - Fundo suave para reduzir fadiga visual.

Feedback: O sistema utiliza Modais para formulários e Toasts/Alerts para confirmação de ações.

🛠️ Comandos Úteis
Parar containers: docker-compose down

Reconstruir sem cache: docker-compose build --no-cache

Acessar shell do container: docker exec -it credit-app-frontend sh

Desenvolvido por André Duarte da Silva Júnior - 2025.