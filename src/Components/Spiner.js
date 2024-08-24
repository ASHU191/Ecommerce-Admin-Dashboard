import React from 'react'
import SpinerImage from '../Assets/Spinner.svg'

const Spiner = () => {
  return (
    <div className='my-5 text-center' style={{height:"80px"}}>
        <img className='h-100' src={SpinerImage} alt='' />
    </div>
  )
}

export default Spiner