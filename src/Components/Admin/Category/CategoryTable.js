import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, updateCategoryStatus } from "../../../App/features/categorySlice";

const CategoryTable = ({ currentCategory }) => {

  const dispatch = useDispatch()
  const { adminData } = useSelector(state => state.adminAuth)

  const handleStatus = ({id, status}) => {
    if ( status === 'hidden' ){
      const updateData = {status: 'active'};
      dispatch(updateCategoryStatus({id, updateData}))
    } else if ( status === 'active' ){
      const updateData = {status: 'hidden'};
      dispatch(updateCategoryStatus({id, updateData}))
    }
  }

  const handleDelete = (id) => {
    dispatch(deleteCategory(id))
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table align-items-center text-center ">
          <thead className="thead-light ">
            <tr>
              <th>Id</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCategory.map((cat) => {
              const { id, category, status } = cat;

              return (
                <tr key={id}>
                  <th>{id}</th>
                  <td>{category}</td>
                  <td>
                    <div className="form-check form-switch d-flex justify-content-center align-items-center">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        defaultChecked={status === "active"}
                        onChange={() => handleStatus({id, status})}
                        disabled={ adminData.userType !== "super admin" && id <= 4}
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
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-danger ms-1"
                        onClick={() => handleDelete(id)}
                        disabled={ adminData.userType !== "super admin" && id <= 4}
                      >
                        delete
                      </button>
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

export default CategoryTable;
