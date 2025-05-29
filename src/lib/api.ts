import { JsonServiceClient } from '@servicestack/client';
import { GetCustomerDetails, QueryCustomers } from '~/dtos';

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

export const fetchCustomerDetails = async (id: string) => {
  const getCustomerDetails = new GetCustomerDetails({});
  getCustomerDetails.id = id;
  const customerDetails = await client.api(getCustomerDetails);
  if (customerDetails.succeeded) {
    return customerDetails.response;
  }
  throw new Error(
    customerDetails.errorMessage || 'Failed to fetch customer details'
  );
};

export { client };
