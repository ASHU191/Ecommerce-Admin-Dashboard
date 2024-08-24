import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addToCart } from '../../App/features/cartSlice';

const ProductCard = ({product}) => {
    const { id, category, title, price, image } = product;

    const dispatch = useDispatch()

    const { items } = useSelector(state => state.cart)
    const [ itemsInCart, setItemsInCart ] = useState(false)
    
    useEffect(() => {
      const isExist = items.find(item => item.id === id)
      if(isExist) {
        setItemsInCart(true)
      } 
      // eslint-disable-next-line
    },[items])

    return (
    <div className="card mw-100 mb-2 border-0 shadow " >
        <div className='p-1 pt-2 d-flex mw-100 mb-2' style={{height: "200px"}} >
            <img src={image} className="mx-auto mw-100 mh-100" alt="" />
        </div>
        <div className="card-body">
            <h6 className="card-title">{title.length < 21 ? title : `${title.slice(0,20)}. . .`}</h6>
            <p className="card-text mb-1">Price: {price}PKR</p>
            <div className='d-flex justify-content-between align-items-center'>
                <Link to={`/products/${category}/${id}`}>view details</Link>
                <button
                 className={`btn btn-sm ${itemsInCart ? 'btn-primary' : 'btn-outline-dark' } `}
                 onClick={() => {dispatch(addToCart({ id, title, price, image }))}}
                >
                    Add
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard