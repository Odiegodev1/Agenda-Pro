"use client"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { createServiceSchema, CreateServiceSchema } from "@/app/(AgendaPro)/schema/createservices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { createService } from "@/app/(AgendaPro)/actios/createservice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function FormServices(){
    const router = useRouter()
    const form = useForm<CreateServiceSchema>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            name: "",
            duration: "",
            price: "",
        }
    })

    async function onSubmit(data: CreateServiceSchema) {
        const response = await createService(data)
        if(response.error){
            return toast.error(response.error)
        }
        toast.success("Serviço criado com sucesso!")
        form.reset()
        router.refresh()
        return;
    }
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Nome do serviço</FormLabel>
     
      <FormControl>
        <Input placeholder="Ex: Corte de cabelo" {...field} />
      </FormControl>
     
      <FormMessage />
    </FormItem>
  )}
/>

                            <FormField
  control={form.control}
  name="duration"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Duração do serviço</FormLabel>
     
      <FormControl>
        <Input type="number" placeholder="Duração do serviço (minutos) - (ex: 30min)" {...field} />
      </FormControl>
     
      <FormMessage />
    </FormItem>
  )}
/>

                            <FormField
  control={form.control}
  name="price"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Preço do serviço</FormLabel>
     
      <FormControl>
        <Input type="number" placeholder="EX: R$ 40,00" {...field} />
      </FormControl>
     
      <FormMessage />
    </FormItem>
  )}
/>


<Button type="submit" className="w-full">Salvar</Button>


            </form>
        </Form>
    )
}