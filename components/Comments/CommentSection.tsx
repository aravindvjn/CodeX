import React from "react";
import Comment from "./Comment";

function CommentSection() {
  const data = [
    {
      id: 1,
      author: "John Doe",
      comment: "This is a great post!",
      createdAt: new Date(),
      likes: 10,
      replies: [
        {
          id: 2,
          author: "Jane Smith",
          comment: "I agree!",
          createdAt: new Date(),
          likes: 5,
        },
      ],
    },
  ];
  return (
    <div className="pt-2">
      {data?.map((item) => (
        <Comment {...item} />
      ))}
    </div>
  );
}

export default CommentSection;
