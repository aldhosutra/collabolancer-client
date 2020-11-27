import React from "react";
import WorkItem from "./workItem";
import { renderAvatar } from "../avatar";
import JoinAsTeamDialog from "../dialog/joinAsTeam";

class Team extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
    };
  }

  render() {
    const teamPublicKey = this.props.team === 0 ? 0 : this.props.team.publicKey;
    const teamAvatar =
      this.props.team === 0
        ? ""
        : `url('data:image/svg+xml,${renderAvatar(
            this.props.team.asset.worker,
            250
          )}')`;
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
            data-toggle={this.props.team === 0 ? "modal" : "collapse"}
            aria-expanded="true"
            aria-controls={
              "team-" + this.props.proposal.publicKey + "-" + this.props.id
            }
            href={
              "#team-" + this.props.proposal.publicKey + "-" + this.props.id
            }
            role="button"
            onClick={() => {
              if (this.props.team === 0) {
                return null;
              } else {
                return this.setState({ collapsed: !this.state.collapsed });
              }
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
                <strong>{this.props.role}</strong>
              </p>
            </div>
            <div className="col d-flex justify-content-start details">
              <p
                className="role-address"
                style={{
                  overflowWrap: "break-word",
                  fontFamily: "Poppins, sans-serif",
                  backgroundImage: teamAvatar,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "left",
                  paddingLeft: "50px",
                  marginTop: "auto",
                  marginBottom: "auto",
                  height: "40px",
                  lineHeight: "40px",
                }}
              >
                {teamPublicKey === 0
                  ? "No Team Applied"
                  : this.props.team.asset.worker}
              </p>
            </div>
            <div className="col d-flex justify-content-lg-end details">
              {this.props.team === 0 ? (
                <JoinAsTeamDialog
                  id={this.props.id}
                  account={this.props.account}
                  proposal={this.props.proposal}
                  team={this.props.team}
                  role={this.props.role}
                />
              ) : (
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
                  aria-controls={
                    "team-" +
                    this.props.proposal.publicKey +
                    "-" +
                    this.props.id
                  }
                  href={
                    "#team-" +
                    this.props.proposal.publicKey +
                    "-" +
                    this.props.id
                  }
                  role="button"
                >
                  {this.state.collapsed
                    ? new DOMParser().parseFromString("&#11206;", "text/html")
                        .body.textContent
                    : new DOMParser().parseFromString("X", "text/html").body
                        .textContent}
                </a>
              )}
            </div>
          </div>
          {this.props.team === 0 ? (
            <div></div>
          ) : (
            <div
              id={"team-" + this.props.proposal.publicKey + "-" + this.props.id}
              className="collapse"
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
              <p style={{ fontFamily: "Poppins, sans-serif" }}>
                Team Contract:
              </p>
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
          )}
        </div>
      </div>
    );
  }
}

export default Team;
