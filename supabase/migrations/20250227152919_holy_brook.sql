/*
  # Add phone number to search results

  1. Changes
    - Update the `find_nearby_instructors` function to include phone number in results
  
  2. Reason
    - Phone number is needed in the search results to display contact information
*/

-- Update the find_nearby_instructors function to include phone number
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