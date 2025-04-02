import './globals.css';

export const metadata = {
  title: 'Modern Dashboard',
  description: 'A modern dashboard interface built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}