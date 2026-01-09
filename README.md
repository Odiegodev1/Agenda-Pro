# ✂️ AgendaPro

Sistema de **agendamento online inteligente** para barbeiros, estúdios, clínicas e prestadores de serviço.

Com o AgendaPro, seus clientes agendam sozinhos, você organiza sua agenda em um só lugar e evita conflitos de horários — tudo com uma interface moderna, rápida e profissional.

---

## 🚀 Funcionalidades

### 👤 Para o Prestador
- 📅 Agenda diária com visualização por data
- ⏰ Horários inteligentes (sem conflitos)
- 🧾 Cadastro de serviços (duração e preço)
- 🔔 Notificações de novos agendamentos
- 🧠 Status do agendamento (Agendado, Concluído, Faltou, Cancelado)
- 📊 Histórico de clientes
- 🔗 Link público de agendamento
- 🌙 Interface moderna em **tema dark**

### 👥 Para o Cliente
- ⚡ Agendamento rápido (menos de 1 minuto)
- 📱 Página pública por link
- 🕒 Apenas horários disponíveis
- ❌ Sem necessidade de cadastro
- 📍 Visual limpo e intuitivo (mobile-first)

---

## 🧠 Por que usar o AgendaPro?

- Chega de mensagens perdidas no WhatsApp
- Evita horários duplicados
- Organização total da agenda
- Mais profissionalismo para seu negócio
- Mais tempo livre para você focar no atendimento

---

## 🧩 Tecnologias Utilizadas

- **Next.js 14** (App Router)
- **React**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **NextAuth**
- **Tailwind CSS**
- **ShadCN UI**
- **Framer Motion**
- **Zod**
- **React Hook Form**

---

## 📁 Estrutura do Projeto

```txt
app/
 ├─ (AgendaPro)/
 │   ├─ agendamentos/
 │   ├─ servicos/
 │   ├─ configuracoes/
 │   ├─ planos/
 │   ├─ schema/
 │   └─ actions/
 ├─ api/
 ├─ layout.tsx
 └─ page.tsx

components/
 ├─ BookingClient.tsx
 ├─ CalendarAgendamento.tsx
 ├─ AvailableHours.tsx
 ├─ Notifications.tsx
 ├─ Dialogs/
 └─ UI/

prisma/
 └─ schema.prisma
