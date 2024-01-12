'use client';
import '../globals.css';
import '../data-tables-css.css';
import '../satoshi.css';
// import { useState, useEffect } from 'react';
// import Loader from '@/components/common/Loader';

type Props = {
	children: React.ReactNode;
}
export default function PublicLayout({ children, }: Props) {

	// const [loading, setLoading] = useState<boolean>(true);

	// useEffect(() => {
	// 	setLoading(false);
	// }, []);

	return (
		<>
			{/* <div className="dark:bg-boxdark-2 dark:text-bodydark">
				{loading ? (
					<Loader />
				) : ( */}
					<div className="flex h-screen overflow-hidden">
						<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

							<main>
								<div className="mx-auto max-w-screen-2xl">
									{children}
								</div>
							</main>
						</div>
					</div>
				{/* )}
			</div> */}
		</>
	);
}
