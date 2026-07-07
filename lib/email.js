import "server-only";

const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_ACCESS_REQUEST_TO = "brandon@artisthouse.world";
const DEFAULT_ACCESS_REQUEST_FROM = "Artist House Portal <onboarding@resend.dev>";

export async function sendAccessRequestEmail({ email, name }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Skipping access request email for", email);
    return false;
  }

  const to = process.env.ACCESS_REQUEST_TO || DEFAULT_ACCESS_REQUEST_TO;
  const from = process.env.ACCESS_REQUEST_FROM || DEFAULT_ACCESS_REQUEST_FROM;
  const displayName = name ? `${name} (${email})` : email;

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Portal access request: ${email}`,
      text: `${displayName} needs access to the Artist House submission portal.\n\nTo grant access, add ${email} to the Notion allowlist.`
    })
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Failed to send access request email:", response.status, body);
    return false;
  }

  return true;
}
