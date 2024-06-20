"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, deleteBlog, editBlog } from "../redux/slices/blogSlice";
import Image from "next/image";
import useAuth from "../hooks/useAuth";
import BlogForm from "./BlogForm";
import { showToast } from "@/redux/slices/toastSlice";
import Link from "next/link";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const blogStatus = useSelector((state) => state.blog.status);
  const error = useSelector((state) => state.blog.error);
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, isModalOpen, dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const handleDelete = async (blogId) => {
    const result = await dispatch(deleteBlog(blogId));
    if (result.type === "blogs/deleteBlog/fulfilled") {
      dispatch(
        showToast({
          message: "Blog post deleted successfully!",
          type: "success",
        })
      );
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const stripHtmlTags = (html) => {
    // Check if window is defined to ensure execution only in the browser
    if (typeof window === "undefined") {
      // Return a basic strip of HTML tags (non-ideal, but avoids SSR issues)
      return html.replace(/<[^>]+>/g, "");
    }

    // If running in the browser, use a temporary div to strip HTML tags
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  let content;

  if (blogStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (blogStatus === "succeeded") {
    content = blogs.map((blog) => (
      <div
        key={blog._id}
        className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4"
      >
        <div className="flex-shrink-0">
          <Image
            src={blog.thumbnailUrl}
            alt="Thumbnail"
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
        <div className="flex-grow ml-4">
          {/* <h3 className="text-xl font-semibold">{blog.title}</h3> */}
          <Link href={`/blog/${blog._id}`} className="text-xl font-semibold">
            {blog.title}
          </Link>
          <p className="text-gray-600">
            {/* {blog.content.substring(0, 100)}... */}
            {stripHtmlTags(blog.content).substring(0, 100)}...
          </p>
        </div>
        <div className="ml-4">
          {isAuthenticated && (
            <>
              <button
                className="text-blue-500 hover:text-blue-700 mr-2"
                onClick={() => handleEdit(blog)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    ));
  } else if (blogStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
        <button
          onClick={openModal}
          className="mb-4 bg-blue-500 text-white p-2 rounded"
        >
          Create New Blog
        </button>
      </div>
      {content}
      {isModalOpen && <BlogForm onClose={closeModal} blog={selectedBlog} />}
    </div>
  );
};

export default BlogList;
