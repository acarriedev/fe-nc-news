import React from "react";

const CommentCard = (props) => {
  const { author, created_at, body, votes } = props;
  return (
    <main>
      <h6>
        {author} | {created_at}
      </h6>
      <article>{body}</article>
      <p>votes: {votes}</p>
    </main>
  );
};

export default CommentCard;
