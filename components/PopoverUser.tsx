"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Crown } from "lucide-react"
import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"

type UserData ={
    user:{
        name: string,
        email: string
        image: string
    }
}
export function PopoverUser({user}: UserData) {
    async function handleLogout() {
        await signOut()
    }
    function handlenavigation() {
       redirect("/configuracoes")
    }
  return (
    <Popover  >
      <PopoverTrigger asChild className="h-15 mb-4">
        
          

      <div className="w-full">
          <Button variant="outline" className="p-0 w-full h-12 sm:hidden group-data-[state=expanded]:block">
      <div className="w-full flex items-start justify-center">
           <div  className="sm:hidden group-data-[state=expanded]:block">
              <div className="flex items-start w-full gap-2">
             <Avatar className="flex items-start justify-start">
                <AvatarImage src={user.image} alt="Avatar" />
            </Avatar>
            <div className="flex flex-col items-start">
                <h1 className="text-md">{user.name}</h1>
                <p className="text-xs text-zinc-600">{user.email}</p>
            </div>
           </div>
         </div>

           
         

         
            
      </div>
        </Button>
        <div className="w-full  items-center max-w-[50px]  mx-auto pt-3 gap-4 hidden group-data-[state=collapsed]:block ">
                         <Avatar className="flex items-start justify-start">
                <AvatarImage src={user.image} alt="Avatar" />
            </Avatar>
                   </div>
      </div>
          

      </PopoverTrigger>
      <PopoverContent  className="w-80 mb-7">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Ajuste de Conta</h4>
            
          </div>
         <div className="space-y-3">
            <Button variant="outline" onClick={handlenavigation} className="w-full h-12">Editar Perfil</Button>
            <Button onClick={handleLogout} variant="destructive" className="w-full h-12">Sair da Conta</Button>
         
         </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
