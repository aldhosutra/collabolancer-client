import React from "react";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import { cancelWork } from "../../utils/transaction";
import EmployerCancelLogo from "../../asset/undraw_loading_frh4.svg";
import cancelLogo from "../../asset/undraw_Notify_re_65on.svg";
import config from "../../config/config";
import { STATUS } from "../../transactions/constants";
import * as constants from "@liskhq/lisk-constants";
import Countdown from "react-countdown";

class EmployerCancelDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      available: false,
    };
    this.onEmployerCancelFormSubmit = this.onEmployerCancelFormSubmit.bind(
      this
    );
  }

  componentDidMount() {
    if (
      [STATUS.PROJECT.REQUEST_REVISION, STATUS.PROJECT.WORKING].includes(
        this.props.project.asset.status
      ) &&
      Date.now() >
        this.props.project.asset.maxTime * 86400 * 1000 +
          (constants.EPOCH_TIME_SECONDS +
            this.props.project.asset.workStarted) *
            1000
    ) {
      this.setState({
        available: true,
      });
    }
  }

  onEmployerCancelFormSubmit(e) {
    try {
      cancelWork(getSession("secret"), this.props.project.publicKey)
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Cancel successfull, page will be reloaded after " +
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
                "#employer-cancel-modal-" +
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
            "#employer-cancel-modal-" +
            this.props.project.publicKey +
            "-" +
            this.props.id
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
          <strong>Cancel Project</strong>
        </button>
        {this.state.available ? (
          <div>
            <div
              className="modal fade"
              id={
                "employer-cancel-modal-" +
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
                      alt="Cancel Project"
                      src={cancelLogo}
                    />
                    <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                      <strong>Cancel Project?</strong>
                    </h3>
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      Looks like the worker is not doing his job,
                      <br />
                      You can cancel the project, and get your money back!
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
                        I seriously decide to cancel the project!
                      </label>
                    </div>
                  </div>
                  <div
                    className="modal-footer mx-lg-5 pt-3 mb-1"
                    style={{ borderTop: "0 none", justifyContent: "center" }}
                  >
                    <div style={{ width: "100%" }}>
                      <div className="text-center">
                        <button
                          className="btn btn-primary border rounded-0 top-button"
                          style={{
                            backgroundColor: "#2B2D42",
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontFamily: "Poppins, sans-serif",
                            width: "50%",
                          }}
                          onClick={() => {
                            window
                              .$(
                                "#employer-cancel-modal-" +
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
                            width: "50%",
                          }}
                          disabled={!this.state.checked}
                          onClick={() => {
                            this.onEmployerCancelFormSubmit();
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
                "employer-cancel-modal-" +
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
                      alt="Cancel Project"
                      src={EmployerCancelLogo}
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
                      You can't cancel the project yet. To cancel the project,
                      this condition must be met:
                    </p>
                    <ul style={{ textAlign: "justify" }}>
                      <li>
                        Your worker status must be indicating that they aren't
                        finishing the work, either the project status is{" "}
                        {STATUS.PROJECT.WORKING}, or{" "}
                        {STATUS.PROJECT.REQUEST_REVISION}
                      </li>
                      <li>Workers are past the specified work deadline</li>
                    </ul>
                    {[
                      STATUS.PROJECT.WORKING,
                      STATUS.PROJECT.REQUEST_REVISION,
                    ].includes(this.props.project.asset.status) ? (
                      <Countdown
                        date={
                          this.props.project.asset.maxTime * 86400 * 1000 +
                          (constants.EPOCH_TIME_SECONDS +
                            this.props.project.asset.workStarted) *
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
                                Working time limit, Over!
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
                                  Worker still have time:
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
                      <div>
                        <h6
                          className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center"
                          style={{ color: "#EF233C" }}
                        >
                          <strong>
                            Worker have submit the work, please make decision!
                          </strong>
                        </h6>
                      </div>
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
                                "#employer-cancel-modal-" +
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

export default EmployerCancelDialog;
