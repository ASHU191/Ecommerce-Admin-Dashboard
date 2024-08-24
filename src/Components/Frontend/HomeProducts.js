import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../Api/api'
import useFetch from '../../Hooks/useFetch'
import ProductCard from './ProductCard'

const HomeProducts = ({category}) => {
    const {data:products} = useFetch(`${BASE_URL}/products?category=${category}&_limit=4`)
  
  
    return (
    <div className="card border-0 my-5">
        <div className="card-body py-2 py-md-3">
            <div className="p-2 border-bottom bg-white d-flex justify-content-between align-items-center">
                <span>
                    <h4>{category}</h4>
                </span>
                <span>
                    <Link className='p-1' to={`/products/${category}`}>See More</Link>
                </span>
            </div>
            <div className='pt-5 row g-2 g-sm-5'>
                { products && products.map(product => {
                    const { status } = product;
                    
                    return status === 'active' ? (
                        <div key={product.id} className='col-xml-12 col-sm-6 col-md-4 col-lg-3'>
                            <ProductCard product={product} />
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    </div>
  )
}

export default HomeProducts