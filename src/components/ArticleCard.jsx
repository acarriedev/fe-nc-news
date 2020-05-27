import React from "react";
import { Link } from "@reach/router";
import VoteUpdate from "./VoteUpdate";

const ArticleCard = ({
  title,
  votes,
  topic,
  author,
  created_at,
  comment_count,
  article_id,
}) => {
  return (
    <article className="article-card">
      <Link to={`/articles/${article_id}`}>
        <h3>{title}</h3>
      </Link>
      <VoteUpdate votes={votes} id={article_id} itemToUpdate="articles" />
      <p>Topic: {topic}</p>
      <p>
        Written by {author} at {created_at}
      </p>
      <p>comments: {comment_count}</p>
    </article>
  );
};

export default ArticleCard;
