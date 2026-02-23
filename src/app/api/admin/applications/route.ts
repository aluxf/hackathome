import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_USER = process.env.ADMIN_USER!;
const ADMIN_PASS = process.env.ADMIN_PASS!;

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const supabase = createClient(
    "https://jvvfpqddnxmapxaixmcx.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("hackathome-waitlist")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ applications: data });
}
