import Link from 'next/link';

type Props = {
  title: string;
  pathname: string;
  route: string;
}
export default function ItemGroup({ title, pathname, route }: Props) {
	return (
		<Link href={route} className={` hover:bg-graydark hover:bg-opacity-60 dark:hover:bg-meta-4 p-1 transition-all delay rounded-lg pt-2 pb-2 ${pathname === route && 'bg-graydark bg-opacity-60'} ml-6 first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === route && 'text-white'}`}>
			<li>
				{title}
			</li>
		</Link>
	);
}
