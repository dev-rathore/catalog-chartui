interface PriceDisplayProps {
  price: number
  change: number
  changePercent: number
  currency?: string
}

export function PriceDisplay({ price, change, changePercent, currency = 'USD' }: PriceDisplayProps) {
  const isPositive = change > 0

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-start gap-2">
        <h1 className="text-6xl font-medium tracking-tight">
          {price.toLocaleString('en-US', { maximumFractionDigits: 2 })}
        </h1>
        <span className="text-2xl text-muted-foreground">{currency}</span>
      </div>
      <div className={`text-lg ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{change.toLocaleString('en-US', { maximumFractionDigits: 2 })} ({changePercent.toFixed(2)}%)
      </div>
    </div>
  )
};
