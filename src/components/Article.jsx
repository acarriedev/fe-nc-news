import React, { Component } from "react";
import * as api from "../utils/api";

import Loader from "./Loader";
import CommentList from "./CommentList";
import ErrorDisplayer from "./ErrorDisplayer";
import VoteUpdate from "./VoteUpdate";
import { dateFormatter } from "../utils/utils";

class Article extends Component {
  state = {
    article: {},
    isLoading: true,
    err: null,
  };

  render() {
    const { article_id, user } = this.props;
    const {
      isLoading,
      article: { title, topic, body, author, created_at, votes },
      err,
    } = this.state;
    const formattedDate = dateFormatter(created_at);

    if (isLoading) return <Loader />;
    if (err) return <ErrorDisplayer err={err} />;
    return (
      <main>
        <section>
          <h2>{title}</h2>
          <h5>topic: {topic}</h5>
          <article>{body}</article>
          <p>
            Written by {author} at {formattedDate}
          </p>
          <VoteUpdate votes={votes} id={article_id} itemToUpdate="articles" />
        </section>
        <CommentList article_id={article_id} user={user} />
      </main>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;
    const { getArticleById } = this;

    getArticleById(article_id);
  }

  getArticleById = (article_id) => {
    api
      .fetchArticleById(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false, err: null });
      })
      .catch(
        ({
          response: {
            status,
            data: { msg },
          },
        }) => {
          this.setState({ err: { status, msg }, isLoading: false });
        }
      );
  };
}

export default Article;
