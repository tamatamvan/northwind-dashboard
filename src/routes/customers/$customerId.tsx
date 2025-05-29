import { createFileRoute } from '@tanstack/react-router';
import { fetchCustomerDetails } from '~/lib/api';

export const Route = createFileRoute('/customers/$customerId')({
  component: RouteComponent,
  errorComponent: () => <div>Error loading Customer details</div>,
  loader: async ({ params }) => {
    const { customerId } = params;
    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    return fetchCustomerDetails(customerId);
  },
});

function RouteComponent() {
  const pageData = Route.useLoaderData();
  const customer = pageData?.customer;
  const customerOrders = pageData?.orders;

  if (!customer) {
    return <div>No customer found.</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-2xl font-bold">
          {customer.id} - {customer.contactName}
        </h2>
        <div className="text-lg text-shadow-gray-600">
          {customer.contactTitle} of {customer.companyName}
        </div>
      </div>
      <div className="mb-8">
        <div className="font-semibold">Address:</div>
        <div className="text-sm text-gray-600">
          {customer.address}, {customer.city}, {customer.region}
        </div>
        <div className="text-sm text-gray-600">
          {customer.postalCode}, {customer.country}
        </div>
        <div className="text-sm text-gray-600">Phone: {customer.phone}</div>
        {customer.fax && (
          <div className="text-sm text-gray-600">Fax: {customer.fax}</div>
        )}
      </div>

      <div className="flex flex-col gap-4 w-ful">
        <h3 className="text-xl font-bold">Orders</h3>
        {customerOrders?.length === 0 ? (
          <div className="text-gray-500">
            No orders found for this customer.
          </div>
        ) : (
          <ul className="list-disc pl-5">
            {customerOrders?.map((order) => (
              <li key={order.id} className="mb-2">
                Order ID: {order.id}, Total: ${order.total}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
