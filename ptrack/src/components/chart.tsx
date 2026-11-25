import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import type { ChartInfo } from '../models/types'
import { getProductChartInfo } from '../api/products'
import { Link, useLocation, useParams } from 'react-router-dom'

let info1: ChartInfo = {
  prices: [],
  dates: []
}

const Chart = () => {
  const { productId } = useParams();
  const [info, setChartInfo] = useState<ChartInfo>();
  const location = useLocation();
  const { product_name, product_url } = location.state || {};

  const [state, setState] = useState({
    series: [
      {
        name: '',
        data: info?.prices ?? [],
      },
    ],
    options: {
      chart: {
        type: 'area' as const,
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight' as const,
      },

      title: {
        text: '',
        align: 'left' as const,
        style:{
              fontSize: '22',
            }
      },
      subtitle: {
        text: '',
        align: 'left' as const,
      },
      labels: info?.dates ?? [],
      xaxis: {
        type: 'category' as const,
      },
      legend: {
        horizontalAlign: 'left' as const,
      },
    },
  })

  useEffect(() => {
    let fetchData = async () => {
      info1 = await getProductChartInfo(productId ?? '');
      setChartInfo(info1);
      setState({
        series: [
          {
            name: 'Price',
            data: info?.prices ?? info1?.prices,
          },
        ],
        options: {
          chart: {
            type: 'area' as const,
            height: 350,
            zoom: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'straight' as const,
          },

          title: {
            text: product_name,
            align: 'left' as const,
            style:{
              fontSize: '22',
            }
          },
          subtitle: {
            text: product_url,
            align: 'left' as const,
          },
          labels: info1.dates,
          xaxis: {
            type: 'category' as const,
          },
          legend: {
            horizontalAlign: 'left' as const,
          },
        },
      });
    }
    fetchData();

  }, [info1]);

  return (
    <div id="chart" style={{ width: "100%", minWidth: "800px", overflow: "hidden" }}>
      <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
            <Link to="/" className="flex gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white disabled:pointer-events-none disabled:opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" aria-hidden="true" strokeWidth="2" className="w-4 h-4">
                <path d="m21.71 12.29-9-9a1 1 0 0 0-1.41 0l-9 9c-.39.39-.39 1 0 1.41s1 .39 1.41 0l.29-.29V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6.59l.29.29c.39.39 1 .39 1.41 0s.39-1 0-1.41ZM11 19v-3h2v3h-2Zm7 0h-3v-3a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v3H6v-7.59l6-6 6 6V19Z"></path>
                <path d="m21.71 12.29-9-9a1 1 0 0 0-1.41 0l-9 9c-.39.39-.39 1 0 1.41s1 .39 1.41 0l.29-.29V20a1 1 0 0 0 1 1h5v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h5a1 1 0 0 0 1-1v-6.59l.29.29c.39.39 1 .39 1.41 0s.39-1 0-1.41Z"></path>
              </svg>
              Go Home
            </Link>
      </div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  )
}

export default Chart
