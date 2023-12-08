"use client";

import Dropzone from "react-dropzone";
import { FilePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useToast } from "@/components/ui/use-toast";

const DropzoneComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // max file zize 20 GB
  const maxSize = 20971520;

  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFiles: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);

    // add document to "users/[userId]/files"
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      fileName: selectedFiles.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFiles.type,
      size: selectedFiles.size,
    });

    // load file in storage "users/[userId]/files/[docId]"
    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
    await uploadBytes(imageRef, selectedFiles).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef);

      // update original document with downloadedUrl

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadUrl,
      });

      toast({
        description: "File uploaded.",
      });
    });

    setLoading(false);
  };

  return (
    <Dropzone onDrop={onDrop} minSize={0} maxSize={maxSize}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileToLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <motion.section
            className="m-4"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed border-slate-700 rounded-lg text-center",
                isDragActive
                  ? "bg-[#0074d9] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-y-2">
                <FilePlus className="h-32 w-32 " />
                {!isDragActive && (
                  <p className="font-light text-normal">
                    Click here or drop a file to upload
                  </p>
                )}

                {isDragActive && !isDragReject && (
                  <p className="font-light text-normal">
                    Drop to upload this file
                  </p>
                )}

                {isDragReject && (
                  <p className="font-light text-normal">
                    Sorry, file type is not accepted
                  </p>
                )}
                {isFileToLarge && (
                  <p className="font-light text-normal">File is to large</p>
                )}
              </div>
            </div>
          </motion.section>
        );
      }}
    </Dropzone>
  );
};

export default DropzoneComponent;
