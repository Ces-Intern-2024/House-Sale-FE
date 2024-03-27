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

interface LineChartProps {
  data: []
  title?: string
}
const LineChart = ({ data, title }: LineChartProps) => {
  const options = {
    exporting: {
      enabled: true,
    },
    title: {
      text: title,
    },
    // subtitle: {
    //   text: 'milliseconds',
    // },
    // this comment can be used in the future.
    // _navigator: {
    //   enabled: false,
    // },
    series: [
      {
        name: 'Name of line chart',
        data: data,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
    },
  }

  return (
    <div className="mt-10 ">
      {data.length > 0 && (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
        />
      )}
    </div>
  )
}

export default LineChart
