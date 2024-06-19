'use client'
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogSlice";
import Image from "next/image";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const blogStatus = useSelector((state) => state.blog.status);
  const error = useSelector((state) => state.blog.error);

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, []);
//   }, [blogStatus, dispatch]);

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
            src="/path/to/thumbnail.jpg" // replace with actual path or blog.thumbnail
            alt="Thumbnail"
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
        <div className="flex-grow ml-4">
          <h3 className="text-xl font-semibold">{blog.title}</h3>
          <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
        </div>
        <div className="ml-4">
          <button className="text-blue-500 hover:text-blue-700 mr-2">
            Edit
          </button>
          <button className="text-red-500 hover:text-red-700">Delete</button>
        </div>
      </div>
    ));
  } else if (blogStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
      {content}
    </div>
  );
};

export default BlogList;
