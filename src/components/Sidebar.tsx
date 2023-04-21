'use client'

import { Binoculars, ChartLineUp, SignIn, SignOut, User, X } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DialogLogin from './DialogLogin'
import * as Dialog from '@radix-ui/react-dialog'


export default function Sidebar() {
  const authenticated = true
  const pathname = usePathname()

  function classNameLink(active: boolean) {
    if (active) {
      return 'before:bg-gradient-vertical relative p-2 flex items-center gap-3 font-bold before:absolute before:-left-4 before:w-1 before:h-6 before:rounded-full'
    }
  
    return 'p-2 flex items-center gap-3 text-gray-400 transition-color hover:text-gray-300'
  }

  return (
    <div className="fixed left-0 top-0 bottom-0 ml-5 my-5 w-60 rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center">
        <Image 
          src="/logo.svg"
          alt=""
          className="mt-10"
          width={128}
          height={32}
          priority
        />

        <nav className="mt-16 flex flex-col gap-4">
          <Link href="/app" className={classNameLink(pathname === '/app')}>
            <ChartLineUp className="w-6 h-6" />
            Início
          </Link>
          <Link href="/app/books" className={classNameLink(pathname === '/app/books')}>
            <Binoculars className="w-6 h-6" />
            Explorar
          </Link>
          {authenticated && (
            <Link href="/app/profile" className={classNameLink(pathname === '/app/profile')}>
              <User className="w-6 h-6" />
              Perfil
            </Link>
          )}
        </nav>

        {authenticated ? (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="mt-auto mb-4 p-2 flex items-center gap-3 text-gray-200 transition-opacity hover:opacity-80">
                <div className="rounded-full overflow-hidden w-8 h-8 p-px bg-gradient-vertical">
                  <Image 
                    src="https://github.com/lhmoreno.png"
                    alt=""
                    className="rounded-full"
                    width={32}
                    height={32}
                    priority
                  />
                </div>
                Luiz Henrique
                <SignOut className="text-red-100 w-5 h-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/60 fixed inset-0 animate-dialogOverlay" />
              <Dialog.Content className="w-[32rem] bg-gray-700 rounded-xl fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 animate-dialogContent shadow-lg flex flex-col items-center px-18 py-16">
                <Dialog.Title className="text-xl font-bold text-gray-200">Tem certeza que deseja sair?</Dialog.Title>
                <Dialog.Description className="mt-1 text-gray-300">
                  Você perderá sua sessão ativa
                </Dialog.Description>
                <button className="mt-10 w-96 px-6 py-5 flex items-center justify-center gap-5 bg-gray-600 rounded-lg text-lg text-gray-200 font-bold transition-colors hover:bg-gray-500">
                  Sair
                </button>
                <Dialog.Close asChild>
                  <button className="absolute top-0 right-0 w-6 h-6 m-4 text-gray-400 transition-colors hover:text-gray-200" aria-label="Close">
                    <X className="w-full h-full" />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ) : (
          <DialogLogin>
            <button className="mt-auto mb-4 p-2 flex items-center gap-3 text-gray-200 font-bold transition-opacity hover:opacity-80">
              Fazer login
              <SignIn className="text-green-100 w-5 h-5" />
            </button>
          </DialogLogin>
        )}
      </div>
      <Image 
        src="/background-sidebar.png"
        alt=""
        className="w-full h-full object-cover"
        width={232}
        height={988}
        priority
      />
    </div>
  )
}