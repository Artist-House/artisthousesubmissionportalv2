import { NextResponse } from "next/server";
import { readSessionToken, SESSION_COOKIE_NAME } from "@/lib/session";

export const runtime = "nodejs";

export async function GET(request) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await readSessionToken(token);
  return NextResponse.json({ session });
}
