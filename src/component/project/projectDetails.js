import React from "react";
import SubmittedWork from "./submittedWork";
import * as constants from "@liskhq/lisk-constants";
import { STATUS } from "../../transactions/constants";
import Winner from "./winner";
import ProjectContractDetail from "../general/projectContractDetails";
import EmployerCancelDialog from "../dialog/employerCancelDialog";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import LeaderTerminateDialog from "../dialog/leaderTerminateDialog";
const dateFormat = require("dateformat");
const { utils } = require("@liskhq/lisk-transactions");

class ProjectDetails extends React.Component {
  render() {
    let actionButton = "No Action!";
    if (this.props.account) {
      switch (this.props.account.address) {
        case this.props.project.asset.employer:
          actionButton = (
            <EmployerCancelDialog
              id={this.props.id}
              account={this.props.account}
              project={this.props.project}
            />
          );
          break;
        case this.props.project.asset.proposal.filter(
          (item) => item.publicKey === this.props.project.asset.winner
        )[0].asset.leader:
          actionButton = (
            <LeaderTerminateDialog
              id={this.props.id}
              account={this.props.account}
              project={this.props.project}
            />
          );
          break;
        default:
          break;
      }
    }
    return (
      <div>
        <div
          className="border rounded-0"
          style={{ marginTop: "10px", marginBottom: "20px" }}
        />
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
            ) : (
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
                          {days} d : {hours} h : {minutes} m : {seconds} s
                        </p>
                      );
                    }
                  }}
                />
              </div>
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
            <div className="row">
              <div className="col-lg-4 details">
                <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
                  <strong>Action</strong>
                </h5>
              </div>
              <div className="col details">{actionButton}</div>
            </div>
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
