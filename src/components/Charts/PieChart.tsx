import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import ExportData from 'highcharts/modules/export-data'
import Accessibility from 'highcharts/modules/accessibility'
import Exporting from 'highcharts/modules/exporting'

// Initialize the exporting and accessibility modules
ExportData(Highcharts)
Exporting(Highcharts)
Accessibility(Highcharts)

const PieChart = () => {
  const options = {
    chart: {
      styleMode: true,
      type: 'pie',
    },
    title: {
      text: 'Egg Yolk Composition',
    },
    tooltip: {
      valueSuffix: '%',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          distance: 20,
          format: '{point.percentage:.1f}%',
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
        name: 'Percentage',
        colorByPoint: true,
        data: [
          {
            name: 'Water',
            y: 55.02,
          },
          {
            name: 'Fat',
            sliced: true,
            selected: true,
            y: 26.71,
          },
          {
            name: 'Carbohydrates',
            y: 1.09,
          },
          {
            name: 'Protein',
            y: 15.5,
          },
          {
            name: 'Ash',
            y: 1.68,
          },
        ],
      },
    ],
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default PieChart
