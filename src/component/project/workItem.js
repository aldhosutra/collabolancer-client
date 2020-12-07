import React from "react";
import * as constants from "@liskhq/lisk-constants";
import { saveFile } from "../../utils/tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeaderRequestRevisionDialog from "../dialog/leaderRequestRevisionDialog";
import StatusNoteDialog from "../dialog/statusNoteDialog";
import LeaderRejectDialog from "../dialog/leaderRejectDialog";
import EmployerRequestRevisionDialog from "../dialog/employerRequestRevision";
import EmployerRejectDialog from "../dialog/employerRejectDialog";
import { STATUS } from "../../transactions/constants";
import config from "../../config/config.json";
import EmployerAcceptFinishDialog from "../dialog/employerAcceptFinishDialog";
const dateFormat = require("dateformat");

class WorkItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isHover: false,
      isDownloadHover: false,
      isCommentsHover: false,
      isOpenHover: false,
    };
    this.hoverTrue = this.hoverTrue.bind(this);
    this.hoverFalse = this.hoverFalse.bind(this);
    this.downloadHoverTrue = this.downloadHoverTrue.bind(this);
    this.downloadHoverFalse = this.downloadHoverFalse.bind(this);
    this.commentHoverTrue = this.commentHoverTrue.bind(this);
    this.commentHoverFalse = this.commentHoverFalse.bind(this);
    this.openHoverTrue = this.openHoverTrue.bind(this);
    this.openHoverFalse = this.openHoverFalse.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  hoverTrue() {
    this.setState((state) => {
      return { ...state, isHover: true };
    });
  }

  hoverFalse() {
    this.setState((state) => {
      return { ...state, isHover: false };
    });
  }

  downloadHoverTrue() {
    this.setState((state) => {
      return { ...state, isDownloadHover: true };
    });
  }

  downloadHoverFalse() {
    this.setState((state) => {
      return { ...state, isDownloadHover: false };
    });
  }

  commentHoverTrue() {
    this.setState((state) => {
      return { ...state, isCommentsHover: true };
    });
  }

  commentHoverFalse() {
    this.setState((state) => {
      return { ...state, isCommentsHover: false };
    });
  }

  openHoverTrue() {
    this.setState((state) => {
      return { ...state, isOpenHover: true };
    });
  }

  openHoverFalse() {
    this.setState((state) => {
      return { ...state, isOpenHover: false };
    });
  }

  handleDownload() {
    saveFile(this.props.file.publicKey);
  }

  handleOpen() {}

  render() {
    if (!this.props.file) {
      return null;
    }
    const bg =
      this.state.isDownloadHover ||
      this.state.isCommentsHover ||
      this.state.isOpenHover
        ? "#EF233C"
        : "white";
    const cardBg = this.state.isHover ? "#EDF2F4" : "white";
    let actionButton = null;
    if (this.props.type === "contribution") {
      if (![STATUS.TEAM.REJECTED].includes(this.props.source.asset.status)) {
        if (
          this.props.target.asset.term.maxRevision >
            this.props.source.asset.contribution.length &&
          Date.now() <
            this.props.maxTime * 86400 * 1000 +
              (constants.EPOCH_TIME_SECONDS + this.props.workStarted) * 1000
        ) {
          actionButton = (
            <LeaderRequestRevisionDialog
              id={this.props.id}
              proposal={this.props.target}
              team={this.props.source}
              contribution={this.props.file.publicKey}
            />
          );
        } else {
          actionButton = (
            <LeaderRejectDialog
              id={this.props.id}
              proposal={this.props.target}
              team={this.props.source}
              contribution={this.props.file.publicKey}
            />
          );
        }
      }
    } else if (this.props.type === "submission") {
      if (
        ![STATUS.PROPOSAL.REJECTED].includes(this.props.source.asset.status)
      ) {
        if (
          this.props.target.asset.maxRevision >
            this.props.target.asset.submission.length &&
          Date.now() <
            this.props.maxTime * 86400 * 1000 +
              (constants.EPOCH_TIME_SECONDS + this.props.workStarted) * 1000
        ) {
          actionButton = (
            <div
              style={{
                marginBottom: "auto",
                marginTop: "auto",
              }}
            >
              <EmployerAcceptFinishDialog
                id={this.props.id}
                project={this.props.target}
                proposal={this.props.source}
                submission={this.props.file.publicKey}
              />
              <EmployerRequestRevisionDialog
                id={this.props.id}
                project={this.props.target}
                proposal={this.props.source}
                submission={this.props.file.publicKey}
              />
            </div>
          );
        } else {
          actionButton = (
            <div
              style={{
                marginBottom: "auto",
                marginTop: "auto",
              }}
            >
              <EmployerAcceptFinishDialog
                id={this.props.id}
                project={this.props.target}
                proposal={this.props.source}
                submission={this.props.file.publicKey}
              />
              <EmployerRejectDialog
                id={this.props.id}
                project={this.props.target}
                proposal={this.props.source}
                submission={this.props.file.publicKey}
              />
            </div>
          );
        }
      }
    }
    let iconBanner = null;
    if (this.state.isDownloadHover) {
      iconBanner = (
        <div className="text-center" style={{ margin: "auto" }}>
          <FontAwesomeIcon icon={["fas", "download"]} size="2x" color="white" />
          <p style={{ margin: "0px", color: "white" }}>Download!</p>
        </div>
      );
    } else if (this.state.isCommentsHover) {
      iconBanner = (
        <div className="text-center" style={{ margin: "auto" }}>
          <FontAwesomeIcon icon={["fas", "comments"]} size="2x" color="white" />
          <p style={{ margin: "0px", color: "white" }}>Open Note!</p>
        </div>
      );
    } else if (this.state.isOpenHover) {
      iconBanner = (
        <div className="text-center" style={{ margin: "auto" }}>
          <FontAwesomeIcon
            icon={["fas", "external-link-alt"]}
            size="2x"
            color="white"
          />
          <p style={{ margin: "0px", color: "white" }}>Open In New Tab!</p>
        </div>
      );
    } else {
      iconBanner = (
        <div style={{ margin: "auto", color: "#EF233C" }}>
          <p
            style={{
              overflowWrap: "break-word",
              textAlign: "center",
            }}
          >
            <strong style={{ fontSize: "30px" }}>
              {this.props.file.asset.extension !== ""
                ? "." + this.props.file.asset.extension
                : "???"}
            </strong>
            <br />
            {this.props.file.asset.mime}
          </p>
        </div>
      );
    }
    return (
      <div>
        <div className="border rounded-0" style={{ padding: "8px" }}>
          <div
            className="row"
            style={{
              marginLeft: "0px",
              marginRight: "0px",
              fontFamily: "Poppins, sans-serif",
              backgroundColor: cardBg,
            }}
            onMouseEnter={this.hoverTrue}
            onMouseLeave={this.hoverFalse}
            onTouchStart={this.hoverTrue}
            onTouchEnd={this.hoverFalse}
          >
            <div
              className="col-lg-2 details d-flex"
              style={{
                color: "#EF233C",
                border: "1px solid #EF233C",
                height: "100px",
                backgroundColor: bg,
                margin: "auto",
              }}
            >
              <button
                style={{
                  marginBottom: "0px",
                  overflowWrap: "break-word",
                  width: "100%",
                  textAlign: "left",
                  padding: "0px",
                  background: "none",
                  border: "none",
                  outline: "none",
                }}
                onClick={this.handleDownload}
                onMouseEnter={this.downloadHoverTrue}
                onMouseLeave={this.downloadHoverFalse}
                onTouchStart={this.downloadHoverTrue}
                onTouchEnd={this.downloadHoverFalse}
              >
                {iconBanner}
              </button>
            </div>
            <div className="col-lg-5 details" style={{ margin: "auto" }}>
              <a
                style={{
                  marginBottom: "0px",
                  overflowWrap: "break-word",
                  width: "100%",
                  textAlign: "left",
                  padding: "0px",
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "black",
                  textDecoration: "none",
                }}
                href={
                  config.extendedAPI + `/api/file/${this.props.file.publicKey}`
                }
                target="_blank"
                rel="noreferrer"
                onMouseEnter={this.openHoverTrue}
                onMouseLeave={this.openHoverFalse}
                onTouchStart={this.openHoverTrue}
                onTouchEnd={this.openHoverFalse}
              >
                <div style={{ overflowWrap: "break-word" }}>
                  <p style={{ marginBottom: "0px" }}>
                    <strong>{this.props.file.asset.filename}</strong>
                  </p>
                  <p
                    style={{
                      color: "#EF233C",
                      fontSize: "12px",
                      marginBottom: "0px",
                    }}
                  >
                    {dateFormat(
                      new Date(
                        (constants.EPOCH_TIME_SECONDS +
                          this.props.file.asset.time) *
                          1000
                      ),
                      "mmmm dS, yyyy - h:MM:ss TT"
                    )}
                  </p>
                  {this.props.file.publicKey}
                </div>
              </a>
            </div>
            <div className="col-lg-5 details" style={{ margin: "auto" }}>
              {this.props.note ? (
                <div>
                  <button
                    style={{
                      marginBottom: "0px",
                      overflowWrap: "break-word",
                      width: "100%",
                      textAlign: "left",
                      padding: "0px",
                      background: "none",
                      border: "none",
                      outline: "none",
                    }}
                    type="button"
                    data-toggle="modal"
                    data-target={
                      "#" +
                      this.props.type +
                      "-" +
                      this.props.source.publicKey +
                      "-" +
                      this.props.id
                    }
                    onMouseEnter={this.commentHoverTrue}
                    onMouseLeave={this.commentHoverFalse}
                    onTouchStart={this.commentHoverTrue}
                    onTouchEnd={this.commentHoverFalse}
                  >
                    <div>
                      <p style={{ margin: "0px" }}>
                        <strong>
                          {"["}
                          {this.props.note.status
                            .replaceAll("-", " ")
                            .replace(/\w\S*/g, (txt) => {
                              return (
                                txt.charAt(0).toUpperCase() +
                                txt.substr(1).toLowerCase()
                              );
                            })}
                          {"]"}
                        </strong>
                      </p>
                      <p
                        style={{
                          color: "#EF233C",
                          fontSize: "12px",
                          marginBottom: "0px",
                        }}
                      >
                        {dateFormat(
                          new Date(
                            (constants.EPOCH_TIME_SECONDS +
                              this.props.note.time) *
                              1000
                          ),
                          "mmmm dS, yyyy - h:MM:ss TT"
                        )}
                      </p>
                      <p
                        style={{
                          margin: "0px",
                          overflow: "hidden",
                          maxHeight: "3.0em",
                          lineHeight: "1.5em",
                        }}
                      >
                        {this.props.note.reason}
                      </p>
                    </div>
                  </button>
                  <StatusNoteDialog
                    id={
                      this.props.type +
                      "-" +
                      this.props.source.publicKey +
                      "-" +
                      this.props.id
                    }
                    note={this.props.note}
                  />
                </div>
              ) : (
                <div>
                  {this.props.account.address === this.props.supervisor &&
                  actionButton !== null ? (
                    <div className="text-center">{actionButton}</div>
                  ) : (
                    <div className="text-center">
                      <p>No Note Yet!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkItem;
