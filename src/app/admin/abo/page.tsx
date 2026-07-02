import type { Metadata } from 'next'
import { isAdminRequest } from '@/lib/admin-auth'
import { AdminLoginForm } from '@/components/admin-login-form'
import { AdminAboGenerator } from '@/components/admin-abo-generator'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Abo — Checkout-Link',
  robots: { index: false, follow: false },
}

export default async function AdminAboPage() {
  if (!(await isAdminRequest())) {
    return <AdminLoginForm />
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Abo — Checkout-Link generieren</h1>
      <p className="text-[14px] text-gray-500 mb-6">
        Firma wählen, Plan wählen und den generierten Stripe-Checkout-Link an die Firma senden
        (Outbound). Der Link erzeugt erst bei Bezahlung eine Subscription.
      </p>
      <AdminAboGenerator />
    </div>
  )
}
