import React from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../Api/api'
import Spiner from '../../Components/Spiner'
import useFetch from '../../Hooks/useFetch'
import { dateformater } from '../../Utility/dateformater'

const Order = () => {

    const { id } = useSelector(state => state.customerAuth.customerData)

    const { data: order, error, loading } = useFetch(`${BASE_URL}/orders?_sort=id&_order=desc&customerId=${id}`);

    if (loading) return <div className='mt-3'><Spiner /></div>
    if (error) return <div className='mt-3'>{error}</div>

  return (
    <>
        { order && (
            <div className='container'>
                <div className="my-5 table-responsive border-0 shadow">
                    <table className="table  align-items-center text-center mb-0">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Date</th>
                            <th>Sub-total</th>
                            <th>Discount</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { order.map(order => {
                            const {id, date, subTotal, discountPercent, total, status } = order;
                            const { formatedDate } = dateformater(date);
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{formatedDate}</td>
                                    <td>{subTotal.toFixed(2)}$</td>
                                    <td>{discountPercent}%</td>
                                    <td>{total.toFixed(2)}$</td>
                                    <td>{status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
            </div>
            </div>
        )}
    </>
  )
}

export default Order