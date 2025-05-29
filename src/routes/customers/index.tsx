import { createFileRoute } from '@tanstack/react-router';

import { CustomerCard } from '~/components/customers/customer-card';
import { Pagination } from '~/components/pagination';

import { fetchCustomers } from '~/lib/api';
import { searchSchema } from '~/lib/utils';

// type CustomersSearchParams = z.infer<typeof customersSearchSchema>;

export const Route = createFileRoute('/customers/')({
  component: Customers,
  loaderDeps: (opts) => {
    const parsed = searchSchema.parse(opts.search);
    return { page: parsed.page, take: parsed.take };
  },
  loader: async ({ deps }) => fetchCustomers(deps),
  errorComponent: () => <div>Error loading Customers page</div>,
  validateSearch: searchSchema,
});

function Customers() {
  const customers = Route.useLoaderData();
  const { page, take } = Route.useSearch();
  const pageSize = take ?? 10;
  const pageNumber = page ?? 1;

  const navigate = Route.useNavigate();
  const onPageChange = (newPage: number) => {
    navigate({ search: { page: newPage, take: pageSize } });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customers List</h2>

      {customers?.results?.length === 0 ? (
        <div className="text-gray-500">No customers found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customers?.results?.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
          <Pagination
            page={pageNumber}
            pageSize={pageSize}
            totalCount={customers?.total ?? 0}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}
