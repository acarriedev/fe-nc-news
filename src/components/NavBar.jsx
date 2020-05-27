import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";

class NavBar extends Component {
  state = { topics: [] };

  render() {
    const { topics } = this.state;

    return (
      <nav className="nav-bar">
        <h5>Topics</h5>
        <ul>
          <li>
            <Link to="/">all</Link>
          </li>
          {topics.map(({ slug }) => {
            return (
              <li key={slug}>
                <Link to={`/${slug}`}>{slug}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  componentDidMount() {
    this.getTopics();
  }

  getTopics = () => {
    api.fetchTopics().then((topics) => {
      this.setState({ topics });
    });
  };
}

export default NavBar;
