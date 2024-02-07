'use client';
import './globals.css';
import './data-tables-css.css';
import './satoshi.css';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children, }: { children: React.ReactNode; }) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="">
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <main>
                <SessionProvider>
                  {children}
                </SessionProvider>
              </main>
            </div>
          </div>
        </div>

      </body>
    </html>
  );
}
