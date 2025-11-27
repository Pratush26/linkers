import { myContent } from "@/app/Actions/dbFuntions";
import { auth } from "@/auth";
import ContentCard from "@/Components/ContentCard";
import Image from "next/image";

export default async function DashboardPage(props: PageProps<'/dashboard/[username]'>) {
    const { username } = await props.params
    const session = await auth()
    const data = await myContent()
    console.log(data)
    return (
        <main>
            <section className="flex items-center justify-center gap-4 mt-10">
                <Image src={session?.user?.image || ""} width={80} height={80} alt={`profile picture`} className="object-cover aspect-square object-center rounded-full" />
                <div className="font-medium">
                    <h4 className="text-xl">@{session?.user?.username}</h4>
                    <p className="text-sm font-normal">{session?.user?.email}</p>
                    <p>Total Content: {username == session?.user?.username && data.length}</p>
                </div>
            </section>
            <section className="w-5/6 mx-auto space-y-6 my-10">
                {
                    data.map(e => <ContentCard e={e} key={e._id} />)
                }
            </section>
        </main>
    )
}