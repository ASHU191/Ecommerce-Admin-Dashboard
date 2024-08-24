import React from 'react'

const Search = ({ handleSearch }) => {
  return (
    <div>
        <input
         className="form-control me-2" 
         type="search" 
         placeholder="Search" 
         aria-label="Search" 
         onChange={handleSearch}
        />
    </div>
  )
}

export default Search