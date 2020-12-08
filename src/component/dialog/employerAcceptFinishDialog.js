import React from "react";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import { finishWork } from "../../utils/transaction";
import EmployerAcceptFinishLogo from "../../asset/undraw_happy_music_g6wc.svg";
import config from "../../config/config.json";

class EmployerAcceptFinishDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
    this.onEmployerAcceptFinishFormSubmit = this.onEmployerAcceptFinishFormSubmit.bind(
      this
    );
  }

  onEmployerAcceptFinishFormSubmit() {
    try {
      finishWork(getSession("secret"), this.props.project.publicKey)
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Finish work successfull, page will be reloaded after " +
                config.block_time / 1000 +
                " seconds!"
            );
            this.setState({
              checked: false,
            });
            window
              .$(
                "#employer-accept-modal-" +
                  this.props.proposal.publicKey +
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
    return (
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={
            "#employer-accept-modal-" +
            this.props.proposal.publicKey +
            "-" +
            this.props.id
          }
          style={{
            paddingRight: "24px",
            paddingLeft: "24px",
            backgroundColor: "#3ad29f",
            marginRight: "10px",
            fontFamily: "Poppins, sans-serif",
            marginBottom: "10px",
            minWidth: "200px",
          }}
        >
          <strong>Accept</strong>
        </button>
        <div
          className="modal fade"
          id={
            "employer-accept-modal-" +
            this.props.proposal.publicKey +
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
                  src={EmployerAcceptFinishLogo}
                />
                <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                  <strong>Accept Work?</strong>
                </h3>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Let's mark this work as accepted,
                  <br />
                  and make everyone happpy!
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
                    I have reviewed the submitted files, and want to accept the
                    submission!
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
                            "#employer-accept-modal-" +
                              this.props.proposal.publicKey +
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
                        backgroundColor: "#3ad29f",
                        marginTop: "auto",
                        marginBottom: "auto",
                        fontFamily: "Poppins, sans-serif",
                        width: "150px",
                      }}
                      disabled={!this.state.checked}
                      onClick={() => {
                        this.onEmployerAcceptFinishFormSubmit();
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
    );
  }
}

export default EmployerAcceptFinishDialog;
