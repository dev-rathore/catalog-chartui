import { getGradient } from '@/lib/chart';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef, useState } from 'react';

import { Line } from 'react-chartjs-2';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

ChartJS.register(
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  ChartDataLabels,
);

const crosshair = (
  chart: ChartJS | null,
  mousemove: any,
  xTooltip: any,
  yTooltip: any,
) => {
  if (!chart) {
    return;
  }

  chart.update('none');
  const offsetX = mousemove.nativeEvent.offsetX;
  const x = offsetX;
  const offsetY = mousemove.nativeEvent.offsetY;
  const y = offsetY;

  const {
    ctx,
    chartArea: {
      left,
      right,
      top,
      bottom,
    },
  } = chart;
  ctx.save();

  ctx.strokeStyle = '#666';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(left, y);
  ctx.lineTo(right, y);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(x, top);
  ctx.lineTo(x, bottom);
  ctx.stroke();
  ctx.closePath();

  yTooltip.current.style.top = `${y - 20}px`;
  yTooltip.current.style.left = `${right - 20}px`;
  yTooltip.current.innerText = `${(93000 - y * 200).toLocaleString()}`;

  console.log(xTooltip);
}

const options = {
  aspectRatio: 1.5,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
    },
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        color: '#F3F3F5',
        style: 'dash',
      },
      ticks: {
        display: false,
      },
      border: {
        dash: [10, 10],
        color: '#DFE5EE',
      },
    },
    y: {
      grid: {
        color: '#F3F3F5',
        style: 'dash',
      },
      ticks: {
        display: false,
        stepSize: 200,
      },
      border: {
        dash: [10, 10],
        color: '#DFE5EE',
      },
      beginAtZero: true
    }
  },
};

interface LineChartProps {
  data: number[];
  labels: string[];
};

const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
}) => {
  const [chart, setChart] = useState<ChartJS | null>(null);
  const xTooltip = useRef(null);
  const yTooltip = useRef(null);

  useEffect(() => {
    // @ts-ignore
    if (xTooltip.current) xTooltip.current.style.top = `calc(100% - ${data[data.length - 1]}%)`;
  }, [data]);

  useEffect(() => {
    // @ts-ignore
    if (yTooltip.current) yTooltip.current.style.left = '100%';
  }, []);

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data,
        fill: true,
        borderColor: "#1814F3",
        pointHoverRadius: 0,
        pointHitRadius: 0,
        pointRadius: 0,
        showLine: true,
        backgroundColor: (context: {
          chart: {
            ctx: CanvasRenderingContext2D;
            chartArea: {
              right: number;
              left: number;
              bottom: number;
              top: number;
            };
          };
        }) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }

          return getGradient(ctx, chartArea);
        },
      },
    ],
  };

  return (
    <div className='relative min-h-[400px]'>
      <Line
        datasetIdKey='id3'
        ref={(ref) => {
          if (ref) {
            setChart(ref);
          }
        }}
        data={lineChartData}
        options={options}
        onMouseMove={(mousemove) => {
          crosshair(chart, mousemove, xTooltip, yTooltip);
        }}
      />
      <Button
        ref={xTooltip}
        variant="default"
        className={cn(
          'absolute right-0 translate-x-[50%] bg-primary p-2 shadow-lg text-white rounded-md hover:bg-primary',
          `-translate-y-[50%] transition-all duration-1200 ease-in`,
        )}
      >
        {(data[data.length - 1] * 1000).toLocaleString()}
      </Button>
      <Button
        ref={yTooltip}
        variant="default"
        className="absolute bg-black p-2 shadow-lg text-white rounded-md hover:bg-black"
      >
        63,500
      </Button>
    </div>
  );
};

export default LineChart;
