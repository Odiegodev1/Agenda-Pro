import { checkDataAccess } from "@/app/(AgendaPro)/actios/data_acess";
import { CalendarAgendamento } from "@/components/calendarAgendamento";
import { AvailableHours } from "@/components/slot";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"
import { LocateFixed } from "lucide-react";
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { BookingClient } from "@/components/booking";
import { se } from "date-fns/locale";
import { checkPlanLimits } from "@/app/(AgendaPro)/actios/checkplan";


export default async function SlugPage({
  params,
}: {
 params: Promise<{ slug: string }>;
}){

  const userId = (await params).slug;
  const user = await checkDataAccess({userId: userId});
  const userdata = {
    name : user.data?.name,
    location: user.data?.location,
    openTime: user.data?.openTime,
    closeTime: user.data?.closeTime,
    services: user.data?.services,
    img: user.data?.image,
  
  };

  if(!user.data){
    return redirect("/")
  }
  const plan = await checkPlanLimits()
  if(!plan.allowed){
   return redirect("/")
  }
  return(
   <div className="p-4">
        <BookingClient
      userId={userId}
      user={userdata  }
    />
   </div>
  )
}

