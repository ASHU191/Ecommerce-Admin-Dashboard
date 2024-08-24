import React from 'react'

const CheckoutTable = ({items}) => {
    
    return (
    <>
      <div className=" table-responsive border-0">
        <table className="table table-sm align-items-center text-center mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
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
                  <td>{price.toFixed(2)}PKR</td>
                  <td className="fw-bold">{quantity}</td>
                  <td className="fw-bold">{total.toFixed(2)}$</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}


export default CheckoutTable