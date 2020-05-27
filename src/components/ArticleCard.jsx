import React from "react";

const ArticleCard = ({
  title,
  votes,
  topic,
  author,
  created_at,
  comment_count,
}) => {
  return (
    <article className="article-card">
      <h3>{title}</h3>
      <p>votes: {votes}</p>
      <p>Topic: {topic}</p>
      <p>
        Written by {author} at {created_at}
      </p>
      <p>comments: {comment_count}</p>
    </article>
  );
};

export default ArticleCard;
