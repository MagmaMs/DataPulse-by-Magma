import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data, error } = await supabase
  .from('projects')
  .select('*')

  return (
    <main style={{ padding: 20 }}>
    <h1>Supabase Test</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    {error && <p>Error: {error.message}</p>}
    </main>
  )
}
