import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
  };

  render() {
    if (this.state.isLoading) return <Loader />;
    return (
      <main>
        <ul className="article-list">
          {this.state.articles.map((article) => {
            return (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <ArticleCard {...article} />
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const topicSlugHasChanged = prevProps.topic_slug !== this.props.topic_slug;
    if (topicSlugHasChanged) this.getArticles();
  }

  getArticles = () => {
    api.fetchArticles(this.props.topic_slug).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  };
}

export default ArticleList;
