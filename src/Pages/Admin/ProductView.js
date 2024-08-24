import React from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../Api/api";
import Spiner from "../../Components/Spiner";
import useFetch from "../../Hooks/useFetch";

const ProductView = () => {
  const { id } = useParams();
  const {
    loading,
    error,
    data: product,
  } = useFetch(`${BASE_URL}/products/${id}`);




  
  if (loading) return <div className="my-5 text-center"><Spiner /></div>;

  if (error) return <div className="my-5 text-center h3">{error}</div>;

  return (
    <>
      {product && (
        <div className="container px-4 px-md-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6 py-5 text-center" style={{height: "450px"}}>
              <img
                className=" mh-100 mw-100 mb-5 mb-md-0"
                src={product.image}
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <h1 className=" mb-3 pt-0 pt-md-5 fw-bolder">{product.title}</h1>
              <div className="fs-5">Product id: {product.id}</div>
              <div className="fs-5">Status: {product.status}</div>
              <div className="fs-5">Price : {product.price}$</div>
              <div className="fs-5">Category : {product.category}</div>
              <div className="fs-5 mb-3">Brand : {product.brand}</div>
              <p className="lead mb-2">{product.description}</p>
              <Link
                className="btn btn-outline-dark flex-shrink-0"
                to={`/admin/products/${id}/edit`}
              >
                Edit Product
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductView;
