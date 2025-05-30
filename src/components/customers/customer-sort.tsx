import { useNavigate, useSearch } from '@tanstack/react-router';
import { ArrowDownAZ, ArrowDownZA, ArrowUpDown } from 'lucide-react';

import { Button } from '~/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';

interface CustomerSortProps {
  className?: string;
}

const sortableFields = [
  { label: 'Customer ID', value: 'id' },
  { label: 'Company Name', value: 'companyName' },
  { label: 'Contact Name', value: 'contactName' },
  { label: 'City', value: 'city' },
  { label: 'Country', value: 'country' },
];

export function CustomerSort({ className }: CustomerSortProps) {
  const navigate = useNavigate();
  const { orderBy, orderByDesc } = useSearch({ from: '/customers/' });

  const currentSortField = orderBy || orderByDesc;
  const currentSortDirection = orderBy
    ? 'asc'
    : orderByDesc
      ? 'desc'
      : undefined;

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    navigate({
      to: '/customers',
      search: (prev) => ({
        ...prev,
        orderBy: direction === 'asc' ? field : undefined,
        orderByDesc: direction === 'desc' ? field : undefined,
        page: 1, // Reset to first page when sorting changes
      }),
      replace: true,
    });
  };

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger className="w-full md:w-fit" asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            <span>
              {currentSortField
                ? `Sort: ${sortableFields.find((f) => f.value === currentSortField)?.label} (${currentSortDirection === 'asc' ? 'A-Z' : 'Z-A'})`
                : 'Sort by'}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          <div className="p-2">
            <p className="text-sm font-medium p-2 text-muted-foreground">
              Sort by
            </p>
            <div className="space-y-1">
              {sortableFields.map((field) => (
                <div key={field.value} className="flex flex-col gap-1 px-1">
                  <p className="text-xs font-medium text-muted-foreground pl-2">
                    {field.label}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant={orderBy === field.value ? 'default' : 'ghost'}
                      className="w-full justify-start gap-2"
                      onClick={() => handleSort(field.value, 'asc')}
                    >
                      <ArrowDownAZ className="h-3.5 w-3.5" />
                      <span>A-Z</span>
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        orderByDesc === field.value ? 'default' : 'ghost'
                      }
                      className="w-full justify-start gap-2"
                      onClick={() => handleSort(field.value, 'desc')}
                    >
                      <ArrowDownZA className="h-3.5 w-3.5" />
                      <span>Z-A</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {(orderBy || orderByDesc) && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2"
                onClick={() => {
                  navigate({
                    to: '/customers',
                    search: (prev) => ({
                      ...prev,
                      orderBy: undefined,
                      orderByDesc: undefined,
                    }),
                    replace: true,
                  });
                }}
              >
                Clear Sort
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
