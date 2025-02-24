/*
  # Fix distance calculation function

  1. Changes
    - Update calculate_distance function to use more precise calculations
    - Add index on latitude/longitude columns for better performance
    - Update find_nearby_instructors function to handle null coordinates

  2. Improvements
    - More accurate distance calculations using Haversine formula
    - Better handling of null coordinates
    - Performance optimization with index
*/

-- Create index for coordinates
CREATE INDEX IF NOT EXISTS idx_instructors_coordinates 
ON instructors (latitude, longitude);

-- Update the distance calculation function
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 decimal,
  lon1 decimal,
  lat2 decimal,
  lon2 decimal
) RETURNS decimal AS $$
DECLARE
  R decimal := 3959; -- Earth's radius in miles
  φ1 decimal;
  φ2 decimal;
  Δφ decimal;
  Δλ decimal;
  a decimal;
  c decimal;
BEGIN
  -- Convert latitude and longitude to radians
  φ1 := radians(lat1);
  φ2 := radians(lat2);
  Δφ := radians(lat2 - lat1);
  Δλ := radians(lon2 - lon1);

  -- Haversine formula
  a := sin(Δφ/2) * sin(Δφ/2) +
       cos(φ1) * cos(φ2) *
       sin(Δλ/2) * sin(Δλ/2);
  
  c := 2 * asin(sqrt(a));
  
  RETURN R * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Update the find_nearby_instructors function
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