"use client"
import { Link2 } from "lucide-react"
import { toast } from "sonner"

export function CopyAgenda({userId} : {userId: string}){
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/agenda/${userId}`

    function copyageda(){
       const copy =  navigator.clipboard.writeText(url)
       if(!copy){
         return toast.error("Error ao copiar")
       }
       toast.success("Copiado com sucesso")
       
    }

    return(
            <button
  onClick={copyageda}
  className="
    group inline-flex items-center gap-2
    rounded-lg px-3 py-1.5
    text-sm font-medium
    bg-zinc-900 border border-zinc-800
    text-zinc-300
    hover:bg-zinc-800 hover:text-white
    transition
  "
>
  <Link2 className="w-4 h-4 text-indigo-400" />
  Copiar link público
</button>

    )
}