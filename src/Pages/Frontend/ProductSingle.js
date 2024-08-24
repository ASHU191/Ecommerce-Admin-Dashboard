import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Api/api";
import { addToCart } from "../../App/features/cartSlice";
import Spiner from "../../Components/Spiner";
import useFetch from "../../Hooks/useFetch";

const ProductSingle = () => {

  const { id } = useParams();
  const { loading, error, data: product,} = useFetch(`${BASE_URL}/products/${id}`);

  const dispatch = useDispatch()


  if (loading) return <div className="my-5 text-center"><Spiner /></div>;

  if (error) return <div className="my-5 text-center h3">{error}</div>;

  return (
    <>
      {product && (
        <div className="container px-4 px-md-5 my-1">
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
              <div className="fs-5">Price : {product.price}$</div>
              <div className="fs-5">Category : {product.category}</div>
              <div className="fs-5 mb-3">Brand : {product.brand}</div>
              <p className="lead fs-5 mb-4">{product.description}</p>
              <button
               className="btn btn-primary"
               onClick={() => dispatch(addToCart({id:product.id, title:product.title, price:product.price, image:product.image}))}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSingle;
