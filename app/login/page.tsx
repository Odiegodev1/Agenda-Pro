"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight, User } from "lucide-react"
import Link from "next/link"

export default function UsuarioOk() {
  return (
    <section className="p-3 relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-zinc-100">

      {/* 🌫️ blobs animados */}
      <motion.div
        className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], x: [0, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], y: [0, -60, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🧾 card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl
        shadow-2xl shadow-indigo-500/20 p-10 flex flex-col items-center text-center"
      >
        {/* 👤 ícone */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30
          flex items-center justify-center shadow-inner"
        >
          <User className="w-12 h-12 text-indigo-400" />
        </motion.div>

        {/* ✨ título */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-2xl font-bold"
        >
          Tudo pronto, Diego! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-3 text-sm text-zinc-400 leading-relaxed"
        >
          Seu perfil foi configurado com sucesso.  
          Agora você pode gerenciar sua agenda, serviços  
          e atender seus clientes com mais profissionalismo.
        </motion.p>

        {/* 🎯 ações */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col gap-3 w-full"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/agendamentos"
              className="flex items-center justify-center gap-2 rounded-xl
              bg-gradient-to-r from-indigo-600 to-purple-600
              py-3 text-white font-medium shadow-lg shadow-indigo-600/30
              hover:from-indigo-500 hover:to-purple-500 transition"
            >
              Ir para agenda
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/configuracoes"
              className="flex items-center justify-center gap-2 rounded-xl
              border border-zinc-700 py-3 text-zinc-300
              hover:bg-zinc-800 transition"
            >
              Ajustar perfil
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
