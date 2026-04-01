import { NextResponse } from 'next/server'
import { submitLead } from '@/lib/queries'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.customer_email || !body.dsgvo_consent) {
      return NextResponse.json(
        { error: 'E-Mail und DSGVO-Zustimmung sind erforderlich.' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.customer_email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse.' },
        { status: 400 }
      )
    }

    const lead = await submitLead({
      crane_type_id: body.crane_type_id || null,
      city: body.city || '',
      customer_name: body.customer_name || '',
      customer_phone: body.customer_phone || '',
      customer_email: body.customer_email,
      project_description: body.project_description || '',
      preferred_date: body.preferred_date || null,
      duration_days: body.duration_days || null,
      dsgvo_consent: body.dsgvo_consent,
      company_ids: body.company_ids || [],
    })

    return NextResponse.json({ success: true, id: lead.id })
  } catch {
    return NextResponse.json(
      { error: 'Interner Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    )
  }
}
