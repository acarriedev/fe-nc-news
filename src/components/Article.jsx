import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleBody from "./ArticleBody";
import Loader from "./Loader";
import CommentList from "./CommentList";
import ErrorDisplayer from "./ErrorDisplayer";

class Article extends Component {
  state = {
    article: {},
    isLoading: true,
    err: null,
  };

  render() {
    const { article_id, user } = this.props;
    const { isLoading, article, err } = this.state;

    if (isLoading) return <Loader />;
    if (err) return <ErrorDisplayer err={err} />;
    return (
      <main>
        <ArticleBody {...article} />
        <CommentList article_id={article_id} user={user} />
      </main>
    );
  }

  componentWillMount() {
    const { article_id } = this.props;
    const { getArticleById } = this;

    getArticleById(article_id);
  }

  getArticleById = (article_id) => {
    api
      .fetchArticleById(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
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
