import type { FAQItem } from '@/data/faq'

interface FAQSectionProps {
  faqs: FAQItem[]
  craneTypeName?: string
  cityName?: string
}

export function FAQSection({ faqs, craneTypeName, cityName }: FAQSectionProps) {
  if (faqs.length === 0) return null

  const title = cityName
    ? `Häufige Fragen: ${craneTypeName} mieten in ${cityName}`
    : `Häufige Fragen: ${craneTypeName} mieten`

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group border rounded-lg">
            <summary className="flex items-center justify-between cursor-pointer p-4 font-medium hover:bg-muted/50 transition-colors">
              {faq.question}
              <span className="ml-2 shrink-0 text-muted-foreground group-open:rotate-180 transition-transform">
                &#9660;
              </span>
            </summary>
            <div className="px-4 pb-4 text-muted-foreground">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      {/* Schema.org FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  )
}
