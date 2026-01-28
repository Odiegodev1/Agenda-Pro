import { AlertSite } from "@/components/AlertSite";
import { AppSidebar } from "@/components/appsidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const session =  await   auth()
const userid = session?.user?.id
  return (
     <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-[60px] shrink-0 border-b items-center justify-between px-4">
            <div className="flex-1 flex items-center md:gap-18 gap-4">
                <SidebarTrigger className="flex md:hidden" />
              
              <AlertSite userId={userid}  />

            </div>
        
        </header>
      <main className="flex flex-1 flex-col dark  p-4">
            <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[26rem] h-[26rem] bg-emerald-500/10 rounded-full blur-3xl" />
    </div>
        {children}
      </main>
      </SidebarInset>
    </SidebarProvider>

     

  );
}
