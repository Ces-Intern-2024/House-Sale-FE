import PieChart from '../../components/Charts/PieChart'
import LineChart from '../../components/Charts/LineChart'
import React from 'react'

function AdminDashboardPage() {
  return (
    <div>
      <div>
        <div>
          <h1>Total Properties</h1>
          <div className="flex justify-between mt-5">
            <PieChart />
            <PieChart />
          </div>
        </div>
        <div>
          <h1>Property created by date</h1>
          <div>
            <LineChart />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default AdminDashboardPage
