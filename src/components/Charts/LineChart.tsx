import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import ExportData from 'highcharts/modules/export-data'
import Accessibility from 'highcharts/modules/accessibility'
import Exporting from 'highcharts/modules/exporting'
import './PieChart.css'
ExportData(Highcharts)
Exporting(Highcharts)
Accessibility(Highcharts)

const LineChart = () => {
  const [data, setData] = useState([{ d1: 0, d2: 0 }])
  const fetchingData = async () => {
    const dataF = await fetch(
      'https://demo-live-data.highcharts.com/aapl-c.json',
    ).then((response) => response.json())
    setData(dataF)
  }
  useEffect(() => {
    fetchingData()
  }, [])

  const options = {
    exporting: {
      enabled: true,
    },
    title: {
      text: 'My stock chart',
    },
    subtitle: {
      text: 'milliseconds',
    },
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
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  )
}

export default LineChart
