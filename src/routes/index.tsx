import { createFileRoute } from '@tanstack/react-router';

import { fetchCustomers } from '~/utils/api';

export const Route = createFileRoute('/')({
  component: Index,
  loader: async () => fetchCustomers(),
  errorComponent: () => <div>Error loading Index route</div>,
});

function Index() {
  const customers = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3>Welcome Home! {import.meta.env.VITE_BASE_API_URL}</h3>
      <h4>Customers:</h4>
      <ul>
        {customers?.results?.map((customer) => (
          <li key={customer.id}>
            {customer.companyName} {customer.city}
          </li>
        ))}
      </ul>
    </div>
  );
}
