import React from "react";
import { Link } from "react-router-dom";
import { dateformater } from "../../../Utility/dateformater";

const OrdersTable = ({ orders }) => {

  return (
    <>
      <div className="table-responsive">
        <table className="table align-items-center text-center ">
          <thead className="thead-light ">
            <tr>
              <th>Id</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Order Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const { id, customerName, customerEmail, date, total, status } = order;
              const {formatedDate} = dateformater(date)

              return (
                <tr key={id}>
                  <th>{id}</th>
                  <th className="text-start">{customerName}</th>
                  <td>{customerEmail}</td>
                  <td>{formatedDate}</td>
                  <td>{total.toFixed(2)}$</td>
                  <td className="fw-bold">{status}</td>
                  <td>
                    <Link
                      className={`btn btn-sm  btn-primary`}
                      to={`/admin/orders/${id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersTable;

