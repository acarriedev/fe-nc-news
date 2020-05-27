import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleBody from "./ArticleBody";
import Loader from "./Loader";
import CommentList from "./CommentList";

class Article extends Component {
  state = {
    article: {},
    isLoading: true,
  };

  render() {
    const { article_id, user } = this.props;
    const { isLoading, article } = this.state;

    if (isLoading) return <Loader />;
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
    api.fetchArticleById(article_id).then((article) => {
      this.setState({ article, isLoading: false });
    });
  };
}

export default Article;
