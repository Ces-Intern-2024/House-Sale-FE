import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import ExportData from 'highcharts/modules/export-data'
import Accessibility from 'highcharts/modules/accessibility'
import Exporting from 'highcharts/modules/exporting'
import './PieChart.css'

ExportData(Highcharts)
Exporting(Highcharts)
Accessibility(Highcharts)

interface BarChartProps {
  depositedCredits: number
  usedCredits: number
  remainingCredits: number
  title?: string
  seriesName?: string
  yAxisLabel?: string
}
const BarChart = ({
  depositedCredits,
  usedCredits,
  remainingCredits,
  title,
  //   seriesName,
  //   yAxisLabel,
}: BarChartProps) => {
  const options = {
    exporting: {
      enabled: true,
    },

    chart: {
      type: 'bar',
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: ['Credits'],
    },
    yAxis: {
      title: {
        text: 'Amount',
      },
    },
    series: [
      {
        name: 'Deposited',
        data: [depositedCredits],
      },
      {
        name: 'Used',
        data: [usedCredits],
      },
      {
        name: 'Remaining',
        data: [remainingCredits],
      },
    ],
  }

  return (
    <div className="mt-10 ">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default BarChart
