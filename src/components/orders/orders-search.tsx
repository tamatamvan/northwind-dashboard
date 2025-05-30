import React, { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Search as SearchIcon, XIcon } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Card, CardContent } from '~/components/ui/card';

export function OrdersSearch() {
  const navigate = useNavigate();
  const {
    id: currentId = '',
    customerId: currentCustomerId = '',
    shipCity: currentShipCity = '',
    shipCountry: currentShipCountry = '',
  } = useSearch({ from: '/orders/' });

  const [id, setId] = useState(currentId);
  const [customerId, setCustomerId] = useState(currentCustomerId);
  const [shipCity, setShipCity] = useState(currentShipCity);
  const [shipCountry, setShipCountry] = useState(currentShipCountry);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ID ==> ', id);
    navigate({
      search: (prev) => ({
        ...prev,
        id: id || undefined,
        customerId: customerId || undefined,
        shipCity: shipCity || undefined,
        shipCountry: shipCountry || undefined,
        page: 1, // Reset to first page when search changes
      }),
      replace: true,
      from: '/orders',
    });
  };

  const handleReset = () => {
    setId('');
    setCustomerId('');
    setShipCity('');
    setShipCountry('');

    navigate({
      search: () => ({
        // Remove search fields
        id: undefined,
        customerId: undefined,
        shipCity: undefined,
        shipCountry: undefined,
      }),
      replace: true,
      from: '/orders',
    });
  };

  const hasActiveFilters = !!(id || customerId || shipCity || shipCountry);

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="order-id">Order ID</Label>
              <Input
                id="order-id"
                type="text"
                placeholder="Order ID..."
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-id">Customer ID</Label>
              <Input
                id="customer-id"
                type="text"
                placeholder="Customer ID..."
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ship-city">Ship City</Label>
              <Input
                id="ship-city"
                type="text"
                placeholder="Ship City..."
                value={shipCity}
                onChange={(e) => setShipCity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ship-country">Ship Country</Label>
              <Input
                id="ship-country"
                type="text"
                placeholder="Ship Country..."
                value={shipCountry}
                onChange={(e) => setShipCountry(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            {hasActiveFilters && (
              <Button type="button" variant="outline" onClick={handleReset}>
                <XIcon className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
            <Button type="submit">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
