-- Drop existing policy and recreate
DROP POLICY IF EXISTS "Allow anonymous inserts" ON "hackathome-waitlist";

-- Grant full table access to anon for inserts
GRANT ALL ON "hackathome-waitlist" TO anon;

-- Recreate the insert policy
CREATE POLICY "Allow anonymous inserts" ON "hackathome-waitlist"
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow select for service_role (admin reads)
CREATE POLICY "Allow service role full access" ON "hackathome-waitlist"
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
