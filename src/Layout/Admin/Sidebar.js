import React, { memo } from "react";
import {
  FaFolderPlus,
  FaGift,
  FaImages,
  FaShoppingBag,
  FaTachometerAlt,
  FaTruck,
  FaUser,
  FaUsers,
  FaUserSecret,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import dummyImage from '../../Assets/profile.png'


const Sidebar = () => {

  const { adminData } = useSelector(state => state.adminAuth)

  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">

          <NavLink className="nav-link mt-2" to="/admin/dashboard">
            <div className="sb-nav-link-icon">
              <FaTachometerAlt />
            </div>
            Dashboard
          </NavLink>

          <NavLink className="nav-link" to="/admin/banners">
            <div className="sb-nav-link-icon">
              <FaImages />
            </div>
            Banners
          </NavLink>

          <NavLink className="nav-link" to="/admin/category">
            <div className="sb-nav-link-icon">
              <FaFolderPlus />
            </div>
            Category
          </NavLink>

          <NavLink className="nav-link" to="/admin/coupon">
            <div className="sb-nav-link-icon">
              <FaGift />
            </div>
            Coupon
          </NavLink>

          <NavLink className="nav-link" to="/admin/products">
            <div className="sb-nav-link-icon">
              <FaShoppingBag />
            </div>
            Products
          </NavLink>

          <NavLink className="nav-link" to="/admin/orders">
            <div className="sb-nav-link-icon">
              <FaTruck />
            </div>
            Orders
          </NavLink>

          <NavLink className="nav-link" to="/admin/users">
            <div className="sb-nav-link-icon">
              <FaUserSecret />
            </div>
            Users
          </NavLink>

          <NavLink className="nav-link" to="/admin/customers">
            <div className="sb-nav-link-icon">
              <FaUsers />
            </div>
            Customers
          </NavLink>

          <NavLink className="nav-link" to="/admin/profile">
            <div className="sb-nav-link-icon">
              <FaUser />
            </div>
            Profile
          </NavLink>

        </div>

      </div>

      <div className="sb-sidenav-footer d-flex justify-content-start align-items-center">
        <span className="me-2" style={{height: '25px', width: '25px' }}>
          <img
           className="h-100 w-100 rounded-circle" src={adminData.image ? adminData.image : dummyImage} 
           alt=''
          />
        </span>
        <span>
          { adminData.username }
        </span>
      </div>

    </nav>
  );
};

export default memo(Sidebar);
