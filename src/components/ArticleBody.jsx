import React from "react";
import VoteUpdate from "./VoteUpdate";
import { dateFormatter } from "../utils/utils";

const ArticleBody = ({
  title,
  topic,
  body,
  author,
  created_at,
  votes,
  article_id,
}) => {
  const formattedDate = dateFormatter(created_at);

  return (
    <main>
      <h2>{title}</h2>
      <h5>topic: {topic}</h5>
      <article>{body}</article>
      <p>
        Written by {author} at {formattedDate}
      </p>
      <VoteUpdate votes={votes} id={article_id} itemToUpdate="articles" />
    </main>
  );
};

export default ArticleBody;
