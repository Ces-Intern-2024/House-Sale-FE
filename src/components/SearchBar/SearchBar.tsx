import React, { useState, useEffect } from 'react'
import {
  Select,
  RangeSlider,
  TextInput,
  Button,
  Pagination,
  Text,
  Divider,
  Drawer,
  LoadingOverlay,
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
  // IconSortAscending,
  IconTexture,
  IconSearch,
  // IconSortDescending,
  IconAdjustmentsHorizontal,
  IconSortAscending,
} from '@tabler/icons-react'
import CustomSelect from './CustomSelect'
import { searchProperty } from '../../service/SearchService'
import PropertyCard from '../Properties/PropertyCard'
import { useLocation } from 'react-router-dom'
import { useDisclosure, useDebouncedState } from '@mantine/hooks'

export default function SearchBar() {
  const query = useLocation()
  const dispatch = useAppDispatch()
  const [opened, { open, close }] = useDisclosure(false)
  const [isLoading, setIsLoading] = useState(false)

  const [activePage, setPage] = useState(1)
  const [resetPage, setResetPage] = useState(true)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [properties, setProperties] = useState([])

  // const  = useState
  // const [debounced] = useDebouncedValue(priceRange, 300)
  const [priceRange, setPriceRange] = useDebouncedState<[number, number]>(
    [0, 100000],
    300,
  )

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
  const [bedNum, setBedNum] = useState<[string, string] | null>(null)
  const [bathNum, setBathNum] = useState<[string, string] | null>(null)
  const [categoryNum, setCategoryNum] = useState<string>('')
  const [featureNum, setFeatureNum] = useState<string>('')
  const [areaNum, setAreaNum] = useState<[string, string] | null>(null)
  const [sortBy, setSortBy] = useState('ASC')
  const [numOfFilters, setNumOfFilters] = useState(0)

  const features = useAppSelector((state) => state.feature.featuresList)
  const [searchValue, setSearchValue] = useState(
    query.state ? query.state.searchValue : '',
  )

  const [tempSearchValue, setTempSearchValue] = useState(searchValue)

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
    { key: '1 - 2', value: ['1', '2'] },
    { key: '3 - 4', value: ['3', '4'] },
    { key: '4 - 5', value: ['4', '5'] },
    { key: '6 - 7', value: ['6', '7'] },
    { key: '7+', value: ['7', '100'] },
  ]

  const areaFlapMap = [
    { key: '30m² - 50m²', value: ['30', '50'] },
    { key: '50m² - 70m²', value: ['50', '70'] },
    { key: '70m² - 90m²', value: ['70', '90'] },
    { key: '90m² - 120m²', value: ['90', '120'] },
    { key: '120m² - above', value: ['120', '1000'] },
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

  const handleCheckNumOfFilter = () => {
    setNumOfFilters(0)
    if (provinceCode) setNumOfFilters((prev) => prev + 1)
    if (districtCode) setNumOfFilters((prev) => prev + 1)
    if (wardCode) setNumOfFilters((prev) => prev + 1)
    if (bedNum) setNumOfFilters((prev) => prev + 1)
    if (bathNum) setNumOfFilters((prev) => prev + 1)
    if (areaNum) setNumOfFilters((prev) => prev + 1)
    if (categoryNum.length > 0)
      setNumOfFilters((prev) => prev + categoryNum.length)
    if (featureNum.length > 0)
      setNumOfFilters((prev) => prev + featureNum.length)
    if (priceRange[0] !== 0 || priceRange[1] !== 100000)
      setNumOfFilters((prev) => prev + 1)
  }

  const handleResetFilter = () => {
    setProvinceCode('')
    setDistrictCode('')
    setWardCode('')
    setBedNum(null)
    setBathNum(null)
    setAreaNum(null)
    setCategoryNum('')
    setFeatureNum('')
    setPriceRange([0, 100000])
    setSortBy('ASC')
    // setSearchValue('')
    // setTempSearchValue('')
    handleCheckNumOfFilter()
  }

  const handleSubmitSearch = async () => {
    const searchValues = {
      provinceCode: provinceCode ? provinceCode : null,
      districtCode: districtCode ? districtCode : null,
      wardCode: wardCode ? wardCode : null,
      featureId: featureNum ? Number(featureNum[0]) : null,
      categoryId: categoryNum ? Number(categoryNum[0]) : null,
      landAreaFrom: areaNum ? Number(areaNum[0]) : null,
      landAreaTo: areaNum ? Number(areaNum[1]) : null,
      numberOfBedRoomFrom: bedNum ? Number(bedNum[0]) : null,
      numberOfBedRoomTo: bedNum ? Number(bedNum[1]) : null,
      numberOfToiletFrom: bathNum ? Number(bathNum[0]) : null,
      numberOfToiletTo: bathNum ? Number(bathNum[1]) : null,
      priceFrom: priceRange ? priceRange[0] : null,
      priceTo: priceRange ? priceRange[1] : null,
      orderBy: sortBy.startsWith('P') ? 'price' : null,
      sortBy: sortBy.startsWith('P') ? sortBy.slice(1, sortBy.length) : sortBy,
      keyword: tempSearchValue ? tempSearchValue : null,
      page: resetPage ? 1 : activePage,
    }
    try {
      // toggle()
      setIsLoading(true)
      const data = await searchProperty(searchValues)
      setIsLoading(false)
      setProperties(data.data)

      setTotalPages(data.totalPages)
      setTotalItems(data.totalItems)
      setPage(resetPage ? 1 : activePage)
      setResetPage(true)

      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      // console.log(err)
    }
  }

  const handleChangeActivePage = async (page: any) => {
    setResetPage(false)
    setPage(page)
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setSearchValue(event.currentTarget.value)
      handleSubmitSearch()
    }
  }

  useEffect(() => {
    dispatch(getAllFeatures())
    dispatch(getAllCategories())
    return () => {
      setTempSearchValue('')
      setSearchValue('')
    }
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

  useEffect(() => {
    handleSubmitSearch()
    handleCheckNumOfFilter()
  }, [
    provinceCode,
    districtCode,
    wardCode,
    bedNum,
    bathNum,
    areaNum,
    categoryNum,
    featureNum,
    sortBy,
    priceRange,
  ])
  const SharedComponents = () => (
    <>
      <Divider mb="lg" />
      <div className=" flex flex-col gap-y-6">
        <CustomSelect
          selectValue={provinceCode}
          dataList={provinceFlatMap}
          setSelectValue={setProvinceCode}
          icon={<IconMapCheck></IconMapCheck>}
          placeHolder="Province"
        />
        <CustomSelect
          selectValue={districtCode}
          dataList={districtFlatMap}
          setSelectValue={setDistrictCode}
          icon={<IconMapPins></IconMapPins>}
          placeHolder="District"
        />
        <CustomSelect
          selectValue={wardCode}
          dataList={wardFlatMap}
          setSelectValue={setWardCode}
          icon={<IconMapPin></IconMapPin>}
          placeHolder="Ward"
        />
      </div>

      <Divider mb="md" mt="lg" />

      <CustomSelect
        rangeValue={bedNum!}
        dataList={bedAndBathFlapMap}
        setRangeValue={setBedNum}
        icon={<IconBed></IconBed>}
        placeHolder="Bed"
        radio={true}
        customStyle={true}
        isRadioRange={true}
      />

      <Divider my="sm" />
      <CustomSelect
        rangeValue={bathNum!}
        dataList={bedAndBathFlapMap}
        setRangeValue={setBathNum}
        icon={<IconBath></IconBath>}
        placeHolder="Bath"
        radio={true}
        customStyle={true}
        isRadioRange={true}
      />
      <Divider my="sm" />
      <CustomSelect
        rangeValue={areaNum!}
        dataList={areaFlapMap}
        setRangeValue={setAreaNum}
        icon={<IconMeterSquare></IconMeterSquare>}
        placeHolder="Area"
        radio={true}
        customStyle={true}
        isRadioRange={true}
      />
      <Divider my="sm" />

      <CustomSelect
        selectValue={categoryNum}
        setSelectValue={setCategoryNum}
        dataList={categoryFlatMap}
        icon={<IconHome></IconHome>}
        placeHolder="Category"
        customStyle={true}
        radio={true}
        isRadioRange={false}
      />
      <Divider my="sm" />
      <CustomSelect
        dataList={featureFlatMap}
        selectValue={featureNum}
        setSelectValue={setFeatureNum}
        icon={<IconTexture></IconTexture>}
        placeHolder="For Rent/Sale"
        customStyle={true}
        radio={true}
        isRadioRange={false}
      />
      <Divider mb="lg" mt="sm" />
      <div className={styles.priceRangeBlock}>
        <small className=" text-primary">Price: </small>
        <RangeSlider
          draggable
          classNames={{ label: styles.label }}
          w="100%"
          color="#396651"
          minRange={0.2}
          min={0}
          max={100000}
          step={1000}
          defaultValue={priceRange}
          onChangeEnd={setPriceRange}
          labelAlwaysOn
        />
      </div>
    </>
  )

  const SharedButton = () => (
    <>
      <Button
        leftSection={<IconAdjustmentsHorizontal />}
        variant="outline"
        className=" lg:w-[150px] mobile:w-full h-[50px] rounded-none border-primary text-primary"
        onClick={open}
      >
        Filter
        {numOfFilters > 0 && <h1 className="ml-1">({numOfFilters})</h1>}
      </Button>
      <Button
        className="w-[100px] h-[50px] font-bold px-0 rounded-none text-primary mobile:hidden lg:block"
        onClick={handleResetFilter}
      >
        Clear Filters
      </Button>
    </>
  )

  return (
    <>
      <div className={styles.gridInputArea}>
        <div className=" mobile:col-span-12  mobile:block lg:hidden flex justify-center">
          <TextInput
            value={tempSearchValue}
            onChange={(event) => setTempSearchValue(event.currentTarget.value)}
            leftSection={<IconSearch className=" text-primary"></IconSearch>}
            placeholder="Search Here..."
            size="md"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.gridInputAreaLeft}>
          <div className=" grid mobile:grid-cols-2 lg:grid-cols-1  items-center justify-end gap-x-3 mt-5">
            <div className=" mobile:col-span-1 lg:col-span-2">
              <SharedButton />
            </div>
            <Select
              className="col-span-1 lg:hidden mobile:block "
              classNames={{
                label: 'text-sm',
                input:
                  'h-[50px] rounded-none border-primary text-primary text-sm font-semibold',
              }}
              size="md"
              leftSection={<IconSortAscending className=" text-primary" />}
              allowDeselect={true}
              checkIconPosition="right"
              placeholder="Sort By"
              value={sortBy}
              data={[
                { label: 'A-Z Ascending', value: 'ASC' },
                { label: 'A-Z Descending', value: 'DESC' },
                { label: 'Price Ascending', value: 'PASC' },
                { label: 'Price Descending', value: 'PDESC' },
              ]}
              onChange={(_value: any) => setSortBy(_value)}
            />
          </div>
        </div>
        <div className={styles.gridInputAreaRight}>
          <div className={styles.gridInputAreaRightInner}>
            <div className={styles.gridInputAreaRightInnerLeft}>
              <TextInput
                className=" mobile:hidden lg:block xl:w-3/5 lg:w-2/3 mobile:w-auto"
                value={tempSearchValue}
                onChange={(event) =>
                  setTempSearchValue(event.currentTarget.value)
                }
                leftSection={
                  <IconSearch className=" text-primary"></IconSearch>
                }
                placeholder="Search Here..."
                size="md"
                onKeyDown={handleKeyDown}
              />

              <Select
                className=" lg:block mobile:hidden"
                classNames={{ label: 'text-sm' }}
                label="Sort By"
                size="md"
                leftSection={<IconSortAscending className=" text-primary" />}
                allowDeselect={true}
                checkIconPosition="right"
                placeholder="Sort By"
                value={sortBy}
                data={[
                  { label: 'A-Z Ascending', value: 'ASC' },
                  { label: 'A-Z Descending', value: 'DESC' },
                  { label: 'Price Ascending', value: 'PASC' },
                  { label: 'Price Descending', value: 'PDESC' },
                ]}
                onChange={(_value: any) => setSortBy(_value)}
              />
            </div>
            <div className={styles.gridInputAreaRightInnerRight}>
              <p className=" font-bold text-primary lg:mb-3 mobile:mb-0">
                {totalItems} Results
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gridInputArea2}>
        <div className={styles.gridCustomSelectArea}>
          <Drawer
            opened={opened}
            onClose={close}
            size="80%"
            position="right"
            className=" mobile:block lg:hidden"
            padding="lg"
          >
            <div className=" flex items-center justify-center mb-5">
              <Button
                disabled
                leftSection={<IconAdjustmentsHorizontal />}
                variant="outline"
                className=" w-[150px] h-[50px] rounded-none border-primary text-primary"
              >
                Filter
                {numOfFilters > 0 && <h1 className="ml-1">({numOfFilters})</h1>}
              </Button>
              <Button
                className="w-[100px] h-[50px] font-bold px-0 rounded-none text-primary"
                onClick={handleResetFilter}
              >
                Clear Filters
              </Button>
            </div>
            <SharedComponents />
            <div className=" flex justify-center mt-7">
              <Button
                onClick={close}
                size="md"
                w={'80%'}
                className=" bg-orangeBtn text-white"
              >
                Done
              </Button>
            </div>
          </Drawer>

          {/* in normal screen */}
          <div className=" lg:block mobile:hidden">
            <SharedComponents />
          </div>
        </div>

        <div className={styles.paginationAreaOrNoContent}>
          {totalItems === 0 ? (
            <div className={styles.noContentArea}>
              <LoadingOverlay
                loaderProps={{ size: 'xl' }}
                classNames={{
                  loader: 'absolute top-20 ',
                  overlay: ' opacity-90',
                }}
                visible={isLoading}
                zIndex={2}
              />
              <Text className=" lg:text-3xl mobile:text-[16px] font-bold truncate line-clamp-1 text-ellipsis">
                Sorry, we couldn&apos;t find any result for:
              </Text>
              <Text className="lg:text-xl mobile:text-sm w-[80%] text-center font-bold truncate line-clamp-1 text-ellipsis">
                &quot;{searchValue}&quot;
              </Text>
              <Text className=" lg:text-lg mobile:text-xs font-bold">
                Try adjusting your search. Here are some ideas:
              </Text>
              <ul className="list-disc lg:text-lg mobile:text-xs">
                <li>Make sure all words are spelled correctly</li>
                <li>Try different search terms</li>
                <li>Try more general search terms</li>
              </ul>
            </div>
          ) : (
            <div className={styles.paginationArea}>
              <LoadingOverlay
                loaderProps={{ size: 'xl' }}
                classNames={{
                  loader: 'absolute top-20 ',
                  overlay: ' opacity-90',
                }}
                visible={isLoading}
                zIndex={2}
              />
              <div className={styles.propertyStyle}>
                {properties.length > 0 &&
                  properties.map((el, index) => (
                    <PropertyCard key={index} data={el} />
                  ))}
              </div>

              <Pagination
                classNames={{ control: styles.paginationControl }}
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
