"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { PencilIcon, TrashIcon } from "lucide-react";
import { FileType } from "@/typings";
import { useRenameModal } from "@/hooks/use-rename-modal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { onOpen } = useDeleteModal();
  const { onOpen: openRename } = useRenameModal();

  return (
    <div className="rounded-md border dark:border-slate-700">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="dark:border-slate-700">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <motion.tr
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.25 * index }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "filename" ? (
                      <p
                        className="underline flex items-center text-blue-500 hover:cursor-pointer"
                        onClick={() => {
                          openRename(
                            (row.original as FileType).id,
                            (row.original as FileType).filename
                          );
                        }}
                      >
                        {(row.original as FileType).filename}{" "}
                        <PencilIcon size={15} className="ml-2" />
                      </p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant="outline"
                    className="dark:border-slate-700"
                    onClick={() => {
                      onOpen((row.original as FileType).id);
                    }}
                  >
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                You have no files yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
