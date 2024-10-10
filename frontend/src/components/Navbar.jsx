import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if the user is logged in by checking for a token and username in localStorage
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    console.log("Token:", token); // Debugging: check if token exists
    console.log("Stored Username:", storedUsername); // Debugging: check if username exists

    if (token && storedUsername) {
      setUsername(storedUsername); // Set the username if the user is logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    // if (onSearch) {
    //   // onSearch(searchTerm); // Call the search function passed from the parent
    //   const term = event.target.value;
    //   setSearchTerm(term);
    //   onSearch(term);
    // }

    onSearch(searchTerm);
    setSearchTerm('');
  };

  const handleWriteClick = () => {
    if (!username) {
      alert("You should login first."); // Alert if not logged in
    } else {
      navigate("/create-blog"); // Navigate to create blog if logged in
    }
  };

  return (
    <nav className="bg-purple-500 p-4 text-white tracking-widest">
      <div className="flex items-center justify-between">
        <Link to="/">
          <h1 className="text-3xl font-semibold" >Inkly</h1>
        </Link>

        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            type="text"
            placeholder="Search by country..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 rounded-l border border-gray-300 text-black"
            aria-label="Search by country"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
            Search
          </button>
        </form>

        <ul className="flex space-x-6">
          <li>
            <button
              onClick={handleWriteClick}
              className="hover:text-blue-200 transition duration-200"
            >
              Write
            </button>
          </li>
          {!username ? (
            <>
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
            </>
          ) : (
            <>
              <li className="hover:text-blue-200 transition duration-200">
                {username.toUpperCase()}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-blue-200 transition duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
