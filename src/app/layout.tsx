import './globals.css'
import { Nunito_Sans } from 'next/font/google'

const nunitoSans = Nunito_Sans({ 
  weight: ['400', '700'],
  subsets: ['latin'] 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${nunitoSans.className} __className_df4bbc bg-gray-800 text-gray-100`}>
        {children}
      </body>
    </html>
  )
}
