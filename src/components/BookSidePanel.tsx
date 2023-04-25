'use client'

import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import RateStars from './RateStars'
import Book from './Book'

interface BookSidePanelContextProps {
  toggleBook: (book: tBook) => void
}

const BookSidePanelContext = createContext({} as BookSidePanelContextProps)

export function useBookSidePanel() {
  const ctx = useContext(BookSidePanelContext)

  return ctx
}

export function BookSidePanelProvider({ children }: PropsWithChildren) {
  const [book, setBook] = useState<tBook>()
  const [ratings, setRatings] = useState<tRating[]>([])
  const [open, setOpen] = useState(false)

  const [showRateInput, setShowRateInput] = useState(false)
  const [rate, setRate] = useState(0)
  const [description, setDescription] = useState('')

  const authenticated = false
  
  async function toggleBook(book: tBook) {
    setBook(book)
    setOpen(true)
    
    const res = await fetch(`http://localhost:4000/ratings?bookId=${book.id}&_expand=user`)
    const data = await res.json()
  
    setRatings(data)
  }

  function handleOpen(value: boolean) {
    if (!value) {
      setRatings([])
      setShowRateInput(false)
      setRate(0)
      setDescription('')
    }

    setOpen(value)
  }

  return (
    <BookSidePanelContext.Provider value={{toggleBook}}>
      {book && (
        <Dialog.Root open={open} onOpenChange={handleOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 fixed inset-0 animate-dialogOverlay" />

            <Dialog.Content className="w-full max-w-2xl bg-gray-800 fixed top-0 bottom-0 right-0 px-12 py-16 overflow-y-scroll">
              <Book 
                data={book}
                size="lg"
                showRatingsAmount
              >
                <div className="mt-10 border-t border-gray-600 flex gap-14 py-6">
                  <div className="flex gap-4 items-center">
                    <i className="ph ph-bookmark-simple text-green-100 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-300">Categoria</p>
                      <strong className="text-gray-200">{book.categories.map(c => c.name).join(', ')}</strong>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <i className="ph ph-book-open text-green-100 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-300">Páginas</p>
                      <strong className="text-gray-200">{book.total_pages}</strong>
                    </div>
                  </div>
                </div>
              </Book>

              <div className="mt-10">
                <div className="flex justify-between items-center">
                  <p className="text-gray-200 text-sm">Avaliações</p>
                  {!showRateInput && (
                    <button className="px-2 py-1 text-purple-100 font-bold" onClick={() => setShowRateInput(true)}>
                      Avaliar
                    </button>
                  )}
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {showRateInput && (
                    <div className="bg-gray-700 rounded-lg p-6">
                      <header className="flex items-center gap-4">
                        <div className="rounded-full overflow-hidden w-10 h-10 p-px bg-gradient-vertical">
                          <Image 
                            src="https://github.com/lhmoreno.png"
                            alt=""
                            className="rounded-full"
                            width={40}
                            height={40}
                            priority
                          />
                        </div>
                        <strong>Luiz Henrique</strong>
                        <div className="flex-1 text-3xl text-purple-100 flex justify-end gap-1">
                          <button onClick={() => setRate(1)}>
                            <i className={`${rate > 0 ? 'ph-fill' : 'ph'} ph-star`} />
                          </button>
                          <button onClick={() => setRate(2)}>
                            <i className={`${rate > 1 ? 'ph-fill' : 'ph'} ph-star`} />
                          </button>
                          <button onClick={() => setRate(3)}>
                            <i className={`${rate > 2 ? 'ph-fill' : 'ph'} ph-star`} />
                          </button>
                          <button onClick={() => setRate(4)}>
                            <i className={`${rate > 3 ? 'ph-fill' : 'ph'} ph-star`} />
                          </button>
                          <button onClick={() => setRate(5)}>
                            <i className={`${rate > 4 ? 'ph-fill' : 'ph'} ph-star`} />
                          </button>
                        </div>
                      </header>
                      <div className="mt-6">
                        <textarea 
                          placeholder="Escreva sua avaliação"
                          className="w-full h-48 px-5 py-3 border border-gray-500 rounded bg-gray-800 text-gray-200 resize-none placeholder:text-gray-400" 
                        />
                        <div className="mt-3 flex justify-end gap-2">
                          <button 
                            className="p-2 flex items-center justify-center bg-gray-600 rounded transition-colors hover:bg-gray-500"
                            onClick={() => setShowRateInput(false)}
                          >
                            <i className="ph ph-x text-purple-100 text-2xl" />
                          </button>
                          <button className="p-2 flex items-center justify-center bg-gray-600 rounded transition-colors hover:bg-gray-500">
                            <i className="ph ph-check text-green-100 text-2xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {ratings.map(rating => {
                    const distance = formatDistanceToNow(new Date(rating.created_at), {
                      locale: ptBR,
                      addSuffix: true
                    })

                    return (
                      <div key={rating.id} className="bg-gray-700 rounded-lg p-6">
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

                        <p className="mt-5 text-gray-300">{rating.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Dialog.Close asChild>
                <button className="absolute top-0 right-0 m-6 text-gray-400 transition-colors hover:text-gray-200" aria-label="Close">
                  <i className="ph ph-x text-2xl" />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
      
      {children}
    </BookSidePanelContext.Provider>
  )
}
