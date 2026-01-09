"use client"

import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import {
  profileSchema,
  ProfileSchema,
} from "@/app/(AgendaPro)/schema/profile_schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { WorkingHoursDialog } from "./WorkingHoursDialog"
import { Button } from "./ui/button"
import { updateUser } from "@/app/(AgendaPro)/actios/update_user"

type FormConfigProps = {
  name: string
  location : string
  openTime : string
  closeTime : string
}

export function FormConfig({ name, location, openTime, closeTime }: FormConfigProps) {
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || "",
      location: location || "",
      openTime: openTime || "",
      closeTime: closeTime || "",
    },
  })

  const openTimev = form.watch("openTime")
  const closeTimev = form.watch("closeTime")
async function onSubmit(data: ProfileSchema) {
    await updateUser(data);
}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Diego" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Endereço */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço Completo</FormLabel>
              <FormControl>
                <Input placeholder="Rua 12, centro, n19" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Horário de funcionamento */}
        <FormItem>
          <FormLabel>Horário de funcionamento</FormLabel>
          <FormControl>
            <WorkingHoursDialog
              openTime={openTimev}
              closeTime={closeTimev}
              onConfirm={(open, close) => {
                form.setValue("openTime", open, { shouldValidate: true })
                form.setValue("closeTime", close, { shouldValidate: true })
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button type="submit" className="w-full">Salvar</Button>
      </form>
    </Form>
  )
}
