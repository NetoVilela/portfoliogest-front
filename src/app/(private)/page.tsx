import ECommerce from '@/components/Dashboard/E-commerce';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'PortfolioGest',
	description: 'Sua gestão de portfólios',
	// other metadata
};

export default function Home() {
	return (
		<>
			<ECommerce />
		</>
	);
}
