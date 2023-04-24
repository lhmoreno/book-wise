import Image from 'next/image'
import RateStars from '@/components/RateStars'
import Link from 'next/link'

interface Category {
  id: string
  name: string
}

interface Book {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  rate_length: number
  rate_average: number
  categories: Category[]
}

export const metadata = {
  title: 'Book Wise | Perfil',
  description: 'Veja um perfil'
}

async function getBooks() {
  const res = await fetch('http://localhost:4000/books', {
    cache: 'no-store'
  })

  const books = await res.json() as Book[]

  return books
}

async function getCategories() {
  const res = await fetch('http://localhost:4000/categories', {
    cache: 'no-store'
  })

  const categories = await res.json() as Category[]

  return categories
}

export default async function Books() {
  const [books, categories] = await Promise.all([getBooks(), getCategories()])

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
            href="/app/explore"
            prefetch={false}
            className="px-4 py-1 bg-purple-200 rounded-full flex items-center justify-center"
          >
            Tudo
          </Link>
          {categories.map(category => {
            return (
              <Link
                key={category.id}
                href={`/app/explore?category=${category.name}`}
                prefetch={false}
                className="px-4 py-1 text-purple-100 border border-purple-100 rounded-full flex items-center justify-center"
              >
                {category.name}
              </Link>
            )
          })}
        </div>

        <div className="mt-12 flex gap-5 flex-wrap">
          {books.map(book => {
            return (
              <div key={book.id} className="w-80 bg-gray-700 rounded-lg px-5 py-4 flex gap-5">
                <Image 
                  src={book.cover_url}
                  alt=""
                  className="rounded"
                  width={107}
                  height={150}
                />
                <div className="flex-1 flex flex-col">
                  <strong className="line-clamp-2 text-lg">{book.name}</strong>
                  <p className="text-sm text-gray-400">{book.author}</p>
                  <RateStars rate={book.rate_average} className="mt-auto" />
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
