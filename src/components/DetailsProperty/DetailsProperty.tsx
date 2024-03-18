import React from 'react'
import style from './DetailsProperty.module.scss'
import { Properties } from '../../types'
import { formatDate } from '../../utils/commonFunctions'

interface DetailsPropertyProps {
  property: Properties
}
const DetailsProperty = ({ property }: DetailsPropertyProps) => {
  const handleParser = (description: string) => {
    const domParser = new DOMParser()
    const doc = domParser.parseFromString(description, 'text/html')
    return doc.body.innerHTML
  }

  return (
    <div>
      <div className={style.tableContainer}>
        <div className={style.tableTitle}>CHARACTERISTICS</div>
        <div className={style.tableContent}>
          <div className={style.tableCol}>
            <div className={style.tableRow}>
              <span className={style.labelText}>Location:</span>
              <span className={style.value}>{property?.location.address}</span>
            </div>
            <div className={style.tableRow}>
              <span className={style.labelText}>Number of floor:</span>
              <span className={style.value}>{property?.numberOfFloor}</span>
            </div>
            <div className={style.tableRow}>
              <span className={style.labelText}>Number of bedroom:</span>
              <span className={style.value}>{property?.numberOfBedRoom}</span>
            </div>
            <div className={style.tableRow}>
              <span className={style.labelText}>Number of toilet:</span>
              <span className={style.value}>{property?.numberOfToilet}</span>
            </div>
          </div>
          <div className={style.tableCol}>
            <div className={style.tableRow}>
              <span className={style.labelText}>Direction:</span>
              <span className={style.value}>{property?.direction}</span>
            </div>
            <div className={style.tableRow}>
              <span className={style.labelText}>Land area:</span>
              <span className={style.value}>{property?.landArea} m²</span>
            </div>
            <div className={style.tableRow}>
              <span className={style.labelText}>Land of use:</span>
              <span className={style.value}>{property?.areaOfUse} m²</span>
            </div>
            <div className={style.tableRow}>
              <span className={style.labelText}>Updated Date:</span>
              <span className={style.value}>
                {formatDate(property?.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={style.tableTitle}>MORE DESCRIPTION</div>
        <div className={style.detailDescription}>
          <h1>fasdfasfd</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: handleParser(property?.description || ''),
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default DetailsProperty
