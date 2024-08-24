import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, updateProduct } from "../../../App/features/productsSlice";

const ProductsTable = ({ currentProducts }) => {
  const dispatch = useDispatch();

  const {adminData} = useSelector((state) => state.adminAuth);


  const handleStatus = ({ id, status }) => {
    if (status === "hidden") {
      const updateData = { status: "active" };
      dispatch(updateProduct({ id, updateData }));
    } else if (status === "active") {
      const updateData = { status: "hidden" };
      dispatch(updateProduct({ id, updateData }));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct({id}))
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table align-items-center text-center ">
          <thead className="thead-light ">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>category</th>
              <th>price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => {
              const { id, image, title, category, price, status } = product;

              return (
                <tr key={id}>
                  <th>{id}</th>
                  <td>
                    <div
                     className="d-flex ms-4"
                    >
                      <span
                        className="me-1"
                        style={{ height: "25px", width: "25px" }}
                      >
                        <img className="mh-100 mw-100" src={image} alt="" />
                      </span>
                      <span className="fw-bold ms-1 text-start">{title}</span>
                    </div>
                  </td>
                  <td>{category}</td>
                  <td>{price}</td>
                  <td className="fw-bold">
                    <div className="ms-3 form-check form-switch d-flex justify-content-start align-items-center">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        defaultChecked={status === "active"}
                        onChange={() => handleStatus({ id, status })}
                      />
                      <label
                        className="form-check-label ms-1"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        {status}
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-row justify-content-center">
                      <Link
                        className="btn btn-sm btn-primary me-1"
                        to={`/admin/products/${id}/edit`}
                      >
                        edit
                      </Link>
                      <Link
                      className="btn btn-sm btn-success ms-1"
                      to={`/admin/products/${id}`}
                      >
                        view
                      </Link>
                      { adminData.userType === 'super admin' && (
                        <button
                         className="btn btn-sm btn-danger ms-1"
                         onClick={()=> handleDelete(id)}
                        >
                          delete
                        </button>
                      )}
                    </div>
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

export default ProductsTable;
