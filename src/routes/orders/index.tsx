import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { OrdersTable } from '~/components/orders/orders-table';
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
  validateSearch: (search) =>
    ordersSearchSchema.parse({ ...search, take: search.take || 50 }),
});

function RouteComponent() {
  const orders = Route.useLoaderData();

  const { page, take } = Route.useLoaderDeps();
  const pageSize = take ?? 50;
  const pageNumber = page ?? 1;

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
