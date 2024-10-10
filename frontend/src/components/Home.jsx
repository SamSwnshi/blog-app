// src/components/Home.js
import React from 'react';

const Home = () => {
  const recentPosts = [
    { title: 'Post One', excerpt: 'This is a brief excerpt from the first post.' },
    { title: 'Post Two', excerpt: 'This is a brief excerpt from the second post.' },
    { title: 'Post Three', excerpt: 'This is a brief excerpt from the third post.' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Inkly</h1>
      <p className="text-lg text-center mb-6">
        Explore our latest articles and insights on various topics. Stay updated and inspired!
      </p>
      <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
      <div className="w-full max-w-2xl">
        {recentPosts.map((post, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md mb-4">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.excerpt}</p>
            <a href="#" className="text-blue-500 hover:underline">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
