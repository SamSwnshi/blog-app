import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const response = await fetch(`http://localhost:8000/api/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          throw new Error("Failed to fetch blog post details");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading...</p>; 
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!post) {
    return <p className="text-center text-lg text-gray-500">Blog post not found</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-600">
          By <span className="text-gray-800">{post.author?.username}</span>
        </h2>
        <p className="text-gray-700 mb-6">{post.content}</p>
        <p className="text-gray-600 italic">Location: {post.location}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
