export interface ChartData {
  timestamp: number;
  price: number;
  volume: number;
}

export type TimeRange = "1d" | "3d" | "1w" | "1m" | "6m" | "1y" | "max";
