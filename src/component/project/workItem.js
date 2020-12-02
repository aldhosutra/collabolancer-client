import React from "react";
import * as constants from "@liskhq/lisk-constants";
import { saveFile } from "../../utils/tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeaderRequestRevisionDialog from "../dialog/leaderRequestRevisionDialog";
import StatusNoteDialog from "../dialog/statusNoteDialog";
import LeaderRejectDialog from "../dialog/leaderRejectDialog";
const dateFormat = require("dateformat");

class WorkItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isHover: false,
      isDownloadHover: false,
      isCommentsHover: false,
    };
    this.hoverTrue = this.hoverTrue.bind(this);
    this.hoverFalse = this.hoverFalse.bind(this);
    this.downloadHoverTrue = this.downloadHoverTrue.bind(this);
    this.downloadHoverFalse = this.downloadHoverFalse.bind(this);
    this.commentHoverTrue = this.commentHoverTrue.bind(this);
    this.commentHoverFalse = this.commentHoverFalse.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
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

  handleDownload() {
    saveFile(this.props.file.publicKey);
  }

  render() {
    if (!this.props.file) {
      return null;
    }
    const bg =
      this.state.isDownloadHover || this.state.isCommentsHover
        ? "#EF233C"
        : "white";
    const cardBg = this.state.isHover ? "#EDF2F4" : "white";
    let actionButton = null;
    if (this.props.type === "contribution") {
      if (
        this.props.target.asset.term.maxRevision >
        this.props.source.asset.contribution.length
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
    } else if (this.props.type === "submission") {
      if (
        this.props.target.asset.maxRevision >
        this.props.source.asset.submission.length
      ) {
        // actionButton = <EmployerRequestRevisionDialog />;
      } else {
        // actionButton = <EmployerRejectDialog />;
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
              .{this.props.file.asset.extension}
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
              </button>
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
                      "#contribution-" +
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
                      "contribution-" +
                      this.props.source.publicKey +
                      "-" +
                      this.props.id
                    }
                    note={this.props.note}
                  />
                </div>
              ) : (
                <div>
                  {this.props.account.address === this.props.supervisor ? (
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
