import { BookSidePanelProvider } from '@/components/BookSidePanel'
import Sidebar from '@/components/Sidebar'
import { PropsWithChildren } from 'react'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <BookSidePanelProvider>
      <div className="max-w-screen-2xl mx-auto flex">
        <Sidebar />

        <div className="relative flex-1 mx-24 my-16">
          {children}
        </div>
      </div>
    </BookSidePanelProvider>
  )
}
