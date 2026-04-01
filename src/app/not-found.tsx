import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Seite nicht gefunden</h2>
        <p className="text-muted-foreground mb-6">
          Die gesuchte Seite existiert leider nicht.
        </p>
        <Link href="/">
          <Button>Zur Startseite</Button>
        </Link>
      </div>
    </div>
  )
}
