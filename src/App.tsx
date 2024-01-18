import React from 'react'
import './App.css'
import PropertyCard from './components/Properties/PropertyCard'
import { properties } from './utils/properties'
import Container from './components/Container'
import Footer from './layouts/Footer/Footer'
function App() {
  return (
    <div>
      <Container>
        <div>Navbar</div>
        <div>Header</div>
        <div>SlideShow</div>
        <div>
          <div>Title</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl-grid-cols-5 2xl:grid-cols-3 gap-8">
            {properties.map((property) => {
              return <PropertyCard key={property.propertyId} data={property} />
            })}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default App
