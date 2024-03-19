import React from 'react'
import TableTransaction from '../../components/TableTransaction/TableTransaction'

function AdminPropertyPage() {
  return (
    <div className="mt-8">
      <TableTransaction isSeller={false} />
    </div>
  )
}

export default AdminPropertyPage
