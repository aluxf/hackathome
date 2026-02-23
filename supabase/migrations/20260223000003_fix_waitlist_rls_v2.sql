-- Drop all existing policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON "hackathome-waitlist";
DROP POLICY IF EXISTS "Allow service role full access" ON "hackathome-waitlist";

-- Create a broad insert policy for all roles (anon, authenticated, service_role)
CREATE POLICY "Allow public inserts" ON "hackathome-waitlist"
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow service_role to read
CREATE POLICY "Allow service role select" ON "hackathome-waitlist"
  FOR SELECT
  TO service_role
  USING (true);
