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
  seriesName?: string
  yAxisLabel?: string
}
const LineChart = ({ data, title, seriesName, yAxisLabel }: LineChartProps) => {
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

    yAxis: {
      opposite: false,
      title: {
        text: yAxisLabel,
      },
    },
    series: [
      {
        name: seriesName,
        data: data,
      },
    ],
    plotOptions: {
      chart: {
        dataLabels: {
          enabled: true,
          dataLabels: {
            enabled: true,
          },
        },
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b style="color:black">{point.y}</b><br/>',
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
