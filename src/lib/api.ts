import { JsonServiceClient } from '@servicestack/client';
import { QueryCustomers } from '~/dtos';

const client = new JsonServiceClient(
  import.meta.env.VITE_BASE_API_URL || '/api'
);

export type FetchCustomersParams = {
  page?: number; // Page number for pagination
  take?: number; // Number of customers to fetch per page
};

export const fetchCustomers = async ({
  page = 1,
  take = 10,
}: FetchCustomersParams) => {
  console.log('Fetching customers with params:', { page, take });
  const queryCustomers = new QueryCustomers({});
  queryCustomers.take = take; // Limit the number of customers fetched
  queryCustomers.skip = page ? (page - 1) * take : 0; // Calculate offset based on page
  queryCustomers.include = 'total';

  const customers = await client.api(queryCustomers);

  if (customers.succeeded) {
    return customers.response;
  }
  throw new Error(customers.errorMessage || 'Failed to fetch customers');
};

export { client };
