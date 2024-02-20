import React, { useState } from 'react'
import {
  Transition,
  Select,
  TextInput,
  ComboboxItem,
  OptionsFilter,
  Button,
} from '@mantine/core'
// import { IconChevronDown } from '@tabler/icons-react'
import styles from './SearchBar.module.scss'
import { FaAlignJustify, FaSearch, FaBath, FaBed, FaHome } from 'react-icons/fa'
import {
  useFetchProvincesQuery,
  useFetchDistrictsQuery,
  useFetchWardsQuery,
} from '../../redux/reducers/locationSlice'
import { useForm } from '@mantine/form'

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ')
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ')
    return splittedSearch.every((searchWord) =>
      words.some((word) => word.includes(searchWord)),
    )
  })
}

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { data: provinces = [] } = useFetchProvincesQuery()
  const [provinceCode, setProvinceCode] = useState('')
  const { data: districts = [] } = useFetchDistrictsQuery(provinceCode)
  const [districtCode, setDistrictCode] = useState<string | null>('')
  const { data: wards = [] } = useFetchWardsQuery(districtCode)
  const [wardCode, setWardCode] = useState<string | null>('')

  const form = useForm({})

  const handleExpandSearch = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <>
      <div className={styles.outer}>
        <div className="grid grid-cols-2 md:grid-cols-5 ">
          <TextInput
            leftSection={<FaSearch></FaSearch>}
            classNames={{ input: styles.inputOuter }}
            placeholder="727 Main Street"
            defaultValue=""
            {...form.getInputProps('')}
          />

          <Select
            classNames={{ input: styles.btnOuter }}
            checkIconPosition="right"
            placeholder="City/Province"
            data={provinces.flatMap((prov: any) => [
              {
                value: prov.provinceCode,
                label: prov.nameEn,
              },
            ])}
            filter={optionsFilter}
            searchable
            comboboxProps={{
              position: 'bottom',
              offset: 0,
              transitionProps: { transition: 'pop', duration: 200 },
            }}
            {...form.getInputProps('provinceCode')}
            onChange={(_value: any) => {
              form.setFieldValue('provinceCode', _value)
              setProvinceCode(_value)
              setDistrictCode(null)
              setWardCode(null)
            }}
            value={provinceCode}
          />

          <Select
            classNames={{ input: styles.btnOuter }}
            checkIconPosition="right"
            placeholder="District"
            data={districts.flatMap((dist: any) => [
              {
                value: dist.districtCode,
                label: dist.nameEn,
              },
            ])}
            filter={optionsFilter}
            searchable
            comboboxProps={{
              position: 'bottom',
              offset: 0,
              transitionProps: { transition: 'pop', duration: 200 },
            }}
            {...form.getInputProps('districtCode')}
            onChange={(_value: any) => {
              form.setFieldValue('districtCode', _value)
              setDistrictCode(_value)
              setWardCode(null)
            }}
            value={districtCode}
          />

          <Select
            classNames={{ input: styles.btnOuter }}
            checkIconPosition="right"
            placeholder="Ward"
            data={wards.flatMap((ward: any) => [
              {
                value: ward.wardCode,
                label: ward.nameEn,
              },
            ])}
            filter={optionsFilter}
            searchable
            comboboxProps={{
              position: 'bottom',
              offset: 0,
              transitionProps: { transition: 'pop', duration: 200 },
            }}
            {...form.getInputProps('wardCode')}
            onChange={(_value: any) => {
              form.setFieldValue('wardCode', _value)
              setWardCode(_value)
            }}
            value={wardCode}
          />

          <div className={styles.flexBox}>
            <Button
              className={styles.searchButton2}
              onClick={handleExpandSearch}
            >
              <FaAlignJustify />
            </Button>
            <Button
              rightSection={<FaSearch></FaSearch>}
              className={styles.searchButton2}
            >
              Search
            </Button>
          </div>
        </div>
        <div className={isExpanded ? 'visible' : 'invisible'}>
          <Transition
            mounted={isExpanded ? true : false}
            transition="slide-up"
            duration={400}
            timingFunction="ease"
          >
            {(stylesParam) => (
              <div style={stylesParam}>
                <div className="grid grid-cols-2 md:grid-cols-5">
                  <Select
                    classNames={{ input: styles.btnOuter }}
                    rightSection={<h1>m²</h1>}
                    allowDeselect={false}
                    checkIconPosition="right"
                    placeholder="Area 50m²"
                    data={['30', '50', '70', '90', '120', '150', '200']}
                  />
                  <Select
                    classNames={{ input: styles.btnOuter }}
                    leftSection={<FaBed></FaBed>}
                    allowDeselect={false}
                    checkIconPosition="right"
                    placeholder="Bed"
                    data={['1', '2', '3', '4', '5', '6', '7']}
                  />

                  <Select
                    classNames={{ input: styles.btnOuter }}
                    leftSection={<FaBath></FaBath>}
                    allowDeselect={false}
                    checkIconPosition="right"
                    placeholder="Bathroom"
                    data={['1', '2', '3', '4', '5', '6', '7']}
                  />

                  <Select
                    classNames={{ input: styles.btnOuter }}
                    leftSection={<FaHome></FaHome>}
                    checkIconPosition="right"
                    placeholder="Category"
                    // data={wards.flatMap((ward: any) => [
                    //   {
                    //     value: ward.wardCode,
                    //     label: ward.nameEn,
                    //   },
                    // ])}
                    filter={optionsFilter}
                    searchable
                    comboboxProps={{
                      position: 'bottom',
                      offset: 0,
                      transitionProps: { transition: 'pop', duration: 200 },
                    }}
                    {...form.getInputProps('wardCode')}
                    onChange={(_value: any) => {
                      form.setFieldValue('wardCode', _value)
                      setWardCode(_value)
                    }}
                    value={wardCode}
                  />
                  <Select
                    classNames={{ input: styles.btnOuter }}
                    checkIconPosition="right"
                    placeholder="For Rent/Sale"
                    data={['For Rent', 'For Sale']}
                    onChange={(_value: any) => {
                      form.setFieldValue('wardCode', _value)
                      setWardCode(_value)
                    }}
                  />
                </div>
              </div>
            )}
          </Transition>
        </div>
      </div>
    </>
  )
}
