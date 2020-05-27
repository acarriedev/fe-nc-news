import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import SortBar from "./SortBar";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
  };

  render() {
    const { isLoading, articles } = this.state;
    const { updateSortByInState } = this;

    if (isLoading) return <Loader />;
    return (
      <main>
        <SortBar updateSortByInState={updateSortByInState} />
        <ul className="article-list">
          {articles.map(({ article_id, ...article }) => {
            return (
              <ArticleCard
                key={article_id}
                article_id={article_id}
                {...article}
              />
            );
          })}
        </ul>
      </main>
    );
  }

  componentDidMount() {
    const { topic_slug } = this.props;
    const { sort_by } = this.state;
    const { getArticles } = this;
    getArticles(topic_slug, sort_by);
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic_slug } = this.props;
    const { sort_by } = this.state;
    const { getArticles } = this;

    const topicSlugHasChanged = prevProps.topic_slug !== topic_slug;
    const sortByHasChanged = prevState.sort_by !== sort_by;

    if (topicSlugHasChanged || sortByHasChanged)
      getArticles(topic_slug, sort_by);
  }

  getArticles = (topic_slug, sort_by) => {
    api.fetchArticles(topic_slug, sort_by).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  };

  updateSortByInState = (newSort) => {
    this.setState(({ sort_by }) => {
      return {
        sort_by: newSort,
      };
    });
  };
}

export default ArticleList;
