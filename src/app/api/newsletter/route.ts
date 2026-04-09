import { NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'E-Mail ist erforderlich.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 })
    }

    const sb = getServiceSupabase()
    await sb
      .from('newsletter_subscribers')
      .upsert({ email, source: 'homepage' }, { onConflict: 'email' })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Interner Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 },
    )
  }
}
