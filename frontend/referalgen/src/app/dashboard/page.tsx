
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ServiceSelector from './ServiceSelector'
import SuggestNewCompanyButton from './components/SuggestNewCompanyButton'


const page = () => {

  

  return (
    
    <div className="flex flex-col h-screen justify-between">
      <Header/>
      <ServiceSelector/>
      <div className="flex justify-center mt-4">
        <h4 className ="text-black">If the company and product isn't in the list of companies, request a new company and product to be added to the site!</h4>
       
      </div>
      <div className="flex justify-center mt-4">
      <SuggestNewCompanyButton/>
      </div>
      <Footer/>
    </div>
  )
}

export default page