import React from 'react'
import styles from './SearchCompanies.module.css'


const ReferalCard = () => {
    return (
        <div className = {styles.searchConatiner}>
            <h1 className='text-xl hover:bg-sky-500 text-[#3E6259]'>Search Companies</h1>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-x  focus: " />
        </div>
    )
}

export default ReferalCard