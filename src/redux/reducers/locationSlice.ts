import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Province } from '../../types/province'
import { District } from '../../types/district'
import { Ward } from '../../types/ward'

export const locationAPISlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://housesale.tldev.id.vn/v1/api/location',
  }),
  endpoints(builder) {
    return {
      fetchProvinces: builder.query<Province[], string | void>({
        query() {
          return `/provinces`
        },
        transformResponse: (response: { metaData: Province[] }) =>
          response.metaData,
      }),
      fetchDistricts: builder.query<District[], string | void | null>({
        query(provinceCode) {
          return `/districts?provinceCode=${provinceCode}`
        },
        transformResponse: (response: { metaData: District[] }) =>
          response.metaData,
      }),
      fetchWards: builder.query<Ward[], string | void | null>({
        query(districtCode) {
          return `/wards?districtCode=${districtCode}`
        },
        transformResponse: (response: { metaData: Ward[] }) =>
          response.metaData,
      }),
    }
  },
})

export const {
  useFetchProvincesQuery,
  useFetchDistrictsQuery,
  useFetchWardsQuery,
} = locationAPISlice
