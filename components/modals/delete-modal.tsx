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

import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { useToast } from "../ui/use-toast";
import { deleteDoc, doc } from "firebase/firestore";

export const DeleteModal = () => {
  const { id, isOpen, onClose, onOpen } = useDeleteModal();
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    if (!user) return;

    const fileRef = ref(storage, `users/${user.id}/files/${id}`);
    await deleteObject(fileRef).then(async () => {
      deleteDoc(doc(db, "users", user.id!, "files", id!)).then(() => {
        onClose();

        toast({
          description: "File deleted.",
        });
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-slate-900 dark:border-slate-500 bg-white">
        <DialogHeader>
          <DialogTitle>Are you sure you wnat to delete the file?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={onDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
