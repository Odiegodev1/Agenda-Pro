"use client"

import { Button } from "@/components/ui/button"
import { ro } from "date-fns/locale"
import { motion } from "framer-motion"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"

export default function ConfirmacaoAgendamento() {

  return (
    <section className="p-3 relative min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">

      {/* glow animado */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-zinc-900 border border-zinc-800 p-10 text-center shadow-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260 }}
          className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-emerald-500/10"
        >
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </motion.div>

        <h1 className="mt-6 text-2xl font-bold text-white">
          Agendamento confirmado 🎉
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Seu horário foi registrado com sucesso.
          O prestador entrará em contato se necessário.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="rounded-xl bg-emerald-600 py-3 text-white font-medium hover:bg-emerald-700 transition"
          >
            Voltar ao início
          </Link>

      
        </div>
      </motion.div>
    </section>
  )
}
