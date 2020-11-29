import React from "react";
import PickWinnerLogo from "../../asset/undraw_selecting_team_8uux.svg";

class ChooseWinnerGuideDialog extends React.PureComponent {
  render() {
    return (
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={"#choose-winner-guide-" + this.props.project.publicKey}
          style={{
            backgroundColor: "rgb(239, 35, 60)",
            minWidth: "40px",
            marginTop: "auto",
            marginBottom: "auto",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <strong>How To Choose Winner?</strong>
        </button>
        <div
          className="modal fade"
          id={"choose-winner-guide-" + this.props.project.publicKey}
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
                  src={PickWinnerLogo}
                />
                <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                  <strong>How To Choose Winner?</strong>
                </h3>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                  }}
                >
                  {
                    "Please read the Pitching from the Proposals, and if something catches your eye, select Hire in the Proposal popup pitching!"
                  }
                </p>
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
                            "#choose-winner-guide-" +
                              this.props.project.publicKey
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
    );
  }
}

export default ChooseWinnerGuideDialog;
