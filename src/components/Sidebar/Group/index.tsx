import Link from 'next/link';
import React from 'react';
import SidebarArrow from '../Arrow';

type Props = {
  children: React.ReactNode;
  open: boolean;
  pathname: string;
  mainRoute: string;
  handleClick: () => void;
  sidebarExpanded: boolean;
  setSidebarExpanded: (param: boolean) => void;
  title: string;
}
export default function Group({ children, title, open, pathname, mainRoute, sidebarExpanded, handleClick, setSidebarExpanded }: Props) {
	return (
		<>
			<Link
				href="#"
				className={
					`group relative flex items-center rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === mainRoute ||
            pathname.includes(mainRoute)) &&
          'bg-graydark dark:bg-meta-4'
					}`}
				onClick={(e) => {
					e.preventDefault();
					sidebarExpanded
						? handleClick()
						: setSidebarExpanded(true);
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
				</svg>
				<span className="pl-2">{title}</span>
				<SidebarArrow open={open} />
			</Link>

			<div className={`overflow-hidden transition-max-height ease-in-out duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
				<ul className="mt-1 mb-5.5 flex flex-col gap-1">
					{children}
				</ul>
			</div>
		</>
	);
}
