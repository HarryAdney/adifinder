/*
  # Create instructors table

  1. New Tables
    - `instructors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `website` (text, nullable)
      - `address_line1` (text)
      - `address_line2` (text, nullable)
      - `city` (text)
      - `postcode` (text)
      - `travel_distance` (integer)
      - `experience` (integer)
      - `hourly_rate` (integer)
      - `about` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `instructors` table
    - Add policy for authenticated users to read all instructor data
    - Add policy for users to update their own data
    - Add policy for users to insert their own data
*/

CREATE TABLE instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  website text,
  address_line1 text NOT NULL,
  address_line2 text,
  city text NOT NULL,
  postcode text NOT NULL,
  travel_distance integer NOT NULL,
  experience integer NOT NULL,
  hourly_rate integer NOT NULL,
  about text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read instructor data
CREATE POLICY "Anyone can view instructors"
  ON instructors
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert their own data
CREATE POLICY "Users can insert their own data"
  ON instructors
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own data
CREATE POLICY "Users can update own data"
  ON instructors
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

  -- Drop the existing insert policy
DROP POLICY IF EXISTS "Users can insert their own data" ON instructors;

-- Create a new policy that allows public inserts
CREATE POLICY "Anyone can insert instructor data"
  ON instructors
  FOR INSERT
  TO public
  WITH CHECK (true);
