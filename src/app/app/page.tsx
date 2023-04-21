import Image from "next/image"
import Link from "next/link"
import RatingStars from "@/components/RatingStars"

export const metadata = {
  title: 'Book Wise | Início',
  description: 'Encontre os melhores livros do planeta aqui'
}

async function getAssessments() {
  const fetchAssessments = await fetch('http://localhost:4000/assessments?_expand=user', {
    cache: 'no-store'
  })
  const resAssessments = await fetchAssessments.json() as any[]
  
  const promises = resAssessments.map(async (assessment) => {
    const fetchBook = await fetch(`http://localhost:4000/books/${assessment.bookId}?_expand=author`, {
      cache: 'no-store'
    })
    const resBook = await fetchBook.json()

    return {
      id: assessment.id,
      createAt: assessment.createAt,
      rating: assessment.rating,
      user: assessment.user,
      book: {
        id: resBook.id,
        title: resBook.title,
        description: resBook.description,
        coverUrl: resBook.coverUrl,
        author: resBook.author
      }
    }
  })
  
  const assessments = await Promise.all(promises)

  return assessments as Assessment[]
}

async function getPopularBooks() {
  const res = await fetch('http://localhost:4000/books?_expand=author&_sort=rating&_order=desc')
  const data = await res.json() as Book[]

  const books = data.map(book => ({
    id: book.id,
    title: book.title,
    rating: book.rating,
    coverUrl: book.coverUrl,
    author: book.author
  }))

  return books as Book[]
}

export default async function Home() {
  const [assessments, popularBooks] = await Promise.all([getAssessments(), getPopularBooks()])

  return (
    <div>
      <header className="text-2xl font-bold flex gap-3">
        <i className="ph ph-chart-line-up text-green-100 text-[2rem]" />
        Início
      </header>

      <main className="mt-10 flex gap-24">
        <div>
          <p className="text-sm">Avaliações mais recentes</p>

          <div className="mt-4 flex flex-col gap-3 w-[38rem]">
            {assessments.map(assessment => {
              return (
                <div key={assessment.id} className="h-[17.5rem] bg-gray-700 rounded-lg p-6">
                  <header className="flex gap-4">
                    <div className="rounded-full overflow-hidden w-10 h-10 p-px bg-gradient-vertical">
                      <Image 
                        src={assessment.user.avatarUrl}
                        alt=""
                        className="rounded-full"
                        width={40}
                        height={40}
                        priority
                      />
                    </div>
                    <div>
                      <p>{assessment.user.name}</p>
                      <p className="text-sm text-gray-400">{assessment.createAt}</p>
                    </div>
                    <RatingStars rating={assessment.rating} className="ml-auto"/>
                  </header>

                  <main className="mt-8 flex gap-5">
                    <Image 
                      src={assessment.book.coverUrl}
                      alt=""
                      className="rounded"
                      width={108}
                      height={152}
                      priority
                    />
                    <div>
                      <strong>{assessment.book.title}</strong>
                      <p className="text-sm text-gray-400">{assessment.book.author.name}</p>
                      <p className="mt-5 text-gray-300 assessment-description-ellipsis">{assessment.book.description}</p>
                    </div>
                  </main>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <p className="text-sm">Livros populares</p>
            <Link href="#" className="px-2 py-1 text-sm text-purple-100 font-bold flex items-center gap-2">
              Ver todos
              <i className="ph ph-caret-right w-4 h-4" />
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {popularBooks.map(book => {
              return (
                <div key={book.id} className="bg-gray-700 rounded-lg px-5 py-4 flex gap-5">
                  <Image 
                    src={book.coverUrl}
                    alt=""
                    className="rounded"
                    width={64}
                    height={94}
                    priority
                  />
                  <div className="flex flex-col">
                    <strong>{book.title}</strong>
                    <p className="text-sm text-gray-400">{book.author.name}</p>
                    <RatingStars rating={book.rating} className="mt-auto" />
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
