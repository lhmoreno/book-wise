'use client'

import Image from 'next/image'
import { useBookSidePanel } from './BookSidePanel'
import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import RateStars from './RateStars'
import Link from 'next/link'

interface RatingProps {
  data: tRating
}

export default function Rating({ data }: RatingProps) {
  const { toggleBook } = useBookSidePanel()

  const distance = formatDistanceToNow(new Date(data.created_at), {
    locale: ptBR,
    addSuffix: true
  })

  function showBookSidePanel() {
    toggleBook(data.book)
  }

  return (
    <div className="h-[17.5rem] bg-gray-700 rounded-lg p-6">
      <header className="flex gap-4">
        <div className="rounded-full overflow-hidden w-10 h-10 p-px bg-gradient-vertical">
          <Link 
            href={`/app/profile?id=${data.user.id}`}
          >
            <Image 
              src={data.user.avatar_url}
              alt=""
              className="rounded-full"
              width={40}
              height={40}
              priority
            />
          </Link>
        </div>
        <div>
          <Link 
            href={`/app/profile?id=${data.user.id}`}
            className="hover:underline"
          >
            {data.user.name}
          </Link>
          <p className="text-sm text-gray-400">{distance}</p>
        </div>
        <RateStars rate={data.rate} className="ml-auto"/>
      </header>

      <main className="mt-8 flex gap-5">
        <button onClick={showBookSidePanel}>
          <Image 
            src={data.book.cover_url}
            alt=""
            className="rounded"
            width={107}
            height={150}
          />
        </button>
        <div className="flex-1">
          <button onClick={showBookSidePanel} className="hover:underline">
            <strong>{data.book.name}</strong>
          </button>
          <p className="text-sm text-gray-400">{data.book.author}</p>
          <p className="mt-5 text-gray-300 line-clamp-3">{data.description}</p>
        </div>
      </main>
    </div>
  )
}
