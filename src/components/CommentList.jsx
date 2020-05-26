import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";
import Loader from "./Loader";

class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
  };

  render() {
    if (this.state.isLoading) return <Loader />;
    return (
      <main>
        <h5>Comments</h5>
        <ul className="comment-list">
          {this.state.comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <CommentCard {...comment} />
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    api.fetchComments(this.props.article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  };
}

export default CommentList;
