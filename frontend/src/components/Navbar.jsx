// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
// import logo from "../assests/logo.jpeg";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white tracking-widest">
      <div className="flex items-center justify-between">
        <Link to="/">
          {/* <img src={logo} alt="Blog Logo" className="w-20 h-16 l" /> */}
          <h1>Inkly</h1>
        </Link>

        <ul className="flex space-x-6">
          <li>
            <Link
              to="/create-blog"
              className="hover:text-blue-200 transition duration-200"
            >
              Write
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="hover:text-blue-200 transition duration-200"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:text-blue-200 transition duration-200"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
