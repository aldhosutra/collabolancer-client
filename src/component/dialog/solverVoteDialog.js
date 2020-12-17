import React from "react";
import { ACCOUNT, STATUS } from "../../transactions/constants";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import { voteDispute } from "../../utils/transaction";
import SolverVoteLogo from "../../asset/undraw_voting_nvu7.svg";
import config from "../../config/config.json";
import "./modal.css";
import { renderAvatar } from "../avatar";
const { utils } = require("@liskhq/lisk-transactions");

class SolverVoteDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      voteFor: null,
    };
    this.onSolverVoteFormSubmit = this.onSolverVoteFormSubmit.bind(this);
  }

  onSolverVoteFormSubmit() {
    try {
      voteDispute(
        getSession("secret"),
        this.props.dispute.publicKey,
        this.state.voteFor
      )
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Cast Vote successfull, page will be reloaded after " +
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
            this.setState((state) => {
              return {
                ...state,
                checked: false,
                voteFor: null,
              };
            });
            window
              .$("#solver-vote-" + this.props.dispute.publicKey)
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
    if (
      this.props.dispute.asset.status !== STATUS.DISPUTE.OPEN ||
      this.props.dispute.asset.vote.litigant.indexOf(
        this.props.account.publicKey
      ) !== -1 ||
      this.props.dispute.asset.vote.defendant.indexOf(
        this.props.account.publicKey
      ) !== -1 ||
      this.props.account.asset.type !== ACCOUNT.SOLVER
    ) {
      return null;
    }
    return (
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={"#solver-vote-" + this.props.dispute.publicKey}
          style={{
            backgroundColor: "rgb(239, 35, 60)",
            minWidth: "200px",
            marginTop: "auto",
            marginBottom: "auto",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <strong>Cast Vote</strong>
        </button>
        <div
          className="modal full fade"
          id={"solver-vote-" + this.props.dispute.publicKey}
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content form-elegant">
              <div
                className="modal-header text-center"
                style={{ borderBottom: "0 none" }}
              >
                <div className="container">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
              <div className="modal-body mx-4">
                <div className="container">
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
                    src={SolverVoteLogo}
                  />
                  <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                    <strong>Cast Vote</strong>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Beyond Democracy, Your voice will help to solve this
                    dispute!
                  </p>
                  <div
                    className="border rounded-0 text-center"
                    style={{
                      marginTop: "10px",
                      marginBottom: "20px",
                      marginRight: "auto",
                      marginLeft: "auto",
                      width: "100px",
                    }}
                  />
                  <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                    <strong>
                      Select the party that you think is righteous:
                    </strong>
                  </h6>
                  <div className="row" style={{ marginBottom: "16px" }}>
                    <div className="col">
                      <button
                        className="btn btn-primary border rounded-0 top-button"
                        style={{
                          color:
                            this.state.voteFor === "litigant"
                              ? "white"
                              : "black",
                          marginBottom: "0px",
                          overflowWrap: "break-word",
                          backgroundColor:
                            this.state.voteFor === "litigant"
                              ? "#ef233c"
                              : "white",
                          width: "100%",
                          textAlign: "left",
                          padding: "24px",
                        }}
                        onClick={() => {
                          this.setState((state) => {
                            return {
                              ...state,
                              voteFor: "litigant",
                            };
                          });
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                                this.props.dispute.asset.litigant,
                                250
                              )}')`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "contain",
                              backgroundPosition: "left",
                              paddingLeft: "50px",
                              height: "40px",
                              marginLeft: "auto",
                              marginRight: "auto",
                              width: "fit-content",
                            }}
                          >
                            <strong>{this.props.dispute.asset.litigant}</strong>
                            <p
                              style={{
                                lineHeight: "15px",
                                fontSize: "14px",
                                marginBottom: "0px",
                              }}
                            >
                              Litigant [
                              {this.props.dispute.asset.disputeType
                                .split("-vs-")[0]
                                .replaceAll("-", " ")
                                .replace(/\w\S*/g, (txt) => {
                                  return (
                                    txt.charAt(0).toUpperCase() +
                                    txt.substr(1).toLowerCase()
                                  );
                                })}
                              ]
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-primary border rounded-0 top-button"
                        style={{
                          color:
                            this.state.voteFor === "defendant"
                              ? "white"
                              : "black",
                          marginBottom: "0px",
                          overflowWrap: "break-word",
                          backgroundColor:
                            this.state.voteFor === "defendant"
                              ? "#ef233c"
                              : "white",
                          width: "100%",
                          textAlign: "left",
                          padding: "24px",
                        }}
                        onClick={() => {
                          this.setState((state) => {
                            return {
                              ...state,
                              voteFor: "defendant",
                            };
                          });
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                                this.props.dispute.asset.defendant,
                                250
                              )}')`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "contain",
                              backgroundPosition: "left",
                              paddingLeft: "50px",
                              height: "40px",
                              marginLeft: "auto",
                              marginRight: "auto",
                              width: "fit-content",
                            }}
                          >
                            <strong>
                              {this.props.dispute.asset.defendant}
                            </strong>
                            <p
                              style={{
                                lineHeight: "15px",
                                fontSize: "14px",
                                marginBottom: "0px",
                              }}
                            >
                              Defendant [
                              {this.props.dispute.asset.disputeType
                                .split("-vs-")[1]
                                .replaceAll("-", " ")
                                .replace(/\w\S*/g, (txt) => {
                                  return (
                                    txt.charAt(0).toUpperCase() +
                                    txt.substr(1).toLowerCase()
                                  );
                                })}
                              ]
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  {this.state.voteFor !== null ? (
                    <div className="form-check" style={{ marginTop: "16px" }}>
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
                        I want to Vote for "{this.state.voteFor}"
                      </label>
                    </div>
                  ) : (
                    <p>Please Choose Party First!</p>
                  )}
                </div>
              </div>
              <div className="container">
                <div
                  className="modal-footer pt-3 mb-1 form-footer"
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
                        {"Cast Vote Fee: " +
                          utils.convertBeddowsToLSK(
                            this.props.dispute.asset.castVoteFee
                          ) +
                          " CLNC"}
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          color: "#8D99AE",
                          fontSize: "12px",
                        }}
                      >
                        Vote fee will be kept until dispute is closed.
                        <br />
                        Losing solver fee will be given to winning solver.
                      </div>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-primary border rounded-0 form-submit"
                        style={{
                          backgroundColor: "#2B2D42",
                          width: "200px",
                        }}
                        disabled={!this.state.checked}
                        onClick={this.onSolverVoteFormSubmit}
                      >
                        Vote
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

export default SolverVoteDialog;
