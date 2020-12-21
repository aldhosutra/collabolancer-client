import React from "react";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import { finishWork } from "../../utils/transaction";
import refuseLogo from "../../asset/undraw_Notify_re_65on.svg";
import config from "../../config/config.json";

class ProceedRefusalDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
    this.onProceedRefusalFormSubmit = this.onProceedRefusalFormSubmit.bind(
      this
    );
  }

  onProceedRefusalFormSubmit() {
    try {
      finishWork(getSession("secret"), this.props.project.publicKey)
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Refuse successfull, page will be reloaded after " +
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
                "#proceed-refusal-modal-" +
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
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={
            "#proceed-refusal-modal-" +
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
          <strong>Proceed Refusal</strong>
        </button>
        <div>
          <div
            className="modal fade"
            id={
              "proceed-refusal-modal-" +
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
                    alt="Refuse Project"
                    src={refuseLogo}
                  />
                  <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                    <strong>Refuse Project!</strong>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Mark this project as Refused,
                    <br />
                    And Proceed to the Next Step!
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
                      Lets continue to the next step!
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
                              "#proceed-refusal-modal-" +
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
                          this.onProceedRefusalFormSubmit();
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
      </div>
    );
  }
}

export default ProceedRefusalDialog;
