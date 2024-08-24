import React from 'react'
import { BASE_URL } from '../../Api/api'
import HomeProducts from '../../Components/Frontend/HomeProducts'
import Slider from '../../Components/Frontend/Slider'
import Spiner from '../../Components/Spiner'
import useDoubleFetch from '../../Hooks/useDoubleFetch'

const Home = () => {
  const {data1: banner, data2: category, error, loading} = useDoubleFetch([`${BASE_URL}/banner`, `${BASE_URL}/category`])


  if(loading) return <div className='mt-5 text-center'><Spiner /></div>;

  if(error) return <div className='mt-5 text-center'>{error}</div>;

  return (
    <>
      { banner && (
        <Slider banner={banner} />
      )}

      { category && (
        <div className='container mt-2'>
          { category.map(cat => {
            const { id, category, status } = cat;
            return status === 'active' ? (
              <HomeProducts key={id} category={category} />
            ) : null ;
          })}
        </div>
      )}
    </>
  )
}

export default Home