import React from "react";
import { STATUS } from "../../transactions/constants";
import openLogo from "../../asset/undraw_Opened_re_i38e.svg";
import inProgressLogo from "../../asset/undraw_in_progress_ql66.svg";
import submittedLogo from "../../asset/undraw_message_sent_1030.svg";
import requestRevisionLogo from "../../asset/undraw_feeling_blue_4b7q.svg";
import finishedLogo from "../../asset/undraw_finish_line_katerina_limpitsouni_xy20.svg";
import disputeLogo from "../../asset/undraw_judge_katerina_limpitsouni_ny1q.svg";
import disputeClosed from "../../asset/undraw_agreement_aajr.svg";
import claimedLogo from "../../asset/undraw_Beer_celebration_cefj.svg";
import appliedLogo from "../../asset/undraw_season_change_f99v.svg";
import notSelectedLogo from "../../asset/undraw_heartbroken_cble.svg";
import rejectedLogo from "../../asset/undraw_cancel_u1it.svg";
import refusedLogo from "../../asset/undraw_cancel_u1it-2.svg";
import cancelLogo from "../../asset/undraw_Notify_re_65on.svg";
import terminatedLogo from "../../asset/undraw_warning_cyit.svg";

class StatusCard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isHover: false,
    };
    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({ isHover: !this.state.isHover });
  }

  render() {
    let imgLogo = null;
    const compact = this.props.compact ?? false;
    switch (this.props.contract.asset.status) {
      case STATUS.PROJECT.OPEN:
        imgLogo = openLogo;
        break;
      case STATUS.PROJECT.WORKING:
        imgLogo = inProgressLogo;
        break;
      case STATUS.PROJECT.SUBMITTED:
        imgLogo = submittedLogo;
        break;
      case STATUS.PROJECT.REQUEST_REVISION:
        imgLogo = requestRevisionLogo;
        break;
      case STATUS.PROJECT.REJECTED:
        imgLogo = rejectedLogo;
        break;
      case STATUS.PROJECT.REFUSED:
        imgLogo = refusedLogo;
        break;
      case STATUS.PROJECT.FINISHED:
        imgLogo = finishedLogo;
        break;
      case STATUS.PROJECT.CANCELLED:
        imgLogo = cancelLogo;
        break;
      case STATUS.PROJECT.TERMINATED:
        imgLogo = terminatedLogo;
        break;
      case STATUS.PROJECT.DISPUTED:
        imgLogo = disputeLogo;
        break;
      case STATUS.PROJECT.DISPUTE_CLOSED:
        imgLogo = disputeClosed;
        break;
      case STATUS.PROJECT.CLAIMED:
        imgLogo = claimedLogo;
        break;
      case STATUS.PROPOSAL.APPLIED:
        imgLogo = appliedLogo;
        break;
      case STATUS.PROPOSAL.NOT_SELECTED:
        imgLogo = notSelectedLogo;
        break;
      case STATUS.PROPOSAL.SELECTED:
        imgLogo = inProgressLogo;
        break;
      case STATUS.PROPOSAL.SUBMITTED:
        imgLogo = submittedLogo;
        break;
      case STATUS.PROPOSAL.REQUEST_REVISION:
        imgLogo = requestRevisionLogo;
        break;
      case STATUS.PROPOSAL.REJECTED:
        imgLogo = rejectedLogo;
        break;
      case STATUS.PROPOSAL.DISPUTED:
        imgLogo = disputeLogo;
        break;
      case STATUS.PROPOSAL.DISPUTE_CLOSED:
        imgLogo = disputeClosed;
        break;
      case STATUS.PROPOSAL.CLAIMED:
        imgLogo = claimedLogo;
        break;
      case STATUS.TEAM.APPLIED:
        imgLogo = appliedLogo;
        break;
      case STATUS.TEAM.NOT_SELECTED:
        imgLogo = notSelectedLogo;
        break;
      case STATUS.TEAM.SELECTED:
        imgLogo = inProgressLogo;
        break;
      case STATUS.TEAM.SUBMITTED:
        imgLogo = submittedLogo;
        break;
      case STATUS.TEAM.REQUEST_REVISION:
        imgLogo = requestRevisionLogo;
        break;
      case STATUS.TEAM.REJECTED:
        imgLogo = rejectedLogo;
        break;
      case STATUS.TEAM.DISPUTED:
        imgLogo = disputeLogo;
        break;
      case STATUS.TEAM.DISPUTE_CLOSED:
        imgLogo = disputeClosed;
        break;
      case STATUS.TEAM.CLAIMED:
        imgLogo = claimedLogo;
        break;
      default:
        imgLogo = null;
        break;
    }
    const bgColor = this.state.isHover ? "#EDF2F4" : "white";
    return !compact ? (
      <div
        className="card"
        style={{
          fontFamily: "Poppins, sans-serif",
          marginBottom: "8px",
          backgroundColor: bgColor,
          minHeight: "225px",
        }}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <div
          className="card-body"
          style={{ marginTop: "auto", marginBottom: "auto" }}
          data-toggle="tooltip"
          data-placement="top"
          title={this.props.tooltip}
          onClick={this.props.onClick}
        >
          <img
            role="status"
            style={{
              height: "100px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "16px",
              display: "block",
            }}
            alt="Solo Proposal"
            src={imgLogo}
          />
          <h6 className="w-100 dark-grey-text font-weight-bold my-1 text-center">
            <strong>
              {this.props.contract.asset.type
                .replaceAll("-", " ")
                .replace(/\w\S*/g, (txt) => {
                  return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
                })}{" "}
              Status
            </strong>
          </h6>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              textAlign: "center",
            }}
          >
            {this.props.contract.asset.status
              .replaceAll("-", " ")
              .replace(/\w\S*/g, (txt) => {
                return (
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
              })}
          </p>
        </div>
      </div>
    ) : (
      <div
        className="card"
        style={{
          fontFamily: "Poppins, sans-serif",
          marginBottom: "8px",
          backgroundColor: bgColor,
          minHeight: "70px",
        }}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <div
          className="card-body"
          style={{ marginTop: "auto", marginBottom: "auto" }}
          data-toggle="tooltip"
          data-placement="top"
          title={this.props.tooltip}
          onClick={this.props.onClick}
        >
          <div className="row">
            <div className="col-3" style={{ margin: "auto" }}>
              <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                <img
                  role="status"
                  style={{
                    height: "40px",
                  }}
                  alt="status"
                  src={imgLogo}
                />
              </div>
            </div>
            <div className="col">
              <h6 className="w-100 dark-grey-text font-weight-bold my-1">
                <strong>
                  {this.props.contract.asset.type
                    .replaceAll("-", " ")
                    .replace(/\w\S*/g, (txt) => {
                      return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                      );
                    })}{" "}
                  Status
                </strong>
              </h6>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "22px",
                }}
              >
                {this.props.contract.asset.status
                  .replaceAll("-", " ")
                  .replace(/\w\S*/g, (txt) => {
                    return (
                      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatusCard;
