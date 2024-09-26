
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ServiceSelector from './ServiceSelector'


const page = () => {

  

  return (
    
    <div className="flex flex-col h-screen justify-between">
      <Header/>
      <ServiceSelector/>

      <Footer/>
    </div>
  )
}

export default page