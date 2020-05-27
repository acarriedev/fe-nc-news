import React, { Component } from "react";
import * as api from "../utils/api";

class CommentForm extends Component {
  state = {
    comment_body: "",
  };
  render() {
    const { username, avatar_url } = this.props.user;

    return (
      <form onSubmit={this.handleSubmitForm}>
        <h5>{username}</h5>
        <img src={avatar_url} alt="User avatar" id="nav-avatar" />
        <textarea
          id="comment-box"
          name="comment_body"
          onChange={this.handleInputChange}
          value={this.state.comment_body}
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
    const { article_id, addCommentToState } = this.props;
    const newComment = {
      username: this.props.user.username,
      body: this.state.comment_body,
    };

    api.postComment(article_id, newComment).then((comment) => {
      addCommentToState(comment);
    });

    this.setState({ comment_body: "" });
  };
}

export default CommentForm;
