import Link from 'next/link'
import { getPriceForCraneType, cranePrices } from '@/data/crane-prices'
import { getCraneTypeName } from '@/data/crane-types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface PriceTableProps {
  craneTypeSlug?: string
  showAll?: boolean
}

function formatPrice(value: number): string {
  return value.toLocaleString('de-DE')
}

export function PriceTable({ craneTypeSlug, showAll }: PriceTableProps) {
  const prices = showAll
    ? cranePrices
    : craneTypeSlug
      ? [getPriceForCraneType(craneTypeSlug)].filter(Boolean)
      : []

  if (prices.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {showAll ? 'Kran mieten: Preisübersicht' : 'Preisübersicht (Richtwerte)'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {showAll && <th className="text-left py-2 px-3 font-medium">Krantyp</th>}
                <th className="text-left py-2 px-3 font-medium">Tagespreis</th>
                <th className="text-left py-2 px-3 font-medium">Wochenpreis</th>
                <th className="text-left py-2 px-3 font-medium">Monatspreis</th>
                <th className="text-left py-2 px-3 font-medium">Kranführer</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p) => p && (
                <tr key={p.craneTypeSlug} className="border-b last:border-0">
                  {showAll && (
                    <td className="py-3 px-3 font-medium">
                      <Link href={`/${p.craneTypeSlug}`} className="hover:underline text-primary">
                        {getCraneTypeName(p.craneTypeSlug)}
                      </Link>
                    </td>
                  )}
                  <td className="py-3 px-3">
                    {formatPrice(p.dayFrom)}€ – {formatPrice(p.dayTo)}€
                  </td>
                  <td className="py-3 px-3">
                    {formatPrice(p.weekFrom)}€ – {formatPrice(p.weekTo)}€
                  </td>
                  <td className="py-3 px-3">
                    {formatPrice(p.monthFrom)}€ – {formatPrice(p.monthTo)}€
                  </td>
                  <td className="py-3 px-3">
                    {p.includesOperator ? 'Inklusive' : 'Ohne'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Alle Preise netto zzgl. MwSt. Unverbindliche Richtwerte — die tatsächlichen Kosten
          hängen von Tragkraft, Einsatzdauer, Standort und Verfügbarkeit ab.
          {!showAll && prices[0] && ` ${prices[0].notes}`}
        </p>
      </CardContent>
    </Card>
  )
}
