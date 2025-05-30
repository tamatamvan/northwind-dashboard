import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { OrdersTable } from '~/components/orders/orders-table';
import { OrdersSearch } from '~/components/orders/orders-search';
import { Pagination } from '~/components/pagination';
import type { FetchOrdersParams } from '~/lib/api';
import { fetchOrders } from '~/lib/api';
import { ordersSearchSchema } from '~/lib/utils';

export const Route = createFileRoute('/orders/')({
  component: RouteComponent,
  errorComponent: () => <div>Error loading orders</div>,
  loaderDeps: (opts) => {
    const parsed = ordersSearchSchema.parse(opts.search);
    return {
      page: parsed.page,
      take: parsed.take,
      orderBy: parsed.orderBy,
      orderByDesc: parsed.orderByDesc,
      customerId: parsed.customerId,
      shipCity: parsed.shipCity,
      shipCountry: parsed.shipCountry,
      id: parsed.id,
    };
  },
  loader: async ({ deps }) => fetchOrders(deps as FetchOrdersParams),
  validateSearch: ordersSearchSchema,
});

function RouteComponent() {
  const orders = Route.useLoaderData();

  const { page, take } = Route.useLoaderDeps();
  const pageSize = take ?? 50;
  const pageNumber = page ?? 1;

  // Get search params
  const { id, customerId, shipCity, shipCountry } = Route.useSearch();
  const hasActiveFilters = !!(id || customerId || shipCity || shipCountry);

  const navigate = Route.useNavigate();
  const { isLoading } = useRouterState();

  const onSortingChange = (newSorting: { id: string; desc: boolean }[]) => {
    const orderBy = newSorting.filter((s) => !s.desc)[0]?.id || '';
    const orderByDesc = newSorting.filter((s) => s.desc)[0]?.id || '';
    navigate({
      search: {
        orderBy: orderBy || undefined,
        orderByDesc: orderByDesc || undefined,
      },
    });
  };
  const onPageChange = (newPage: number) => {
    navigate({ search: { page: newPage, take: pageSize } });
  };

  if (!orders?.results) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <OrdersSearch />

      {hasActiveFilters && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-gray-700 flex flex-wrap gap-2">
            <span>Showing filtered results:</span>
            {id ? (
              <span className="bg-blue-100 px-2 py-0.5 rounded">
                ID: <strong>{id}</strong>
              </span>
            ) : null}
            {customerId ? (
              <span className="bg-blue-100 px-2 py-0.5 rounded">
                Customer: <strong>{customerId}</strong>
              </span>
            ) : null}
            {shipCity ? (
              <span className="bg-blue-100 px-2 py-0.5 rounded">
                City: <strong>{shipCity}</strong>
              </span>
            ) : null}
            {shipCountry ? (
              <span className="bg-blue-100 px-2 py-0.5 rounded">
                Country: <strong>{shipCountry}</strong>
              </span>
            ) : null}
          </p>
        </div>
      )}

      <div className="mb-4">
        <p className="text-gray-600">
          Total Orders: <strong>{orders.total}</strong>
        </p>
      </div>

      <div className="mb-4">
        <OrdersTable
          data={orders?.results}
          onSortingChange={onSortingChange}
          isLoading={isLoading}
        />
      </div>

      <Pagination
        page={pageNumber}
        totalCount={orders.total}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
