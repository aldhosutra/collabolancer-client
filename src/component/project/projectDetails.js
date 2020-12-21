import React from "react";
import SubmittedWork from "../proposal/submittedWork";
import * as constants from "@liskhq/lisk-constants";
import { STATUS } from "../../transactions/constants";
import Winner from "./winner";
import ProjectContractDetail from "./projectContractDetails";
import EmployerCancelDialog from "../dialog/employerCancelDialog";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import LeaderTerminateDialog from "../dialog/leaderTerminateDialog";
import ClaimDialog from "../dialog/claimDialog";
import DisputeList from "../dispute/disputeList";
import ProceedRefusalDialog from "../dialog/proceedRefusalDialog";
import ProjectActivityDialog from "../dialog/projectActivityDialog";
const dateFormat = require("dateformat");
const { utils } = require("@liskhq/lisk-transactions");

class ProjectDetails extends React.Component {
  render() {
    let actionButton = "No Action!";
    const proposal = this.props.project.asset.proposal.filter(
      (item) => item.publicKey === this.props.project.asset.winner
    )[0];
    const claimReady = [
      STATUS.PROJECT.FINISHED,
      STATUS.PROJECT.REFUSED,
      STATUS.PROJECT.TERMINATED,
      STATUS.PROJECT.CANCELLED,
      STATUS.PROJECT.DISPUTE_CLOSED,
    ].includes(this.props.project.asset.status);
    const claimButton = (
      <ClaimDialog
        id={this.props.id}
        account={this.props.account}
        project={this.props.project}
      />
    );
    if (this.props.account && proposal) {
      switch (this.props.account.address) {
        case this.props.project.asset.employer:
          actionButton = claimReady ? (
            claimButton
          ) : [
              STATUS.PROJECT.REQUEST_REVISION,
              STATUS.PROJECT.SUBMITTED,
              STATUS.PROJECT.WORKING,
            ].includes(this.props.project.asset.status) ? (
            <EmployerCancelDialog
              id={this.props.id}
              account={this.props.account}
              project={this.props.project}
            />
          ) : [STATUS.PROJECT.REJECTED].includes(
              this.props.project.asset.status
            ) ? (
            <ProceedRefusalDialog
              id={this.props.id}
              account={this.props.account}
              project={this.props.project}
            />
          ) : (
            actionButton
          );
          break;
        case proposal.asset.leader:
          actionButton = claimReady ? (
            claimButton
          ) : [STATUS.PROJECT.SUBMITTED].includes(
              this.props.project.asset.status
            ) ? (
            <LeaderTerminateDialog
              id={this.props.id}
              account={this.props.account}
              project={this.props.project}
            />
          ) : [STATUS.PROJECT.REJECTED].includes(
              this.props.project.asset.status
            ) ? (
            <ProceedRefusalDialog
              id={this.props.id}
              account={this.props.account}
              project={this.props.project}
            />
          ) : (
            actionButton
          );
          break;
        default:
          if (
            proposal.asset.team
              .filter((item) => item !== 0)
              .map((item) => item.asset.worker)
              .includes(this.props.account.address)
          ) {
            actionButton = claimReady ? (
              claimButton
            ) : [STATUS.PROJECT.REJECTED].includes(
                this.props.project.asset.status
              ) ? (
              <ProceedRefusalDialog
                id={this.props.id}
                account={this.props.account}
                project={this.props.project}
              />
            ) : (
              actionButton
            );
          }
          break;
      }
    }
    return (
      <div>
        <div className="border rounded-0" style={{ marginBottom: "20px" }} />
        <h5 style={{ fontFamily: "Poppins, sans-serif", marginBottom: "16px" }}>
          <strong>Project Contract:</strong>
        </h5>
        <ProjectContractDetail contract={this.props.project} />
        <div className="row">
          <div className="col-lg-4 details">
            <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
              <strong>Project ID</strong>
            </h5>
          </div>
          <div className="col details">
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                overflowWrap: "break-word",
              }}
            >
              {this.props.project.publicKey}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 details">
            <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
              <strong>Project Activity</strong>
            </h5>
          </div>
          <div className="col details">
            <div
              className="d-flex"
              style={{
                fontFamily: "Poppins, sans-serif",
                overflowWrap: "break-word",
                marginBottom: "1rem",
              }}
            >
              <div>{this.props.project.asset.activity.length} Activity</div>
              <ProjectActivityDialog project={this.props.project} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 details">
            <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
              <strong>Prize</strong>
            </h5>
          </div>
          <div className="col details">
            <p style={{ fontFamily: "Poppins, sans-serif" }}>
              {utils.convertBeddowsToLSK(this.props.project.asset.prize)} CLNC
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 details">
            <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
              <strong>Required Commitment Fee</strong>
            </h5>
          </div>
          <div className="col details">
            <p style={{ fontFamily: "Poppins, sans-serif" }}>
              {utils.convertBeddowsToLSK(
                this.props.project.asset.commitmentFee
              )}{" "}
              CLNC
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 details">
            <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
              <strong>Category</strong>
            </h5>
          </div>
          <div className="col details">
            <p style={{ fontFamily: "Poppins, sans-serif" }}>
              {this.props.project.asset.category
                .replaceAll("-", " ")
                .replace(/\w\S*/g, (txt) => {
                  return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
                })}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 details">
            <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
              <strong>Working Time Limit</strong>
            </h5>
          </div>
          <div className="col details">
            {this.props.project.asset.status === STATUS.PROJECT.OPEN ? (
              <p style={{ fontFamily: "Poppins, sans-serif" }}>
                {this.props.project.asset.maxTime} Days
              </p>
            ) : [
                STATUS.PROJECT.WORKING,
                STATUS.PROJECT.SUBMITTED,
                STATUS.PROJECT.REQUEST_REVISION,
              ].includes(this.props.project.asset.status) ? (
              <div>
                <Countdown
                  date={
                    this.props.project.asset.maxTime * 86400 * 1000 +
                    (constants.EPOCH_TIME_SECONDS +
                      this.props.project.asset.workStarted) *
                      1000
                  }
                  onComplete={() => {
                    toast.warn("Project Working Time Limit, is Over!");
                    window.location.reload();
                  }}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                      var expiredMiliSeconds =
                        this.props.project.asset.maxTime * 86400 * 1000 +
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
                          }}
                        >
                          <strong>
                            {days} d : {hours} h : {minutes} m : {seconds} s
                          </strong>
                        </p>
                      );
                    }
                  }}
                />
              </div>
            ) : (
              <p style={{ fontFamily: "Poppins, sans-serif" }}>
                Is no longer the time to work
              </p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 details">
            <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
              <strong>Maximum Revision</strong>
            </h5>
          </div>
          <div className="col details">
            <p style={{ fontFamily: "Poppins, sans-serif" }}>
              {this.props.project.asset.maxRevision} Time
            </p>
          </div>
        </div>
        {this.props.project.asset.status === STATUS.PROJECT.OPEN ? (
          <div></div>
        ) : (
          <div>
            <div className="row">
              <div className="col-lg-4 details">
                <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
                  <strong>Work Started</strong>
                </h5>
              </div>
              <div className="col details">
                <p style={{ fontFamily: "Poppins, sans-serif" }}>
                  {dateFormat(
                    new Date(
                      (constants.EPOCH_TIME_SECONDS +
                        this.props.project.asset.workStarted) *
                        1000
                    ),
                    "mmmm dS, yyyy - h:MM:ss TT"
                  )}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 details">
                <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
                  <strong>Work Finished</strong>
                </h5>
              </div>
              <div className="col details">
                <p style={{ fontFamily: "Poppins, sans-serif" }}>
                  {![
                    STATUS.PROJECT.WORKING,
                    STATUS.PROJECT.SUBMITTED,
                    STATUS.PROJECT.REQUEST_REVISION,
                    STATUS.PROJECT.REJECTED,
                  ].includes(this.props.project.asset.status)
                    ? dateFormat(
                        new Date(
                          (constants.EPOCH_TIME_SECONDS +
                            this.props.project.asset.workFinished) *
                            1000
                        ),
                        "mmmm dS, yyyy - h:MM:ss TT"
                      )
                    : "No Data!"}
                </p>
              </div>
            </div>
            {[
              STATUS.PROJECT.FINISHED,
              STATUS.PROJECT.REFUSED,
              STATUS.PROJECT.TERMINATED,
              STATUS.PROJECT.DISPUTED,
              STATUS.PROJECT.DISPUTE_CLOSED,
            ].includes(this.props.project.asset.status) ? (
              <div className="row">
                <div className="col-lg-4 details">
                  <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
                    <strong>Open Dispute Time Limit</strong>
                  </h5>
                </div>
                <div className="col details">
                  <div>
                    <Countdown
                      date={
                        (constants.EPOCH_TIME_SECONDS +
                          this.props.project.asset.canBeClaimedOn) *
                        1000
                      }
                      onComplete={() => {
                        toast.warn("Open Dispute Time Limit, is Over!");
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
                            this.props.project.asset.maxTime * 86400 * 1000 +
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
                              }}
                            >
                              <strong>
                                {days} d : {hours} h : {minutes} m : {seconds} s
                              </strong>
                            </p>
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div className="row">
              <div className="col-lg-4 details">
                <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
                  <strong>Action</strong>
                </h5>
              </div>
              <div className="col details">{actionButton}</div>
            </div>
            <DisputeList
              project={this.props.project}
              account={this.props.account}
            />
            <SubmittedWork
              project={this.props.project}
              proposal={
                this.props.project.asset.proposal.filter(
                  (item) => item.publicKey === this.props.project.asset.winner
                )[0]
              }
              account={this.props.account}
            />
            <Winner project={this.props.project} account={this.props.account} />
          </div>
        )}
      </div>
    );
  }
}

export default ProjectDetails;
