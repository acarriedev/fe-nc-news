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

        <button
          onClick={
            userVotes !== 1
              ? () => {
                  handleVoteUpdate("upvote");
                }
              : null
          }
          disabled={userVotes === 1}
          className="vote-button"
        >
          <span role="img" aria-label="upvote">
            ▲
          </span>
        </button>

        <button
          onClick={
            userVotes !== -1
              ? () => {
                  handleVoteUpdate("downvote");
                }
              : null
          }
          disabled={userVotes === -1}
          className="vote-button"
        >
          <span role="img" aria-label="downvote">
            ▼
          </span>
        </button>
        {err && <p>{err}</p>}
      </section>
    );
  }

  handleVoteUpdate = (vote) => {
    const { id, itemToUpdate } = this.props;
    const { userVotes } = this.state;
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
