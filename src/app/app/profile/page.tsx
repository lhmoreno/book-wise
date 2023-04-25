import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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

async function getRatings(userId: string) {
  const res = await fetch(`http://localhost:4000/ratings?userId=${userId}&_expand=book&_sort=created_at&_order=desc`, {
    cache: 'no-store'
  })

  const ratings = await res.json() as tRating[]

  return ratings
}

async function getUser(userId: string) {
  const res = await fetch(`http://localhost:4000/users?id=${userId}`, {
    cache: 'no-store'
  })
  
  const users = await res.json() as tUser[]

  return users[0]
}

export default async function Profile({ searchParams }: PageProps) {
  const ids = searchParams.id ?? '6624df61-5947-4f8c-9c7e-39c8c40fa158'
  const id = typeof ids === 'string' ? ids : ids[0]
  const [ratings, user] = await Promise.all([getRatings(id), getUser(id)])

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
                <div key={rating.id} className="flex flex-col gap-2">
                  <span className="text-sm text-gray-300">{distance}</span>

                  <Book
                    data={rating.book}
                    handleBookSidePanel
                  >
                    <p className="mt-6 text-gray-300">{rating.description}</p>
                  </Book>
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
            {user.most_read_category && (
              <div className="flex gap-5 items-center">
                <i className="ph ph-bookmark-simple text-green-100 text-4xl" />
                <div>
                  <strong className="text-gray-200">{user.most_read_category}</strong>
                  <p className="text-sm text-gray-300">Categoria mais lida</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
