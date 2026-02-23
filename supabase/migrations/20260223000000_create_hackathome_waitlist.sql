CREATE TABLE IF NOT EXISTS "hackathome-waitlist" (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  linkedin text NOT NULL,
  team_name text,
  theme_suggestion text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE "hackathome-waitlist" ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the registration form)
CREATE POLICY "Allow anonymous inserts" ON "hackathome-waitlist"
  FOR INSERT
  TO anon
  WITH CHECK (true);
