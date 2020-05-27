import React from "react";

const ArticleBody = ({ title, topic, body, author, created_at }) => {
  return (
    <main>
      <h2>{title}</h2>
      <h5>topic: {topic}</h5>
      <article>{body}</article>
      <p>
        Written by {author} at {created_at}
      </p>
    </main>
  );
};

export default ArticleBody;
