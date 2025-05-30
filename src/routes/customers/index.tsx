import { createFileRoute } from '@tanstack/react-router';

import { CustomerCard } from '~/components/customers/customer-card';
import { CustomerSearch } from '~/components/customers/customer-search';
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
      id: parsed.id,
      companyName: parsed.companyName,
      contactName: parsed.contactName,
      contactTitle: parsed.contactTitle,
      city: parsed.city,
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
  const {
    page,
    take,
    id,
    companyName,
    contactName,
    contactTitle,
    city,
    country,
  } = Route.useSearch();
  const pageSize = take ?? 10;
  const pageNumber = page ?? 1;

  // Check if any search filters are active
  const hasActiveFilters = !!(
    id ||
    companyName ||
    contactName ||
    contactTitle ||
    city ||
    country
  );

  const navigate = Route.useNavigate();
  const onPageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage, take: pageSize }),
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customers List</h2>

      <CustomerSearch />

      <div className="flex justify-end mb-4">
        <CustomerSort />
      </div>

      {hasActiveFilters && customers && customers.total > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-gray-700 flex flex-wrap gap-2">
            <span>Showing filtered results:</span>
            {id ? (
              <span className="bg-blue-100 px-2 py-0.5 rounded">
                ID: <strong>{id}</strong>
              </span>
            ) : null}
            {companyName ? (
              <span className="bg-blue-100 px-2 py-0.5 rounded">
                Company: <strong>{companyName}</strong>
              </span>
            ) : null}
            {contactName ? (
              <span className="bg-blue-100 px-2 py-0.5 rounded">
                Contact: <strong>{contactName}</strong>
              </span>
            ) : null}
            {contactTitle ? (
              <span className="bg-blue-100 px-2 py-0.5 rounded">
                Title: <strong>{contactTitle}</strong>
              </span>
            ) : null}
            {city ? (
              <span className="bg-blue-100 px-2 py-0.5 rounded">
                City: <strong>{city}</strong>
              </span>
            ) : null}
            {country ? (
              <span className="bg-blue-100 px-2 py-0.5 rounded">
                Country: <strong>{country}</strong>
              </span>
            ) : null}
          </p>
        </div>
      )}

      {customers?.results?.length === 0 ? (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded text-amber-800">
          No customers found{' '}
          {hasActiveFilters ? 'with the applied filters' : ''}.
          {hasActiveFilters && (
            <span className="block mt-2">
              Try different search terms or clear the filters.
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
