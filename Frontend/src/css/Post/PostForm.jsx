import React, { useState } from "react";
import axios from "axios";

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await axios.post(
        "/api/posts/create",
        { content },
        { withCredentials: true }
      );
      setContent("");
      if (onPostCreated) onPostCreated(res.data.post);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow-md mb-4"
    >
      <textarea
        className="w-full border border-gray-300 rounded-xl p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="text-right mt-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
