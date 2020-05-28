import React, { Component } from "react";
import * as api from "../utils/api";

class VoteUpdate extends Component {
  state = {
    userVotes: 0,
    err: "",
  };

  render() {
    const { votes } = this.props;
    const { userVotes, err } = this.state;
    const { handleVoteUpdate } = this;

    return (
      <section className="votes">
        <p>votes: {votes + userVotes}</p>

        <span
          role="img"
          aria-label="upvote"
          id="upvote"
          onClick={handleVoteUpdate}
        >
          ▲
        </span>

        <span
          role="img"
          aria-label="downvote"
          id="downvote"
          onClick={handleVoteUpdate}
        >
          ▼
        </span>
        {err && <p>{err}</p>}
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
        err: "",
      };
    });

    api.patchVotesById(itemToUpdate, id, increment).catch((err) => {
      this.setState(({ userVotes }) => {
        return { userVotes: userVotes - increment, err: "1 vote per user" };
      });
    });
  };
}

export default VoteUpdate;
