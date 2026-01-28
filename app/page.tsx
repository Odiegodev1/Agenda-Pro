"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  Smartphone,
  ArrowRight,
  Sparkles,
  Check,
  Crown,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Cta from "@/public/Screenshot_2-removebg-preview.png";
import Cta1 from "@/public/Screenshot_3-removebg-preview.png";
import Cta2 from "@/public/Screenshot_4-removebg-preview.png";
import Calendar from "@/public/calender-dynamic-color.png";
import Assest from "@/public/assests.svg";
import dados from "@/public/Screenshot_5.png";
import servico from "@/public/Screenshot_6.png";
import page from "@/public/Screenshot_7.png";
import age from "@/public/Screenshot_8.png";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function LandingPage() {
  async function Login() {
    await signIn("google", { redirectTo: "/login" });
  }

  return (
    <>
      <main className="  min-h-screen w-full max-w-7xl mx-auto flex flex-col p-4 ">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent p-2 border md:rounded-md rounded-sm">
              <Crown className="md:size-8  size-4" strokeWidth={2.5} />
            </div>
            <h1 className="md:text-4xl text-sm font-extrabold bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-400 inline-block text-transparent bg-clip-text">
              Agenda Pro
            </h1>
          </div>

          <div className="flex gap-5 font-semibold">
            <a
              href=""
              className="hover:text-accent md:flex hidden  hover:border-b transition-all duration-300"
            >
              Perguntas Frequentes
            </a>

            <a
              href=""
              className="hover:text-accent md:flex hidden  hover:border-b transition-all duration-300"
            >
              Como usar
            </a>

            <a
              href=""
              className="hover:text-accent hover:border-b
           transition-all duration-300"
            >
              Pagina de Agendamento
            </a>
          </div>
        </header>

        <div className="w-full h-40 flex items-center justify-center">
          <span className="bg-purple-500/30 text-purple-200/80 w-70 justify-center rounded-2xl text-center border border-purple-700/70 flex gap-2 px-0.5  p-1 text-sm items-center">
            <Sparkles className="ml-1" /> Organize seus horários agora
          </span>
        </div>
        <main className="md:mt-10 w-full md:flex gap-10 items-center justify-between">
          <div className="w-full max-w-3xl  space-y-3.5">
            <h1 className="md:text-7xl text-4xl text-zinc-300 font-extrabold">
              Pare de perder clientes por ,{" "}
              <span className="text-red-500/60 border-b">
                {" "}
                Falta de Organização
              </span>
            </h1>
            <p className="md:text-2xl max-w-160 text-zinc-400">
              Organize seus agendamentos, reduza faltas e facilite a vida dos
              seus clientes com um sistema simples e profissional.
            </p>
            <Button onClick={Login} variant="outline" className="w-full md:h-14 cursor-pointer">
              Ativar o Agenda Pro
            </Button>
          </div>

          <div className="relative md:flex hidden items-center justify-center py-20">
            {/* Glow principal */}
            <div
              className="
      absolute
      bottom-20
      w-[420px]
      h-[260px]
      bg-purple-600/30
      blur-3xl
      rounded-full
      -z-10
    "
            />

            {/* Glow secundário */}
            <div
              className="
      absolute
      bottom-6
      w-[600px]
      h-[180px]
      bg-gradient-to-t
      from-purple-500/30
      to-transparent
      blur-2xl
      -z-20
    "
            />

            {/* Stack de imagens */}
            <div className="relative flex items-center justify-center">
              {/* Imagem de trás - esquerda */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 50, x: 40, scale: 1.05 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Image
                  src={Cta1}
                  alt="Tela de perfil"
                  className="
        relative
        w-[260px]
       
        rotate-[-4deg]
        opacity-70
        scale-95
        shadow-xl
      "
                />
              </motion.div>

              {/* Imagem de trás - direita */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 40, x: 120, scale: 1.05 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Image
                  src={Cta2}
                  alt="Tela de agenda"
                  className="
        
        w-[260px]
       
        rotate-[4deg]
        opacity-70
        scale-95
        shadow-xl
      "
                />
              </motion.div>

              {/* Imagem principal */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, x: -190, scale: 1.05 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={Cta}
                    alt="Tela de agendamento"
                    className="
        relative
        w-[300px]
        z-10
        scale-105
        
      "
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          <div className="relative flex md:hidden items-center justify-center py-20">
            {/* Glow principal */}
            <div
              className="
      absolute
      bottom-20
      w-[420px]
      h-[260px]
      bg-purple-600/30
      blur-3xl
      rounded-full
      -z-10
    "
            />

            {/* Glow secundário */}
            <div
              className="
      absolute
      bottom-6
      w-[600px]
      h-[180px]
      bg-gradient-to-t
      from-purple-500/30
      to-transparent
      blur-2xl
      -z-20
    "
            />

            {/* Stack de imagens */}
            <div className="relative flex items-center justify-center">
              {/* Imagem de trás - esquerda */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 50, x: 40, scale: 1.05 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Image
                  src={Cta1}
                  alt="Tela de perfil"
                  className="
        relative
        w-[260px]
       
        rotate-[-4deg]
        opacity-70
        scale-95
        shadow-xl
      "
                />
              </motion.div>

              {/* Imagem de trás - direita */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 40, x: 120, scale: 1.05 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Image
                  src={Cta2}
                  alt="Tela de agenda"
                  className="
        
        w-[260px]
       
        rotate-[4deg]
        opacity-70
        scale-95
        shadow-xl
      "
                />
              </motion.div>

              {/* Imagem principal */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, x: -110, scale: 1.05 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={Cta}
                    alt="Tela de agendamento"
                    className="
        relative
        w-[300px]
        z-10
        scale-105
        
      "
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>

        <div className="mt-20 mb-50"></div>

<main className="mt-10 mb-30 px-4">
  <div className="w-full mt-20">
    <div className="flex flex-col lg:flex-row w-full items-start gap-12">
      
      {/* Lado esquerdo */}
      <div className="w-full lg:w-[420px]">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Como usar?
        </h1>

        <Image src={Calendar} alt="" className="w-32 sm:w-40 mt-6" />

     
      </div>

      {/* Cards */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        
        {/* Card 1 */}
        <div className="w-full bg-gradient-to-t rounded-2xl border border-zinc-800 from-zinc-950 via-zinc-900/80 to-zinc-950 text-white overflow-hidden">
          <h1 className="text-center font-bold mt-3 text-lg sm:text-xl">
            1. Preencha os dados
          </h1>
          <div className="relative [perspective:1200px]">
            <Image
              src={dados}
              alt=""
              quality={100}
              className="
                w-full
                translate-y-6
                sm:translate-y-10
                rotate-x-[12deg]
                sm:rotate-x-[20deg]
                rounded-xl
              "
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full bg-gradient-to-t rounded-2xl border border-zinc-800 from-zinc-950 via-zinc-900/80 to-zinc-950 text-white overflow-hidden">
          <h1 className="text-center font-bold mt-3 text-lg sm:text-xl">
            2. Crie seus serviços
          </h1>
          <div className="relative [perspective:1200px]">
            <Image
              src={servico}
              alt=""
              quality={100}
              className="
                w-full
                translate-y-6
                sm:translate-y-10
                rotate-x-[12deg]
                sm:rotate-x-[20deg]
                rounded-xl
              "
            />
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full bg-gradient-to-t rounded-2xl border border-zinc-800 from-zinc-950 via-zinc-900/80 to-zinc-950 text-white overflow-hidden">
          <h1 className="text-center font-bold mt-3 text-lg sm:text-xl">
            3. Realize os agendamentos
          </h1>
          <div className="relative [perspective:1200px]">
            <Image
              src={page}
              alt=""
              quality={100}
              className="
                w-full
                translate-y-6
                sm:translate-y-10
                rotate-x-[12deg]
                sm:rotate-x-[20deg]
                rounded-xl
              "
            />
          </div>
        </div>

        {/* Card 4 */}
        <div className="w-full bg-gradient-to-t rounded-2xl border border-zinc-800 from-zinc-950 via-zinc-900/80 to-zinc-950 text-white overflow-hidden">
          <h1 className="text-center font-bold mt-3 text-lg sm:text-xl">
            4. Agenda pronta
          </h1>
          <div className="relative [perspective:1200px]">
            <Image
              src={age}
              alt=""
              quality={100}
              className="
                w-full
                translate-y-10
                sm:translate-y-14
                rotate-x-[12deg]
                sm:rotate-x-[20deg]
                rounded-xl
              "
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</main>


        <main className="mt-30">
          <h1 className="text-3xl font-bold text-center">
            Perguntas Frequente
          </h1>
          <div>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>O que é o Agenda Pro?</AccordionTrigger>
                <AccordionContent>
                  O Agenda Pro é um sistema de agendamento online feito para
                  barbeiros, clínicas e prestadores de serviço que querem
                  organizar seus horários e receber mais clientes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Meus clientes conseguem agendar sozinhos?
                </AccordionTrigger>
                <AccordionContent>
                  Sim. Seus clientes podem escolher o horário disponível e
                  agendar online, sem você precisar responder mensagens o tempo
                  todo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  O Agenda Pro funciona no celular?
                </AccordionTrigger>
                <AccordionContent>
                  Funciona perfeitamente no celular, tablet e computador. Você
                  pode gerenciar sua agenda de qualquer lugar.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Posso usar para barbearia ou clínica?
                </AccordionTrigger>
                <AccordionContent>
                  Sim. O Agenda Pro é ideal tanto para barbearias quanto para
                  clínicas, salões e outros tipos de atendimento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Preciso instalar algum aplicativo?
                </AccordionTrigger>
                <AccordionContent>
                  Não. O Agenda Pro funciona direto no navegador, sem precisar
                  instalar nada no celular ou computador.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Tem período de teste?</AccordionTrigger>
                <AccordionContent>
                  Sim. Você pode testar o Agenda Pro gratuitamente antes de
                  decidir contratar.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </main>
      </main>
      <footer className="w-full border-t border-white/10 bg-black/95 mt-50 text-gray-300">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Grid principal */}
          <div className="grid gap-10 md:grid-cols-3">
            {/* Logo / Marca */}
            <div>
              <h2 className="text-xl font-bold text-white">
                Agenda<span className="text-purple-500">Pro</span>
              </h2>
              <p className="mt-3 text-sm text-gray-400 max-w-xs">
                Sistema de agendamento online para barbeiros, clínicas e
                prestadores que querem mais clientes e menos dor de cabeça.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Produto</h3>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-purple-400 transition">
                  Funcionalidades
                </li>
                <li className="hover:text-purple-400 transition">Planos</li>
                <li className="hover:text-purple-400 transition">
                  Perguntas frequentes
                </li>
                <li className="hover:text-purple-400 transition">Contato</li>
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">
                Comece agora
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Organize seus horários e comece a receber agendamentos online
                hoje mesmo.
              </p>
              <button
                className="
          rounded-lg
          bg-purple-600
          px-5
          py-2
          text-sm
          font-medium
          text-white
          hover:bg-purple-500
          transition
        "
              >
                Começar agora
              </button>
            </div>
          </div>

          {/* Linha inferior */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Agenda Pro. Todos os direitos
              reservados.
            </p>

            <p className="text-xs text-gray-500">
              Desenvolvido por{" "}
              <span className="font-medium text-purple-400">Diego Dev</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
