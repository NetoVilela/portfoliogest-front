import { SidebarHeader } from '@/components/SidebarHeader';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import Footer from '@/components/Footer';

type Props = {
  children: React.ReactNode;
}
export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/auth/login");
  }

  return (
    <SidebarHeader>
      {children}
    </SidebarHeader>
  );
}
