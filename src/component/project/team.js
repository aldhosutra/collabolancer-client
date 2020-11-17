import React from "react";
import WorkItem from "./workItem";
import { renderAvatar } from "../avatar";

// keyID

class Team extends React.Component {
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
          className="border rounded-0"
          style={{
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <div
            className="row"
            data-toggle="collapse"
            aria-expanded="true"
            aria-controls="contribution-1"
            href="#contribution-1"
            role="button"
            onClick={() => {
              return this.setState({ collapsed: !this.state.collapsed });
            }}
          >
            <div className="col d-flex justify-content-start details">
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <strong>Apply React JS Component</strong>
              </p>
            </div>
            <div className="col d-flex details">
              <p
                className="role-address"
                style={{
                  overflowWrap: "break-word",
                  fontFamily: "Poppins, sans-serif",
                  backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                    "9935147644029224811L",
                    250
                  )}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "left",
                  paddingLeft: "50px",
                  margin: "auto",
                  height: "40px",
                  lineHeight: "40px",
                }}
              >
                9935147644029224811L
              </p>
            </div>
            <div className="col d-flex justify-content-lg-end details">
              <a
                className="btn btn-primary border rounded-0 top-button"
                style={{
                  backgroundColor: "rgb(239, 35, 60)",
                  minWidth: "40px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                data-toggle="collapse"
                aria-expanded="true"
                aria-controls="contribution-1"
                href="#contribution-1"
                role="button"
              >
                {this.state.collapsed
                  ? new DOMParser().parseFromString("X", "text/html").body
                      .textContent
                  : new DOMParser().parseFromString("&#11206;", "text/html")
                      .body.textContent}
              </a>
            </div>
          </div>
          <div
            id="contribution-1"
            className="collapse show"
            style={{
              paddingLeft: "8px",
              paddingRight: "8px",
              paddingTop: "8px",
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
                  fontFamily: "Poppins, sans-serif",
                  marginBottom: "10px",
                }}
              >
                <strong>Submit Contribution</strong>
              </button>
              <button
                className="btn btn-primary border rounded-0 top-button"
                type="button"
                style={{
                  paddingRight: "24px",
                  paddingLeft: "24px",
                  backgroundColor: "#EF233C",
                  fontFamily: "Poppins, sans-serif",
                  marginBottom: "10px",
                }}
              >
                <strong>Dispute</strong>
              </button>
            </div>
            <p style={{ fontFamily: "Poppins, sans-serif" }}>Team Contract:</p>
            <div className="row">
              <div className="col-lg-3 details">
                <h6
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    color: "#EF233C",
                  }}
                >
                  <strong>Status</strong>
                </h6>
              </div>
              <div className="col details">
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#EF233C",
                  }}
                >
                  <strong>Applied</strong>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 details">
                <h6
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    color: "#EF233C",
                  }}
                >
                  <strong>Team Fund Pool</strong>
                </h6>
              </div>
              <div className="col details">
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#EF233C",
                  }}
                >
                  <strong>70 CLNC</strong>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 details">
                <h6
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    color: "#EF233C",
                  }}
                >
                  <strong>Team Fee Pool</strong>
                </h6>
              </div>
              <div className="col details">
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#EF233C",
                  }}
                >
                  <strong>70 CLNC</strong>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 details">
                <h6
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    color: "#EF233C",
                  }}
                >
                  <strong>Team Bonus Pool</strong>
                </h6>
              </div>
              <div className="col details">
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#EF233C",
                  }}
                >
                  <strong>70 CLNC</strong>
                </p>
              </div>
            </div>
            <div
              className="border rounded-0"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            />
            <p style={{ fontFamily: "Poppins, sans-serif" }}>
              Contribution List:
            </p>
            <WorkItem />
            <div style={{ marginTop: "10px", marginBottom: "20px" }} />
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
