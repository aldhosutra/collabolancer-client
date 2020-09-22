import React from "react";
import quote from "./quote.json";

class Quote extends React.Component {
  render() {
    const randomQuote =
      quote.data[Math.floor(Math.random() * quote.data.length)];
    return (
      <div style={{ backgroundColor: "#ef233c", padding: "30px" }}>
        <div className="container">
          <p
            className="text-center"
            style={{
              color: "rgb(255,255,255)",
              fontFamily: "Poppins, sans-serif",
              fontSize: "20px",
            }}
          >
            <em>{`"${randomQuote.message}"`}</em>
          </p>
          <p
            className="text-center"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "rgb(255,255,255)",
              marginBottom: "0px",
              fontSize: "20px",
            }}
          >
            <strong>{randomQuote.author}</strong>
          </p>
        </div>
      </div>
    );
  }
}

export default Quote;
