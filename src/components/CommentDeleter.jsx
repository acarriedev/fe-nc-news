import React, { Component } from "react";
import * as api from "../utils/api";

class CommentDeleter extends Component {
  state = {
    err: null,
    deletingComment: false,
  };

  handleButtonClick = () => {
    const { comment_id, removeCommentFromState } = this.props;

    this.setState({ deletingComment: true });

    api
      .deleteCommentById(comment_id)
      .then(() => {
        removeCommentFromState(comment_id);
        this.setState({ deletingComment: false, err: null });
      })
      .catch(
        ({
          response: {
            status,
            data: { msg },
          },
        }) => {
          console.log("Error!");
          this.setState({ err: { status, msg }, deletingComment: false });
        }
      );
  };

  render() {
    const { deletingComment, err } = this.state;
    const { handleButtonClick } = this;

    return (
      <>
        <button onClick={handleButtonClick}>delete comment</button>
        {deletingComment && <p>Deleting...</p>}
        {err && <p>Error: {`${err.msg}`}</p>}
      </>
    );
  }
}

export default CommentDeleter;
