/*
  # Add phone number to search results

  1. Changes
    - Drop and recreate the `find_nearby_instructors` function to include phone number in results
  
  2. Reason
    - Phone number is needed in the search results to display contact information
    - We need to drop the function first to change its return type
*/

-- Drop the existing function first
DROP FUNCTION IF EXISTS find_nearby_instructors(decimal, decimal, decimal);

-- Recreate the function with phone number included in the return type
CREATE OR REPLACE FUNCTION find_nearby_instructors(
  search_lat decimal,
  search_lon decimal,
  radius_miles decimal
)
RETURNS TABLE (
  id uuid,
  name text,
  postcode text,
  experience integer,
  hourly_rate integer,
  phone text,
  distance decimal
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    i.id,
    i.name,
    i.postcode,
    i.experience,
    i.hourly_rate,
    i.phone,
    calculate_distance(search_lat, search_lon, i.latitude, i.longitude) as distance
  FROM 
    instructors i
  WHERE 
    i.latitude IS NOT NULL 
    AND i.longitude IS NOT NULL
    AND calculate_distance(search_lat, search_lon, i.latitude, i.longitude) <= radius_miles
  ORDER BY 
    distance ASC;
END;
$$ LANGUAGE plpgsql STABLE;