interface RatingStarsProps {
  rating: number // 0 | 1 | 2 | 3 | 4 | 5
  className?: string
}

export default function RatingStars({ rating, className = '' }: RatingStarsProps) {
  return (
    <div className={`${className} text-purple-100 flex gap-1`}>
      <i className={`${rating > 0 ? 'ph-fill' : 'ph'} ph-star`} />
      <i className={`${rating > 1 ? 'ph-fill' : 'ph'} ph-star`} />
      <i className={`${rating > 2 ? 'ph-fill' : 'ph'} ph-star`} />
      <i className={`${rating > 3 ? 'ph-fill' : 'ph'} ph-star`} />
      <i className={`${rating > 4 ? 'ph-fill' : 'ph'} ph-star`} />
    </div>
  )
}
