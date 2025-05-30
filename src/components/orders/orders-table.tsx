import { useState } from 'react';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { formatDate } from '~/lib/utils';
import { Order } from '~/dtos';

interface OrdersTableProps {
  data: Array<Order>;
  isLoading?: boolean;
  onSortingChange?: (sorting: SortingState) => void;
}

export function OrdersTable({
  data,
  onSortingChange,
  isLoading = false,
}: OrdersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSorting = (
    updaterOrValue: SortingState | ((old: SortingState) => SortingState)
  ) => {
    const newSorting =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting)
        : updaterOrValue;

    onSortingChange?.(newSorting);
    setSorting(newSorting);
  };

  // Define sortable columns
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Order ID
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <Link
          to="/orders/$customerId/$orderId"
          params={{
            customerId: row.original.customerId,
            orderId: row.original.id.toString(),
          }}
          className="text-blue-600 hover:underline"
          title={`View details for order ${row.original.id}`}
        >
          {row.original.id}
        </Link>
      ),
    },
    {
      accessorKey: 'customerId',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Customer ID
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div>
          <Link
            to="/customers/$customerId"
            params={{ customerId: row.original.customerId }}
            className="text-blue-600 hover:underline"
            title={`View details for customer ${row.original.customerId}`}
          >
            {row.original.customerId}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: 'orderDate',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Order Date
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div>
          {row.original.orderDate ? formatDate(row.original.orderDate) : 'N/A'}
        </div>
      ),
    },
    {
      accessorKey: 'shippedDate',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Shipped Date
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div>
          {row.original.shippedDate
            ? formatDate(row.original.shippedDate)
            : 'Pending'}
        </div>
      ),
    },
    {
      accessorKey: 'freight',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Freight
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
        );
      },
      cell: ({ row }) => <div>${row.original.freight.toFixed(2)}</div>,
    },
    {
      accessorKey: 'shipCity',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Ship City
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <Link
          className="text-blue-600 hover:underline"
          to="/orders"
          search={{ shipCity: row.original.shipCity }}
          title={`Filter orders by country: ${row.original.shipCity}`}
        >
          {row.original.shipCity}
        </Link>
      ),
    },
    {
      accessorKey: 'shipCountry',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Ship Country
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <Link
          className="text-blue-600 hover:underline"
          to="/orders"
          search={{ shipCountry: row.original.shipCountry }}
          title={`Filter orders by country: ${row.original.shipCountry}`}
        >
          {row.original.shipCountry}
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: handleSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          Loading orders...
        </div>
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          No orders found
        </div>
      ) : (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
