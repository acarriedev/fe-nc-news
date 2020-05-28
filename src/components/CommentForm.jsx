import React, { Component } from "react";
import * as api from "../utils/api";

class CommentForm extends Component {
  state = {
    comment_body: "",
  };
  render() {
    const { username, avatar_url } = this.props;
    const { comment_body } = this.state;
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
        />
        <button id="comment-button">Comment</button>
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

    api.postComment(article_id, newComment).then((comment) => {
      addCommentToState(comment);
    });

    this.setState({ comment_body: "" });
  };
}

export default CommentForm;
