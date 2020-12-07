import React from "react";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import { employerRequestRevision } from "../../utils/transaction";
import EmployerRequestRevisionLogo from "../../asset/undraw_feeling_blue_4b7q.svg";

class EmployerRequestRevisionDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      "form-reason": "",
    };
    this.handleEmployerRequestRevisionFormChange = this.handleEmployerRequestRevisionFormChange.bind(
      this
    );
    this.onEmployerRequestRevisionFormSubmit = this.onEmployerRequestRevisionFormSubmit.bind(
      this
    );
  }

  handleEmployerRequestRevisionFormChange(event) {
    const targetID = event.target.id;
    const targetValue = event.target.value;
    this.setState((state) => {
      return { ...state, [targetID]: targetValue };
    });
  }

  onEmployerRequestRevisionFormSubmit(e) {
    e.preventDefault();
    try {
      employerRequestRevision(
        getSession("secret"),
        this.props.submission,
        this.state["form-reason"]
      )
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Request Revision successfull, changes can be seen after up to 15 seconds, and need reload!"
            );
            this.setState((state) => {
              return {
                ...state,
                "form-reason": "",
              };
            });
            window
              .$(
                "#employer-request-revision-modal-" +
                  this.props.proposal.publicKey +
                  "-" +
                  this.props.id
              )
              .modal("hide");
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
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={
            "#employer-request-revision-modal-" +
            this.props.proposal.publicKey +
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
          <strong>Request Revision</strong>
        </button>
        <div
          className="modal fade"
          id={
            "employer-request-revision-modal-" +
            this.props.proposal.publicKey +
            "-" +
            this.props.id
          }
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content form-elegant">
              <div className="modal-header" style={{ borderBottom: "0 none" }}>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <form
                className="form-inside-input"
                onSubmit={this.onEmployerRequestRevisionFormSubmit}
              >
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
                    src={EmployerRequestRevisionLogo}
                  />
                  <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                    <strong>Request Revision on Submission</strong>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Don't really like the Submitted files?
                    <br />
                    Let's tell the Worker, so it will be fixed!
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
                  <div className="md-form mb-4 text-left">
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="form-reason"
                      style={{ fontWeight: "bold" }}
                    >
                      Reason:
                    </label>
                    <textarea
                      type="text"
                      placeholder="Please describe why you request worker to revise their submission?"
                      id="form-reason"
                      name="form-reason"
                      className="form-control validate"
                      onChange={this.handleEmployerRequestRevisionFormChange}
                      value={this.state["form-reason"]}
                      rows="4"
                      cols="50"
                      required
                    />
                  </div>
                </div>
                <div
                  className="modal-footer mx-5 pt-3 mb-1 form-footer"
                  style={{ borderTop: "0 none" }}
                >
                  <div className="row">
                    <div
                      className="col-auto form-fee"
                      style={{
                        marginRight: "5px",
                        maxWidth: "400px",
                        wordWrap: "break-word",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "right",
                          color: "#8D99AE",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {"Worker Still Have: " +
                          (
                            this.props.project.asset.maxRevision -
                            this.props.project.asset.submission.length
                          ).toString() +
                          "  More Attempt!"}
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          color: "#8D99AE",
                          fontSize: "12px",
                        }}
                      >
                        Proposal and Project contract status will be updated!
                      </div>
                    </div>
                    <div className="col">
                      <input
                        className="btn btn-primary border rounded-0 form-submit"
                        type="submit"
                        style={{
                          backgroundColor: "#2B2D42",
                          width: "200px",
                        }}
                        value="Request Revision"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployerRequestRevisionDialog;
