import Link from 'next/link'
import { craneTypes } from '@/data/crane-types'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
              K
            </span>
            <span className="text-sm font-semibold text-gray-900">KranVergleich.de</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {craneTypes.slice(0, 3).map((ct) => (
              <Link
                key={ct.slug}
                href={`/${ct.slug}`}
                className="px-2.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                {ct.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="px-2.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                Mehr &#9662;
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[180px]">
                {craneTypes.slice(3).map((ct) => (
                  <Link
                    key={ct.slug}
                    href={`/${ct.slug}`}
                    className="block px-4 py-2 text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    {ct.name} mieten
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
