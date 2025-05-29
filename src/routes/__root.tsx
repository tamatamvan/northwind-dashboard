import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Navbar } from '~/components/layout/navbar';

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-0">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
