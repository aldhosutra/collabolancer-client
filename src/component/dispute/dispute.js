import React from "react";
import { renderAvatar } from "../avatar";
import * as constants from "@liskhq/lisk-constants";
import Countdown from "react-countdown";
import CloseDisputeDialog from "../dialog/closeDisputeDialog";
import DescriptionCollapse from "../general/descriptionCollapse";
import { STATUS } from "../../transactions/constants";
import CompactDisputeContractDetail from "../general/compactDisputeContractDetails";
import SolverVoteDialog from "../dialog/solverVoteDialog";
import DisputeReportDialog from "../dialog/disputeReportDialog";
import { profileParser } from "../../utils/tools";
import { withRouter } from "react-router-dom";

class Dispute extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    if (
      this.props.location.hash.split("#dispute-")[1] ===
      this.props.dispute.publicKey
    ) {
      this.setState((state) => {
        return {
          ...state,
          collapsed: true,
        };
      });
    }
  }

  render() {
    return (
      <div
        style={{
          paddingTop: "8px",
          paddingBottom: "8px",
          borderBottom: "1px solid #dee2e6",
          borderTop: "1px solid #dee2e6",
        }}
      >
        <div className="row">
          <div
            className="col details mb-md-24"
            data-toggle="collapse"
            aria-expanded="false"
            aria-controls={"dispute-" + this.props.dispute.publicKey}
            href={"#dispute-" + this.props.dispute.publicKey}
            role="button"
            onClick={() => {
              return this.setState({ collapsed: !this.state.collapsed });
            }}
          >
            <div className="row" style={{ minHeight: "60px" }}>
              <div
                className="col-md-5 d-flex justify-content-center"
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                      this.props.dispute.asset.litigant,
                      250
                    )}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "left",
                    paddingLeft: "50px",
                    marginTop: "auto",
                    marginBottom: "auto",
                    height: "40px",
                  }}
                >
                  <strong style={{ lineHeight: "25px" }}>
                    {profileParser(this.props.dispute.asset.litigant)}
                  </strong>
                  <p style={{ lineHeight: "15px", fontSize: "14px" }}>
                    Litigant [
                    {this.props.dispute.asset.disputeType
                      .split("-vs-")[0]
                      .replaceAll("-", " ")
                      .replace(/\w\S*/g, (txt) => {
                        return (
                          txt.charAt(0).toUpperCase() +
                          txt.substr(1).toLowerCase()
                        );
                      })}
                    ]
                  </p>
                </div>
              </div>
              <div
                className="col-md-2 d-flex justify-content-center mt-md-8 mb-md-8"
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <div
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginTop: "auto",
                    marginBottom: "auto",
                    color: "#ef233c",
                  }}
                >
                  <strong>VS</strong>
                </div>
              </div>
              <div
                className="col-md-5 d-flex justify-content-center"
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                      this.props.dispute.asset.defendant,
                      250
                    )}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "left",
                    marginTop: "auto",
                    marginBottom: "auto",
                    paddingLeft: "50px",
                    height: "40px",
                  }}
                >
                  <strong style={{ lineHeight: "25px" }}>
                    {profileParser(this.props.dispute.asset.defendant)}
                  </strong>
                  <p style={{ lineHeight: "15px", fontSize: "14px" }}>
                    Defendant [
                    {this.props.dispute.asset.disputeType
                      .split("-vs-")[1]
                      .replaceAll("-", " ")
                      .replace(/\w\S*/g, (txt) => {
                        return (
                          txt.charAt(0).toUpperCase() +
                          txt.substr(1).toLowerCase()
                        );
                      })}
                    ]
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-auto d-flex justify-content-end details">
            {this.props.dispute.asset.status === STATUS.DISPUTE.OPEN ? (
              <Countdown
                date={
                  this.props.dispute.asset.maxDays * 86400 * 1000 +
                  (constants.EPOCH_TIME_SECONDS +
                    this.props.dispute.asset.timestamp) *
                    1000
                }
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  if (completed) {
                    return (
                      <CloseDisputeDialog
                        id={this.props.id}
                        dispute={this.props.dispute}
                      />
                    );
                  } else {
                    return (
                      <div
                        className="btn btn-primary border rounded-0 top-button w-sm-100 fs-sm-12 h-sm-100"
                        style={{
                          color: "#2B2D42",
                          width: "195px",
                          backgroundColor: "white",
                          marginTop: "auto",
                          marginBottom: "auto",
                          fontFamily: "Poppins, sans-serif",
                          cursor: "unset",
                          fontSize: "16px",
                          minHeight: "38px",
                        }}
                      >
                        <strong>
                          {days} d : {hours} h : {minutes} m : {seconds} s
                        </strong>
                      </div>
                    );
                  }
                }}
              />
            ) : (
              <DisputeReportDialog
                id={this.props.id}
                account={this.props.account}
                dispute={this.props.dispute}
              />
            )}
            <a
              className="btn btn-primary border rounded-0 top-button w-sm-75 h-sm-100"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls={"dispute-" + this.props.dispute.publicKey}
              role="button"
              href={"#dispute-" + this.props.dispute.publicKey}
              style={{
                backgroundColor: "rgb(239, 35, 60)",
                marginTop: "auto",
                marginBottom: "auto",
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
          className="collapse"
          id={"dispute-" + this.props.dispute.publicKey}
        >
          <div
            className="border rounded-0 dispute-box"
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
                marginTop: "10px",
                marginBottom: "20px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <strong>Dispute Contract</strong>
            </h4>
            <CompactDisputeContractDetail dispute={this.props.dispute} />
            <h6
              style={{
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <strong>Litigant Claim:</strong>
            </h6>
            <DescriptionCollapse
              description={this.props.dispute.asset.suit}
              id={"dispute-suit-" + this.props.dispute.publicKey}
              fontSize={14}
            />
            <div
              className="d-flex justify-content-end"
              style={{ marginBottom: "16px" }}
            >
              <SolverVoteDialog
                id={this.props.id}
                account={this.props.account}
                dispute={this.props.dispute}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dispute);
