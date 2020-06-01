import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import ErrorDisplayer from "./ErrorDisplayer";

class NavBar extends Component {
  state = { topics: [], err: null };

  render() {
    const { topics, err } = this.state;

    if (err) return <ErrorDisplayer err={err} />;
    return (
      <nav className="app-nav">
        <h4 className="nav-bar-title">Topics</h4>
        <ul className="nav-bar-list">
          <li className="nav-list-item">
            <Link to="/">all</Link>
          </li>
          {topics.map(({ slug }) => {
            return (
              <li key={slug} className="nav-list-item">
                <Link to={`/${slug}`}>{slug}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  componentDidMount() {
    const { getTopics } = this;
    getTopics();
  }

  getTopics = () => {
    api
      .fetchTopics()
      .then((topics) => {
        this.setState({ topics });
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
  };
}

export default NavBar;
