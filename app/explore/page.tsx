import { getContent } from "../Actions/dbFuntions"
import ContentCard from "@/Components/ContentCard"

export default async function ExplorePage() {
    const data = await getContent()
    return (
        <main className="w-5/6 mx-auto space-y-6 my-10">
            <h1 className="text-3xl font-semibold text-center">Content Stream</h1>
            {
                data.map(e => <ContentCard e={e} key={e._id} />)
            }
        </main>
    )
}
export const dynamic = "force-dynamic";
export const revalidate = 0;