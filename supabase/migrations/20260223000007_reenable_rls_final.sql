-- Re-enable RLS (was disabled in migration 000004)
ALTER TABLE "hackathome-waitlist" ENABLE ROW LEVEL SECURITY;

-- Clean up: drop all old policies
DROP POLICY IF EXISTS "Enable insert for all" ON "hackathome-waitlist";
DROP POLICY IF EXISTS "Enable read for service role" ON "hackathome-waitlist";
DROP POLICY IF EXISTS "Allow public inserts" ON "hackathome-waitlist";
DROP POLICY IF EXISTS "Allow service role select" ON "hackathome-waitlist";

-- INSERT policy: anon users can insert (registration form)
CREATE POLICY "Allow anon inserts" ON "hackathome-waitlist"
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- SELECT/UPDATE/DELETE: only service_role (admin) can read/modify
CREATE POLICY "Allow service role full access" ON "hackathome-waitlist"
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
