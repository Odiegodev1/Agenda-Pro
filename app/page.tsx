"use client"

import { motion } from "framer-motion"
import {
  CalendarCheck,
  Clock,
  Smartphone,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"

export default function LandingPage() {
  async function Login() {
    await signIn("github", { redirectTo: "/login" })
  }

  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">

      {/* 🌫️ glows */}
      <motion.div
        className="absolute -top-40 -left-40 w-[35rem] h-[35rem] bg-indigo-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-emerald-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-indigo-400">
            <Sparkles className="w-4 h-4" />
            Agendamentos inteligentes
          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold">
            Sua agenda no piloto automático
            <span className="block bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              sem dor de cabeça
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-400">
            Chega de mensagens perdidas, horários confusos e clientes faltando.
            Centralize tudo em um só lugar.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={Login}
              className="inline-flex items-center gap-2 rounded-xl
              bg-indigo-600 px-8 py-4 font-semibold hover:bg-indigo-700 transition"
            >
              Começar agora
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="#plans"
              className="inline-flex items-center justify-center rounded-xl
              border border-zinc-700 px-8 py-4 text-zinc-300 hover:bg-zinc-800 transition"
            >
              Ver planos
            </Link>
          </div>
        </motion.div>
      </section>

      {/* POR QUE USAR */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: Clock,
              title: "Economize tempo",
              text: "Menos mensagens, menos chamadas, mais foco no seu trabalho.",
            },
            {
              icon: CalendarCheck,
              title: "Agenda organizada",
              text: "Todos os horários em um só lugar, sem conflitos.",
            },
            {
              icon: Smartphone,
              title: "Clientes agendam sozinhos",
              text: "Seu link funciona 24h por dia, até quando você dorme.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-8 backdrop-blur-xl"
            >
              <item.icon className="w-10 h-10 text-indigo-400" />
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-zinc-400">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PLANOS */}
      <section id="plans" className="relative z-10 py-32 bg-zinc-900/40">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">Planos simples e justos</h2>
          <p className="mt-4 text-zinc-400">
            Comece grátis e evolua conforme seu negócio cresce.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "R$ 0",
                features: ["1 serviço", "Agenda básica", "Página pública"],
              },
              {
                name: "Pro",
                price: "R$ 29/mês",
                highlight: true,
                features: [
                  "Serviços ilimitados",
                  "Agendamentos ilimitados",
                  "Notificações",
                ],
              },
              {
                name: "Premium",
                price: "R$ 59/mês",
                features: [
                  "Tudo do Pro",
                  "WhatsApp",
                  "Relatórios",
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 border backdrop-blur-xl
                ${
                  plan.highlight
                    ? "bg-indigo-600/10 border-indigo-500"
                    : "bg-zinc-900/70 border-zinc-800"
                }`}
              >
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-3xl font-bold">{plan.price}</p>

                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={Login}
                  className="mt-8 w-full rounded-xl bg-zinc-800 py-3 hover:bg-zinc-700 transition"
                >
                  Começar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative z-10 py-40 text-center">
        <h2 className="text-4xl font-bold">
          Comece hoje. É grátis.
        </h2>
        <p className="mt-4 text-zinc-400">
          Leva menos de 2 minutos para configurar.
        </p>

        <button
          onClick={Login}
          className="inline-flex mt-10 items-center gap-2 rounded-xl
          bg-emerald-600 px-10 py-4 font-semibold hover:bg-emerald-700 transition"
        >
          Criar minha agenda
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </main>
  )
}
