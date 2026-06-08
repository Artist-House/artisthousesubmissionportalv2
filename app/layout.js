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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=IBM+Plex+Mono:ital,wght@0,400&family=Poppins:ital,wght@0,500;0,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
