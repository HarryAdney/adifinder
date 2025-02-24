import React, { useState } from 'react';
import { SearchForm } from '../components/SearchForm';
import { InstructorCard } from '../components/InstructorCard';
import { supabase } from '../lib/supabase';
import { getPostcodeCoordinates } from '../lib/geocoder';
import type { Instructor } from '../types';

export function SearchPage() {
  const [searchPostcode, setSearchPostcode] = useState('');
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (postcode: string) => {
    setIsLoading(true);
    setError(null);
    setSearchPostcode(postcode);

    try {
      // Get coordinates for the search postcode
      const coords = await getPostcodeCoordinates(postcode);
      
      if (!coords) {
        throw new Error('Invalid postcode or unable to find location');
      }

      console.log('Searching with coordinates:', coords);

      // Query instructors within 15 miles radius
      const { data, error: supabaseError } = await supabase
        .rpc('find_nearby_instructors', {
          search_lat: coords.lat,
          search_lon: coords.lon,
          radius_miles: 15
        });

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw supabaseError;
      }

      console.log('Found instructors:', data);

      // Transform the data to match our Instructor interface
      const transformedData: Instructor[] = (data || []).map(instructor => ({
        id: instructor.id,
        name: instructor.name,
        postcode: instructor.postcode,
        rating: 5.0, // Default rating for new instructors
        reviews: 0, // Default reviews for new instructors
        price: instructor.hourly_rate,
        image: `https://source.unsplash.com/featured/?driving,instructor&sig=${instructor.id}`, // Random instructor image
        experience: instructor.experience
      }));

      setInstructors(transformedData);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching for instructors');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Find Driving Instructors Near You
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Enter your postcode to discover qualified driving instructors within 15 miles
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <SearchForm onSearch={handleSearch} />
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {searchPostcode && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {isLoading ? (
              'Searching for instructors...'
            ) : instructors.length > 0 ? (
              `Found ${instructors.length} instructor${instructors.length === 1 ? '' : 's'} within 15 miles of ${searchPostcode}`
            ) : (
              `No instructors found within 15 miles of ${searchPostcode}`
            )}
          </h3>
          
          {!isLoading && instructors.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructors.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>
          )}

          {!isLoading && instructors.length === 0 && searchPostcode && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No driving instructors are currently registered within 15 miles of your location.
                {' '}
                <a href="/register" className="text-blue-600 hover:text-blue-800">
                  Register as an instructor
                </a>
                {' '}
                to be the first!
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}