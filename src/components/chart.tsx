import { Maximize2, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { TimeRangeSelector } from "./time-range-selector";
import { TimeRange } from "@/lib/types";
import LineChart from "./line-chart";
import { useEffect, useState } from "react";

interface ChartProps {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

const Chart: React.FC<ChartProps> = ({
  timeRange,
  setTimeRange,
}) => {
  const [y, setY] = useState<string[]>(Array.from({ length: 24 }).map((_, i) => i.toLocaleString()));

  useEffect(() => {
    if (timeRange === "1d") {
      setY(Array.from({ length: 24 }).map((_, i) => i.toLocaleString()));
    } else if (timeRange === "3d") {
      setY(Array.from({ length: 72 }).map((_, i) => i.toLocaleString()));
    } else if (timeRange === "1w") {
      setY(Array.from({ length: 7 }).map((_, i) => i.toLocaleString()));
    } else if (timeRange === "6m") {
      setY(Array.from({ length: 30 }).map((_, i) => i.toLocaleString()));
    } else if (timeRange === "1y") {
      setY(Array.from({ length: 12 }).map((_, i) => i.toLocaleString()));
    } else if (timeRange === "max") {
      setY(Array.from({ length: 30 }).map((_, i) => i.toLocaleString()));
    }
  }, [timeRange]);

  return (
    <div className="max-h-[400px] flex flex-col gap-16">
      <div className="flex justify-between items-center">
        <div className="flex">
          <Button variant="ghost">
            <Maximize2 className="text-slate-500 min-h-6 min-w-6 mr-2" />
            <span className="text-lg text-slate-500 font-normal">Fullscreen</span>
          </Button>
          <Button variant="ghost">
            <PlusCircle className="text-slate-500 min-h-6 min-w-6 mr-2" />
            <span className="text-lg text-slate-500 font-normal">Compare</span>
          </Button>
        </div>
        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
      </div>
      <LineChart
        data={Array.from({ length: y.length }).map(() => Math.floor(Math.random() * 100))}
        labels={y}
      />
    </div>
  );
};

export default Chart;
