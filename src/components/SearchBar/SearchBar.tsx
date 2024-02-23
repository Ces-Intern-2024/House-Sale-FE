import React, { useState, useEffect } from 'react'
import {
  Select,
  RangeSlider,
  TextInput,
  Button,
  Pagination,
  Text,
} from '@mantine/core'
import styles from './SearchBar.module.scss'
import {
  useFetchProvincesQuery,
  useFetchDistrictsQuery,
  useFetchWardsQuery,
} from '../../redux/reducers/locationSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getAllCategories } from '../../redux/reducers/categorySlice'
import { getAllFeatures } from '../../redux/reducers/featureSlice'
import {
  IconMapPin,
  IconMeterSquare,
  IconMapCheck,
  IconMapPins,
  IconBed,
  IconBath,
  IconHome,
  IconSortAscending,
  IconTexture,
  IconSearch,
  IconSortDescending,
} from '@tabler/icons-react'
import CustomSelect from './CustomSelect'
import { searchProperty } from '../../service/SearchService'
import PropertyCard from '../Properties/PropertyCard'
import { useLocation } from 'react-router-dom'

export default function SearchBar() {
  const query = useLocation()
  const dispatch = useAppDispatch()

  const [activePage, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [properties, setProperties] = useState([])

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  const { data: provinces = [] } = useFetchProvincesQuery()

  const [provinceCode, setProvinceCode] = useState('')

  const { data: districts = [] } = useFetchDistrictsQuery(provinceCode, {
    skip: !provinceCode,
  })
  const [districtCode, setDistrictCode] = useState<string>('')

  const { data: wards = [] } = useFetchWardsQuery(districtCode, {
    skip: !provinceCode,
  })
  const [wardCode, setWardCode] = useState<string>('')

  const categories = useAppSelector((state) => state.category.categoriesList)
  const [bedNum, setBedNum] = useState('')
  const [bathNum, setBathNum] = useState('')
  const [categoryNum, setCategoryNum] = useState('')
  const [featureNum, setFeatureNum] = useState('')
  const [areaNum, setAreaNum] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [sortBy, setSortBy] = useState('')

  const features = useAppSelector((state) => state.feature.featuresList)
  const [searchValue, setSearchValue] = useState(query.state.searchValue)

  const provinceFlatMap = provinces.flatMap((item) => [
    {
      key: item.nameEn,
      value: item.provinceCode,
    },
  ])
  const districtFlatMap = provinceCode
    ? districts.flatMap((item) => [
        {
          key: item.nameEn,
          value: item.districtCode,
        },
      ])
    : []
  const wardFlatMap = districtCode
    ? wards.flatMap((item) => [
        {
          key: item.nameEn,
          value: item.wardCode,
        },
      ])
    : []

  const bedAndBathFlapMap = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '6', value: '6' },
    { key: '7', value: '7' },
  ]
  const areaFlapMap = [
    { key: '30', value: '30' },
    { key: '50', value: '50' },
    { key: '70', value: '70' },
    { key: '90', value: '90' },
    { key: '120', value: '120' },
    { key: '150', value: '150' },
    { key: '200', value: '200' },
  ]
  const categoryFlatMap = categories.flatMap((item) => [
    {
      key: item.name,
      value: String(item.categoryId),
    },
  ])
  const featureFlatMap = features.flatMap((item) => [
    {
      key: item.name,
      value: String(item.featureId),
    },
  ])

  const handleSubmitSearch = async () => {
    const searchValues = {
      provinceCode: provinceCode ? provinceCode : null,
      districtCode: districtCode ? districtCode : null,
      wardCode: wardCode ? wardCode : null,
      featureId: featureNum ? Number(featureNum) : null,
      categoryId: categoryNum ? Number(categoryNum) : null,
      landAreaTo: areaNum ? Number(areaNum) : null,
      numberOfBedRoomTo: bedNum ? Number(bedNum) : null,
      numberOfToiletTo: bathNum ? Number(bathNum) : null,
      priceFrom: priceRange[0],
      priceTo: priceRange[1],
      orderBy: orderBy ? orderBy : null,
      sortBy: sortBy ? sortBy : null,
      keyword: searchValue ? searchValue : null,
      page: activePage,
    }
    try {
      const data = await searchProperty(searchValues)
      setProperties(data.properties)
      setTotalPages(data.totalPages)
      setTotalItems(data.totalItems)
      console.log(totalPages)

      console.log(data.properties)
      console.log(data.totalPages)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeActivePage = async (page: any) => {
    setPage(page)
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') handleSubmitSearch()
  }

  useEffect(() => {
    dispatch(getAllFeatures())
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    setDistrictCode('')
    setWardCode('')
  }, [provinceCode])

  useEffect(() => {
    setWardCode('')
  }, [districtCode])

  useEffect(() => {
    handleSubmitSearch()
  }, [activePage])

  return (
    <>
      <div className={styles.gridInputArea}>
        <div className={styles.gridInputAreaLeft}>
          <h1 className={styles.gridInputAreaLeftTitle}>Search</h1>
        </div>
        <div className={styles.gridInputAreaRight}>
          <div className={styles.gridInputAreaRightInner}>
            <div className={styles.gridInputAreaRightInnerLeft}>
              <div className=" flex gap-x-5 items-center">
                <TextInput
                  value={searchValue}
                  onChange={(event) =>
                    setSearchValue(event.currentTarget.value)
                  }
                  leftSection={
                    <IconSearch className=" text-primary"></IconSearch>
                  }
                  placeholder="Search Here..."
                  size="md"
                  className=" mobile:w-[225px] lg:w-[300px] "
                  onKeyDown={handleKeyDown}
                />
                <Button
                  className={styles.searchButton3}
                  onClick={() => {
                    handleSubmitSearch()
                  }}
                >
                  <IconSearch></IconSearch>
                </Button>
              </div>
              <div className="flex lg:gap-x-10 gap-x-3 items-center">
                <Select
                  size="md"
                  leftSection={<IconSortAscending className=" text-primary" />}
                  allowDeselect={true}
                  checkIconPosition="right"
                  placeholder="Order By"
                  value={orderBy}
                  data={['Price']}
                  onChange={(_value: any) => setOrderBy(_value)}
                />
                <Select
                  size="md"
                  leftSection={<IconSortDescending className=" text-primary" />}
                  allowDeselect={true}
                  checkIconPosition="right"
                  placeholder="Sort By"
                  value={sortBy}
                  data={[
                    { label: 'Ascending', value: 'ASC' },
                    { label: 'Descending', value: 'DESC' },
                  ]}
                  onChange={(_value: any) => setSortBy(_value)}
                />
              </div>
            </div>
            <div className={styles.gridInputAreaRightInnerRight}>
              <p className=" font-bold text-primary mb-3">
                {totalItems} Results
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gridInputArea2}>
        <div className={styles.gridCustomSelectArea}>
          <CustomSelect
            value={provinceCode}
            list={provinceFlatMap}
            setValue={setProvinceCode}
            icon={<IconMapCheck></IconMapCheck>}
            placeHolder="Province"
          />
          <CustomSelect
            value={districtCode}
            list={districtFlatMap}
            setValue={setDistrictCode}
            icon={<IconMapPins></IconMapPins>}
            placeHolder="District"
          />
          <CustomSelect
            value={wardCode}
            list={wardFlatMap}
            setValue={setWardCode}
            icon={<IconMapPin></IconMapPin>}
            placeHolder="Ward"
          />

          <CustomSelect
            value={bedNum}
            list={bedAndBathFlapMap}
            setValue={setBedNum}
            icon={<IconBed></IconBed>}
            placeHolder="Bed"
            lessThan={true}
          />
          <CustomSelect
            value={bathNum}
            list={bedAndBathFlapMap}
            setValue={setBathNum}
            icon={<IconBath></IconBath>}
            placeHolder="Bath"
            lessThan={true}
          />

          <CustomSelect
            value={areaNum}
            list={areaFlapMap}
            setValue={setAreaNum}
            icon={<IconMeterSquare></IconMeterSquare>}
            placeHolder="Area"
            lessThan={true}
          />

          <CustomSelect
            value={categoryNum}
            list={categoryFlatMap}
            setValue={setCategoryNum}
            icon={<IconHome></IconHome>}
            placeHolder="Category"
          />

          <CustomSelect
            value={featureNum}
            list={featureFlatMap}
            setValue={setFeatureNum}
            icon={<IconTexture></IconTexture>}
            placeHolder="For Rent/Sale"
          />

          <div className={styles.priceRangeBlock}>
            <small className=" text-primary">Price: </small>

            <RangeSlider
              classNames={{ label: styles.label }}
              w="100%"
              color="#396651"
              max={10000}
              step={200}
              value={priceRange}
              onChange={setPriceRange}
              labelAlwaysOn
            />
          </div>
        </div>

        <div className={styles.paginationAreaOrNoContent}>
          {totalItems === 0 ? (
            <div className={styles.noContentArea}>
              <Text className=" text-3xl font-bold">
                Sorry, we couldn&apos;t find any result for: &quot;{searchValue}
                &quot;
              </Text>
              <Text className=" text-xl font-bold">
                Try adjusting your search. Here are some ideas:
              </Text>
              <ul className="list-disc font-semibold">
                <li>Make sure all words are spelled correctly</li>
                <li>Try different search terms</li>
                <li>Try more general search terms</li>
              </ul>
            </div>
          ) : (
            <div className={styles.paginationArea}>
              <div className={styles.propertyStyle}>
                {properties.length > 0 &&
                  properties.map((el, index) => (
                    <PropertyCard key={index} data={el} />
                  ))}
              </div>
              <Pagination
                classNames={{ control: styles.paginationControl }}
                color="green"
                total={totalPages}
                value={activePage}
                onChange={handleChangeActivePage}
                mt="sm"
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
