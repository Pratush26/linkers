import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center gap-3 min-h-[70vh] my-6">
      <h1 className="font-bold text-5xl">Welcome to Linkers</h1>
        <p>Share your contents among all using Linkers,</p>
        <p className="text-sm">Easy to use, easy to share</p>
        <div>
          <Link href="/register" className="btn rounded-full hover:scale-103">Register today</Link>
        </div>
      </section>
    </main>
  );
}
