import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFrontendProducts } from "../../App/features/frontendProductsSlice";
import ProductCard from "../../Components/Frontend/ProductCard";
import Pagination from "../../Components/Pagination";
import Spiner from "../../Components/Spiner";

const Products = () => {
    const { category } = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        const controler = new AbortController();
        const signal = controler.signal;

        if (category === 'all' || category === undefined){
            dispatch(fetchFrontendProducts({signal}))
        } else {
            dispatch(fetchFrontendProducts({category, signal}))
        }

        return () => {
            controler.abort()
        }
    },[category, dispatch])

    const { products, error, loading } = useSelector(state => state.frontendProducts)
  
    const [ productsData, setProductsData] = useState([]);

    //  Pagination
    const [ page, setPage ] = useState(1)
    const dataLimit = 6;
    const lastIndex = page*dataLimit;
    const firstIndex = lastIndex - dataLimit;
    const totalData =  productsData.length;
    const currentProducts =  productsData.slice(firstIndex, lastIndex)
  
    useEffect(() => {
      setProductsData(products);
      setPage(1)
    }, [products, category]);


  if (loading) return <div className="mt-3 text-center"><Spiner /></div> ;

  if (error) return <div className="mt-3 text-center">{error}</div> ;

  return (
    <>
        <div className="row g-2 g-sm-5">
            { products && currentProducts.map(product => {
                return (
                    <div key={product.id} className='col-xml-12 col-sm-6 col-md-6 col-lg-4'>
                        <ProductCard product={product} />
                    </div>
                )
            })}
        </div>
        <div className="mt-2">
            { totalData > dataLimit ? (
                <Pagination page={page} setPage={setPage} total={totalData} limit={dataLimit} />
            ) : null }
        </div>
    </>
  );
};

export default Products;
