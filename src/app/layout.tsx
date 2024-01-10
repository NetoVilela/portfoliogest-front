'use client';
import './globals.css';
import './data-tables-css.css';
import './satoshi.css';
import { useState, useEffect } from 'react';
import Loader from '@/components/common/Loader';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">

              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <main>
                  <SessionProvider>
                    {children}
                  </SessionProvider>
                </main>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
