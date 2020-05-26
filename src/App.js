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
      avatar: "https://image.flaticon.com/icons/svg/447/447748.svg",
    },
  };

  render() {
    return (
      <main className="App">
        <Title user={this.state.user} />
        <NavBar />
        <Router>
          <ArticleList path="/" />
          <ArticleList path="/:topic_slug" />
          <Article path="/articles/:article_id" />
        </Router>
      </main>
    );
  }
}

export default App;
