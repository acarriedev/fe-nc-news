import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";
import Loader from "./Loader";
import CommentForm from "./CommentForm";

class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
  };

  render() {
    const {
      article_id,
      user: { username, ...user },
    } = this.props;
    const { isLoading, comments } = this.state;
    const { addCommentToState, removeCommentFromState } = this;

    if (isLoading) return <Loader />;
    return (
      <main id="comments-section">
        <h5>Comments</h5>
        <CommentForm
          article_id={article_id}
          username={username}
          {...user}
          addCommentToState={addCommentToState}
        />
        <ul className="comment-list">
          {comments.map(({ comment_id, ...comment }) => {
            return (
              <li key={comment_id}>
                <CommentCard
                  {...comment}
                  comment_id={comment_id}
                  username={username}
                  removeCommentFromState={removeCommentFromState}
                />
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;
    const { getComments } = this;
    getComments(article_id);
  }

  getComments = (article_id) => {
    api.fetchComments(article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  };

  addCommentToState = (newComment) => {
    this.setState((currentState) => {
      return {
        comments: [newComment, ...currentState.comments],
        isLoading: false,
      };
    });
  };

  removeCommentFromState = (comment_id) => {
    this.setState((currentState) => {
      const remainingComments = currentState.comments.filter(
        (comment) => comment.comment_id !== comment_id
      );

      return { comments: [...remainingComments], isLoading: false };
    });
  };
}

export default CommentList;
