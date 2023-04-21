import Sidebar from '@/components/Sidebar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pl-[21rem] px-24 py-5 flex">
      <Sidebar />

      <div>
        {children}
      </div>
    </div>
  )
}
