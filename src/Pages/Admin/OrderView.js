import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Api/api";
import Spiner from "../../Components/Spiner";
import useFetch from "../../Hooks/useFetch";
import Style from "../../Assets/Admin/css/orderView.module.css";
import { updateOrderStatus } from "../../App/features/ordersSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const OrderView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: order, error, loading } = useFetch(`${BASE_URL}/orders/${id}`);

  const [curentStatus, setCurentStatus] = useState("");

  const handleChange = (e) => {
    setCurentStatus(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = { status: curentStatus };
    if (curentStatus.length) {
      dispatch(updateOrderStatus({ id, updateData }))
        .unwrap(unwrapResult)
        .then((res) => {
          if (res.status) {
            setTimeout(() => {
              navigate(-1);
            }, 500);
          }
        });
    }
  };

  

  if (loading) return <div className="text-center my-5"><Spiner /></div>;

  if (error) return <div className="text-center my-5">{error}</div>;

  return (
    <>
      {order && (
        <div className="container">
          <div className="card border-0 my-5 p-2 mx-auto">
            <div className={`${Style.mainInfo} mt-2`}>
              <div className={Style.info}>
                <div className={Style.heading}>Order Status : </div>
                <div className={Style.title}>Order id : {order.id}</div>
                <div className={Style.title}>Coupon : {order.coupon}</div>
                <div>
                  <span className={Style.property}>Order Status : </span>
                  <span className={Style.value}> {order.status}</span>
                </div>
                <form className={Style.statusFrm} onSubmit={handleSubmit}>
                  <span>
                    <select
                      className={Style.statusInput}
                      onChange={handleChange}
                      defaultValue={order.status}
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                    </select>
                  </span>
                  <span>
                    <button
                      className={Style.statusBtn}
                      type="submit"
                      disabled={curentStatus.length < 2 || curentStatus === order.status}
                    >
                      Submit
                    </button>
                  </span>
                </form>
              </div>

              <div className={Style.info}>
                <div className={Style.heading}>Customer : </div>
                <div>
                  <span className={Style.property}>Customer Id : </span>
                  <span className={Style.value}> {order.customerId}</span>
                </div>
                <div className={Style.title}>Name : {order.customerName}</div>
                <div>
                  <span className={Style.property}>Email : </span>
                  <span className={Style.value}> {order.customerEmail}</span>
                </div>
              </div>

              <div className={Style.info}>
                <div className={Style.heading}>Deliver to : </div>
                <div>
                  <span className={Style.property}>Name : </span>
                  <span className={Style.value}>
                    {" "}
                    {order.deliveryInfo.name}
                  </span>
                </div>
                <div>
                  <span className={Style.property}>Phone : </span>
                  <span className={Style.value}>
                    {" "}
                    {order.deliveryInfo.phone}
                  </span>
                </div>
                <div>
                  <span className={Style.property}>Address : </span>
                  <span className={Style.value}>
                    {" "}
                    {order.deliveryInfo.house}, {order.deliveryInfo.street},{" "}
                    {order.deliveryInfo.state}
                  </span>
                </div>
                <div>
                  <span className={Style.property}>Country : </span>
                  <span className={Style.value}>
                    {" "}
                    {order.deliveryInfo.country}
                  </span>
                </div>
              </div>
            </div>
            <div className="table-responsive my-2 px-2 px-md-5">
              <table className="table align-items-center text-center">
                <thead className="thead-light ">
                  <tr>
                    <th>Id</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => {
                    const { id, image, title, price, quantity, total } =
                      product;

                    return (
                      <tr key={id}>
                        <th>{id}</th>
                        <td>
                          <div className="d-flex ms-4">
                            <span
                              className="me-1"
                              style={{ height: "25px", width: "25px" }}
                            >
                              <img className="h-100 w-100" src={image} alt="" />
                            </span>
                            <span className="fw-bold ms-1 text-start">
                              {title}
                            </span>
                          </div>
                        </td>
                        <td>{price.toFixed(2)}$</td>
                        <td>{quantity}</td>
                        <td className="fw-bold">{total.toFixed(2)}PKR</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="align-self-end text-start mb-3 pe-2 pe-md-5">
              <div>
                <span className="me-2 mb-2 fw-bold">Sub-total :</span>
                <span>{order.subTotal.toFixed(2)}$</span>
              </div>
              <div>
                <span className="me-2 mb-2 fw-bold">Discount :</span>
                <span>{order.discountPercent}%</span>
              </div>
              <div>
                <span className="me-2 fw-bold">Total :</span>
                <span>{order.total.toFixed(2)}$</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderView;
