import React, { useState } from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import "react-quill/dist/quill.snow.css"; // Import styles for Quill
import { addBlog, editBlog } from "@/redux/slices/blogSlice";
import { useRouter } from "next/navigation";
import { showToast } from "@/redux/slices/toastSlice";

// Import ReactQuill dynamically with { ssr: false }
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogForm = ({ blog, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(blog ? blog.title : "");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    blog ? blog.thumbnailUrl : ""
  );
  const [content, setContent] = useState(blog ? blog.content : "");

  const handleQuillChange = (html) => {
    setContent(html);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (blog == null) {
      const result = await dispatch(addBlog({ title, thumbnailUrl, content }));
      if (result.type === "blogs/addBlog/fulfilled") {
        dispatch(
          showToast({ message: "Blog created successfully!", type: "success" })
        );
        router.push("/");
      } else {
        dispatch(
          showToast({ message: "Failed to create blog!", type: "error" })
        );
      }
    } else {
      const result = await dispatch(
        editBlog({
          id: blog._id,
          updatedBlog: { title, thumbnailUrl, content },
        })
      );
      if (result.type === "blogs/editBlog/fulfilled") {
        dispatch(
          showToast({ message: "Blog edited successfully!", type: "success" })
        );
        router.push("/");
      } else {
        dispatch(showToast({ message: "Failed to edit blog!", type: "error" }));
      }
    }
    onClose();
  };

  // Define Quill modules and formats
  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      // ["link", "image", "video"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    // "image",
    // "video",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-11/12 h-5/6 max-w-5xl max-h-full overflow-y-auto">
        <h2 className="text-2xl mb-4">
          {blog ? "Edit Blog" : "Create New Blog"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">Thumbnail URL</label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4 flex-grow">
            <label className="block text-gray-700 text-lg">Content</label>
            <div className="quill-container">
              <ReactQuill
                value={content}
                onChange={handleQuillChange}
                modules={quillModules}
                formats={quillFormats}
                className="editor"
                style={{ height: "250px" }}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 p-3 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded"
            >
              {blog ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
