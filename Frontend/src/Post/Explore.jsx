import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  //   const fetchPosts = async () => {
  //     const res = await axios.get('https://projects-mood-backend-yugw.onrender.com/posts');
  //     setPosts(res.data);
  //   };

  const handlePost = async () => {
    if (!text.trim()) return;
    await axios.post(
      "https://projects-mood-backend-yugw.onrender.com/posts",
      { text },
      { withCredentials: true }
    );
    setText("");
    //     fetchPosts();
  };

  useEffect(() => {
    //     fetchPosts();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Explore</h2>

      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button
          onClick={handlePost}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Post
        </button>
      </div>

      {posts.map((post) => (
        <div key={post._id} className="mb-4 p-4 border rounded">
          <p className="text-gray-800">{post.text}</p>
          <p className="text-sm text-gray-500">Posted by {post.user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Explore;
