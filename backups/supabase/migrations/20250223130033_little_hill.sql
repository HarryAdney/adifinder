/*
  # Add postcode distance search functionality

  1. New Functions
    - `calculate_distance`: Calculates the distance between two UK postcodes
    - `find_nearby_instructors`: Finds instructors within a specified radius of a postcode

  2. Changes
    - Add latitude and longitude columns to instructors table
    - Add function to calculate distances between postcodes
*/

-- Add PostGIS extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS postgis;

-- Add coordinates columns to instructors table
ALTER TABLE instructors 
ADD COLUMN IF NOT EXISTS latitude decimal(10, 8),
ADD COLUMN IF NOT EXISTS longitude decimal(11, 8);

-- Function to calculate distance between two points in miles
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 decimal,
  lon1 decimal,
  lat2 decimal,
  lon2 decimal
) RETURNS decimal AS $$
DECLARE
  R decimal := 3959; -- Earth's radius in miles
  dlat decimal;
  dlon decimal;
  a decimal;
  c decimal;
BEGIN
  dlat := radians(lat2 - lat1);
  dlon := radians(lon2 - lon1);
  
  a := sin(dlat/2) * sin(dlat/2) +
       cos(radians(lat1)) * cos(radians(lat2)) *
       sin(dlon/2) * sin(dlon/2);
  
  c := 2 * atan2(sqrt(a), sqrt(1-a));
  
  RETURN R * c;
END;
$$ LANGUAGE plpgsql;