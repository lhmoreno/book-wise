import Image from 'next/image'
import Link from 'next/link'
import RateStars from '@/components/RateStars'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface User {
  id: string
  name: string
  avatar_url: string
}

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

interface Rating {
  id: string
  rate: 0 | 1 | 2 | 3 | 4 | 5
  description: string
  created_at: string
  book: Book
  user: User
}

export const metadata = {
  title: 'Book Wise | Início',
  description: 'Encontre os melhores livros do planeta aqui'
}

async function getRatings() {
  const res = await fetch('http://localhost:4000/ratings?_expand=user&_expand=book&_sort=created_at&_order=desc', {
    cache: 'no-store'
  })

  const ratings = await res.json() as Rating[]

  return ratings
}

async function getPopularBooks() {
  const res = await fetch('http://localhost:4000/books?_sort=rate_length&_order=desc&_limit=5')
  
  const books = await res.json() as Book[]

  return books
}

export default async function Home() {
  const [ratings, popularBooks] = await Promise.all([getRatings(), getPopularBooks()])

  return (
    <div>
      <header className="text-2xl font-bold flex gap-3">
        <i className="ph ph-chart-line-up text-green-100 text-[2rem]" />
        Início
      </header>

      <main className="mt-10 flex justify-between gap-14">
        <div>
          <p className="text-sm">Avaliações mais recentes</p>

          <div className="mt-4 flex flex-col gap-3 max-w-[38rem]">
            {ratings.map(rating => {
              const distance = formatDistanceToNow(new Date(rating.created_at), {
                locale: ptBR,
                addSuffix: true
              })

              return (
                <div key={rating.id} className="h-[17.5rem] bg-gray-700 rounded-lg p-6">
                  <header className="flex gap-4">
                    <div className="rounded-full overflow-hidden w-10 h-10 p-px bg-gradient-vertical">
                      <Image 
                        src={rating.user.avatar_url}
                        alt=""
                        className="rounded-full"
                        width={40}
                        height={40}
                        priority
                      />
                    </div>
                    <div>
                      <p>{rating.user.name}</p>
                      <p className="text-sm text-gray-400">{distance}</p>
                    </div>
                    <RateStars rate={rating.rate} className="ml-auto"/>
                  </header>

                  <main className="mt-8 flex gap-5">
                    <Image 
                      src={rating.book.cover_url}
                      alt=""
                      className="rounded"
                      width={107}
                      height={150}
                    />
                    <div className="flex-1">
                      <strong>{rating.book.name}</strong>
                      <p className="text-sm text-gray-400">{rating.book.author}</p>
                      <p className="mt-5 text-gray-300 line-clamp-3">{rating.book.summary}</p>
                    </div>
                  </main>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm">Livros populares</p>
            <Link href="/app" className="px-2 py-1 text-sm text-purple-100 font-bold flex items-center gap-2">
              Ver todos
              <i className="ph ph-caret-right w-4 h-4" />
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-3 max-w-xs">
            {popularBooks.map(book => {
              return (
                <div key={book.id} className="bg-gray-700 rounded-lg px-5 py-4 flex gap-5">
                  <Image 
                    src={book.cover_url}
                    alt=""
                    className="rounded"
                    width={66}
                    height={92}
                  />
                  <div className="flex-1 flex flex-col">
                    <strong className="h-12 line-clamp-2">{book.name}</strong>
                    <p className="text-sm text-gray-400">{book.author}</p>
                    <RateStars rate={book.rate_average} className="mt-auto" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
