"use client";

import { useEffect, useState } from "react";
import { DeleteModal } from "../modals/delete-modal";
import { RenameModal } from "../modals/reneme-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DeleteModal />
      <RenameModal />
    </>
  );
};
