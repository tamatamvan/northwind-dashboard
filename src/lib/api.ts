import { JsonServiceClient } from '@servicestack/client';
import {
  GetCustomerDetails,
  GetOrders,
  QueryCustomers,
  QueryOrders,
} from '~/dtos';

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

export type FetchOrdersParams = {
  page?: number; // Page number for pagination
  take?: number; // Number of orders to fetch per page
  orderBy?: string; // Optional field to order by
  orderByDesc?: string; // Optional field to order by descending
};

export const fetchOrders = async ({
  page = 1,
  take = 10,
  orderBy,
  orderByDesc,
}: FetchOrdersParams) => {
  // Fetch all orders with pagination
  const queryOrders = new QueryOrders({});
  queryOrders.take = take;
  queryOrders.skip = page ? (page - 1) * take : 0;
  queryOrders.include = 'total';

  if (orderBy) {
    queryOrders.orderBy = orderBy; // Set the field to order by
  }
  if (orderByDesc) {
    queryOrders.orderByDesc = orderByDesc; // Set the field to order by descending
  }

  const orders = await client.api(queryOrders);
  if (orders.succeeded) {
    return orders.response;
  }
  throw new Error(orders.errorMessage || 'Failed to fetch orders');
};

export const fetchOrderDetails = async ({
  customerId,
  orderId,
}: {
  customerId: string;
  orderId: string;
}) => {
  const getOrdersDetails = new GetOrders({});
  getOrdersDetails.customerId = customerId;

  const orderDetails = await client.api(getOrdersDetails);

  if (orderDetails.succeeded) {
    return orderDetails.response?.results?.find(
      (result) => result.order.id === parseInt(orderId)
    );
  }
  throw new Error(orderDetails.errorMessage || 'Failed to fetch order details');
};

export { client };
