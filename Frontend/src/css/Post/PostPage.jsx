import React from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

const PostPage = () => {
  return (
    <div className="max-w-xl mx-auto mt-6 px-4">
      <PostForm />
      <PostList />
    </div>
  );
};

export default PostPage;
