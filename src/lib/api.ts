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
  country?: string; // Optional filter by country
  orderBy?: string; // Optional field to order by ascending
  orderByDesc?: string; // Optional field to order by descending
};

export const fetchCustomers = async ({
  page = 1,
  take = 10,
  country,
  orderBy,
  orderByDesc,
}: FetchCustomersParams) => {
  const queryCustomers = new QueryCustomers({
    include: 'total', // Include total count in the response
    take: take,
    skip: page ? (page - 1) * take : 0, // Calculate offset based on page
  });

  if (country) {
    queryCustomers.countryStartsWith = country; // Filter customers by country
  }

  if (orderBy) {
    queryCustomers.orderBy = orderBy; // Sort in ascending order
  }

  if (orderByDesc) {
    queryCustomers.orderByDesc = orderByDesc; // Sort in descending order
  }

  const customers = await client.api(queryCustomers);

  if (customers.succeeded) {
    return customers.response;
  }
  throw new Error(customers.errorMessage || 'Failed to fetch customers');
};

export const fetchCustomerDetails = async (id: string) => {
  const getCustomerDetails = new GetCustomerDetails({
    id,
  });

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
  customerId?: string; // Optional filter by customer ID
  shipCity?: string; // Optional filter by shipping city
  shipCountry?: string; // Optional filter by shipping country
  id?: string;
};

export const fetchOrders = async ({
  page = 1,
  take = 10,
  customerId,
  shipCity,
  shipCountry,
  orderBy,
  orderByDesc,
  id,
}: FetchOrdersParams) => {
  // Fetch all orders with pagination
  const queryOrders = new QueryOrders({
    take,
    skip: page ? (page - 1) * take : 0, // Calculate offset based on page
    include: 'total', // Include total count in the response
    fields: 'id,customerId,shipCity,shippedDate,shipCountry,freight,orderDate', // Specify fields to include in the response
  });
  if (id) {
    queryOrders.id = id; // Filter orders by specific order ID
  }
  if (customerId) {
    queryOrders.customerId = customerId; // Filter orders by customer ID
  }
  if (shipCity) {
    queryOrders.shipCity = shipCity; // Filter orders by shipping city
  }
  if (shipCountry) {
    queryOrders.shipCountry = shipCountry; // Filter orders by shipping country
  }
  if (orderBy) {
    queryOrders.orderBy = orderBy; // Set the field to order by
  }
  if (orderByDesc) {
    queryOrders.orderByDesc = orderByDesc; // Set the field to order by descending
  }

  const orders = await client.api(queryOrders, {});
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
  const getOrdersDetails = new GetOrders({
    customerId: customerId,
  });

  const orderDetails = await client.api(getOrdersDetails);

  if (orderDetails.succeeded) {
    return orderDetails.response?.results?.find(
      (result) => result.order.id === parseInt(orderId)
    );
  }
  throw new Error(orderDetails.errorMessage || 'Failed to fetch order details');
};

export { client };
