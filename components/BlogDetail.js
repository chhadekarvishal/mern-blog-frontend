"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchBlogById } from "../redux/slices/blogSlice";
import { useParams } from "next/navigation";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.currentBlog);
  const blogStatus = useSelector((state) => state.blog.status);
  const error = useSelector((state) => state.blog.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [id, dispatch]);

  let content;

  if (blogStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (blogStatus === "succeeded") {
    content = (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6">{blog?.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
      </div>
    );
  } else if (blogStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        Back to Blog List
      </button>
      {content}
    </div>
  );
};

export default BlogDetail;
