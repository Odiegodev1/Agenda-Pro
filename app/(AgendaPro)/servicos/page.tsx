import { DialogServices } from "@/components/dialogservices";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Edit, Plus, X } from "lucide-react";
import { getServicesByUserId } from "../actios/createservice";
import { DeleteServiceButton } from "@/components/DeleteserviceButton";
import { EditServices } from "@/components/EditServices";
import { redirect } from "next/navigation";
import { convertedminInHours } from "@/lib/convertedminInHours";
import { StringInReais } from "@/lib/stringinReais";


export default async function ServicosPage(){
    const user = await auth()
    if(!user){
        return redirect("/")
    }
  const Servicoslist = await getServicesByUserId(user?.user?.id!);
  const {  data: services } = await getServicesByUserId(user?.user?.id!);
  console.log(services)
  console.log(Servicoslist.data)
    return(
        <section className="flex flex-1">
            <div className="border flex-1 h-fit p-4 rounded-2xl">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-xl font-bold">Serviços</h1>

                    <DialogServices />
                </div>
                <main className="flex flex-col mt-10 gap-6">
                   {/*  <p className="text-center text-zinc-400">Nenhum serviço cadastrado(Cadastre um novo serviço)</p> */}
            
                    {Servicoslist.data?.map((service) => (
                <article key={service.id} className="flex items-center justify-between border p-4 rounded-lg">
                    <div>
                        <h2 className="font-semibold text-lg">{service.name} - {StringInReais(service.price!)}</h2>
                        <p className="text-sm text-zinc-400">{convertedminInHours(service.duration)} </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <EditServices services={{serviceId: String(service.id), name: service.name, duration: String(service.duration), price: String(service.price)}}/>
                        
                         <DeleteServiceButton serviceId={service.id} />
                    </div>
                </article>
               ))}
               
               
                </main>

                

            </div>

        </section>
       
    )
}