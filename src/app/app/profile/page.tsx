import Image from 'next/image'
import RateStars from '@/components/RateStars'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface User {
  id: string
  name: string
  avatar_url: string
  pages_read: number
  ratings_amount: number
  most_read_category: string
  authors_read: number
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
}

export const metadata = {
  title: 'Book Wise | Perfil',
  description: 'Veja um perfil'
}

async function getRatings() {
  const res = await fetch('http://localhost:4000/ratings?userId=c296c6c0-5c59-40dd-aa8a-ef2b015b7502&_expand=book&_sort=created_at&_order=desc', {
    cache: 'no-store'
  })

  const ratings = await res.json() as Rating[]

  return ratings
}

async function getUser() {
  const res = await fetch('http://localhost:4000/users?id=c296c6c0-5c59-40dd-aa8a-ef2b015b7502', {
    cache: 'no-store'
  })
  
  const users = await res.json() as User[]

  return users[0]
}

export default async function Profile() {
  const [ratings, user] = await Promise.all([getRatings(), getUser()])

  return (
    <div>
      <header className="text-2xl font-bold flex gap-3">
        <i className="ph ph-user text-green-100 text-[2rem]" />
        Perfil
      </header>

      <main className="mt-10 flex justify-between gap-14">
        <div>
          <div className="mt-8 flex flex-col gap-6 max-w-[39rem]">
            {ratings.map(rating => {
              const distance = formatDistanceToNow(new Date(rating.created_at), {
                locale: ptBR,
                addSuffix: true
              })

              return (
                <div key={rating.id}>
                  <span className="text-sm text-gray-300">{distance}</span>

                  <div className="mt-2 bg-gray-700 rounded-lg p-6">
                    <div className="flex gap-6 py-1">
                      <Image 
                        src={rating.book.cover_url}
                        alt=""
                        className="rounded"
                        width={95}
                        height={133}
                      />
                      <div className="flex-1 flex flex-col">
                        <strong className="line-clamp-2 text-lg">{rating.book.name}</strong>
                        <p className="mt-0.5 text-sm text-gray-400">{rating.book.author}</p>
                        <RateStars rate={rating.book.rate_average} className="mt-auto" />
                      </div>
                    </div>
                    
                    <p className="mt-6 text-gray-300">{rating.book.summary}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <div className="mx-auto rounded-full w-20 h-20 p-0.5 bg-gradient-vertical">
            <Image 
              src={user.avatar_url}
              alt=""
              className="rounded-full"
              width={80}
              height={80}
            />
          </div>
          <div className="mt-5 text-center">
            <strong className="text-xl">{user.name}</strong>
            <p className="text-sm text-gray-400">membro desde 2019</p>
          </div>
          <hr className="mt-10 mb-8 mx-auto w-8 h-1 rounded-full bg-gradient-horizontal" />
          <div className="py-5 px-14 flex flex-col gap-10">
            <div className="flex gap-5 items-center">
              <i className="ph ph-book-open text-green-100 text-4xl" />
              <div>
                <strong className="text-gray-200">{user.pages_read}</strong>
                <p className="text-sm text-gray-300">Páginas lidas</p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <i className="ph ph-books text-green-100 text-4xl" />
              <div>
                <strong className="text-gray-200">{user.ratings_amount}</strong>
                <p className="text-sm text-gray-300">Livros avaliados</p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <i className="ph ph-user-list text-green-100 text-4xl" />
              <div>
                <strong className="text-gray-200">{user.authors_read}</strong>
                <p className="text-sm text-gray-300">Autores lidos</p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <i className="ph ph-bookmark-simple text-green-100 text-4xl" />
              <div>
                <strong className="text-gray-200">{user.most_read_category}</strong>
                <p className="text-sm text-gray-300">Categoria mais lida</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
