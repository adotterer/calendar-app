import { NextRequest, NextResponse } from "next/server";
import { makeServiceClient } from "@/lib/serversupabase";

export async function POST(req: NextRequest) {
  const supabase = makeServiceClient();

  const body = await req.json();

  const { data, error } = await supabase
    .from("events")
    .insert([{ ...body }])
    .select();

  if (error) console.log(error, "data");

  console.log(data, "data");

  return new NextResponse(JSON.stringify({ ok: true, status: 200, data }));
}

export async function GET(req: NextRequest) {
  const supabase = makeServiceClient();
  const url = new URL(req.url);
  const userId = url.searchParams.get("id");

  let { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", userId);

  return new NextResponse(
    JSON.stringify({ ok: true, status: 200, data: events })
  );
}
