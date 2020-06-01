import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";
import Loader from "./Loader";
import CommentForm from "./CommentForm";
import ErrorDisplayer from "./ErrorDisplayer";

class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
    err: null,
  };

  render() {
    const {
      article_id,
      user: { username, avatar_url },
    } = this.props;
    const { isLoading, comments, err } = this.state;
    const { addCommentToState, removeCommentFromState } = this;

    if (isLoading) return <Loader />;
    if (err) return <ErrorDisplayer err={err} />;
    return (
      <section id="comments-section">
        <h4>Comments</h4>
        <CommentForm
          article_id={article_id}
          username={username}
          avatar_url={avatar_url}
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
      </section>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;
    const { getComments } = this;
    getComments(article_id);
  }

  getComments = (article_id) => {
    api
      .fetchComments(article_id)
      .then((comments) => {
        this.setState({ comments, isLoading: false, err: null });
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

  addCommentToState = (newComment) => {
    this.setState((currentState) => {
      return {
        comments: [newComment, ...currentState.comments],
        isLoading: false,
        err: null,
      };
    });
  };

  removeCommentFromState = (comment_id) => {
    this.setState((currentState) => {
      const remainingComments = currentState.comments.filter(
        (comment) => comment.comment_id !== comment_id
      );

      return { comments: [...remainingComments], isLoading: false, err: null };
    });
  };
}

export default CommentList;
