import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { error } = await supabase
    .from('events')
    .insert({
      payload: body
    })

    if (error) {
      return NextResponse.json(
        { error: 'Database insert failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    return NextResponse.json(
      { error: 'JSON parse failed' },
      { status: 400 }
    )
  }
}
