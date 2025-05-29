import { createFileRoute } from '@tanstack/react-router';
import { OrdersTable } from '~/components/orders/orders-table';
import type { FetchOrdersParams } from '~/lib/api';
import { fetchOrders } from '~/lib/api';
import { searchSchema } from '~/lib/utils';

export const Route = createFileRoute('/orders/')({
  component: RouteComponent,
  errorComponent: () => <div>Error loading orders</div>,
  loaderDeps: (opts) => {
    const parsed = searchSchema.parse(opts.search);
    return {
      page: parsed.page,
      take: parsed.take,
      orderBy: parsed.orderBy,
      orderByDesc: parsed.orderByDesc,
    };
  },
  loader: async ({ deps }) => fetchOrders(deps as FetchOrdersParams),
  validateSearch: (search) =>
    searchSchema.parse({ ...search, take: search.take || 50 }),
});

function RouteComponent() {
  const orders = Route.useLoaderData();
  const navigate = Route.useNavigate();

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
  if (!orders?.results) {
    return <div>No orders found.</div>;
  }
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <OrdersTable data={orders?.results} onSortingChange={onSortingChange} />
    </div>
  );
}
