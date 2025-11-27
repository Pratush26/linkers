import { likedContent } from "../Actions/dbFuntions"
import ContentCard from "@/Components/ContentCard"

export default async function LikedContentPage() {
    const data = await likedContent()
    return (
        <main className="w-5/6 mx-auto space-y-6 my-10">
            <h1 className="text-3xl font-semibold text-center">Liked Content</h1>
            {
                data.map(e => <ContentCard e={e} key={e._id} />)
            }
        </main>
    )
}