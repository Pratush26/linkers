import { auth } from "@/auth";
import Image from "next/image";

export default async function DashboardPage(props: PageProps<'/dashboard/[username]'>) {
    const { username } = await props.params
    const session = await auth()
    console.log(session, username)
    return (
        <main>
            <section className="flex items-center justify-center gap-4 min-h-[70vh]">
                <Image src={session?.user?.image || ""} width={80} height={80} alt={`profile picture`} className="object-cover aspect-square object-center rounded-full" />
                <div>
                    <h4 className="text-xl font-medium">@{session?.user?.username}</h4>
                    <p>{session?.user?.email}</p>
                    <p>{username == session?.user?.username ? "Your" : "Other"}</p>
                </div>
            </section>
        </main>
    )
}