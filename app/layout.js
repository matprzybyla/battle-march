import "./globals.css";
import ThemeToggle from "../components/theme-toggle";

export const metadata = {
  title: "Warhammer: The Old World League",
  description: "Live standings and round results for the local event competition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem("tow-theme");if(theme==="dark"||theme==="light"){document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}}catch(error){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
