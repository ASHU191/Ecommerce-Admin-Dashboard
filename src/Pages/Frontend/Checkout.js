import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL, postConfigure } from '../../Api/api';
import CheckoutTable from '../../Components/Frontend/CheckoutTable';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../App/features/cartSlice';

const Checkout = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const  { customerData } = useSelector(state => state.customerAuth)
  const { id, username='', phone='', house='', street='', state='', country=''} = customerData;

  const [ deliveryInfo, setDeliveryInfo ] = useState({ name: username, phone: phone, house: house, street: street, state: state, country: country });
  
  const cart = useSelector(state => state.cart)
  const [ priceInfo, setPriceInfo ] = useState({coupon:'', discountPercent: 0, subTotal: cart.total, total:  0})

  useEffect(()=>{
    const total = Number((priceInfo.subTotal - priceInfo.subTotal*(priceInfo.discountPercent / 100)).toFixed(2))

    setPriceInfo(prev => ({...prev, total}))
  },[priceInfo.discountPercent, priceInfo.subTotal])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDeliveryInfo(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const orderData = { customerId: id, customerName: customerData.username, customerEmail: customerData.email, date, ...priceInfo, deliveryInfo, products:cart.items, status: 'pending'};

    if(!cart.items.length){
      toast.dismiss();
      toast.error('no item in your cart')
    } else {
      fetch(`${BASE_URL}/orders`, postConfigure(orderData))
      .then(res => {
        if(res.ok){
          toast.dismiss()
          toast.success('Order Submited')
          dispatch(clearCart())
          navigate('/order')
        }
      })
      .catch( error => {
        console.log(error)
        toast.dismiss()
        toast.error('Not Successful')
      })
    }
  }

  // Apply Coupon
  const [applyCoupon, setApplyCoupon] = useState('')
  const handleCoupon = (e) => {
    e.preventDefault()
    if (applyCoupon.length) {
      toast.dismiss();
      toast.info('checking coupon code');

      fetch(`${BASE_URL}/coupon`)
      .then(res => res.json())
      .then(data => {
        const checkCoupon = data.find(coupon => coupon.coupon === applyCoupon )
        if(!checkCoupon || checkCoupon.status === 'deactive'){
          toast.dismiss()
          toast.error('invalid coupon')
        } else if (checkCoupon && checkCoupon.status === 'active') {
          toast.dismiss();
          toast.success('Cupon Applied')
          const { coupon, discount: discountPercent } = checkCoupon;
          setPriceInfo(prev => ({...prev, coupon, discountPercent}))
        }
      })
      .catch(error => console.log(error))
    } else {
      toast.dismiss()
      toast.error('Please enter a coupon code')
    }
  }



  
  return (
    <div className='container'>
      <div className='mt-5 row gap-4 justify-content-center'>

        {/* Delivery info */}
        <div className='col-12 col-md-6'>
          <div className="card border-0 shadow " >
            <div className="card-body">
              <h4 className="card-title text-center">Delivery Address</h4>
              <form className='mt-3' onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label
                    htmlFor="name" 
                    className="form-label fw-bold"
                  >
                    Name :
                  </label>
                  <input
                    type="text" 
                    id="name" 
                    className="form-control" 
                    placeholder="enter name" 
                    name="name" 
                    value={deliveryInfo.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="phone" 
                    className="form-label fw-bold"
                  >
                    Phone :
                  </label>
                  <input
                    type="number" 
                    id="phone" 
                    className="form-control" 
                    placeholder="enter phone number" 
                    name="phone" 
                    value={deliveryInfo.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="house" 
                    className="form-label fw-bold"
                  >
                    House :
                  </label>
                  <input
                    type="text" 
                    id="house" 
                    className="form-control" 
                    placeholder="enter house" 
                    name="house" 
                    value={deliveryInfo.house}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="street" 
                    className="form-label fw-bold"
                  >
                    Street :
                  </label>
                  <input
                    type="text" 
                    id="street" 
                    className="form-control" 
                    placeholder="enter street" 
                    name="street" 
                    value={deliveryInfo.street}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="state" 
                    className="form-label fw-bold"
                  >
                    State :
                  </label>
                  <input
                    type="text" 
                    id="state" 
                    className="form-control" 
                    placeholder="enter state" 
                    name="state" 
                    value={deliveryInfo.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="country" 
                    className="form-label fw-bold"
                  >
                    Country :
                  </label>
                  <input
                    type="text" 
                    id="country" 
                    className="form-control" 
                    placeholder="enter country" 
                    name="country" 
                    value={deliveryInfo.country}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className='mt-3 w-100 btn btn-dark' type='submit'>Place Order</button>
              </form>
            </div>
          </div>
        </div>

        <div className='col-12 col-md-4'>

        {/* Apply Coupon */}
          <div className="card shadow border-0" >
            <div className="card-body">
              <form onSubmit={handleCoupon}>
                <input
                  className="form-control text-center" 
                  type={'text'}
                  placeholder='Coupon Code'
                  onChange={(e) => setApplyCoupon(e.target.value)}
                />
                <button className='mt-3 w-100 btn btn-primary' type='submit'>Apply Coupon</button>
              </form>
            </div>
          </div>

          {/* Price Summery */}
          <div className="card my-4  shadow border-0" >
            <div className="card-body">
                <h5 className="card-title fw-bold">Summery</h5>
                <div className='mt-3'>
                  <span className='fw-bold'>Coupon :</span>
                  <span className='ms-2'>{priceInfo.coupon}</span>
                </div>
                <div className='mt-1'>
                  <span className='fw-bold'>Sub-total :</span>
                  <span className='ms-2'>{priceInfo.subTotal.toFixed(2)}$</span>
                </div>
                <div className='mt-1'>
                  <span className='fw-bold'>Discount :</span>
                  <span className='ms-2'>{priceInfo.discountPercent}%</span>
                </div>
                <div className='mt-1'>
                  <span className='fw-bold'>Total :</span>
                  <span className='ms-2'>{priceInfo.total.toFixed(2)}$</span>
                </div>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className='mt-4 mb-5 col-12 shadow' style={{maxWidth: '700px'}}>
          <CheckoutTable items={cart.items} />
        </div>
      </div>

    </div>
  )
}

export default Checkout