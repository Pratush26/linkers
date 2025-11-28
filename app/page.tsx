import Link from "next/link";
import { trendingContents } from "./Actions/dbFuntions";
import ContentCard from "@/Components/ContentCard";

const categoriesData = [
  { title: "Explore a Universe of Ideas", description: "From the latest in AI to deep-dive coding tutorials" },
  { title: "Art & Creativity", description: "Showcase your art, find inspiration, and discuss creative processes." },
  { title: "Life & Philosophy", description: "Share life lessons, personal stories, and big ideas." },
  { title: "Science & Nature", description: "Unravel the mysteries of the universe and the wonders of our planet." }
]
const sectionData = [
  { title: "Create & Share", description: "Craft a post with a catchy title, your thoughts, and an image. Share your expertise, a question, or a fascinating find." },
  { title: "Connect & Discuss", description: "React with emojis to show how a post makes you feel and dive into the comments for meaningful conversations." },
  { title: "Discover & Grow", description: "Follow creators you love and explore a personalized feed of knowledge and ideas from a thriving community." }
]
export default async function Home() {
  const data = await trendingContents()
  return (
    <main>
      <section className="flex flex-col items-center justify-center gap-3 min-h-[90vh] my-6 text-center w-3/4 mx-auto">
        <h1 className="font-bold text-5xl mb-3">Welcome to Linkers</h1>
        <p>Share your contents among all using Linkers,</p>
        <p className="text-lg font-semibold">Connect your Curiosity with us. Easy to use, Easy to share</p>
        <p className="text-sm">Linkers is where ideas meet. Share your knowledge, discover new perspectives, and build a community around what matters to you. No algorithms, just authentic connections.</p>
        <Link href="/register" className="btn rounded-full hover:shadow-lg/30 trns mt-3" >Join the Community</Link>
      </section>
      <section className="text-center w-11/12 mx-auto">
        <h2 className="font-semibold text-3xl mb-3">Content Categories</h2>
        <p className="text-sm mt-4">Showcase the diversity of content available on Linkers to appeal to a wide range of interests.</p>
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          {
            categoriesData.map((e, i) => (
              <div key={i} className="p-6 zoomOut rounded-3xl shadow-md/50 hover:shadow-lg/50 trns text-sm flex flex-col items-center justify-center gap-2">
                <h6 className="text-lg font-semibold">{e.title}</h6>
                <p>{e.description}</p>
              </div>
            ))
          }
        </article>
      </section>
      <section className="text-center w-5/6 mx-auto rounded-4xl bg-gray-900 text-white px-6 py-10 my-24 space-y-6">
        <h4 className="font-semibold text-2xl mb-3">Ready to Link Your Ideas to the World?</h4>
        <p>Ready to Link Your Ideas to the World?</p>
        <div className="flex gap-4 items-center justify-center text-sm font-semibold">
          <Link href="/register" className="px-4 py-2 zoomOut rounded-full trns bg-white text-black hover:scale-103">Sign Up Free</Link>
          <Link href="/login" className="px-4 py-2 zoomOut rounded-full border trns hover:scale-103">Already a member? - Log In</Link>
        </div>
      </section>
      <section className="w-11/12 mx-auto my-20">
        <h3 className="font-semibold text-3xl mb-3 text-center">Trending Contents</h3>
        <p className="text-sm mt-4 text-center">Linkers is designed for meaningful sharing and discussion, not just endless, passive consumption.</p>
        <article className="my-8">
          {
            data.map(e => (<div className="zoomOut" key={e._id} ><ContentCard e={e} /></div>))
          }
        </article>
        <div className="mx-auto zoomOut my-4 w-fit">
          <Link href="/explore" className="btn-out trns hover:bg-gray-200 rounded-full">Explore more</Link>
        </div>
      </section>
      <section className="text-center w-11/12 mx-auto my-15">
        <h3 className="font-bold text-2xl mb-3"> How It Works</h3>
        <p className="text-sm mt-4">Share Your World in Three Simple Steps</p>
        <article className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {
            sectionData.map((e, i) => (
              <div key={i} className="p-6 zoomOut rounded-3xl shadow-md/50 hover:shadow-lg/50 trns text-sm flex flex-col items-center justify-center gap-2">
                <h6 className="text-lg font-semibold">{e.title}</h6>
                <p>{e.description}</p>
              </div>
            ))
          }
        </article>
      </section>
    </main>
  );
}
