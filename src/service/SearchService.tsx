import axios from 'axios'
import qs from 'qs'

interface SearchProps {
  keyword?: string | null
  featureId?: number | null
  categoryId?: number | null
  provinceCode?: string | null
  districtCode?: string | null
  wardCode?: string | null
  priceFrom?: number | null
  priceTo?: number | null
  landAreaFrom?: number | null
  landAreaTo?: number | null
  areaOfUseFrom?: number | null
  areaOfUseTo?: number | null
  numberOfFloorFrom?: number | null
  numberOfFloorTo?: number | null
  numberOfBedRoomFrom?: number | null
  numberOfBedRoomTo?: number | null
  numberOfToiletFrom?: number | null
  numberOfToiletTo?: number | null
  page?: number | null
  limit?: number | null
  orderBy?: string | null
  sortBy?: string | null
}
export async function searchProperty(searchValues: SearchProps) {
  const queryString = qs.stringify(searchValues, {
    skipNulls: true,
    addQueryPrefix: true,
    encode: false,
  })

  const res = await axios.get(
    `/properties${queryString}${queryString.length === 0 ? '?limit=9' : '&limit=9'}`,
  )

  return res.data.metaData
}
