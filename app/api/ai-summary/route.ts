export async function POST(req: Request) {
    const { submissions } = await req.json()

    if (!submissions || submissions.length === 0) {
        return Response.json({ summary: "No submissions available." })
    }

    const total = submissions.length

    const today = submissions.filter((s: any) =>
    s.created_at?.startsWith(new Date().toISOString().slice(0, 10))
    ).length

    const domains: Record<string, number> = {}

    submissions.forEach((s: any) => {
        const d = s.payload?.domain
        if (d) domains[d] = (domains[d] || 0) + 1
    })

    const topDomain =
    Object.entries(domains).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

    const summary = `
    Total submissions: ${total}.
    Submissions today: ${today}.
    `
z
    return Response.json({ summary })
}
