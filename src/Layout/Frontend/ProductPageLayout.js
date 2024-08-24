import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { BASE_URL } from '../../Api/api'
import useFetch from '../../Hooks/useFetch'

import './productPageLayout.css'

const ProductPageLayout = () => {
    const {data} = useFetch(`${BASE_URL}/category`)


    return (
    <div className="container">
      <div className="row">
        <div className="product-category col-12  col-md-3 d-flex d-md-block p-2 overflow-auto overflow-md-hidden">
          { data && (
            <>
                <NavLink
                    className="d-block fw-bold text-dark text-nowrap p-1 mx-2 mx-md-0 mt-0 mt-md-2 bg-white border border-1 border-md-end-1 rounded"
                    to={`/products/all`}
                >
                    All Products
                </NavLink>
                
                {data.map(cat => {
                    const { id, category, status } = cat;
                    return status === 'active' ? (
                        <NavLink
                        key={id} 
                        className="d-block fw-bold text-dark text-nowrap p-1 mx-2 mx-md-0 mt-0 mt-md-2 bg-white border border-1 border-md-end-1 rounded"
                        to={`/products/${category}`}
                        >
                            {category}
                        </NavLink>
                    ) : null ;
                })}
            </>
          )}
        </div>
        <div className="col-12 col-md-9 p-2 pt-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProductPageLayout