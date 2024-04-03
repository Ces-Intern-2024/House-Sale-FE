import React, { useEffect, useRef, useState } from 'react'
import {
  REACT_APP_GOOGLE_MAP_ID_HOANG,
  REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY_HOANG,
} from '../../constants/google.constant'
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
  useMap,
} from '@vis.gl/react-google-maps'
import trees from '../../utils/trees'
import { Marker, MarkerClusterer } from '@googlemaps/markerclusterer'
import { TbBuildingWarehouse } from 'react-icons/tb'
const MapProperties = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <APIProvider apiKey={REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY_HOANG!}>
        <Map
          defaultCenter={{ lat: 43.64, lng: -79.94 }}
          defaultZoom={10}
          mapId={REACT_APP_GOOGLE_MAP_ID_HOANG!}
        >
          <Markers points={trees}></Markers>
        </Map>
      </APIProvider>
    </div>
  )
}

export default MapProperties

type Point = google.maps.LatLngLiteral & { key: string }
type Props = { points: Point[] }
const Markers = ({ points }: Props) => {
  const map = useMap()
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({})
  const clusterer = useRef<MarkerClusterer | null>(null)

  useEffect(() => {
    if (!map) return
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map })
    }
  }, [map])

  useEffect(() => {
    clusterer.current?.clearMarkers()
    clusterer.current?.addMarkers(Object.values(markers))
  }, [markers])

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return
    if (!marker && !markers[key]) return
    setMarkers((prev) => {
      if (marker) {
        return {
          ...prev,
          [key]: marker,
        }
      } else {
        const newMarkers = { ...prev }
        delete newMarkers[key]
        return newMarkers
      }
    })
  }

  return (
    <>
      {points.map((point, index) => (
        <AdvancedMarker
          key={index}
          position={point}
          ref={(marker) => setMarkerRef(marker, point.key)}
        >
          <Pin>
            <TbBuildingWarehouse color="white" size={12} />
          </Pin>
        </AdvancedMarker>
      ))}
    </>
  )
}
