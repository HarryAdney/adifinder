/*
  # Add find_nearby_instructors function

  1. New Functions
    - `find_nearby_instructors`: Stored procedure to find instructors within a specified radius
      Takes parameters:
      - search_lat: Latitude of the search point
      - search_lon: Longitude of the search point
      - radius_miles: Search radius in miles

  2. Changes
    - Creates a new stored procedure for searching nearby instructors
    - Returns instructors ordered by distance
*/

-- Function to find instructors within a specified radius
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
    calculate_distance(search_lat, search_lon, i.latitude, i.longitude) <= radius_miles
  ORDER BY 
    distance ASC;
END;
$$ LANGUAGE plpgsql;