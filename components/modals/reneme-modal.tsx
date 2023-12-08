import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteModal } from "@/hooks/use-delete-modal";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { useToast } from "../ui/use-toast";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useRenameModal } from "@/hooks/use-rename-modal";
import { Input } from "../ui/input";

export const RenameModal = () => {
  const { id, isOpen, onClose, onOpen, fileName } = useRenameModal();
  const { user } = useUser();
  const { toast } = useToast();
  const [input, setInput] = useState(fileName);

  const onRename = async () => {
    if (!user) return;

    updateDoc(doc(db, "users", user.id!, "files", id!), {
      fileName: input,
    }).then(() => {
      onClose();

      toast({
        description: "File renamed.",
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-slate-900 dark:border-slate-700 bg-white">
        <DialogHeader>
          <DialogTitle>Reneme the file</DialogTitle>
          <Input
            id="name"
            defaultValue={fileName}
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="default" onClick={onRename}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
