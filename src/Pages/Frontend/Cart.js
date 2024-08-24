import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearCart } from '../../App/features/cartSlice'
import CartTable from '../../Components/Frontend/CartTable'

const Cart = () => {
    const dispatch = useDispatch();

    const { items, total } = useSelector(state => state.cart)


    return (
    <div className='container'>
        { items.length ? (
            <div className='mx-auto d-flex flex-column' style={{maxWidth: "850px"}}>

                <CartTable items={items} />

                <button
                 className='btn btn-sm btn-outline-danger align-self-end mt-2 me-3'
                 onClick={() => dispatch(clearCart())}
                >
                    clear cart
                </button>

                <div className="card align-self-end p-2 mt-3 me-3 mb-5" style={{width: '200px'}}>
                    <div className='mb-2 p-1'>
                        <span className='h5 me-1'>Total:</span>
                        <span className='h5 fw-normal ms-1'>{total}$</span>
                    </div>
                    <Link
                     className='btn btn-sm btn-primary'
                     to={'/checkout'}
                    >
                        Checkout
                    </Link>
                </div>
            </div>

        ) : (
            <div className='mt-5 text-center h4'>No items in cart</div>
        )}
    </div>
  )
}

export default Cart