// src/app/layout.js
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';
import { ModalProvider } from '@/components/ui/modal';

export const metadata = {
  title: 'Modern Dashboard',
  description: 'A modern dashboard interface built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ToastProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}