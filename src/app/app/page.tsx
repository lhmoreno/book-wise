import Link from 'next/link'
import Book from '@/components/Book'
import Rating from '@/components/Rating'

export const metadata = {
  title: 'Book Wise | Início',
  description: 'Encontre os melhores livros do planeta aqui'
}

async function getRatings() {
  const res = await fetch('http://localhost:4000/ratings?_expand=user&_expand=book&_sort=created_at&_order=desc', {
    cache: 'no-store'
  })

  const ratings = await res.json() as tRating[]

  return ratings
}

async function getPopularBooks() {
  const res = await fetch('http://localhost:4000/books?_sort=rate_length&_order=desc&_limit=5')
  
  const books = await res.json() as tBook[]

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
              return (
                <Rating key={rating.id} data={rating} />
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
                <Book 
                  key={book.id}
                  size="sm" 
                  data={book}
                  handleBookSidePanel
                />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
