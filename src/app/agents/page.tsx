// app/agents/page.tsx
import Link from "next/link"
import { agents } from "@/lib/agents"

export default function AgentsPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold mb-6">Select a GPT</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(a => (
          <Link key={a.slug} href={`/agents/${a.slug}`} className="block">
            <div className="rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
              <div className="h-24 rounded-xl bg-gray-100 mb-4 flex items-center justify-center text-lg font-semibold">
                {a.name}
              </div>
              <p className="text-sm text-gray-600">{a.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
