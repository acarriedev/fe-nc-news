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
    if (this.state.isLoading) return <Loader />;
    return (
      <main>
        <ArticleBody {...this.state.article} />
        <CommentList
          article_id={this.props.article_id}
          user={this.props.user}
        />
      </main>
    );
  }

  componentWillMount() {
    this.getArticleById();
  }

  getArticleById = () => {
    api.fetchArticleById(this.props.article_id).then((article) => {
      this.setState({ article, isLoading: false });
    });
  };
}

export default Article;
