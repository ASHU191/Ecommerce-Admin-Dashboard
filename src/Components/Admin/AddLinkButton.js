import React from 'react'
import { Link } from 'react-router-dom'

const AddLinkButton = ({ btntext, link }) => {
  return (
    <>
      <Link
       type="button" 
       className="btn btn-primary"
       to={link}
      >
        {btntext}
      </Link>
    </>
  )
}

export default AddLinkButton