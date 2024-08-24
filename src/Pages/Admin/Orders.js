import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../App/features/ordersSlice'
import OrdersTable from '../../Components/Admin/Orders/OrdersTable'
// import CustomerTable from '../../Components/Admin/orders/CustomerTable'
import Search from '../../Components/Admin/Search'
import Pagination from '../../Components/Pagination'

const Orders = () => {

  const dispatch = useDispatch()

  useEffect(()=> {
    const controler = new AbortController();
    const signal = controler.signal;

    dispatch(fetchOrders({signal}))

    return () => {
      controler.abort()
    }
  },[dispatch])

  const { error, orders } = useSelector(state => state.orders)

  const [ordersData, setOrdersData] = useState([]);

  //  Pagination
  const [ page, setPage ] = useState(1)
  const dataLimit = 4;
  const lastIndex = page*dataLimit;
  const firstIndex = lastIndex - dataLimit;
  const totalData = ordersData.length;
  const currentOrders = ordersData.slice(firstIndex, lastIndex)

  useEffect(() => {
    setOrdersData(orders);
  }, [orders]);



  // search function
  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filteredCustomer = orders.filter(order => order.customerName.toLowerCase().includes(searchText.toLowerCase()) )
    setOrdersData(filteredCustomer)
    setPage(1)
  }




  if (error){
    return <div className='text-center my-5'>{error}</div>
  }

  return (
    <div className='container'>
      <div className='card my-5'>
        <div className='card-header py-3 d-flex flex-row align-items-center justify-content-end'>
          <Search handleSearch={handleSearch} />
        </div>
        <div className='card-body'>
          { orders.length ? (
            <>
              <OrdersTable orders={currentOrders} />
              <Pagination page={page} setPage={setPage} total={totalData} limit={dataLimit} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Orders

