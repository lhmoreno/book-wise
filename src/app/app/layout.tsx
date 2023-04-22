import Sidebar from '@/components/Sidebar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-screen-2xl mx-auto flex">
      <Sidebar />

      <div className="flex-1 mx-24 my-16">
        {children}
      </div>
    </div>
  )
}
