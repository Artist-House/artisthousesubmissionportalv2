import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE_NAME = "artist_house_session";
export const OAUTH_STATE_COOKIE_NAME = "artist_house_oauth_state";

function getCookieBaseOptions(maxAge) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge
  };
}

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing required environment variable: SESSION_SECRET");
  }

  return new TextEncoder().encode(secret);
}

export function getSessionCookieOptions() {
  return getCookieBaseOptions(60 * 60 * 24 * 7);
}

export function getStateCookieOptions() {
  return getCookieBaseOptions(60 * 10);
}

export async function createSessionToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function readSessionToken(token) {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey());

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      authorized: Boolean(payload.authorized)
    };
  } catch {
    return null;
  }
}
