import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import SortBar from "./SortBar";
import ErrorDisplayer from "./ErrorDisplayer";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    err: null,
  };

  render() {
    const { topic_slug } = this.props;
    const { isLoading, articles, err } = this.state;
    const { updateSortByInState } = this;

    if (isLoading) return <Loader />;
    if (err) return <ErrorDisplayer err={err} />;
    return (
      <main>
        <SortBar updateSortByInState={updateSortByInState} />
        <h4>Topic: {topic_slug || "all"}</h4>
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
    api
      .fetchArticles(topic_slug, sort_by)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
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

  updateSortByInState = (newSort) => {
    this.setState(({ sort_by }) => {
      return {
        sort_by: newSort,
      };
    });
  };
}

export default ArticleList;
