import React, { Component } from "react";
import * as api from "../utils/api";

class VoteUpdate extends Component {
  state = {
    userVotes: 0,
  };

  render() {
    const { votes } = this.props;
    const { userVotes } = this.state;

    return (
      <section className="votes">
        <p>votes: {votes + userVotes}</p>

        <span
          role="img"
          aria-label="upvote"
          id="upvote"
          onClick={this.handleVoteUpdate}
        >
          ▲
        </span>

        <span
          role="img"
          aria-label="downvote"
          id="downvote"
          onClick={this.handleVoteUpdate}
        >
          ▼
        </span>
      </section>
    );
  }

  handleVoteUpdate = (event) => {
    const { id, itemToUpdate } = this.props;
    const { userVotes } = this.state;
    const vote = event.target.id;
    let increment = 0;

    if (vote === "upvote" && userVotes <= 0) increment++;
    if (vote === "downvote" && userVotes >= 0) increment--;

    this.setState(({ userVotes }) => {
      return {
        userVotes: userVotes + increment,
      };
    });

    api.patchVotesById(itemToUpdate, id, increment).catch((err) => {
      this.setState(({ userVotes }) => {
        return { userVotes: userVotes - increment };
      });
    });
  };
}

export default VoteUpdate;
