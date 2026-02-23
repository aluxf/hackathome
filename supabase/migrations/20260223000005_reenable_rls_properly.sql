-- Re-enable RLS
ALTER TABLE "hackathome-waitlist" ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON "hackathome-waitlist";
DROP POLICY IF EXISTS "Allow service role full access" ON "hackathome-waitlist";
DROP POLICY IF EXISTS "Allow public inserts" ON "hackathome-waitlist";
DROP POLICY IF EXISTS "Allow service role select" ON "hackathome-waitlist";

-- Grant table-level INSERT to anon and authenticated roles
GRANT INSERT ON "hackathome-waitlist" TO anon, authenticated;

-- Grant SELECT to service_role for admin reads
GRANT SELECT, UPDATE, DELETE ON "hackathome-waitlist" TO service_role;

-- RLS policy: anyone can insert
CREATE POLICY "Enable insert for all" ON "hackathome-waitlist"
  FOR INSERT
  WITH CHECK (true);

-- RLS policy: only service_role can read
CREATE POLICY "Enable read for service role" ON "hackathome-waitlist"
  FOR SELECT
  TO service_role
  USING (true);
