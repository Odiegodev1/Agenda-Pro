"use client"

import { UploadButton } from "@uploadthing/react"
import type { UploadRouter } from "@/app/api/uploadthing/core"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"
import { toast } from "sonner"

type Props = {
  image?: string | null
  name?: string | null
}

export function AvatarUploader({ image, name }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="size-40 border">
          <AvatarImage src={image || ""} />
          <AvatarFallback>
            {name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="absolute bottom-2 right-2 rounded-full bg-black/70 p-2">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </div>

      <UploadButton<UploadRouter, "avatar">
        endpoint="avatar"
        onUploadBegin={() => {
          toast.loading("Enviando imagem...")
        }}
        onClientUploadComplete={() => {
          toast.dismiss()
          toast.success("Foto atualizada com sucesso!")
          window.location.reload()
        }}
        onUploadError={(error) => {
          toast.dismiss()
          toast.error(error.message)
        }}
        appearance={{
          
          button:
            "bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg px-4 py-2",
        }}
      />
    </div>
  )
}
