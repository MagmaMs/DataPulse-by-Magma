'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Page() {
  const [todos, setTodos] = useState<any[]>([])

  useEffect(() => {
    async function fetchTodos() {
      const { data } = await supabase.from('todos').select()
      setTodos(data || [])
    }

    fetchTodos()
  }, [])

  return (
    <ul>
    {todos.map((todo, i) => (
      <li key={i}>{JSON.stringify(todo)}</li>
    ))}
    </ul>
  )
}
