import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../App/features/categorySlice";
import AddLinkButton from "../../Components/Admin/AddLinkButton";
import CategoryTable from "../../Components/Admin/Category/CategoryTable";
import Search from "../../Components/Admin/Search";
import Pagination from "../../Components/Pagination";

const Category = () => {
  const dispatch = useDispatch();

  const { category, error } = useSelector((state) => state.category);

  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;

    dispatch(fetchCategory({ signal }));

    return () => {
      controler.abort();
    };
  }, [dispatch]);

  const [categoryData, setCategoryData] = useState([]);

  //  Pagination
  const [ page, setPage ] = useState(1)
  const dataLimit = 4;
  const lastIndex = page*dataLimit;
  const firstIndex = lastIndex - dataLimit;
  const totalData = categoryData.length;
  const currentCategory = categoryData.slice(firstIndex, lastIndex)

  useEffect(() => {
    setCategoryData(category);
    setPage(1)
  }, [category]);



  // search function
  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filteredCategory = category.filter(cat => cat.category.toLowerCase().includes(searchText.toLowerCase()) )
    setCategoryData(filteredCategory)
  }

  

  if (error) {
    return <div className="my-5 text-center h3">{error}</div>
  }

  return (
    <>
      { category && (
          <div className="container">
            <div className="card  bg-light my-5">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                
                <AddLinkButton
                  btntext={"Add Category"}
                  link={"/admin/category/add"}
                />

                <Search 
                  handleSearch={handleSearch}
                />

              </div>
              <div className="card-body">
                {category.length ?(
                  <>
                    <CategoryTable currentCategory={currentCategory} />
                    <Pagination page={page} setPage={setPage} total={totalData} limit={dataLimit} />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Category;
