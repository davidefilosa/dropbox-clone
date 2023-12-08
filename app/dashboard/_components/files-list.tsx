"use client";
import { Button } from "@/components/ui/button";
import { FileType } from "@/typings";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

const FilesList = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  const [initialFiles, setinitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const { user } = useUser();

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;

    const files = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().fileName || doc.id,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      fullName: doc.data().fullName,
      downloadUrl: doc.data().downloadUrl,
      type: doc.data().type,
      size: doc.data().size,
    }));

    setinitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined)
    return (
      <section className="container space-y-5">
        <h2 className="font-bold">All files</h2>
        <div className="flex flex-col">
          <Button
            className="ml-auto w-36 h-10 mb-5 dark:border-slate-700"
            variant="ghost"
          >
            <Skeleton className="h-5 w-full bg-slate-100 dark:bg-slate-900" />
          </Button>
          <div className="border rounded-lg dark:border-slate-700">
            <div className="border-b h-12 dark:border-slate-700" />
            {skeletonFiles.map((file) => (
              <div
                className="flex items-center space-x-4 p-5 w-full"
                key={file.id}
              >
                <Skeleton className="h-12 w-12 bg-slate-100 dark:bg-slate-900" />
                <Skeleton className="h-12 w-full bg-slate-100 dark:bg-slate-900" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );

  return (
    <section className="container space-y-5">
      <h2 className="font-bold">All files</h2>
      <div className="flex flex-col space-y-5 pb-10">
        <Button
          onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
          className="ml-auto w-fit"
          variant="ghost"
        >
          Sort By {sort === "desc" ? "Newest" : "Oldest"}
        </Button>
        <DataTable columns={columns} data={initialFiles} />
      </div>
    </section>
  );
};

export default FilesList;
