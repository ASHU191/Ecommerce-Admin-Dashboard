import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import "../../Assets/Admin/css/layout.css";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div
      className={ !sidebarToggle ? "sb-nav-fixed" : "sb-nav-fixed sb-sidenav-toggled" }
    >
      <Navbar toggle={sidebarToggle} setToggle={setSidebarToggle} />

      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4" >
              
              <Outlet />

            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
