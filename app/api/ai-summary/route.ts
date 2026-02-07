import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
    try {
        const { submissions } = await req.json()

        if (!submissions || submissions.length === 0) {
            return Response.json({ summary: "No submissions available." })
        }

        // Limit to avoid huge payload
        const limited = submissions.slice(0, 50)

        const formatted = limited.map((s: any) =>
        JSON.stringify(s.payload)
        ).join("\n")

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                    "You are an analytics assistant. Summarize trends, common intent, and business insights from website submissions in 3-4 concise sentences.",
                },
                {
                    role: "user",
                    content: `Here are recent submissions:\n${formatted}`,
                },
            ],
        })

        const summary = completion.choices[0].message.content

        return Response.json({ summary })

    } catch (error) {
        console.error("AI Summary Error:", error)
        return new Response("Internal Server Error", { status: 500 })
    }
}
