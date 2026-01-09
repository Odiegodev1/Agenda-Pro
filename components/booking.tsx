"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarAgendamento } from "@/components/calendarAgendamento"
import { AvailableHours } from "@/components/slot"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LocateFixed, Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import {
  createAgendamentoSchema,
  CreateAgendamentoSchema,
} from "@/app/(AgendaPro)/schema/createagendamento"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { CreateAgendamentoData } from "@/app/(AgendaPro)/actios/create-agendamento"
import { toast } from "sonner"
import { redirect, useRouter } from "next/navigation"

export function BookingClient({ userId, user }: any) {
  const [selectedDate, setSelectedDate] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [serviceDuration, setServiceDuration] = useState<number | null>(null)

  const router = useRouter()

  const form = useForm<CreateAgendamentoSchema>({
    resolver: zodResolver(createAgendamentoSchema),
    defaultValues: {
      clientName: "",
      clientPhone: "",
      date: "",
      serviceId: "",
      hour: "",
    },
  })

  const watchedHour = form.watch("hour")

  async function onSubmit(data: CreateAgendamentoSchema) {
    const response = await CreateAgendamentoData(data)

    if (response.error) {
      return toast.error(response.error)
    }

    toast.success("Agendamento criado com sucesso!")
    form.reset()
    router.refresh()
    redirect(`/ok/${response.data?.newAgendamento.id}`)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl shadow-2xl p-8 md:p-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="size-20 ring-2 ring-indigo-500/30">
            <AvatarFallback>
              {user.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
            <AvatarImage src={user.img || ""} />
          </Avatar>

          <h1 className="mt-4 text-2xl font-bold text-white">
            {user.name}
          </h1>

          <p className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
            <LocateFixed className="w-4 h-4" />
            {user.location}
          </p>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1 text-xs text-indigo-400">
            <Sparkles className="w-4 h-4" />
            Agende seu horário
          </span>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-10 space-y-6"
          >
            {/* Nome */}
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Nome completo
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-zinc-950 border-zinc-800 focus:border-indigo-500"
                      placeholder="Digite seu nome"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Telefone */}
            <FormField
              control={form.control}
              name="clientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Telefone
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-zinc-950 border-zinc-800 focus:border-indigo-500"
                      placeholder="(99) 99999-9999"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Data */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Data
                  </FormLabel>
                  <FormControl>
                    <CalendarAgendamento
                      value={field.value}
                      onChange={(date) => {
                        field.onChange(date)
                        setSelectedDate(date)
                        form.setValue("hour", "")
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Serviço */}
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Serviço
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        setServiceId(value)
                        const service = user.services?.find(
                          (s: any) => s.id === value
                        )
                        setServiceDuration(service?.duration ?? null)
                        form.setValue("hour", "")
                      }}
                    >
                      <SelectTrigger className="bg-zinc-950 border-zinc-800">
                        <SelectValue placeholder="Selecione um serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Serviços</SelectLabel>
                          {user.services?.map((service: any) => (
                            <SelectItem
                              key={service.id}
                              value={service.id}
                            >
                              {service.name} • {service.duration} min
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Horários */}
            {selectedDate && serviceDuration && (
              <FormField
                control={form.control}
                name="hour"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AvailableHours
                        userId={userId}
                        date={selectedDate}
                        serviceDuration={serviceDuration}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Botão */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                disabled={!selectedDate || !watchedHour || !serviceId}
                className="w-full h-12 text-base font-semibold rounded-xl
                bg-gradient-to-r from-zinc-600 to-purple-600
                hover:zinc-zinc-700 hover:to-purple-700"
              >
                Confirmar agendamento
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </section>
  )
}
