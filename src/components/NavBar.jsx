import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";

class NavBar extends Component {
  state = { topics: [] };

  render() {
    return (
      <nav className="nav-bar">
        <h5>Topics</h5>
        <ul>
          <li>
            <Link to="/">all</Link>
          </li>
          {this.state.topics.map(({ slug }) => {
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
