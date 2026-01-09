
import { Agendamento } from "@/components/Agendamento";
import { ButtonAgendamento } from "@/components/buttonagedamento";
import { CopyAgenda } from "@/components/copyagedameto";

import { Notifications } from "@/components/Notifications";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { CalendarDays, CopyCheck, CopyCheckIcon, Link2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDay } from "react-day-picker";

export default async function AgendaProHome(){
    const session = await auth()
    if(!session){
        return redirect("/")
    }
    return(
       <section className="flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-3 justify-end w-full">
               <ButtonAgendamento userId="cmk4t8pnj0000qwtc3t5uw7i6" />
               <CopyAgenda userId="cmk4t8pnj0000qwtc3t5uw7i6" />
            </div>
            <main className="flex-1  gap-10 md:flex space-y-10   ">

            <div className="border-2 md:flex-1 h-fit rounded-2xl md:p-6 p-2 ">
                <Agendamento userId="cmk4t8pnj0000qwtc3t5uw7i6" />

            </div>

              <div className=" p-4 border-2 md:w-[730] md:h-fit  rounded-2xl">
                
                <div className="flex items-center w-full justify-between">
                    <h1 className="text-2xl font-bold">Lembrete de agendamentos</h1>
                    <CalendarDays />
                </div>
                 <Notifications  />

                 
                 
            </div>
                
            </main>
            
       </section>
    )
}