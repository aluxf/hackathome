-- Make linkedin and theme_suggestion nullable so the waitlist form
-- can submit entries with just name and email
ALTER TABLE "hackathome-waitlist" ALTER COLUMN linkedin DROP NOT NULL;
ALTER TABLE "hackathome-waitlist" ALTER COLUMN theme_suggestion DROP NOT NULL;
