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

    if (isLoading) return <Loader />;
    return (
      <main>
        <SortBar updateSortByInState={this.updateSortByInState} />
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
    const sortByHasChanged = prevState.sort_by !== this.state.sort_by;

    if (topicSlugHasChanged || sortByHasChanged) this.getArticles();
  }

  getArticles = () => {
    const { topic_slug } = this.props;
    const { sort_by } = this.state;

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
