import React from "react";

const Footer = () => {
  return (
    <div className="mt-auto bg-white py-3 border-top">
      <div className="container text-center text-muted">
        <small>
          &copy; {new Date().getFullYear()} MERN User Management System
        </small>
      </div>
    </div>
  );
};
export default Footer;
