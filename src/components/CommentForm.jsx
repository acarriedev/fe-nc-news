import React, { Component } from "react";
import * as api from "../utils/api";

class CommentForm extends Component {
  state = {
    comment_body: "",
    err: null,
    postingComment: false,
  };
  render() {
    const { username, avatar_url } = this.props;
    const { comment_body, err, postingComment } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <form onSubmit={handleSubmit}>
        <h5>{username}</h5>
        <img src={avatar_url} alt="User avatar" id="nav-avatar" />
        <textarea
          id="comment-box"
          name="comment_body"
          onChange={handleChange}
          value={comment_body}
          rows="5"
          placeholder="Write a comment..."
          required
        />
        <button id="comment-button">Comment</button>
        {err && <p>Error: {`${err.msg}`}</p>}
        {postingComment && <p>Posting...</p>}
      </form>
    );
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
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
      this.setState({ postingComment: true });
      api
        .postComment(article_id, newComment)
        .then((comment) => {
          addCommentToState(comment);
          this.setState({ postingComment: false });
        })
        .catch(
          ({
            response: {
              status,
              data: { msg },
            },
          }) => {
            console.log("Error!");
            this.setState({ err: { status, msg }, postingComment: false });
          }
        );

      this.setState({ comment_body: "" });
    }
  };
}

export default CommentForm;
