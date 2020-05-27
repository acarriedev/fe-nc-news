import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Title from "./components/Title";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";

class App extends Component {
  state = {
    user: {
      username: "jessjelly",
      avatar_url:
        "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
      name: "Jess Jelly",
    },
  };

  render() {
    const { user } = this.state;

    return (
      <main className="App">
        <Title user={user} />
        <NavBar />
        <Router>
          <ArticleList path="/" />
          <ArticleList path="/:topic_slug" />
          <Article path="/articles/:article_id" user={user} />
        </Router>
      </main>
    );
  }
}

export default App;
