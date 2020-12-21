import React from "react";
import { renderAvatar } from "../avatar";
import JoinAsTeamDialog from "../dialog/joinAsTeam";
import ContributionList from "./contributionList";
import SubmitContributionDialog from "../dialog/submitContribution";
import CompactContractDetail from "../general/compactContractDetails";
import TeamDisputeDialog from "../dialog/teamDispute";
import StatusNoteDialog from "../dialog/statusNoteDialog";
import { profileParser } from "../../utils/tools";

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
                  : profileParser(this.props.team.asset.worker)}
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
                <TeamDisputeDialog
                  team={this.props.team}
                  project={this.props.project}
                  proposal={this.props.proposal}
                  account={this.props.account}
                />
              </div>
              <p style={{ fontFamily: "Poppins, sans-serif" }}>
                <strong>Team Contract:</strong>
              </p>
              {this.props.team.asset.forceReject ? (
                <div style={{ marginBottom: "16px" }}>
                  <button
                    className="btn btn-primary border rounded-0 top-button"
                    type="button"
                    data-toggle="modal"
                    data-target={
                      "#team-force-reject" + this.props.team.publicKey
                    }
                    style={{
                      backgroundColor: "#ef233c",
                      color: "rgb(255,255,255)",
                      fontWeight: "bold",
                      fontSize: "14px",
                      padding: "10px",
                    }}
                  >
                    FORCE REJECTED: Since The Leader Has Been Rejected, So This
                    Team Contract Status Has Also Been Force Rejected, Click
                    Here For Details!
                  </button>
                  <StatusNoteDialog
                    id={"team-force-reject" + this.props.team.publicKey}
                    note={
                      this.props.team.asset.statusNote.filter(
                        (item) => item.contribution === "forceReject"
                      )[0]
                    }
                  />
                </div>
              ) : (
                <div></div>
              )}
              <CompactContractDetail contract={this.props.team} />
              <div
                className="border rounded-0"
                style={{ marginTop: "10px", marginBottom: "20px" }}
              />
              <ContributionList
                team={this.props.team}
                maxTime={this.props.project.asset.maxTime}
                workStarted={this.props.project.asset.workStarted}
                proposal={this.props.proposal}
                account={this.props.account}
              />
              <div style={{ marginTop: "10px", marginBottom: "20px" }} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Team;
