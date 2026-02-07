'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

function exportToCSV(submissions: any[]) {
    if (!submissions || submissions.length === 0) return

        const headers = ['created_at', 'payload']
        const rows = submissions.map((s) => [
            s.created_at,
            JSON.stringify(s.payload)
        ])

        const csv =
        headers.join(',') +
        '\n' +
        rows.map((r) => r.join(',')).join('\n')

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = 'submissions.csv'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
}

export default function Page() {
    const [submissions, setSubmissions] = useState<any[]>([])

    useEffect(() => {
        async function fetchData() {
            const { data } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false })

            setSubmissions(data || [])
        }
        fetchData()
    }, [])

    const todayCount = submissions.filter((s) =>
    s.created_at?.startsWith(new Date().toISOString().slice(0, 10))
    ).length

    return (
        <div className="min-h-screen bg-background">
        <header className="border-b px-6 py-4">
        <div className="mx-auto max-w-6xl">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard label="Total Submissions" value={submissions.length} />
        <StatCard label="Submissions Today" value={todayCount} />
        </div>

        {/* Submissions Table */}
        <div className="space-y-3">
        <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Submissions</h2>

        {/* Export Button */}
        <button
        onClick={() => exportToCSV(submissions)}
        className="inline-flex items-center gap-2 rounded-md border bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80 transition"
        >
        ⬇ Export CSV
        </button>
        </div>

        <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
        <thead>
        <tr className="border-b bg-secondary">
        <th className="px-4 py-3 text-left w-48">Time</th>
        <th className="px-4 py-3 text-left">Payload</th>
        </tr>
        </thead>
        <tbody>
        {submissions.map((sub) => (
            <tr key={sub.id} className="border-b">
            <td className="px-4 py-3 font-mono text-xs">
            {sub.created_at}
            </td>
            <td className="px-4 py-3">
            <pre className="text-xs font-mono whitespace-pre-wrap">
            {JSON.stringify(sub.payload, null, 2)}
            </pre>
            </td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
    )
}

const StatCard = ({ label, value }: { label: string; value: number }) => (
    <div className="rounded-lg border bg-card p-5">
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
    <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
);
