import { Container } from 'postcss'
import React from 'react'
import styles from './SearchCompanies.module.css'


const ReferalCard = () => {
    return (
        <div className = {styles.searchConatiner}>
            <h1 className='text-xl hover:bg-sky-500'>Search Companies</h1>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-x  focus:border-teal-500" />
        </div>
    )
}

export default ReferalCard