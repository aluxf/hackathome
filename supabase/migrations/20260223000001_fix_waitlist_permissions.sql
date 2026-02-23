-- Grant insert permission to anon role on the table
GRANT INSERT ON "hackathome-waitlist" TO anon;

-- Grant usage on the default uuid generation
GRANT USAGE ON SCHEMA public TO anon;
