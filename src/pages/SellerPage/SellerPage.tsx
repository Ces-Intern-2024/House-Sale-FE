import React, { useState } from 'react'
import TableProperty from '../../components/TableProperty/TableProperty'
import Credit from '../../components/Credit/Credit'

export default function SellerPage() {
  const [shouldUpdate, setShouldUpdate] = useState(false)

  return (
    <>
      <div>
        <Credit shouldUpdate={shouldUpdate} />
        <TableProperty
          setShouldUpdate={setShouldUpdate}
          shouldUpdate={shouldUpdate}
        />
      </div>
    </>
  )
}
