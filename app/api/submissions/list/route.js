import { NextResponse } from "next/server";
import { findReleaseSubmissionsByEmail } from "@/lib/notion";
import { readSessionToken, SESSION_COOKIE_NAME } from "@/lib/session";

export const runtime = "nodejs";

export async function GET(request) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await readSessionToken(token);

  if (!session?.authorized || !session.email) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const matches = await findReleaseSubmissionsByEmail(session.email);

    return NextResponse.json({
      ok: true,
      matches
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Could not load submissions."
      },
      { status: 400 }
    );
  }
}
