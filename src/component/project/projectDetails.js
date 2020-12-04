import React from "react";
import SubmittedWork from "./submittedWork";
import * as constants from "@liskhq/lisk-constants";
import { STATUS } from "../../transactions/constants";
import Winner from "./winner";
import ProjectContractDetail from "../general/projectContractDetails";
const dateFormat = require("dateformat");
const { utils } = require("@liskhq/lisk-transactions");

class ProjectDetails extends React.Component {
  render() {
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
            <p style={{ fontFamily: "Poppins, sans-serif" }}>
              {this.props.project.asset.maxTime} Days
            </p>
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
              <div className="col details">
                <button
                  className="btn btn-primary border rounded-0 top-button"
                  type="button"
                  data-toggle="modal"
                  data-target="#modal-1"
                  style={{
                    marginRight: "8px",
                    backgroundColor: "#2B2D42",
                    margin: "auto",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Action Button
                </button>
              </div>
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
