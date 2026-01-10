import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableActions from "./data-table-actions.svelte";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Article = {
    id: string;
    gametitle: string;
    articletitle: string;
    description: string;
    rating: number;
    created_at: number;
};

export const columns: ColumnDef<Article>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "gametitle",
        header: "Game",
    },
    {
        accessorKey: "articletitle",
        header: "Title",
    },
    {
        accessorKey: "rating",
        header: "Rating",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // You can pass whatever you need from `row.original` to the component
            return renderComponent(DataTableActions, { id: row.original.id });
        },
    },
];