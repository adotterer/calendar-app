import { NextRequest, NextResponse } from "next/server";
import { makeServiceClient } from "@/lib/serversupabase";

export async function POST(req: NextRequest) {
  // const url = new URL(req.url);
  const supabase = makeServiceClient();

  const body = await req.json();

  console.log("req.body", body);

  const { data, error } = await supabase
    .from("events")
    .insert([{ ...body }])
    .select();

  if (error) console.log(error, "data");

  console.log(data, "data");

  return new NextResponse(JSON.stringify({ ok: true, status: 200, data }));
}
