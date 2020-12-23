import React from "react";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import { claimPrize } from "../../utils/transaction";
import ClaimLogo from "../../asset/undraw_loading_frh4.svg";
import claimedLogo from "../../asset/undraw_Beer_celebration_cefj.svg";
import config from "../../config/config";
import { STATUS } from "../../transactions/constants";
import * as constants from "@liskhq/lisk-constants";
import Countdown from "react-countdown";

class ClaimDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      available: false,
    };
    this.onClaimFormSubmit = this.onClaimFormSubmit.bind(this);
  }

  componentDidMount() {
    if (
      [
        STATUS.PROJECT.FINISHED,
        STATUS.PROJECT.REFUSED,
        STATUS.PROJECT.TERMINATED,
        STATUS.PROJECT.CANCELLED,
        STATUS.PROJECT.DISPUTE_CLOSED,
      ].includes(this.props.project.asset.status) &&
      Date.now() >
        (constants.EPOCH_TIME_SECONDS +
          this.props.project.asset.canBeClaimedOn) *
          1000
    ) {
      this.setState({
        available: true,
      });
    }
  }

  onClaimFormSubmit(e) {
    try {
      claimPrize(getSession("secret"), this.props.project.publicKey)
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Claim successfull, page will be reloaded after " +
                config.block_time / 1000 +
                " seconds!, click this to cancel auto reload",
              {
                autoClose: config.block_time,
                closeButton: false,
                pauseOnHover: false,
                draggable: false,
                onClick: () => {
                  clearTimeout(reloader);
                },
              }
            );
            window
              .$(
                "#claim-modal-" +
                  this.props.project.publicKey +
                  "-" +
                  this.props.id
              )
              .modal("hide");
            let reloader = setTimeout(() => {
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
    return (
      <div className="w-sm-100">
        <button
          className="btn btn-primary border rounded-0 top-button w-sm-100"
          type="button"
          data-toggle="modal"
          data-target={
            "#claim-modal-" + this.props.project.publicKey + "-" + this.props.id
          }
          style={{
            paddingRight: "24px",
            paddingLeft: "24px",
            backgroundColor: this.state.available ? "#EF233C" : "#2B2D42",
            marginRight: "10px",
            fontFamily: "Poppins, sans-serif",
            marginBottom: "10px",
            minWidth: "200px",
          }}
        >
          <strong>Claim Prize</strong>
        </button>
        {this.state.available ? (
          <div>
            <div
              className="modal fade"
              id={
                "claim-modal-" +
                this.props.project.publicKey +
                "-" +
                this.props.id
              }
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div
                className="modal-dialog modal-dialog-centered modal-md"
                role="document"
              >
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
                      alt="Claim Prize"
                      src={claimedLogo}
                    />
                    <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                      <strong>Yeeeaaayyy!</strong>
                    </h3>
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      Congratulation on finishing this project,
                      <br />
                      Lets Claim the Prize that you deserved so much, and of
                      course, plus the BONUS!
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
                            backgroundColor: "#ef233c",
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontFamily: "Poppins, sans-serif",
                            width: "250px",
                          }}
                          onClick={() => {
                            this.onClaimFormSubmit();
                          }}
                        >
                          <strong>Let's Claim This!</strong>
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
                "claim-modal-" +
                this.props.project.publicKey +
                "-" +
                this.props.id
              }
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div
                className="modal-dialog modal-dialog-centered modal-md"
                role="document"
              >
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
                      alt="Claim Prize"
                      src={ClaimLogo}
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
                      You can't claim the prize yet. To claim the prize, this
                      condition must be met:
                    </p>
                    <ul style={{ textAlign: "justify" }}>
                      <li>
                        Project status must indicate that the work is over,
                        either the project status is: {STATUS.PROJECT.FINISHED},{" "}
                        {STATUS.PROJECT.REFUSED}, {STATUS.PROJECT.TERMINATED},
                        or {STATUS.PROJECT.CANCELLED}
                      </li>
                      <li>
                        All dispute must be closed, so if there was any dispute
                        opened, project status must be:{" "}
                        {STATUS.PROJECT.DISPUTE_CLOSED}
                      </li>
                      <li>The open dispute time limit, must be over</li>
                    </ul>
                    <Countdown
                      date={
                        (constants.EPOCH_TIME_SECONDS +
                          this.props.project.asset.canBeClaimedOn) *
                        1000
                      }
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
                              Open Dispute Time Limit, Over!
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
                                Open Dispute Time Limit, Will be Over in:
                              </p>
                              <p
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                  fontSize: "24px",
                                }}
                              >
                                {days} d : {hours} h : {minutes} m : {seconds} s
                              </p>
                            </div>
                          );
                        }
                      }}
                    />
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
                                "#claim-modal-" +
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

export default ClaimDialog;
