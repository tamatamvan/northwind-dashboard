import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns/format';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseMicrosoftDate(msDateString: string): Date {
  // Extract the milliseconds using regex
  const match = /\/Date\((\d+)([-+]\d{4})?\)\//.exec(msDateString);
  if (!match) {
    throw new Error('Invalid Microsoft JSON date format.');
  }

  const millis = parseInt(match[1], 10);
  const date = new Date(millis);

  return date;
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return 'N/A';
  const date = parseMicrosoftDate(dateString);
  return format(date, 'MM/dd/yyyy');
}

export const searchSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  take: z.coerce.number().min(1).max(100).default(10),
  orderBy: z.string().optional(),
  orderByDesc: z.string().optional(),
});
export type SearchParams = z.infer<typeof searchSchema>;

// Customer specific search schema that extends the base search schema
export const customersSearchSchema = searchSchema.extend({
  country: z.string().optional(),
});
export type CustomersSearchParams = z.infer<typeof customersSearchSchema>;

export const ordersSearchSchema = searchSchema.extend({
  customerId: z.string().optional(),
  shipCity: z.string().optional(),
  shipCountry: z.string().optional(),
  id: z.number().optional(),
});
export type OrdersSearchParams = z.infer<typeof ordersSearchSchema>;
