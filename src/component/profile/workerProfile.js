/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withRouter } from "react-router-dom";
import { renderAvatar } from "../avatar";
import MiniCard from "../general/miniCard";
import ProfileProjectWrapper from "./profileProjectWrapper";
import ProfileActivityWrapper from "./profileActivityWrapper";
import ProfileFileWrapper from "./profileFileWrapper";
import { utils } from "@liskhq/lisk-transactions";

class WorkerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      account: null,
      profile: null,
      index: 0,
    };
  }

  render() {
    let summary = [
      <MiniCard
        key="worker-joined-project"
        value={this.props.profile.data.asset.joined.length}
        label="In Queue"
      />,
      <MiniCard
        key="worker-leaderOf-project"
        value={this.props.profile.data.asset.leaderOf.length}
        label="As Leader"
      />,
      <MiniCard
        key="worker-contributorOf-project"
        value={this.props.profile.data.asset.contributorOf.length}
        label="As Team"
      />,
      <MiniCard
        key="worker-cancelled-project"
        value={this.props.profile.data.asset.cancelled.length}
        label="Cancelled"
      />,
      <MiniCard
        key="worker-guilty-project"
        value={this.props.profile.data.asset.guilty.length}
        label="Is Guilty"
      />,
      <MiniCard
        key="worker-owned-files"
        value={this.props.profile.data.asset.file.length}
        label="Owned Files"
      />,
      <MiniCard
        key="worker-earned"
        value={utils
          .convertBeddowsToLSK(this.props.profile.data.asset.earning)
          .toString()}
        label="CLNC Earned"
      />,
    ];
    const tab = [
      <div
        key={"tab-project"}
        style={{ display: this.state.index === 0 ? "block" : "none" }}
      >
        <ProfileProjectWrapper
          account={this.props.profile ? this.props.profile.data : null}
          order={["joined", "leaderOf", "contributorOf", "cancelled", "guilty"]}
          label={["Ongoing", "As Leader", "As Team", "Cancelled", "Guilty"]}
        />
      </div>,
      <div
        key={"tab-owned-files"}
        style={{ display: this.state.index === 1 ? "block" : "none" }}
      >
        <ProfileFileWrapper
          account={this.props.profile ? this.props.profile.data : null}
        />
      </div>,
      <div
        key={"tab-activity"}
        style={{ display: this.state.index === 2 ? "block" : "none" }}
      >
        <ProfileActivityWrapper
          account={this.props.profile ? this.props.profile.data : null}
        />
      </div>,
    ];
    return (
      <div>
        <div className="row" style={{ marginBottom: "32px" }}>
          <div className="col-lg-3">
            <div
              style={{
                backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                  this.props.profile.data.address,
                  250
                )}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                paddingLeft: "120px",
                height: "120px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "16px",
              }}
            />
          </div>
          <div className="col">
            <h4
              className="text-center text-lg-left"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <strong>{this.props.profile.data.address}</strong>
            </h4>
            <h6
              className="text-center text-lg-left"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontStyle: "italic",
              }}
            >
              {this.props.profile.data.asset.type
                .replaceAll("-", " ")
                .replace(/\w\S*/g, (txt) => {
                  return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
                })}{" "}
              Account
            </h6>
            <p
              className="text-center text-lg-left"
              style={{
                fontFamily: "Poppins, sans-serif",
                color: "#ef233c",
              }}
            >
              <strong>
                Balance:{" "}
                {utils
                  .convertBeddowsToLSK(this.props.profile.data.balance)
                  .toString()}{" "}
                CLNC
              </strong>
            </p>
            <div
              className="row d-flex justify-content-center justify-content-lg-start"
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              {summary}
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="btn rounded-0"
            id="opened-dispute-tab"
            type="button"
            style={{
              paddingRight: "32px",
              paddingLeft: "32px",
              color: "rgb(0,0,0)",
              backgroundColor: "rgb(255,255,255)",
              position: "relative",
              bottom: this.state.index === 0 ? "-1px" : "0px",
              border: this.state.index === 0 ? "1px solid #dee2e6" : "0",
              borderWidth: this.state.index === 0 ? "1px 1px 0px" : "1px",
              fontWeight: this.state.index === 0 ? "900" : "normal",
            }}
            onClick={() =>
              this.setState({
                index: 0,
              })
            }
          >
            Projects
          </button>
          <button
            className="btn rounded-0"
            id="opened-dispute-tab"
            type="button"
            style={{
              paddingRight: "32px",
              paddingLeft: "32px",
              color: "rgb(0,0,0)",
              backgroundColor: "rgb(255,255,255)",
              position: "relative",
              bottom: this.state.index === 1 ? "-1px" : "0px",
              border: this.state.index === 1 ? "1px solid #dee2e6" : "0",
              borderWidth: this.state.index === 1 ? "1px 1px 0px" : "1px",
              fontWeight: this.state.index === 1 ? "900" : "normal",
            }}
            onClick={() =>
              this.setState({
                index: 1,
              })
            }
          >
            Owned Files
          </button>
          <button
            className="btn rounded-0"
            id="closed-dispute-tab"
            type="button"
            style={{
              paddingRight: "32px",
              paddingLeft: "32px",
              color: "rgb(0,0,0)",
              backgroundColor: "rgb(255,255,255)",
              position: "relative",
              bottom: this.state.index === 2 ? "-1px" : "0px",
              border: this.state.index === 2 ? "1px solid #dee2e6" : "0",
              borderWidth: this.state.index === 2 ? "1px 1px 0px" : "1px",
              fontWeight: this.state.index === 2 ? "900" : "normal",
            }}
            onClick={() =>
              this.setState((state) => ({
                ...state,
                index: 2,
              }))
            }
          >
            Balance Changes
          </button>
        </div>
        <div>{tab}</div>
      </div>
    );
  }
}

export default withRouter(WorkerProfile);
