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

interface DoubleLineChartProps {
  data1: []
  data2: []
  title?: string
}
const DoubleLineChart = ({ data1, data2, title }: DoubleLineChartProps) => {
  const options = {
    exporting: {
      enabled: true,
      type: 'spline',
    },
    title: {
      text: title,
    },

    xAxis: {
      opposite: false,
      gridLineColor: 'red',
      labels: {
        style: {
          color: 'black',
        },
      },
      plotLines: [
        {
          color: 'red',
          width: 100,
          value: 10,
          zIndex: 1000,
        },
      ],
      visible: true,
    },
    yAxis: {
      opposite: false,
      title: {
        text: 'Credits - Dollars',
      },
      plotLines: [
        {
          value: 0,
          width: 2,
          color: 'white',
        },
      ],
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    series: [
      {
        name: 'Credits',
        marker: {
          radius: 8,
          lineWidth: 2,
          lineColor: 'skyblue',
          fillColor: 'white',
          symbol: 'diamond',
        },
        data: data1,
      },
      {
        name: 'Dollars',
        marker: {
          symbol: 'diamond',
        },
        data: data2,
      },
    ],
    plotOptions: {
      spline: {
        showInLegend: true,
        dataLabels: {
          enabled: true,
          useHTML: true,
        },
      },
      columnrange: {
        dataLabels: {
          enabled: true,
          useHTML: true,
        },
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      style: {
        backgroundColor: 'white',
      },
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b style="color:black">{point.y}</b><br/>',
    },
  }

  return (
    <div className="mt-10 ">
      {data1.length > 0 && data2.length > 0 && (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
        />
      )}
    </div>
  )
}

export default DoubleLineChart
