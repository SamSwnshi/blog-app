import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ searchCountry }) => {
 const navigate = useNavigate()
  const [originalBlogs, setOriginalBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/blogs");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOriginalBlogs(data); 
          setFilteredBlogs(data); 
        } else {
          console.error("Failed to fetch blog posts");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {

    if (searchCountry) {
      setFilteredBlogs(originalBlogs.filter(blog =>
        blog.location && blog.location.toLowerCase().includes(searchCountry.toLowerCase())
      ));
      setCurrentPage(1); 
    } else {
      setFilteredBlogs(originalBlogs); 
    }
  }, [searchCountry, originalBlogs]); 

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredBlogs.length / blogsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  // const handleReset = () => {
  //   // setSearchCountry(""); // Reset search country to empty
  //   setCurrentPage(1); // Reset to first page
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-900 p-4 tracking-widest">
      <h1 className="text-4xl font-bold mb-6 text-white">Welcome to Inkly</h1>
      <p className="text-lg text-center mb-6 text-white">
        Explore our latest articles and insights on various topics. Stay updated and inspired!
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-white">Recent Posts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full max-w-2xl">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-4 rounded shadow-md mb-4 cursor-pointer"
                onClick={() => handleBlogClick(blog._id)}
              >
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-gray-600">{blog.subheading}</p>
                <p className="text-gray-700 mt-2">{blog.content.substring(0, 150)}...</p>
                <div className="mt-2 text-sm text-gray-500">
                  <span>By: {blog.author.username}</span>
                  {blog.location && <span> | Location: {blog.location}</span>}
                </div>
              </div>
            ))
          ) : (
            <p>No blog posts available</p>
          )}
        </div>
      )}

      <div className="flex justify-between mt-4 w-full max-w-2xl ">
        <button
          onClick={prevPage}
          disabled={currentPage === 1 || filteredBlogs.length === 0}
          className={`py-2 px-4 rounded-lg ${currentPage === 1 || filteredBlogs.length === 0 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(filteredBlogs.length / blogsPerPage) || filteredBlogs.length === 0}
          className={`py-2 px-4 rounded-lg ${currentPage >= Math.ceil(filteredBlogs.length / blogsPerPage) || filteredBlogs.length === 0 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>

        {/* <button
        onClick={handleReset}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
      >
        Reset Filters
      </button> */}
      </div>
    </div>
  );
};

export default Home;
