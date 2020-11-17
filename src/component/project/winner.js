import React from "react";
import NoData from "../general/nodata";
import Proposal from "./proposal";

class Winner extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
    };
  }

  render() {
    return (
      <div>
        <div
          style={{
            marginTop: "28px",
            backgroundColor: "#EF233C",
            paddingTop: "8px",
            paddingRight: "16px",
            paddingBottom: "8px",
            paddingLeft: "16px",
          }}
        >
          <h5
            data-toggle="collapse"
            aria-expanded="false"
            aria-controls="winner"
            role="button"
            href="#winner"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "rgb(255,255,255)",
            }}
            onClick={() => {
              return this.setState({ collapsed: !this.state.collapsed });
            }}
          >
            <strong>
              {this.state.collapsed
                ? new DOMParser().parseFromString("&#11206;", "text/html").body
                    .textContent
                : new DOMParser().parseFromString("&#11208;", "text/html").body
                    .textContent}{" "}
              Winner
            </strong>
          </h5>
        </div>
        <div id="winner" className="collapse show">
          <div
            className="border rounded-0"
            style={{
              marginTop: 0,
              paddingTop: "8px",
              paddingRight: "16px",
              paddingBottom: "8px",
              paddingLeft: "16px",
            }}
          >
            {this.props.project.asset.winner !== null ? (
              <Proposal />
            ) : (
              <NoData message="The employer hasn't chosen a winner yet" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Winner;
