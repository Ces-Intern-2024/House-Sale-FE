import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface locationState {
  loading: boolean
  error: string | undefined
  districtsList: string[]
  provincesList: string[]
  wardsList: string[]
}

const initialState: locationState = {
  loading: false,
  error: undefined,
  districtsList: [],
  provincesList: [],
  wardsList: [],
}

export const getAllProvinces = createAsyncThunk(
  'location/getAllProvinces',
  async (_, thunkAPI) => {
    const res = await axios.get(`/location/provinces`, {
      signal: thunkAPI.signal,
    })
    const data = res.data.metaData as string[] // Adjust the type here
    return data
  },
)

export const getAllDistricts = createAsyncThunk(
  'location/getAllDistricts',
  async (idProvince, thunkAPI) => {
    const res = await axios.get(
      `/location/districts?provinceCode=${idProvince}`,
      {
        signal: thunkAPI.signal,
      },
    )
    const data = res.data.metaData as string[] // Adjust the type here
    return data
  },
)
