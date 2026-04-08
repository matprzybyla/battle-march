import "./globals.css";

export const metadata = {
  title: "Warhammer: The Old World League",
  description: "Live standings and round results for the local event competition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
