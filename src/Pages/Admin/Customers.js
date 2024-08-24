import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCoustomers } from '../../App/features/customersSlice'
import CustomersTable from '../../Components/Admin/Customers/CustomersTable'
import Search from '../../Components/Admin/Search'
import Pagination from '../../Components/Pagination'

const Customers = () => {
  const dispatch = useDispatch()

  useEffect(()=> {
    const contoler = new AbortController();
    const signal = contoler.signal;

    dispatch(fetchCoustomers({signal}))

    return () => {
      contoler.abort()
    }
  }, [dispatch])

  const { customers, error} = useSelector(state => state.customers )

  const [customersData, setCustomersData] = useState([]);

  //  Pagination
  const [ page, setPage ] = useState(1)
  const dataLimit = 5;
  const lastIndex = page*dataLimit;
  const firstIndex = lastIndex - dataLimit;
  const totalData = customersData.length;
  const currentCustomers = customersData.slice(firstIndex, lastIndex)

  useEffect(() => {
    setCustomersData(customers);
  }, [customers]);



  // search function
  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filteredCustomer = customers.filter(customer => customer.username.toLowerCase().includes(searchText.toLowerCase()) )
    setCustomersData(filteredCustomer)
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
          { customers.length ? (
            <>
              <CustomersTable customers={currentCustomers} />
              <Pagination page={page} setPage={setPage} total={totalData} limit={dataLimit} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Customers