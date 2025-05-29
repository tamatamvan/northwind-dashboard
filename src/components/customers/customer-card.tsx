import { Link } from '@tanstack/react-router';

import type { Customer } from '~/dtos';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';

type CustomerCardProps = {
  customer: Customer;
};

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <Card className="mb-2">
      <CardHeader className="flex items-center justify-between">
        <div className="text-lg">
          <span className="font-bold">{customer.id}</span> -{' '}
          <span className="font-bold">{customer.contactName}</span>
          <div className="text-gray-600">
            {customer.contactTitle} of {customer.companyName}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
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
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild variant="outline" className="w-full">
          <Link
            to="/customers/$customerId"
            params={{ customerId: customer.id }}
          >
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
