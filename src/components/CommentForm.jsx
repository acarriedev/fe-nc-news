import React, { Component } from "react";
import * as api from "../utils/api";
import ErrorDisplayer from "./ErrorDisplayer";

class CommentForm extends Component {
  state = {
    comment_body: "",
    err: null,
  };
  render() {
    const { username, avatar_url } = this.props;
    const { comment_body, err } = this.state;
    const { handleSubmitForm, handleInputChange } = this;

    return (
      <form onSubmit={handleSubmitForm}>
        <h5>{username}</h5>
        <img src={avatar_url} alt="User avatar" id="nav-avatar" />
        <textarea
          id="comment-box"
          name="comment_body"
          onChange={handleInputChange}
          value={comment_body}
          rows="5"
          cols="50"
          placeholder="Write a comment..."
          required
        />
        <button id="comment-button">Comment</button>
        {err && <p>{`${err.msg}`}</p>}
      </form>
    );
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { article_id, addCommentToState, username } = this.props;
    const { comment_body } = this.state;
    const newComment = {
      username: username,
      body: comment_body,
    };
    const onlyWhiteSpace = /^[\t\r\n\s]*$/.test(comment_body);

    if (onlyWhiteSpace) {
      this.setState({ comment_body: "", err: { msg: "Invalid Comment" } });
    } else {
      api
        .postComment(article_id, newComment)
        .then((comment) => {
          addCommentToState(comment);
        })
        .catch(
          ({
            response: {
              status,
              data: { msg },
            },
          }) => {
            this.setState({ err: { status, msg } });
          }
        );

      this.setState({ comment_body: "" });
    }
  };
}

export default CommentForm;
