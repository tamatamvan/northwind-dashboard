import React, { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';

interface CountrySearchProps {
  className?: string;
}

export function CountrySearch({ className }: CountrySearchProps) {
  const navigate = useNavigate();
  const { country: currentCountry = '' } = useSearch({ from: '/customers/' });
  const [country, setCountry] = useState(currentCountry);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: '/customers',
      search: (prev) => ({ ...prev, country: country || undefined, page: 1 }),
      replace: true,
    });
  };

  const handleClear = () => {
    setCountry('');
    navigate({
      to: '/customers',
      search: (prev) => ({ ...prev, country: undefined, page: 1 }),
      replace: true,
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex flex-col space-y-2 ${className}`}
    >
      <Label htmlFor="country-search">Filter by Country</Label>
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Input
            id="country-search"
            type="text"
            placeholder="Enter country name..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="pr-10"
          />
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button type="submit" variant="default">
          Search
        </Button>
        {currentCountry && (
          <Button type="button" variant="outline" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>
    </form>
  );
}
