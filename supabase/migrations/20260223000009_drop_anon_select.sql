-- Revert anon select: data should only be accessible via service role
DROP POLICY IF EXISTS "Allow anon select" ON "hackathome-waitlist";
