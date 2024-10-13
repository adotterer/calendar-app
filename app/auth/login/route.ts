import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const url = new URL(req.url);
  const cookieStore = cookies();

  const formData = await req.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data) console.log(data);

  if (error) {
    return new NextResponse(
      JSON.stringify({ status: error.status, message: "Invalid Credentials" })
    );
  }

  return new NextResponse(
    JSON.stringify({ ok: true, status: 200, message: "Login Successful" })
  );
}
