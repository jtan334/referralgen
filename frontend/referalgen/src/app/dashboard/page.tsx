
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ServiceSelector from './ServiceSelector'
import SuggestNewCompanyButton from './components/SuggestNewCompanyButton'
import { AuthProvider } from '../firebase/AuthContext'


const page = () => {

  

  return (
    <AuthProvider>

    <div className="flex flex-col h-screen justify-between">
      <Header/>
      <ServiceSelector/>
      <div className="flex justify-center mt-4">
        <h4 className ="text-black mx-5 text-center">If the company and product isn't in the list of companies, request a new company and product to be added to the site!</h4>
       
      </div>
      <div className="flex justify-center mt-4">
      <SuggestNewCompanyButton/>
      </div>
      <Footer/>
    </div>
    </AuthProvider>
  )
}

export default page