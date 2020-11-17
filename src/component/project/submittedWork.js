import React from "react";
import WorkItem from "./workItem";

class SubmittedWork extends React.Component {
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
            aria-controls="submitted-work"
            role="button"
            href="#submitted-work"
            onClick={() => {
              return this.setState({ collapsed: !this.state.collapsed });
            }}
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "rgb(255,255,255)",
            }}
          >
            <strong>
              {this.state.collapsed
                ? new DOMParser().parseFromString("&#11206;", "text/html").body
                    .textContent
                : new DOMParser().parseFromString("&#11208;", "text/html").body
                    .textContent}{" "}
              Submitted Work
            </strong>
          </h5>
        </div>
        <div
          id="submitted-work"
          className="border rounded-0 collapse show"
          style={{
            marginTop: 0,
            paddingTop: "8px",
            paddingRight: "16px",
            paddingBottom: "8px",
            paddingLeft: "16px",
          }}
        >
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "16px" }}
          >
            <button
              className="btn btn-primary border rounded-0 top-button"
              type="button"
              style={{
                paddingRight: "24px",
                paddingLeft: "24px",
                backgroundColor: "#EF233C",
                marginRight: "10px",
                fontFamily: "Poppins, sans-serif",
                marginBottom: "10px",
              }}
            >
              <strong>Send Finished Work</strong>
            </button>
            <button
              className="btn btn-primary border rounded-0 top-button"
              type="button"
              style={{
                paddingRight: "24px",
                paddingLeft: "24px",
                backgroundColor: "#EF233C",
                marginRight: "10px",
                fontFamily: "Poppins, sans-serif",
                marginBottom: "10px",
              }}
            >
              <strong>Dispute</strong>
            </button>
          </div>
          <p style={{ fontFamily: "Poppins, sans-serif" }}>
            Submitted Work List:
          </p>
          <WorkItem />
        </div>
      </div>
    );
  }
}

export default SubmittedWork;
