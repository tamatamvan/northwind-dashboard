import { createFileRoute } from '@tanstack/react-router';
import {
  CalendarPlusIcon,
  CircleDollarSignIcon,
  ClockAlertIcon,
  ShipIcon,
} from 'lucide-react';
import { OrderDetailsTable } from '~/components/orders/order-details-table';
import { fetchOrderDetails } from '~/lib/api';
import { formatDate } from '~/lib/utils';

export const Route = createFileRoute('/orders/$customerId/$orderId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { customerId, orderId } = params;
    if (!customerId || !orderId) {
      throw new Error('Missing customerId or orderId');
    }
    // Simulate fetching order details
    return fetchOrderDetails({ customerId, orderId });
  },
  errorComponent: () => <div>Error loading order details</div>,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const order = data?.order;
  const orderDetails = data?.orderDetails;

  if (!order || !orderDetails) {
    return <div>Order information not found.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Order ID: {order.id}</h2>
      <div className="mb-4">
        <p className="text-xl">
          <span className="font-semibold">Customer ID:</span> {order.customerId}{' '}
          - <span className="font-semibold">Employee ID:</span>{' '}
          {order.employeeId}
        </p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-xl mb-4">Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-lg">
            <CalendarPlusIcon className="inline-block mr-2" />{' '}
            <span className="font-semibold">Order date:</span>{' '}
            {order?.orderDate ? formatDate(order.orderDate) : 'N/A'}
          </div>
          <div className="text-lg">
            <ClockAlertIcon className="inline mr-2" />{' '}
            <span className="font-semibold">Required date:</span>{' '}
            {order?.requiredDate ? formatDate(order.requiredDate) : 'N/A'}
          </div>
          <div className="text-lg">
            <ShipIcon className="inline mr-2" />{' '}
            <span className="font-semibold">Shipped date:</span>{' '}
            {order?.shippedDate ? formatDate(order.shippedDate) : 'N/A'}
          </div>
          <div className="text-lg">
            <CircleDollarSignIcon className="inline mr-2" />{' '}
            <span className="font-semibold">Freight cost:</span>{' '}
            {order?.freight ? '$' + order?.freight : 'N/A'}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-xl mb-2">Shipment Details</h3>
        <div>
          <p className="text-lg">{order?.shipName || 'N/A'}</p>
          <p className="text-lg">{order?.shipAddress || ''}</p>
          <p className="text-lg">
            {order?.shipCity || ''}, {order?.shipPostalCode || ''},{' '}
            {order?.shipCountry || ''}
          </p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-xl mb-4">Order Details</h3>
        <OrderDetailsTable data={orderDetails} />
      </div>
    </div>
  );
}
