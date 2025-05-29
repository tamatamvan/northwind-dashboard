import { Link } from '@tanstack/react-router';

export function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Northwind 🍃</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/customers" className="text-white hover:text-gray-300">
            Customers
          </Link>
          <Link to="/orders" className="text-white hover:text-gray-300">
            Orders
          </Link>
        </div>
      </div>
    </nav>
  );
}
