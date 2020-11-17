import React from "react";
import { renderAvatar } from "../avatar";
import Team from "./team";
const parse = require("html-react-parser");

// ID

class Proposal extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  render() {
    return (
      <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
        <div className="row" style={{ marginBottom: "16px" }}>
          <div
            className="col details"
            data-toggle="collapse"
            aria-expanded="false"
            aria-controls="collapse-1"
            role="button"
            href="#collapse-1"
            onClick={() => {
              return this.setState({ collapsed: !this.state.collapsed });
            }}
          >
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                  "9935147644029224811L",
                  250
                )}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "left",
                paddingLeft: "50px",
                height: "40px",
              }}
            >
              <strong style={{ lineHeight: "25px" }}>
                9935147644029224811L
              </strong>
              <p style={{ lineHeight: "15px", fontSize: "14px" }}>
                Open Position: Full
              </p>
            </p>
          </div>
          <div className="col-auto d-flex justify-content-center justify-content-lg-center details">
            <button
              className="btn btn-primary border rounded-0 top-button"
              type="button"
              data-toggle="modal"
              data-target="#modal-1"
              style={{
                marginRight: "8px",
                backgroundColor: "#2B2D42",
                margin: "auto",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <strong>Pitching</strong>
            </button>
            <a
              className="btn btn-primary border rounded-0 top-button"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls="collapse-1"
              role="button"
              href="#collapse-1"
              style={{
                backgroundColor: "rgb(239, 35, 60)",
                margin: "auto",
                minWidth: "40px",
              }}
              onClick={() => {
                return this.setState({ collapsed: !this.state.collapsed });
              }}
            >
              <strong>
                {this.state.collapsed
                  ? new DOMParser().parseFromString("X", "text/html").body
                      .textContent
                  : new DOMParser().parseFromString("&#11206;", "text/html")
                      .body.textContent}
              </strong>
            </a>
          </div>
        </div>
        <div
          className="border rounded-0 collapse"
          id="collapse-1"
          style={{
            marginTop: "16px",
            paddingLeft: "20px",
            paddingRight: "20px",
            backgroundColor: "#fdfdfd",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <h4
            style={{
              marginBottom: "20px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <strong>Proposal Contract</strong>
          </h4>
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
                <strong>Proposal Fund Pool</strong>
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
                <strong>Proposal Fee Pool</strong>
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
                <strong>Proposal Bonus Pool</strong>
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
          <h4
            style={{
              marginBottom: "20px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <strong>Collaboration Term</strong>
          </h4>
          <div className="row">
            <div className="col-lg-3 details">
              <h6
                style={{
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <strong>Potential Earning</strong>
              </h6>
            </div>
            <div className="col details">
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "14px",
                }}
              >
                70 CLNC
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 details">
              <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                <strong>Required Locked Fee</strong>
              </h6>
            </div>
            <div className="col details">
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "14px",
                }}
              >
                5 CLNC
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 details">
              <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                <strong>Working TIme Limit</strong>
              </h6>
            </div>
            <div className="col details">
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "14px",
                }}
              >
                9 Days
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 details">
              <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                <strong>Maximum Revision</strong>
              </h6>
            </div>
            <div className="col details">
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "14px",
                }}
              >
                0 Times
              </p>
            </div>
          </div>
          <div
            className="border rounded-0"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          />
          <h4
            style={{
              fontFamily: "Poppins, sans-serif",
              marginBottom: "20px",
            }}
          >
            <strong>Team Composition:</strong>
          </h4>
          <Team />
          <Team />
          <Team />
        </div>
        <div
          className="modal fade"
          id="modal-1"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content form-elegant">
              <div
                className="modal-header text-center"
                style={{ borderBottom: "0 none" }}
              >
                <h3
                  className="modal-title w-100 dark-grey-text font-weight-bold my-1"
                  id="myModalLabel"
                >
                  <strong>Why Should I Be Hired?</strong>
                  <p
                    className=""
                    style={{ fontSize: "14px", fontWeight: "normal" }}
                  >
                    (This Message Is Addressed To Employer)
                  </p>
                </h3>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                      "9935147644029224811L",
                      250
                    )}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "left",
                    paddingLeft: "30px",
                  }}
                >
                  <strong>9935147644029224811L</strong>
                </p>
                <p className="text-justify">
                  {parse(
                    "<b>Hello</b>, i am a senior web developer and web designer in Indonesia, i have completed some project, and have professional certification from Adobe. You can trust me! Thanks!",
                    "text/html"
                  )}
                </p>
              </div>
              <div className="modal-footer" style={{ borderTop: "0 none" }}>
                <button
                  className="btn btn-light"
                  type="button"
                  data-dismiss="modal"
                  style={{
                    width: "150px",
                    backgroundColor: "#2B2D42",
                    color: "rgb(255,255,255)",
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Proposal;
