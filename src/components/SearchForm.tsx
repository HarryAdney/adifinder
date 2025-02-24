import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Label } from '@radix-ui/react-label';

interface SearchFormProps {
  onSearch: (postcode: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [postcode, setPostcode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(postcode);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="postcode" className="text-sm font-medium text-gray-700">
          Enter Your Postcode
        </Label>
        <div className="relative">
          <input
            id="postcode"
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            placeholder="e.g. EH1 1BB"
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Find Instructors
        </button>
      </div>
    </form>
  );
}