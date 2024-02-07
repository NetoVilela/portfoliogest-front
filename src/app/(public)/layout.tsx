import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

type Props = {
	children: React.ReactNode;
}
export default async function PublicLayout({ children, }: Props) {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect("/");
	}

	return (
		<>
			<div className="flex h-screen overflow-hidden">
				<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
					<main>
						<div className="mx-auto max-w-screen-2xl">
							{children}
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
