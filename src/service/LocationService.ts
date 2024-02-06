import axios from 'axios'
const baseURL = '/location'

export async function getProvinces() {
  const res = await axios.get(`${baseURL}/provinces`)
  return res.data.metaData
}

export async function getDistricts(provinceCode: string | null | undefined) {
  const res = await axios.get(
    `${baseURL}/districts?provinceCode=${provinceCode}`,
  )
  return res.data.metaData
}

export async function getWards(districtCode: string | null | undefined) {
  const res = await axios.get(`${baseURL}/wards?districtCode=${districtCode}`)
  return res.data.metaData
}
