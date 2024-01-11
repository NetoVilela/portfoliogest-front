'use client';
import { useState } from 'react';
import Loader from '@/components/common/Loader';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/login');
    },
  });

  if(!session){
    return <></>;
  }

  if(loading && session){
    setLoading(false);
  }


  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, [session]);

  return (
    
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </div>
        )}
      </div>
  );
}
