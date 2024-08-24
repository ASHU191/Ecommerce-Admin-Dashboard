import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({page, setPage, total, limit }) => {

    const pageCount = Math.ceil( total/limit)

    const pageChange = ({selected}) => {
        setPage(selected + 1)
    }


  return (
    <>
        <ReactPaginate
            previousLabel={'prev'}
            nextLabel={'next'}
            forcePage={page > 1 ? page - 1 : undefined}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            breakLabel={'...'}
            pageCount={pageCount}
            onPageChange={pageChange}
            containerClassName={'pagination justify-content-center'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            activeLinkClassName={'active'}
        />
    </>
  )
}

export default Pagination