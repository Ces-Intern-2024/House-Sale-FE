import React, { useEffect, useState } from 'react'
import MultiCarousel from '../../components/MultiCarousel/MultiCarousel'
import DetailsImageList from '../../components/DetailsImageList/DetailsImageList'
import Map from '../../components/Map/Map'
import ContactUs from '../../components/ContactUs/ContactUs'
import DetailsProperty from '../../components/DetailsProperty/DetailsProperty'
import style from './DetailPage.module.scss'
import { Breadcrumbs } from '@mantine/core'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { getPropertyById } from '../../service/PropertyService'
import { Properties } from '@/types/properties'
import Swal from 'sweetalert2'
import { searchProperty } from '../../service/SearchService'

export default function DetailPage() {
  const { id } = useParams()
  const [property, setProperty] = useState<Properties>()
  const navigate = useNavigate()

  const paths = [
    { title: 'Home', href: '/home' },
    {
      title: property?.feature.featureId === 1 ? 'For Sale' : 'For Rent',
      href: property?.feature.featureId === 1 ? '/for-sale' : '/for-rent',
    },
    { title: property?.category.name, href: '/search' },
    { title: property?.name, href: '#' },
  ].map((path, index) => (
    <NavLink
      className=" text-blue-500"
      to={path.href}
      state={
        path.title === 'For Sale' || path.title === 'For Rent'
          ? { featureId: path.title === 'For Sale' ? 1 : 2 }
          : { categoryId: property?.category.categoryId }
      }
      key={index}
    >
      {path.title}
    </NavLink>
  ))

  const handleGetProperty = async () => {
    try {
      const data = await getPropertyById(Number(id))
      setProperty(data)
    } catch (err) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        titleText: 'Property not found!',
      })
      navigate('/home')
      return
    }
  }

  useEffect(() => {
    handleGetProperty()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  const [propertiesRelevant, setPropertiesRelevant] = useState<Properties[]>([])

  const handleGetProperties = async () => {
    if (property) {
      const data = await searchProperty(
        {
          featureId: property?.feature.featureId,
          orderBy: 'createdAt',
          sortBy: 'desc',
        },
        true,
      )
      const filteredProperties = data.data.filter(
        (item: Properties) => item.propertyId !== property.propertyId,
      )
      setPropertiesRelevant(filteredProperties)
    }
  }
  useEffect(() => {
    handleGetProperties()
  }, [property])
  return (
    <>
      <div className={style.outer}>
        <Breadcrumbs my="md" className="overflow-hidden text-ellipsis ">
          {paths}
        </Breadcrumbs>

        <DetailsImageList
          images={property?.images}
          name={property?.name}
          price={property?.price}
          status={property?.status}
          feature={property?.feature.name}
        />
        <div className={style.container}>
          <div className={style.containerDesc}>
            <DetailsProperty property={property!} />
            <Map />
          </div>
          <div className={style.containerContact}>
            <ContactUs property={property!} />
          </div>
        </div>
        <MultiCarousel properties={propertiesRelevant} title="RELEVANT" />
      </div>
    </>
  )
}
