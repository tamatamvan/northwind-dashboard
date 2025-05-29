import { createFileRoute } from '@tanstack/react-router';
import { fetchCustomerDetails } from '~/lib/api';

export const Route = createFileRoute('/customers/$customerId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { customerId } = params;
    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    return fetchCustomerDetails(customerId);
  },
});

function RouteComponent() {
  const customerData = Route.useLoaderData();
  console.log('Customer Data:', customerData);
  return <div>Hello "/customers/$customerId"!</div>;
}
