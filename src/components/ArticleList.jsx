import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
  };

  render() {
    const { isLoading, articles } = this.state;

    if (isLoading) return <Loader />;
    return (
      <main>
        <ul className="article-list">
          {articles.map((article) => {
            return (
              <li key={article.article_id}>
                <ArticleCard {...article} />
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
    const { topic_slug } = this.props;

    api.fetchArticles(topic_slug).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  };
}

export default ArticleList;
