/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withRouter } from "react-router-dom";
import { renderAvatar } from "../avatar";
import MiniCard from "../general/miniCard";
import ProfileProjectWrapper from "./profileProjectWrapper";
import ProfileActivityWrapper from "./profileActivityWrapper";
const { utils } = require("@liskhq/lisk-transactions");

class EmployerProfile extends React.Component {
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
        key="employer-ongoing-project"
        value={this.props.profile.data.asset.ongoing.length}
        label="Ongoing Project"
      />,
      <MiniCard
        key="employer-finished-project"
        value={this.props.profile.data.asset.done.length}
        label="Finished Project"
      />,
      <MiniCard
        key="employer-terminated-project"
        value={this.props.profile.data.asset.terminated.length}
        label="Terminated Project"
      />,
      <MiniCard
        key="employer-guilty-project"
        value={this.props.profile.data.asset.guilty.length}
        label="Is Guilty"
      />,
      <MiniCard
        key="employer-spent"
        value={utils
          .convertBeddowsToLSK(this.props.profile.data.asset.spent)
          .toString()}
        label="CLNC Spent"
      />,
    ];
    const tab = [
      <div
        key={"tab-project"}
        style={{ display: this.state.index === 0 ? "block" : "none" }}
      >
        <ProfileProjectWrapper
          account={this.props.profile ? this.props.profile.data : null}
          order={["ongoing", "done", "terminated", "guilty"]}
          label={["ongoing", "done", "terminated", "guilty"]}
        />
      </div>,
      <div
        key={"tab-activity"}
        style={{ display: this.state.index === 1 ? "block" : "none" }}
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
            <h3
              className="text-center text-lg-left"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <strong>{this.props.profile.data.address}</strong>
            </h3>
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
            id="closed-dispute-tab"
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
              this.setState((state) => ({
                ...state,
                index: 1,
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

export default withRouter(EmployerProfile);
