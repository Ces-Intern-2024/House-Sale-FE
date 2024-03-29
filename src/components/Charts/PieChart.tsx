import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import ExportData from 'highcharts/modules/export-data'
import Accessibility from 'highcharts/modules/accessibility'
import Exporting from 'highcharts/modules/exporting'
import { primary } from '../../constants/color.constant'

// Initialize the exporting and accessibility modules
ExportData(Highcharts)
Exporting(Highcharts)
Accessibility(Highcharts)

interface PieChartProps {
  data: []
  title?: string
}

// some comments in this component are kept for future use
const PieChart = ({ data, title }: PieChartProps) => {
  const options = {
    chart: {
      loading: false,
      animation: true,
      styleMode: true,
      type: 'pie',
    },
    title: {
      text: title,
      style: {
        color: primary,
        fontSize: '24px',
        textOutline: 'none',
        fontWeight: 'bold',
      },
    },
    tooltip: {
      valueSuffix: '%',
      pointFormat:
        '{series.name}: <b>{point.percentage:.1f}%</b> <br> Total: <b>{point.inNumber}</b>',
      style: {
        color: 'black',
        fontSize: '1.2em',
        textOutline: 'none',
        opacity: 1,
      },
    },
    legend: {
      enabled: true,
      // layout: 'vertical',
      // align: 'right',
      // verticalAlign: 'middle',
      itemStyle: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: '16px',
      },
      // itemWidth: 120,
    },
    // accessibility: {
    //   point: {
    //     valueSuffix: '%',
    //     pointFormat: '{point.percentage:.1f}%',
    //   },
    // },

    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            distance: 20,
            color: 'orange',
          },
          {
            enabled: true,
            distance: -40,
            format: '',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7,
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10,
            },
          },
        ],
      },
      pie: {
        size: 250,
        showInLegend: true,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          distance: 20,
          format:
            '<b>{point.name}</b><br><p style="color: black; font-size: 12px;">{point.percentage:.1f}%</p>',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7,
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 0,
          },
        },
      },
    },
    series: [
      {
        loading: false,
        animation: true,
        name: 'Percentage',
        colorByPoint: true,
        data: data,
      },
    ],
  }

  return (
    <div>
      {data.length > 0 && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  )
}

export default PieChart
