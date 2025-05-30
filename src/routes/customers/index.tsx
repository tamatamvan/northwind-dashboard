import { createFileRoute } from '@tanstack/react-router';

import { CustomerCard } from '~/components/customers/customer-card';
import { CountrySearch } from '~/components/customers/country-search';
import { CustomerSort } from '~/components/customers/customer-sort';
import { Pagination } from '~/components/pagination';

import { fetchCustomers } from '~/lib/api';
import { customersSearchSchema } from '~/lib/utils';

export const Route = createFileRoute('/customers/')({
  component: Customers,
  loaderDeps: (opts) => {
    const parsed = customersSearchSchema.parse(opts.search);
    return {
      page: parsed.page,
      take: parsed.take,
      country: parsed.country,
      orderBy: parsed.orderBy,
      orderByDesc: parsed.orderByDesc,
    };
  },
  loader: async ({ deps }) => fetchCustomers(deps),
  errorComponent: () => <div>Error loading Customers page</div>,
  validateSearch: customersSearchSchema,
});

function Customers() {
  const customers = Route.useLoaderData();
  const { page, take, country } = Route.useSearch();
  const pageSize = take ?? 10;
  const pageNumber = page ?? 1;

  const navigate = Route.useNavigate();
  const onPageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage, take: pageSize }),
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customers List</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6 md:justify-end">
        <CountrySearch className="max-w-md" />
        <CustomerSort />
      </div>

      {country && customers && customers.total > 0 && (
        <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded">
          <p>
            Showing results for country:{' '}
            <span className="font-semibold">{country}</span>
          </p>
        </div>
      )}

      {customers?.results?.length === 0 ? (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded text-amber-800">
          No customers found {country ? `for country "${country}"` : ''}.
          {country && (
            <span className="block mt-2">
              Try a different search term or clear the filter.
            </span>
          )}
        </div>
      ) : (
        <>
          <p className="mb-4">
            Total Customers:{' '}
            <span className="font-semibold">{customers?.total}</span>
          </p>
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
