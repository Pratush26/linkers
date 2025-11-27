import { ContentBy_username } from "@/app/Actions/dbFuntions";
import { auth } from "@/auth";
import ContentCard from "@/Components/ContentCard";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { MdEdit } from "react-icons/md";

export default async function DashboardPage(props: PageProps<'/dashboard/[username]'>) {
    const { username } = await props.params
    const session = await auth()
    const { userData, content: data } = await ContentBy_username(username)
    const isPersonal = username == session?.user?.username || false;
    return (
        <main>
            <section className="flex items-center justify-center gap-4 mt-10">
                <div className="flex items-baseline">
                    {isPersonal && <MdEdit title="Edit profile photo" className="-mr-2 text-2xl trns hover:text-3xl" />}
                    <Image src={userData?.image || ""} width={80} height={80} alt={`profile picture`} className="object-cover aspect-square object-center rounded-full" />
                </div>
                <div className="font-medium">
                    <h4 className="text-xl flex gap-2 items-center">@{userData?.username}{isPersonal && <CiEdit title="Edit username" className="hover:text-2xl trns cursor-pointer" />}</h4>
                    <p className="text-sm font-normal">{userData?.email}</p>
                    {isPersonal && <p>Total Content: {data.length}</p>}
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