'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'

interface DialogLoginProps {
  description?: string
  children: React.ReactNode
}

export default function DialogLogin({ description, children }: DialogLoginProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 fixed inset-0 animate-dialogOverlay" />
        <Dialog.Content className="w-[32rem] bg-gray-700 rounded-xl fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 animate-dialogContent shadow-lg flex flex-col items-center px-18 py-16">
          <Dialog.Title className="text-xl font-bold text-gray-200">Faça login</Dialog.Title>
          <Dialog.Description className="mt-1 text-gray-300">
            {description ?? 'E aproveite o melhor de nosso app'}
          </Dialog.Description>
          <div className="mt-10 flex flex-col gap-4">
            <button className="w-96 px-6 py-5 flex items-center justify-center gap-5 bg-gray-600 rounded-lg text-lg text-gray-200 font-bold transition-colors hover:bg-gray-500">
              <Image 
                src="/icons/google.svg"
                alt=""
                width={32}
                height={32}
                priority
              /> 
              Entrar com Google
            </button>
            <button className="w-96 px-6 py-5 flex items-center justify-center gap-5 bg-gray-600 rounded-lg text-lg text-gray-200 font-bold transition-colors hover:bg-gray-500">
              <Image 
                src="/icons/github.svg"
                alt=""
                width={32}
                height={32}
                priority
              /> 
              Entrar com GitHub
            </button>
          </div>
          <Dialog.Close asChild>
            <button className="absolute top-0 right-0 m-4 text-gray-400 transition-colors hover:text-gray-200" aria-label="Close">
              <i className="ph ph-x text-2xl" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
