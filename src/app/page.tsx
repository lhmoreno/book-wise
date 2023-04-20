import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex p-5">
      <div className="relative w-[37rem] rounded-xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image 
            src="/logo.svg"
            alt=""
            width={232}
            height={85}
            priority
          />
        </div>
        <Image 
          src="/background-login.png"
          alt=""
          className="h-full object-cover"
          width={598}
          height={912}
          priority
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <strong className="text-2xl">Boas vindas!</strong>
        <p className="mt-0.5 text-gray-200">Faça seu login ou acesse como visitante.</p>

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
          <button className="w-96 px-6 py-5 flex items-center justify-center gap-5 bg-gray-600 rounded-lg text-lg text-gray-200 font-bold transition-colors hover:bg-gray-500">
            <Image 
              src="/icons/rocket.svg"
              alt=""
              width={32}
              height={32}
              priority
            /> 
            Acessar como visitante
          </button>
        </div>
      </div>
    </main>
  )
}
