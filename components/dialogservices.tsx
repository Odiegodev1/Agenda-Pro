import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { FormServices } from "./FormServices";

export function DialogServices() {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button><Plus /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Novo Serviço</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    <FormServices />
                </div>
            </DialogContent>
        </Dialog>
    )
}