import React from "react";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import { terminateWork } from "../../utils/transaction";
import LeaderTerminateLogo from "../../asset/undraw_loading_frh4.svg";
import terminatedLogo from "../../asset/undraw_warning_cyit.svg";
import config from "../../config/config.json";
import { MISCELLANEOUS, STATUS } from "../../transactions/constants";
import * as constants from "@liskhq/lisk-constants";
import Countdown from "react-countdown";

class LeaderTerminateDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      available: false,
    };
    this.onLeaderTerminateFormSubmit = this.onLeaderTerminateFormSubmit.bind(
      this
    );
  }

  onLeaderTerminateFormSubmit(e) {
    try {
      terminateWork(getSession("secret"), this.props.project.publicKey)
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Terminate project successfull, page will be reloaded after " +
                config.block_time / 1000 +
                " seconds!"
            );
            window
              .$(
                "#leader-terminate-modal-" +
                  this.props.project.publicKey +
                  "-" +
                  this.props.id
              )
              .modal("hide");
            setTimeout(() => {
              window.location.reload();
            }, config.block_time);
          } else {
            toast.error(
              data.message +
                ": " +
                data.errors.map((err) => err.message).toString()
            );
          }
        })
        .catch((err) => {
          toast.error(`Error: ${err.message}`);
        });
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  }

  render() {
    const proposal = this.props.project.asset.proposal.filter(
      (item) => item.publicKey === this.props.project.asset.winner
    )[0];
    const projectMaxTIme =
      this.props.project.asset.maxTime * 86400 * 1000 +
      (constants.EPOCH_TIME_SECONDS + this.props.project.asset.workStarted) *
        1000;
    const lastTimePlusMinPeriod =
      (constants.EPOCH_TIME_SECONDS +
        proposal.asset.lastSubmitted +
        MISCELLANEOUS.SUBMIT_TO_TERMINATE_MIN_PERIOD) *
      1000;
    if (
      !this.props.account ||
      this.props.account.address !== proposal.asset.leader
    ) {
      return null;
    }
    if (
      [STATUS.PROJECT.SUBMITTED].includes(
        this.props.project.asset.status &&
          Date.now() < projectMaxTIme &&
          Date.now() < lastTimePlusMinPeriod
      )
    ) {
      this.setState({
        available: true,
      });
    }
    return (
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={
            "#leader-terminate-modal-" +
            this.props.project.publicKey +
            "-" +
            this.props.id
          }
          style={{
            paddingRight: "24px",
            paddingLeft: "24px",
            backgroundColor: "#EF233C",
            marginRight: "10px",
            fontFamily: "Poppins, sans-serif",
            marginBottom: "10px",
            minWidth: "200px",
          }}
        >
          <strong>Terminate Project</strong>
        </button>
        {this.state.available ? (
          <div>
            <div
              className="modal fade"
              id={
                "leader-terminate-modal-" +
                this.props.project.publicKey +
                "-" +
                this.props.id
              }
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div className="modal-dialog modal-md" role="document">
                <div className="modal-content form-elegant">
                  <div
                    className="modal-header"
                    style={{ borderBottom: "0 none" }}
                  >
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body mx-4">
                    <img
                      role="status"
                      style={{
                        width: "180px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "16px",
                        display: "block",
                      }}
                      alt="Solo Proposal"
                      src={terminatedLogo}
                    />
                    <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                      <strong>Terminate Project?</strong>
                    </h3>
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      Looks like the employer still not mark your submission as
                      accepted,
                      <br />
                      You can terminate the project, and get your deserved
                      prize!
                    </p>
                    <div
                      className="border rounded-0"
                      style={{
                        marginTop: "10px",
                        marginBottom: "20px",
                        marginRight: "auto",
                        marginLeft: "auto",
                        width: "100px",
                      }}
                    />
                    <div
                      className="form-check text-left"
                      style={{ marginTop: "16px" }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="formCheck-1"
                        onChange={(event) =>
                          this.setState({
                            checked: event.target.checked,
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="formCheck-1">
                        I seriously decide to terminate the project!
                      </label>
                    </div>
                  </div>
                  <div
                    className="modal-footer mx-5 pt-3 mb-1"
                    style={{ borderTop: "0 none", justifyContent: "center" }}
                  >
                    <div className="row">
                      <div className="col">
                        <button
                          className="btn btn-primary border rounded-0 top-button"
                          style={{
                            backgroundColor: "#2B2D42",
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontFamily: "Poppins, sans-serif",
                            width: "150px",
                          }}
                          onClick={() => {
                            window
                              .$(
                                "#leader-terminate-modal-" +
                                  this.props.project.publicKey +
                                  "-" +
                                  this.props.id
                              )
                              .modal("hide");
                          }}
                        >
                          <strong>No</strong>
                        </button>
                        <button
                          className="btn btn-primary border rounded-0 top-button"
                          style={{
                            backgroundColor: "#ef233c",
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontFamily: "Poppins, sans-serif",
                            width: "150px",
                          }}
                          disabled={!this.state.checked}
                          onClick={() => {
                            this.onLeaderTerminateFormSubmit();
                          }}
                        >
                          <strong>Yes</strong>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="modal fade"
              id={
                "leader-terminate-modal-" +
                this.props.project.publicKey +
                "-" +
                this.props.id
              }
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div className="modal-dialog modal-md" role="document">
                <div className="modal-content form-elegant">
                  <div
                    className="modal-header text-center"
                    style={{ borderBottom: "0 none" }}
                  >
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div
                    className="modal-body mx-4"
                    style={{ paddingBottom: "0px" }}
                  >
                    <img
                      role="status"
                      style={{
                        width: "180px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "16px",
                        display: "block",
                      }}
                      alt="Solo Proposal"
                      src={LeaderTerminateLogo}
                    />
                    <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                      <strong>Hold On!</strong>
                    </h3>
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "justify",
                        marginBottom: "8px",
                      }}
                    >
                      You can't terminate the project yet. To terminate the
                      project, this condition must be met:
                    </p>
                    <ul style={{ textAlign: "justify" }}>
                      <li>You must first submit your work / revision,</li>
                      <li>
                        wait for working time limit to finish, or wait for the
                        last time you submit your files plus:{" "}
                        {(
                          MISCELLANEOUS.SUBMIT_TO_TERMINATE_MIN_PERIOD /
                          60 /
                          60 /
                          24
                        ).toString()}{" "}
                        days! (Whichever one is later)
                      </li>
                    </ul>
                    {proposal.asset.status === STATUS.PROPOSAL.SUBMITTED ? (
                      <Countdown
                        date={Math.max(lastTimePlusMinPeriod, projectMaxTIme)}
                        onComplete={() => {
                          this.setState({
                            available: true,
                          });
                        }}
                        renderer={({
                          days,
                          hours,
                          minutes,
                          seconds,
                          completed,
                        }) => {
                          if (completed) {
                            return (
                              <span
                                style={{
                                  backgroundColor: "rgb(248,0,47)",
                                  display: "inline-block",
                                  minWidth: "80px",
                                  color: "#ffffff",
                                  marginLeft: "10px",
                                  paddingLeft: "15px",
                                  paddingRight: "15px",
                                  fontWeight: "bold",
                                }}
                              >
                                Expired!
                              </span>
                            );
                          } else {
                            return (
                              <div>
                                <p
                                  style={{
                                    fontFamily: "Poppins, sans-serif",
                                    textAlign: "center",
                                  }}
                                >
                                  You need to wait:
                                </p>
                                <p
                                  style={{
                                    fontFamily: "Poppins, sans-serif",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: "24px",
                                  }}
                                >
                                  {days} d : {hours} h : {minutes} m : {seconds}{" "}
                                  s
                                </p>
                              </div>
                            );
                          }
                        }}
                      />
                    ) : (
                      <h6
                        className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center"
                        style={{ color: "#EF233C" }}
                      >
                        <strong>You haven't Submit your Work!</strong>
                      </h6>
                    )}
                  </div>
                  <div
                    className="modal-footer mx-5 pt-3 mb-1"
                    style={{ borderTop: "0 none", justifyContent: "center" }}
                  >
                    <div className="row">
                      <div className="col">
                        <button
                          className="btn btn-primary border rounded-0 top-button"
                          style={{
                            backgroundColor: "rgb(239, 35, 60)",
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontFamily: "Poppins, sans-serif",
                            width: "150px",
                          }}
                          onClick={() => {
                            window
                              .$(
                                "#leader-terminate-modal-" +
                                  this.props.project.publicKey +
                                  "-" +
                                  this.props.id
                              )
                              .modal("hide");
                          }}
                        >
                          <strong>OK</strong>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LeaderTerminateDialog;
