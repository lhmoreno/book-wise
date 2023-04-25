'use client'

import Image from "next/image"
import RateStars from "./RateStars"
import { useBookSidePanel } from "./BookSidePanel"
import { ReactNode } from "react"

interface BookProps {
  data: tBook
  size?: 'sm' | 'md' | 'lg'
  showRatingsAmount?: boolean
  handleBookSidePanel?: boolean
  children?: ReactNode
}

const sizeStyles = {
  'sm': { 
    containerClass: '',
    componentClass: '',
    nameClass: '',
    authorClass: '',
    starsClass: '',
    image: {
      class: 'rounded',
      width: 66, 
      height: 92 
    }
  },
  'md': { 
    containerClass: '',
    componentClass: '',
    nameClass: '',
    authorClass: '',
    starsClass: '',
    image: {
      class: 'rounded',
      width: 107, 
      height: 150 
    }
  },
  'lg': { 
    containerClass: 'rounded-xl px-8 py-6',
    componentClass: 'gap-8',
    nameClass: 'text-lg',
    authorClass: 'mt-2 text-base',
    starsClass: 'text-xl',
    image: {
      class: 'rounded-xl',
      width: 167, 
      height: 234 
    }
  }
}

export default function Book({ 
  data,
  size = 'md',
  showRatingsAmount,
  handleBookSidePanel,
  children 
}: BookProps) {
  const { toggleBook } = useBookSidePanel()
  const { 
    containerClass, 
    componentClass,
    image, 
    nameClass,
    authorClass,
    starsClass 
  } = sizeStyles[size]

  function showBookSidePanel() {
    toggleBook(data)
  }

  return (
    <div className={`px-5 py-4 bg-gray-700 rounded-lg ${containerClass}`}>
      <div className={`flex gap-5 ${componentClass}`}>
        <button 
          onClick={showBookSidePanel}
          disabled={!handleBookSidePanel}
        >
          <Image 
            src={data.cover_url}
            alt=""
            className={image.class}
            width={image.width}
            height={image.height}
          />
        </button>
        <div className="flex-1 flex flex-col py-1">
          <button 
            className="text-left enabled:hover:underline" 
            onClick={showBookSidePanel}
            disabled={!handleBookSidePanel}
          >
            <strong className={`line-clamp-2 ${nameClass}`}>{data.name}</strong>
          </button>
          <p className={`text-sm text-gray-400 ${authorClass}`}>{data.author}</p>

          <div className="mt-auto">
            <RateStars 
              rate={data.rate_average} 
              className={starsClass} 
            />
            {showRatingsAmount && (
              <p className="mt-1.5 text-sm text-gray-400">{data.rate_length} avaliações</p>
            )}
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
