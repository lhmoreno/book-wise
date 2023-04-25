import Link from 'next/link'
import Book from '@/components/Book'

interface PageProps {
  searchParams: {
    [param: string]: string | string [] | undefined
  }
}

export const metadata = {
  title: 'Book Wise | Perfil',
  description: 'Veja um perfil'
}

function stylesLinkActive(active?: boolean) {
  if (active) {
    return 'px-4 py-1 bg-purple-200 rounded-full flex items-center justify-center'
  } else {
    return 'px-4 py-1 text-purple-100 border border-purple-100 rounded-full flex items-center justify-center'
  }
}

async function getBooks(categories?: string[]) {
  const res = await fetch('http://localhost:4000/books', {
    cache: 'no-store'
  })

  const books = await res.json() as tBook[]

  if (!categories) return books

  const filteredBooks = books.filter(book => book.categories.find(category => categories.includes(category.slug)))

  return filteredBooks
}

async function getCategories() {
  const res = await fetch('http://localhost:4000/categories', {
    cache: 'no-store'
  })

  const categories = await res.json() as tCategory[]

  return categories
}

export default async function Books({ searchParams }: PageProps) {
  const categoryParams = typeof searchParams.category === 'string' ? [searchParams.category] : searchParams.category
  const [books, categories] = await Promise.all([getBooks(categoryParams), getCategories()])
  
  const baseUrl = !categoryParams ? '/app/books' : `/app/books${categoryParams.map((c, i) => `${i === 0 ? '?' : '&'}category=${c}`).join('')}`

  return (
    <div>
      <div className="flex justify-between">
        <header className="text-2xl font-bold flex gap-3">
          <i className="ph ph-binoculars text-green-100 text-[2rem]" />
          Explorar
        </header>

        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="Buscar livro ou autor" 
            className="w-full bg-transparent border border-gray-500 rounded pl-5 pr-20 py-3 placeholder:text-gray-400"
          />
          <i className="ph ph-magnifying-glass text-gray-500 text-xl absolute top-0 bottom-0 right-8 flex items-center" />
        </div>
      </div>

      <main className="mt-10">
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/app/books"
            prefetch={false}
            className={stylesLinkActive(!categoryParams)}
          >
            Tudo
          </Link>
          {categories.map(category => {
            const isCategoryActive = categoryParams?.includes(category.slug)
            const href = isCategoryActive ? baseUrl : `${baseUrl}${!categoryParams ? '?' : '&'}category=${category.slug}`

            return (
              <Link
                key={category.slug}
                href={href}
                prefetch={false}
                className={stylesLinkActive(isCategoryActive)}
              >
                {category.name}
              </Link>
            )
          })}
        </div>

        <div className="mt-12 flex gap-5 flex-wrap">
          {books.map(book => {
            return (
              <div key={book.id} className="w-80">
                <Book 
                  data={book}
                  handleBookSidePanel
                  showRatingsAmount
                />
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
