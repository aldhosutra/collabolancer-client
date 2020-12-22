import React from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { renderAvatar } from "../avatar";
import * as constants from "@liskhq/lisk-constants";
import { profileParser } from "../../utils/tools";
import { htmlToText } from "html-to-text";
import dateFormat from "dateformat";
import { utils } from "@liskhq/lisk-transactions";

class DisputeCard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isHover: false,
    };
    this.toggleHoverTrue = this.toggleHoverTrue.bind(this);
    this.toggleHoverFalse = this.toggleHoverFalse.bind(this);
  }

  toggleHoverTrue() {
    this.setState({ isHover: true });
  }

  toggleHoverFalse() {
    this.setState({ isHover: false });
  }

  render() {
    const bgColor = this.state.isHover ? "#EDF2F4" : "white";
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/app/project/${this.props.dispute.asset.project}#dispute-${this.props.dispute.publicKey}`}
      >
        <div
          className="card"
          style={{
            fontFamily: "Poppins, sans-serif",
            marginBottom: "8px",
            backgroundColor: bgColor,
          }}
          onMouseEnter={this.toggleHoverTrue}
          onMouseLeave={this.toggleHoverFalse}
        >
          <div className="card-body">
            <div className="row">
              <div className="col" id="status">
                <h4 style={{ fontWeight: "bold", color: "black" }}>
                  {this.props.dispute.asset.disputeType
                    .replaceAll("vs", "VS")
                    .replaceAll("-", " ")
                    .replace(/\w\S*/g, (txt) => {
                      return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                      );
                    })}
                </h4>
              </div>
              <div className="col-lg-2">
                <h4
                  className="text-right"
                  style={{ color: "#d90429", fontWeight: "bold" }}
                >
                  {utils.convertBeddowsToLSK(
                    this.props.dispute.asset.freezedFund
                  )}{" "}
                  CLNC
                </h4>
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h6
                className="text-muted mb-2"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "normal",
                }}
              >
                Parties:
              </h6>
              <h6
                style={{
                  backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                    this.props.dispute.asset.litigant
                      ? this.props.dispute.asset.litigant
                      : "",
                    250
                  )}')`,
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  paddingLeft: "25px",
                  marginLeft: "10px",
                  color: "black",
                }}
              >
                <strong>
                  {profileParser(this.props.dispute.asset.litigant)}
                </strong>
              </h6>
              <h6
                className="text-muted mb-2"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "normal",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                {" "}
                VS{" "}
              </h6>
              <h6
                style={{
                  backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                    this.props.dispute.asset.defendant
                      ? this.props.dispute.asset.defendant
                      : "",
                    250
                  )}')`,
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  paddingLeft: "25px",
                  marginLeft: "10px",
                  color: "black",
                }}
              >
                <strong>
                  {profileParser(this.props.dispute.asset.defendant)}
                </strong>
              </h6>
            </div>
            <div className="d-flex flex-wrap">
              <h6
                className="text-muted mb-2"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "normal",
                }}
              >
                Available Until:
              </h6>
              <h6
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#d90429",
                  marginLeft: "10px",
                }}
              >
                <Countdown
                  date={
                    this.props.dispute.asset.maxDays * 86400 * 1000 +
                    (constants.EPOCH_TIME_SECONDS +
                      this.props.dispute.asset.timestamp) *
                      1000
                  }
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                      var expiredMiliSeconds =
                        this.props.dispute.asset.maxDays * 86400 * 1000 +
                        (constants.EPOCH_TIME_SECONDS +
                          this.props.dispute.asset.timestamp) *
                          1000;
                      dateFormat(
                        new Date(expiredMiliSeconds),
                        "mmmm dS, yyyy - h:MM:ss TT"
                      );
                      return (
                        <strong>
                          Expired, at :{" "}
                          {dateFormat(
                            new Date(expiredMiliSeconds),
                            "mmmm dS, yyyy - h:MM:ss TT"
                          )}
                        </strong>
                      );
                    } else {
                      return (
                        <strong>
                          {days} d : {hours} h : {minutes} m : {seconds} s
                        </strong>
                      );
                    }
                  }}
                />
              </h6>
            </div>
            <p
              className="text-justify card-text"
              style={{
                color: "black",
                overflow: "hidden",
                maxHeight: "4.5em",
                lineHeight: "1.5em",
              }}
            >
              {htmlToText(this.props.dispute.asset.suit, {
                tags: {
                  img: {
                    format: "skip",
                  },
                },
              })}
            </p>
            <div className="row d-flex">
              <div className="col" id="status">
                <h1
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {this.props.dispute.asset.status
                    .replaceAll("-", " ")
                    .replace(/\w\S*/g, (txt) => {
                      return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                      );
                    })}
                </h1>
              </div>
              <div className="col">
                <h1
                  className="text-right"
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {this.props.dispute.asset.vote.litigant.length +
                    this.props.dispute.asset.vote.defendant.length}{" "}
                  Total Vote
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default DisputeCard;
