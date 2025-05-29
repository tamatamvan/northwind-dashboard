import { createFileRoute, Link } from '@tanstack/react-router';
import { TruckIcon, UsersIcon } from 'lucide-react';
import { Card, CardContent } from '~/components/ui/card';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-2 gap-2 md:flex md:gap-4">
      <Link to="/customers">
        <Card className="md:w-[150px]">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <UsersIcon className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-semibold">Customers</h3>
          </CardContent>
        </Card>
      </Link>

      <Link to="/orders">
        <Card className="shrink-0 md:w-[150px]">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <TruckIcon className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-semibold">Orders</h3>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
