'use client'

export default function DemoPage() {
    async function handleSubmit(e: any) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        await fetch('/api/track/abc123', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        alert('Form submitted!')
        e.target.reset()
    }

    return (
        <div className="max-w-md mx-auto mt-20 space-y-4">
        <h1 className="text-xl font-semibold">Demo Website</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Name" className="border p-2 w-full" />
        <input name="email" placeholder="Email" className="border p-2 w-full" />
        <textarea name="message" placeholder="Message" className="border p-2 w-full" />
        <button className="bg-black text-white px-4 py-2">Submit</button>
        </form>
        </div>
    )
}
