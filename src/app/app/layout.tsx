import Sidebar from '@/components/Sidebar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pl-[21rem] pr-24 flex">
      <Sidebar />

      <div className="w-full py-16">
        {children}
      </div>
    </div>
  )
}
