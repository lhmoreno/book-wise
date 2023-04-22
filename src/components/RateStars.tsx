interface RateStarsProps {
  rate: number
  className?: string
}

export default function RateStars({ rate, className = '' }: RateStarsProps) {
  return (
    <div className={`${className} text-purple-100 flex gap-1`}>
      <i className={`${rate > 0 ? 'ph-fill' : 'ph'} ph-star`} />
      <i className={`${rate > 1 ? 'ph-fill' : 'ph'} ph-star`} />
      <i className={`${rate > 2 ? 'ph-fill' : 'ph'} ph-star`} />
      <i className={`${rate > 3 ? 'ph-fill' : 'ph'} ph-star`} />
      <i className={`${rate > 4 ? 'ph-fill' : 'ph'} ph-star`} />
    </div>
  )
}
