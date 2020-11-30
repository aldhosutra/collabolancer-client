import React from "react";
import { renderAvatar } from "../avatar";
import Pagination from "../general/pagination";
import SoloProposal from "./soloProposal";
import Team from "./team";
import PitchingDialog from "../dialog/pitchingDialog";
const { utils } = require("@liskhq/lisk-transactions");
const parse = require("html-react-parser");

class Proposal extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      page: 1,
      prevPage: 1,
      itemPerPage: 5,
    };
  }

  componentDidUpdate() {
    if (this.state.prevPage !== this.state.page) {
      this.setState((state) => {
        return { ...state, prevPage: state.page };
      });
    }
  }

  render() {
    if (!this.props.proposal) {
      return null;
    }
    const limit = this.state.itemPerPage;
    const pageCount = Math.ceil(
      this.props.proposal.asset.term.roleList.length / limit
    );
    const teamList = [];
    let openPosition = 0;
    for (
      let i = (this.state.page - 1) * limit;
      i < (this.state.page - 1) * limit + limit;
      i++
    ) {
      if (i >= this.props.proposal.asset.term.roleList.length) break;
      teamList.push(
        <Team
          key={`${this.props.id}-${i}`}
          id={`${this.props.id}-${i}`}
          account={this.props.account}
          proposal={this.props.proposal}
          project={this.props.project}
          team={this.props.proposal.asset.team[i]}
          role={this.props.proposal.asset.term.roleList[i]}
        />
      );
    }
    openPosition = this.props.proposal.asset.team.filter((item) => item === 0)
      .length;
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
            className="col details"
            data-toggle="collapse"
            aria-expanded="false"
            aria-controls={
              "proposal-" + this.props.proposal.publicKey + "-" + this.props.id
            }
            href={
              "#proposal-" + this.props.proposal.publicKey + "-" + this.props.id
            }
            role="button"
            onClick={() => {
              return this.setState({ collapsed: !this.state.collapsed });
            }}
          >
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                  this.props.proposal.asset.leader,
                  250
                )}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "left",
                paddingLeft: "50px",
                height: "40px",
              }}
            >
              <strong style={{ lineHeight: "25px" }}>
                {this.props.proposal.asset.leader}
              </strong>
              <p style={{ lineHeight: "15px", fontSize: "14px" }}>
                {teamList.length > 0
                  ? openPosition > 0
                    ? `Open Position: ${openPosition} Position`
                    : "No Open Position"
                  : "Solo Proposal"}
              </p>
            </p>
          </div>
          <div className="col-auto d-flex justify-content-center justify-content-lg-center details">
            <PitchingDialog
              project={this.props.project}
              proposal={this.props.proposal}
              account={this.props.account}
            />
            <a
              className="btn btn-primary border rounded-0 top-button"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls={
                "proposal-" +
                this.props.proposal.publicKey +
                "-" +
                this.props.id
              }
              role="button"
              href={
                "#proposal-" +
                this.props.proposal.publicKey +
                "-" +
                this.props.id
              }
              style={{
                backgroundColor: "rgb(239, 35, 60)",
                margin: "auto",
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
          className="border rounded-0 collapse"
          id={"proposal-" + this.props.proposal.publicKey + "-" + this.props.id}
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
              marginBottom: "20px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <strong>Proposal Contract</strong>
          </h4>
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
                <strong>
                  {this.props.proposal.asset.status
                    .replaceAll("-", " ")
                    .replace(/\w\S*/g, (txt) => {
                      return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                      );
                    })}
                </strong>
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
                <strong>Proposal Fund Pool</strong>
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
                <strong>
                  {utils.convertBeddowsToLSK(
                    this.props.proposal.asset.freezedFund
                  )}{" "}
                  CLNC
                </strong>
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
                <strong>Proposal Fee Pool</strong>
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
                <strong>
                  {utils.convertBeddowsToLSK(
                    this.props.proposal.asset.freezedFee
                  )}{" "}
                  CLNC
                </strong>
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
                <strong>Proposal Bonus Pool</strong>
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
                <strong>
                  {utils.convertBeddowsToLSK(
                    this.props.proposal.asset.cashback
                  )}{" "}
                  CLNC
                </strong>
              </p>
            </div>
          </div>
          <div
            className="border rounded-0"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          />
          {this.props.proposal.asset.term.roleList.length > 0 ? (
            <div>
              <h4
                style={{
                  marginBottom: "20px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <strong>Collaboration Provisions</strong>
              </h4>
              <div className="row">
                <div className="col-lg-3 details">
                  <h6
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <strong>Leader Brief</strong>
                  </h6>
                </div>
                <div className="col details">
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      overflowWrap: "break-word",
                    }}
                  >
                    {parse(this.props.proposal.asset.term.brief)}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 details">
                  <h6
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <strong>Potential Earning</strong>
                  </h6>
                </div>
                <div className="col details">
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {utils.convertBeddowsToLSK(
                      this.props.proposal.asset.potentialEarning
                    )}{" "}
                    CLNC
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 details">
                  <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                    <strong>Required Locked Fee</strong>
                  </h6>
                </div>
                <div className="col details">
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {utils.convertBeddowsToLSK(
                      this.props.proposal.asset.term.commitmentFee
                    )}{" "}
                    CLNC
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 details">
                  <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                    <strong>Working TIme Limit</strong>
                  </h6>
                </div>
                <div className="col details">
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {this.props.proposal.asset.term.maxTime} Days
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 details">
                  <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                    <strong>Maximum Revision</strong>
                  </h6>
                </div>
                <div className="col details">
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {this.props.proposal.asset.term.maxRevision} Times
                  </p>
                </div>
              </div>
              <div
                className="border rounded-0"
                style={{ marginTop: "10px", marginBottom: "20px" }}
              />
              <h4
                style={{
                  fontFamily: "Poppins, sans-serif",
                  marginBottom: "20px",
                }}
              >
                <strong>Team Composition:</strong>
              </h4>
              {teamList}
              {this.props.proposal.asset.term.roleList.length >
              this.state.itemPerPage ? (
                <div style={{ marginTop: "16px" }}>
                  <Pagination
                    currentPage={this.state.page}
                    totalCount={pageCount}
                    callback={(selected) => {
                      this.setState((state) => {
                        return { ...state, page: selected };
                      });
                    }}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <SoloProposal />
          )}
        </div>
      </div>
    );
  }
}

export default Proposal;
