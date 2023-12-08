"use client";

import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
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
];
