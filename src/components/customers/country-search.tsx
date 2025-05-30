import React, { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Search as SearchIcon, XIcon } from 'lucide-react';
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
      className={`flex flex-col space-y-2 md:flex-row md:gap-2 md:items-center ${className}`}
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
            className="pr-10 relative"
          />
          {currentCountry && country && (
            <Button
              variant="ghost"
              onClick={handleClear}
              className="absolute right-0.5 top-0.5 size-8"
            >
              <XIcon />
            </Button>
          )}
        </div>
        <Button type="submit" variant="default">
          <SearchIcon /> Search
        </Button>
      </div>
    </form>
  );
}
