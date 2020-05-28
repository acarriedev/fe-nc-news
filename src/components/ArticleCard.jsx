import React from "react";
import { Link } from "@reach/router";
import VoteUpdate from "./VoteUpdate";
import { dateFormatter } from "../utils/utils";

const ArticleCard = ({
  title,
  votes,
  topic,
  author,
  created_at,
  comment_count,
  article_id,
}) => {
  const formattedDate = dateFormatter(created_at);

  return (
    <article className="article-card">
      <Link to={`/articles/${article_id}`}>
        <h3>{title}</h3>
      </Link>

      <VoteUpdate votes={votes} id={article_id} itemToUpdate="articles" />

      <Link to={`/${topic}`}>
        <p>Topic: {topic}</p>
      </Link>

      <p>
        Written by {author} at {formattedDate}
      </p>

      <p>comments: {comment_count}</p>
    </article>
  );
};

export default ArticleCard;
