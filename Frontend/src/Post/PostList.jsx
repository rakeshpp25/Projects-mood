import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data.reverse()); // newest first
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-800">
              {post.author?.name || "Anonymous"}
            </span>
            <span className="text-sm text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="text-gray-700">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
