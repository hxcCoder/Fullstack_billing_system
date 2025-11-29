import Link from "next/link"

export function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-red-700 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
    >
      Saltar al contenido principal
    </Link>
  )
}
