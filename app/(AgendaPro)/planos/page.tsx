"use client"

import { SubscribeButton } from "@/components/buttonstripe"
import { auth } from "@/lib/auth"
import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

const plans = [
 
  {
    name: "Pro",
    price: "R$ 29,90",
    description: "Mais popular",
    features: [
      "Serviços ilimitados",
      "Agendamentos ilimitados",
      "Notificações",
      "Status de agendamento",
      "Página personalizada",
    ],
    highlight: true,
  },
  
]

export default   function PlanosPage() {
     
  return (
    <section className="rounded-2xl relative min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white overflow-hidden">
      
      {/* 🌫 Glow decorativo */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold">
            Escolha o plano ideal 🚀
          </h1>
          <p className="mt-4 text-zinc-400">
            Evolua sua agenda e profissionalize seu atendimento
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className={`relative rounded-3xl border p-8 backdrop-blur-xl transition
                ${
                  plan.highlight
                    ? "border-indigo-500 bg-indigo-500/10 shadow-2xl shadow-indigo-500/30"
                    : "border-zinc-800 bg-zinc-900/70"
                }`}
            >
              {/* Badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-indigo-600 px-4 py-1 text-sm font-medium">
                  <Star className="w-4 h-4" />
                  Mais popular
                </div>
              )}

              <h2 className="text-2xl font-semibold">
                {plan.name}
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                {plan.description}
              </p>

              <p className="mt-6 text-4xl font-bold">
                {plan.price}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <Check className="w-4 h-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <SubscribeButton />
                
        
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
