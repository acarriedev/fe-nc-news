import React from "react";

const Title = ({ user: { username, avatar } }) => {
  return (
    <header className="title">
      <h1 className="title--header">NCNEWS</h1>

      <section className="title--user">
        <h4 className="title--user--item">{username}</h4>
        <img
          src={avatar}
          alt="User avatar"
          className="title--user--item"
          id="nav-avatar"
        />
      </section>
    </header>
  );
};

export default Title;
