import { JsonServiceClient } from '@servicestack/client';
import { QueryCustomers } from '~/dtos';

const client = new JsonServiceClient('/api');

export const fetchCustomers = async (take = 10, page = 1) => {
  const queryCustomers = new QueryCustomers({});
  queryCustomers.take = take; // Limit the number of customers fetched
  queryCustomers.skip = page ? (page - 1) * take : 0; // Calculate offset based on page

  const customers = await client.api(queryCustomers);

  if (customers.succeeded) {
    return customers.response;
  }
  throw new Error(customers.errorMessage || 'Failed to fetch customers');
};

export { client };
