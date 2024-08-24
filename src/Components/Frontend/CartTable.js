import React from 'react'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../App/features/cartSlice'

const CartTable = ({items}) => {
    
    const dispatch = useDispatch();
  
  
    return (
    <>
      <div className=" table-responsive border mt-5">
        <table className="table align-items-center text-center mb-0">
          <thead className="table-primary ">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const { id, image, title, price, quantity, total } = item;

              return (
                <tr key={id}>
                  <th>
                    <div className='ms-md-5 d-flex'>
                        <span style={{height: "35px", width: '35px'}}>
                            <img className='mh-100 mw-100' src={image} alt='' />
                        </span>
                        <span className='text-start ms-3 fw-bold'>{title.length <= 20 ? title : `${title.slice(0, 20)}...`}</span>
                    </div>
                  </th>
                  <td>{price.toFixed(2)}$</td>
                  <td>
                    <div className='d-flex justify-content-center align-items-baseline'>
                        <button
                         className='me-2 btn btn-sm btn-primary p-1'
                         onClick={() => dispatch(decrementQuantity({id, price}))}
                         disabled={quantity === 1}
                        >
                            <FaMinus />
                        </button>
                        <div className='fw-bold h5'>{quantity}</div>
                        <button
                         className='ms-2 btn btn-sm btn-primary p-1'
                         onClick={() => dispatch(incrementQuantity({id, price}))}
                        >
                            <FaPlus />
                        </button>
                    </div>
                  </td>
                  <td className="fw-bold">{total.toFixed(2)}$</td>
                  <td>
                    <button
                     className='btn btn-sm btn-danger p-0 '
                     onClick={() => dispatch(removeFromCart(id))}
                    >
                        <FaTimes />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CartTable