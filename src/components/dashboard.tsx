import { ChartData, TimeRange } from "@/lib/types";
import Tabs from "./tabs";
import { PriceDisplay } from "./price-display";
import Chart from "./chart";
import { useState } from "react";

const sampleData: ChartData[] = Array.from({ length: 100 }, (_, i) => ({
  timestamp: Date.now() - (100 - i) * 1000 * 60 * 15,
  price: 63000 + Math.random() * 2000,
  volume: Math.random() * 1000
}))

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("6m");

  const tabs = [
    {
      label: "Summary",
      content: <div>Summary</div>,
    },
    {
      label: "Chart",
      content: <Chart timeRange={timeRange} setTimeRange={setTimeRange} />,
    },
    {
      label: "Statistics",
      content: <div>Statistics</div>,
    },
    {
      label: "Analysis",
      content: <div>Analysis</div>,
    },
    {
      label: "Settings",
      content: <div>Settings</div>,
    }
  ];

  const currentPrice = sampleData[sampleData.length - 1].price
  const startPrice = sampleData[0].price
  const priceChange = currentPrice - startPrice
  const priceChangePercent = (priceChange / startPrice) * 100

  return (
    <div className="w-[75%] mx-auto">
      <PriceDisplay
        price={currentPrice}
        change={priceChange}
        changePercent={priceChangePercent}
      />
      <Tabs tabs={tabs} defaultTabIndex={1} />
    </div>
  )
};

export default Dashboard;
