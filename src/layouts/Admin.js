import React, { useState, useEffect } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { Button } from "reactstrap";
import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isTop = document.documentElement.scrollTop > 100;
      setShowScrollButton(isTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
      </div>
      {showScrollButton && (
        <Button className="btn-icon btn-2 fa-bounce" color="success" onClick={scrollToTop} type="button" style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: "block",
        }}>
          <span className="btn-inner-icon">
            <i className="ni ni-bold-up fa-bounce" />
          </span>
        </Button>
      )}
    </>
  );
};

export default Admin;
