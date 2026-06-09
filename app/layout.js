export const metadata = {
  title: "Artist House Submission Portal",
  description: "Protected Artist House release submission portal for label, management, and publishing workflows.",
  icons: {
    icon: [
      "https://images.squarespace-cdn.com/content/v1/6888fc28887005277bd77716/0694e102-1574-4bb0-a772-55b9e310cd11/favicon.ico"
    ]
  }
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
