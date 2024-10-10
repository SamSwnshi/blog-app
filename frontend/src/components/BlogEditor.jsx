import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { useNavigate } from "react-router-dom";

// import { loadStripe } from "@stripe/stripe-js";

const EDITOR_JS_TOOLS = {
  header: Header,
  list: List,
};

// const stripePromise = loadStripe("API");

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const editorRef = useRef(null); // Use useRef for the editor instance
  const navigate = useNavigate();

  useEffect(() => {
    if (!editorRef.current) {
      // Initialize the editor only if it hasn't been created yet
      editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS,
        placeholder: "Let's write an awesome story!",
        onChange: () => {
          editorRef.current.save().then((outputData) => {
            setIsEditorEmpty(outputData.blocks.length === 0);
          });
        },
        onReady: () => {
          console.log("Editor.js is ready!");
        },
        autofocus: true,
      });
    }

    // //Basically checks if payment is completed or not through localStorage.
    // const paymentStatus = localStorage.getItem('isPaymentCompleted');
    // setIsPaymentCompleted(paymentStatus === 'true');

    // Cleanup function to destroy the editor instance
    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === "function") {
        editorRef.current.destroy(); // Ensure the editor is destroyed properly
        editorRef.current = null; // Reset the reference
      }
    };
  }, []);



  const handleSave = async () => {
    if (editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        const blogPost = {
          title: title,
          content: outputData,
        };

        // Get the token from localStorage (assuming the user is logged in)
        const token = localStorage.getItem("token");

        // Send the POST request to the backend API using fetch
        const response = await fetch("http://localhost:5000/api/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(blogPost),
        });

        if (response.ok) {
          alert("Blog post saved successfully!");
        } else {
          alert("Failed to save the blog post.");
        }
      } catch (error) {
        console.error("Saving failed: ", error);
        alert("An error occurred while saving the blog post.");
      }
    }
  };

  const handleProceedToPayment = async () => {
    if (editorRef.current) {
      const outputData = await editorRef.current.save();
      const blogPost = {
        title: title,
        content: outputData,
      };

      // Save blogPost in localStorage for later use
      localStorage.setItem("blogPost", JSON.stringify(blogPost));

      // Navigate to the payment page
      navigate("/payment");
    }
  };

  const isSaveDisabled = title.trim() === "" || isEditorEmpty;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Create New Blog Post
      </h1>

      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
        className="w-full p-3 mb-6 text-xl font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <div
        id="editorjs"
        className="border border-gray-300 p-4 mb-6 min-h-[400px] rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition duration-300"
      ></div>
      <div className="flex justify-end">
        <button
          onClick={handleProceedToPayment}
          disabled={isSaveDisabled}
          className={`py-2 px-6 rounded-lg transition duration-200 flex items-center ${
            isSaveDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          
          Publish Blog Post
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;
