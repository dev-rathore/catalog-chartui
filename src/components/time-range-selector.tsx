import { Button } from "@/components/ui/button"
import type { TimeRange } from "@/lib/types"

interface TimeRangeSelectorProps {
  selected: TimeRange
  onChange: (range: TimeRange) => void
}

export function TimeRangeSelector({ selected, onChange }: TimeRangeSelectorProps) {
  const ranges: TimeRange[] = ['1d', '3d', '1w', '1m', '6m', '1y', 'max']

  return (
    <div className="flex gap-2">
      {ranges.map((range) => (
        <Button
          key={range}
          variant={selected === range ? "default" : "ghost"}
          className={`text-base px-4 py-2 ${selected === range ? 'text-white' : 'text-slate-500'}`}
          onClick={() => onChange(range)}
        >
          {range}
        </Button>
      ))}
    </div>
  )
}
