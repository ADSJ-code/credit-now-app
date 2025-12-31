db = db.getSiblingDB('lms_creditnow');

db.createCollection('users');
db.users.insertMany([
  {
    "full_name": "André Duarte",
    "email": "admin@creditnow.com.br",
    "role": "ADMIN",
    "position": "Gestor Geral",
    "password_hash": "hash_seguro_aqui",
    "active": true,
    "created_at": new Date()
  }
]);

db.createCollection('clients');
db.clients.insertMany([
  {
    "name": "João da Silva",
    "cpf": "123.456.789-00",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999",
    "city": "São Paulo, SP",
    "address": "Rua das Flores, 123",
    "status": "Ativo",
    "created_at": new Date()
  },
  {
    "name": "Maria Oliveira",
    "cpf": "222.333.444-55",
    "email": "maria@email.com",
    "phone": "(21) 98888-8888",
    "city": "Rio de Janeiro, RJ",
    "address": "Av. Atlântica, 500",
    "status": "Pendente",
    "created_at": new Date()
  }
]);

db.createCollection('loans');
db.loans.insertMany([
  {
    "contract_number": "EMP-2024-001",
    "client_cpf": "123.456.789-00",
    "principal_amount": 5000.00,
    "total_amount": 6600.00, 
    "installments_count": 12,
    "interest_rate": 5.0,
    "next_due_date": new Date("2025-08-10"),
    "status": "Em Dia",
    "created_at": new Date()
  },
  {
    "contract_number": "EMP-2024-002",
    "client_cpf": "222.333.444-55",
    "principal_amount": 12000.00,
    "total_amount": 15000.00,
    "installments_count": 24,
    "interest_rate": 4.5,
    "next_due_date": new Date("2025-08-05"),
    "status": "Atrasado",
    "created_at": new Date()
  }
]);

db.createCollection('blacklist');
db.blacklist.insertMany([
  {
    "name": "Ricardo S.",
    "document": "333.222.111-00",
    "reason": "Fraude confirmada em documentos",
    "risk_level": "Alto",
    "blocked_at": new Date("2024-05-12"),
    "notes": "Tentativa de uso de RG falso na filial SP."
  },
  {
    "name": "Empresa X Ltda",
    "document": "12.345.678/0001-99",
    "reason": "Sócios com restrição global",
    "risk_level": "Alto",
    "blocked_at": new Date("2024-07-01"),
    "notes": "Solicitação do jurídico."
  }
]);

db.createCollection('affiliates');
db.affiliates.insertMany([
  {
    "name": "Consultoria Financeira ABC",
    "code": "REF-ABC-2024",
    "email": "contato@abc.com",
    "commission_rate": 10.0,
    "total_referrals": 45,
    "total_earned": 4500.00,
    "status": "Ativo",
    "pix_key": "12.345.678/0001-90",
    "created_at": new Date()
  }
]);

db.createCollection('audit_logs');
db.audit_logs.insertMany([
  {
    "user": "André Duarte",
    "action": "Bloqueio de CPF",
    "target": "Ricardo S. (333.***)",
    "type": "critical",
    "timestamp": new Date("2024-07-15T14:30:00")
  },
  {
    "user": "Sistema",
    "action": "Backup Automático",
    "target": "Banco de Dados",
    "type": "system",
    "timestamp": new Date("2024-07-14T03:00:00")
  }
]);

print("Banco de dados LMS CreditNow populado com sucesso!");