"use client"

import { useEffect, useState } from "react"
import { getNotifications, markNotificationAsRead } from "@/app/(AgendaPro)/actios/create-agendamento"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { toast } from "sonner"

type Notification = {
  id: string
  title: string
  message: string
  createdAt: string
  read: boolean
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  async function load() {
    const data = await getNotifications()
    setNotifications(data as any)
  }

  useEffect(() => {
    load()
    const interval = setInterval(load, 5000)
    return () => clearInterval(interval)
  }, [])

  const unread = notifications.filter((n) => !n.read)
  const history = notifications.filter((n) => n.read)

  async function handleMarkAsRead(id: string) {
    await markNotificationAsRead(id)

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    )

    toast.success("Marcado como lido")
  }

  return (
    <Tabs defaultValue="unread" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4 mt-4">
        <TabsTrigger value="unread">
          Não lidas ({unread.length})
        </TabsTrigger>
        <TabsTrigger value="history">
          Histórico
        </TabsTrigger>
      </TabsList>

      
      <TabsContent value="unread">
        {unread.length === 0 && (
          <p className="text-sm text-zinc-500">
            Nenhuma notificação nova
          </p>
        )}

        {unread.map((n) => (
          <div
            key={n.id}
            className="border-b mb-2 bg-zinc-800 rounded-md p-4 flex items-center justify-between"
          >
            <div className="">
              <h2 className="font-semibold md:text-md text-sm">{n.title}</h2>
              <p className="md:text-sm text-xs text-zinc-400 whitespace-pre-line">
                {n.message}
              </p>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleMarkAsRead(n.id)}
            >
              <Check className="w-4 h-4 mr-1 md:flex hidden"  />
              Lido
            </Button>
          </div>
        ))}
      </TabsContent>

      {/* 📜 HISTÓRICO */}
      <TabsContent value="history">
        {history.length === 0 && (
          <p className="text-sm text-zinc-500">
            Nenhuma notificação no histórico
          </p>
        )}

        {history.map((n) => (
          <div
            key={n.id}
            className="border-b p-4 opacity-60"
          >
            <h2 className="font-medium md:text-md text-sm">{n.title}</h2>
            <p className="md:text-sm text-xs text-zinc-500 whitespace-pre-line">
              {n.message}
            </p>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  )
}
