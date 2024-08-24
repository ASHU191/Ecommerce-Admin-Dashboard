import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../App/features/usersSlice'
import AddLinkButton from '../../Components/Admin/AddLinkButton'
import Search from '../../Components/Admin/Search'
import UsersTable from '../../Components/Admin/Users/UsersTable'
import Pagination from '../../Components/Pagination'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(()=> {
    const contoler = new AbortController();
    const signal = contoler.signal;

    dispatch(fetchUsers({signal}))

    return () => {
      contoler.abort()
    }
  }, [dispatch])

  const { users, error} = useSelector(state => state.users )

  const [userData, setUserData] = useState([]);

  //  Pagination
  const [ page, setPage ] = useState(1)
  const dataLimit = 5;
  const lastIndex = page*dataLimit;
  const firstIndex = lastIndex - dataLimit;
  const totalData = userData.length;
  const currentUser = userData.slice(firstIndex, lastIndex)

  useEffect(() => {
    setUserData(users);
  }, [users]);



  // search function
  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filteredCoupon = users.filter(user => user.username.toLowerCase().includes(searchText.toLowerCase()) )
    setUserData(filteredCoupon)
    setPage(1)
  }




  if (error){
    return <div className='text-center my-5'>{error}</div>
  }

  return (
    <div className='container'>
      <div className='card my-5'>
        <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
          <AddLinkButton btntext={'Add User'} link={'/admin/users/add'} />
          <Search handleSearch={handleSearch} />
        </div>
        <div className='card-body'>
          { users.length ? (
            <>
              <UsersTable users={currentUser} />
              <Pagination page={page} setPage={setPage} total={totalData} limit={dataLimit} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Users