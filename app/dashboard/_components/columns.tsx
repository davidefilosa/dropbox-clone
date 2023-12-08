"use client";

import { Button } from "@/components/ui/button";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { useRenameModal } from "@/hooks/use-rename-modal";
import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            labelColor={extension}
            // @ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "Filename",
    cell: ({ renderValue, ...props }) => {
      const { onOpen } = useRenameModal();
      return (
        <p
          className="underline flex items-center text-blue-500 hover:cursor-pointer"
          onClick={() => {
            onOpen(props.row.original.id, renderValue() as string);
          }}
        >
          {
            //props.row.original.id
          }
          {renderValue() as string} <PencilIcon size={15} className="ml-2" />
        </p>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
    cell: ({ renderValue, ...props }) => {
      return (
        <div className="flex flex-col">
          <div className="text-sm">
            {(renderValue() as Date).toDateString()}
          </div>
          <div className="text-xm text-gray-500 dark:text-slate-500">
            {(renderValue() as Date).toLocaleTimeString()}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          className="underline text-blue-500 hover:text-blue-600"
          target="_blank"
          href={renderValue() as string}
        >
          Download
        </a>
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ renderValue, ...props }) => {
      const { onOpen } = useDeleteModal();
      return (
        <Button
          variant="outline"
          className="dark:border-slate-700"
          onClick={() => {
            onOpen(renderValue() as string);
          }}
        >
          <TrashIcon size={20} />
        </Button>
      );
    },
  },
];
