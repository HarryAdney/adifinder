/*
  # Update instructor table policies

  1. Changes
    - Drop existing policies if they exist
    - Create new policies for public access
  
  2. Security
    - Enable RLS (if not already enabled)
    - Allow public read access
    - Allow public insert access
    - Allow authenticated users to update their own data
*/

-- Ensure RLS is enabled
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view instructors" ON instructors;
DROP POLICY IF EXISTS "Anyone can insert instructor data" ON instructors;
DROP POLICY IF EXISTS "Users can update own data" ON instructors;
DROP POLICY IF EXISTS "Users can insert their own data" ON instructors;

-- Create new policies
CREATE POLICY "Anyone can view instructors"
  ON instructors
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert instructor data"
  ON instructors
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update own data"
  ON instructors
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);