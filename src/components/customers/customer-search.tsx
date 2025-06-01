import React, { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Search as SearchIcon, XIcon } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Card, CardContent } from '~/components/ui/card';

export function CustomerSearch() {
  const navigate = useNavigate();
  const {
    id: currentId = '',
    companyName: currentCompanyName = '',
    contactName: currentContactName = '',
    contactTitle: currentContactTitle = '',
    city: currentCity = '',
    country: currentCountry = '',
  } = useSearch({ from: '/customers/' });

  const [id, setId] = useState(currentId);
  const [companyName, setCompanyName] = useState(currentCompanyName);
  const [contactName, setContactName] = useState(currentContactName);
  const [contactTitle, setContactTitle] = useState(currentContactTitle);
  const [city, setCity] = useState(currentCity);
  const [country, setCountry] = useState(currentCountry);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      search: (prev) => ({
        ...prev,
        id: id.trim() || undefined,
        companyName: companyName.trim() || undefined,
        contactName: contactName.trim() || undefined,
        contactTitle: contactTitle.trim() || undefined,
        city: city.trim() || undefined,
        country: country.trim() || undefined,
        page: 1, // Reset to first page when search changes
      }),
      replace: true,
      from: '/customers',
    });
  };

  const handleReset = () => {
    setId('');
    setCompanyName('');
    setContactName('');
    setContactTitle('');
    setCity('');
    setCountry('');

    navigate({
      search: (prev) => ({
        page: prev.page,
        take: prev.take,
        orderBy: prev.orderBy,
        orderByDesc: prev.orderByDesc,
        // Remove search fields
        id: undefined,
        companyName: undefined,
        contactName: undefined,
        contactTitle: undefined,
        city: undefined,
        country: undefined,
      }),
      replace: true,
      from: '/customers',
    });
  };

  const hasActiveFilters = !!(
    id ||
    companyName ||
    contactName ||
    contactTitle ||
    city ||
    country
  );

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="customer-id">Customer ID</Label>
              <Input
                id="customer-id"
                type="text"
                placeholder="Customer ID..."
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                type="text"
                placeholder="Company Name..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-name">Contact Name</Label>
              <Input
                id="contact-name"
                type="text"
                placeholder="Contact Name..."
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-title">Contact Title</Label>
              <Input
                id="contact-title"
                type="text"
                placeholder="Contact Title..."
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                placeholder="City..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                placeholder="Country..."
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
