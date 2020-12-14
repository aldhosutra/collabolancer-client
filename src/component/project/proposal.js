import React from "react";
import { renderAvatar } from "../avatar";
import * as constants from "@liskhq/lisk-constants";
import Pagination from "../general/pagination";
import SoloProposal from "./soloProposal";
import Team from "./team";
import PitchingDialog from "../dialog/pitchingDialog";
import CompactContractCard from "../general/compactContractDetails";
import { MISCELLANEOUS, STATUS } from "../../transactions/constants";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import DescriptionCollapse from "../general/descriptionCollapse";
const { utils } = require("@liskhq/lisk-transactions");
const dateFormat = require("dateformat");

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
    const openPositionString =
      this.props.proposal.asset.status === STATUS.PROPOSAL.APPLIED
        ? "Open Position"
        : "Unfilled Position";
    for (
      let i = (this.state.page - 1) * limit;
      i < (this.state.page - 1) * limit + limit;
      i++
    ) {
      if (i >= this.props.proposal.asset.term.roleList.length) break;
      teamList.push(
        <Team
          key={i}
          id={i}
          prefix={this.props.id}
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
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                  this.props.proposal.asset.leader,
                  250
                )}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "left",
                marginBottom: "1rem",
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
                    ? `${openPositionString}: ${openPosition} Position`
                    : `No ${openPositionString}`
                  : "Solo Proposal"}
              </p>
            </div>
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
          <CompactContractCard contract={this.props.proposal} />
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
              <h6
                style={{
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <strong>Leader Brief</strong>
              </h6>
              <DescriptionCollapse
                description={this.props.proposal.asset.term.brief}
                id={"proposal-description-" + this.props.proposal.publicKey}
                fontSize={14}
              />
              {[STATUS.PROPOSAL.APPLIED, STATUS.PROPOSAL.NOT_SELECTED].includes(
                this.props.proposal.asset.status
              ) ? (
                <div className="row">
                  <div className="col-lg-3 details">
                    <h6
                      style={{
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      <strong>Team Potential Earning</strong>
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
                        utils
                          .BigNum(this.props.proposal.asset.term.commitmentFee)
                          .div(MISCELLANEOUS.TEAM_COMMITMENT_PERCENTAGE)
                          .round()
                          .toString()
                      )}{" "}
                      CLNC
                    </p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
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
                    <strong>Working Time Limit</strong>
                  </h6>
                </div>
                <div className="col details">
                  {this.props.project.asset.status === STATUS.PROJECT.OPEN ? (
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      {this.props.proposal.asset.term.maxTime} Days
                    </p>
                  ) : [
                      STATUS.PROPOSAL.SELECTED,
                      STATUS.PROPOSAL.SUBMITTED,
                      STATUS.PROPOSAL.REQUEST_REVISION,
                    ].includes(this.props.proposal.asset.status) &&
                    [
                      STATUS.PROJECT.WORKING,
                      STATUS.PROJECT.SUBMITTED,
                      STATUS.PROJECT.REQUEST_REVISION,
                    ].includes(this.props.project.asset.status) ? (
                    <div>
                      <Countdown
                        date={
                          this.props.proposal.asset.term.maxTime *
                            86400 *
                            1000 +
                          (constants.EPOCH_TIME_SECONDS +
                            this.props.project.asset.workStarted) *
                            1000
                        }
                        onComplete={() => {
                          toast.warn("Proposal Working Time Limit, is Over!");
                          window.location.reload();
                        }}
                        renderer={({
                          days,
                          hours,
                          minutes,
                          seconds,
                          completed,
                        }) => {
                          if (completed) {
                            var expiredMiliSeconds =
                              this.props.proposal.asset.term.maxTime *
                                86400 *
                                1000 +
                              (constants.EPOCH_TIME_SECONDS +
                                this.props.project.asset.workStarted) *
                                1000;
                            dateFormat(
                              new Date(expiredMiliSeconds),
                              "mmmm dS, yyyy - h:MM:ss TT"
                            );
                            return (
                              <p
                                style={{
                                  fontSize: "14px",
                                  backgroundColor: "rgb(248,0,47)",
                                  display: "inline-block",
                                  minWidth: "80px",
                                  color: "#ffffff",
                                  paddingLeft: "15px",
                                  paddingRight: "15px",
                                  fontWeight: "bold",
                                }}
                              >
                                Expired, at :{" "}
                                {dateFormat(
                                  new Date(expiredMiliSeconds),
                                  "mmmm dS, yyyy - h:MM:ss TT"
                                )}
                              </p>
                            );
                          } else {
                            return (
                              <p
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontSize: "14px",
                                }}
                              >
                                <strong>
                                  {days} d : {hours} h : {minutes} m : {seconds}{" "}
                                  s
                                </strong>
                              </p>
                            );
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      Is no longer the time to work
                    </p>
                  )}
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
