import { cookies } from "next/headers";
import PortalApp from "@/components/portal-app";
import { readSessionToken, SESSION_COOKIE_NAME } from "@/lib/session";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await readSessionToken(token);

  return <PortalApp initialSession={session} />;
}
