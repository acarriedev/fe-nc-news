import React from "react";

const ErrorDisplayer = ({ err }) => {
  const error = err ? `${err.status}: ${err.msg}` : "404: Path not found";

  return (
    <section>
      <h3>Oops! Something went wrong</h3>
      <h4>{error}</h4>
    </section>
  );
};

export default ErrorDisplayer;
