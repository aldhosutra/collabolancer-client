import React from "react";
import { renderAvatar } from "../avatar";
import JoinAsTeamDialog from "../dialog/joinAsTeam";
import { STATUS } from "../../transactions/constants";
import ContributionList from "./contributionList";
import SubmitContributionDialog from "../dialog/submitContribution";
import CompactContractCard from "../general/compactContractDetails";

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
              "team-" +
              this.props.proposal.publicKey +
              "-" +
              this.props.prefix +
              "-" +
              this.props.id
            }
            href={
              "#team-" +
              this.props.proposal.publicKey +
              "-" +
              this.props.prefix +
              "-" +
              this.props.id
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
                  prefix={this.props.prefix}
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
                    this.props.prefix +
                    "-" +
                    this.props.id
                  }
                  href={
                    "#team-" +
                    this.props.proposal.publicKey +
                    "-" +
                    this.props.prefix +
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
              id={
                "team-" +
                this.props.proposal.publicKey +
                "-" +
                this.props.prefix +
                "-" +
                this.props.id
              }
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
                <SubmitContributionDialog
                  id={this.props.id}
                  prefix={this.props.prefix}
                  proposal={this.props.proposal}
                  team={this.props.team}
                  account={this.props.account}
                />
                {[
                  STATUS.PROJECT.FINISHED,
                  STATUS.PROJECT.TERMINATED,
                  STATUS.PROJECT.DISPUTED,
                  STATUS.PROJECT.DISPUTE_CLOSED,
                ].includes(this.props.project.asset.status) &&
                [STATUS.TEAM.REJECTED].includes(
                  this.props.team.asset.status
                ) ? (
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
                    <strong>Open Dispute</strong>
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
              <p style={{ fontFamily: "Poppins, sans-serif" }}>
                <strong>Team Contract:</strong>
              </p>
              <CompactContractCard contract={this.props.team} />
              <div
                className="border rounded-0"
                style={{ marginTop: "10px", marginBottom: "20px" }}
              />
              <ContributionList team={this.props.team} />
              <div style={{ marginTop: "10px", marginBottom: "20px" }} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Team;
