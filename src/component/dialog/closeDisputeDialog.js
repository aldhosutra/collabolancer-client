import React from "react";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import { closeDispute } from "../../utils/transaction";
import CloseDisputeLogo from "../../asset/undraw_agreement_aajr.svg";
import config from "../../config/config";

class CloseDisputeDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
    this.onCloseDisputeFormSubmit = this.onCloseDisputeFormSubmit.bind(this);
  }

  onCloseDisputeFormSubmit() {
    try {
      closeDispute(getSession("secret"), this.props.dispute.publicKey)
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Close Dispute successfull, page will be reloaded after " +
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
            this.setState({
              checked: false,
            });
            window
              .$("#close-dispute-modal-" + this.props.dispute.publicKey)
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
      <div className="d-flex w-sm-100 h-sm-100">
        <button
          className="btn btn-primary border rounded-0 top-button w-sm-100 h-sm-100 fs-sm-12"
          type="button"
          data-toggle="modal"
          data-target={"#close-dispute-modal-" + this.props.dispute.publicKey}
          style={{
            width: "195px",
            backgroundColor: "#ef233c",
            marginTop: "auto",
            marginBottom: "auto",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <strong>Close Dispute Now!</strong>
        </button>
        <div
          className="modal fade"
          id={"close-dispute-modal-" + this.props.dispute.publicKey}
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
                  alt="Close Dispute"
                  src={CloseDisputeLogo}
                />
                <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                  <strong>Close Dispute?</strong>
                </h3>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Whatever the result is the best!,
                  <br />
                  Everything is Clear and Transparent, with help of Blockchain
                  Technology!
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
                    Let's Close This Dispute!
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
                            "#close-dispute-modal-" +
                              this.props.dispute.publicKey
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
                        this.onCloseDisputeFormSubmit();
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

export default CloseDisputeDialog;
