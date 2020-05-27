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
    const { article_id, user } = this.props;
    const { isLoading, comments } = this.state;

    if (isLoading) return <Loader />;
    return (
      <main>
        <h5>Comments</h5>
        <CommentForm
          article_id={article_id}
          user={user}
          addCommentToState={this.addCommentToState}
        />
        <ul className="comment-list">
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <CommentCard
                  comment={comment}
                  username={user.username}
                  removeCommentFromState={this.removeCommentFromState}
                />
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
    const { article_id } = this.props;

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
