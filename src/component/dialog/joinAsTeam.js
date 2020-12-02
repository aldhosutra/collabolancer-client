import React from "react";
import { MISCELLANEOUS, STATUS } from "../../transactions/constants";
import { toast } from "react-toastify";
import { deflationaryMultiplier, getSession } from "../../utils/tools";
import { joinTeam } from "../../utils/transaction";
import JoinAsTeamLogo from "../../asset/undraw_team_spirit_hrr4.svg";
const { utils } = require("@liskhq/lisk-transactions");
const parse = require("html-react-parser");

class JoinAsTeamDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
    this.onJoinAsTeamFormSubmit = this.onJoinAsTeamFormSubmit.bind(this);
  }

  onJoinAsTeamFormSubmit(e) {
    e.preventDefault();
    try {
      joinTeam(
        getSession("secret"),
        this.props.proposal.publicKey,
        this.props.id
      )
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Join team successfull, changes can be seen after up to 15 seconds!"
            );
            this.setState((state) => {
              return {
                ...state,
                checked: false,
              };
            });
            window
              .$(
                "#team-apply-" +
                  this.props.proposal.publicKey +
                  "-" +
                  this.props.prefix +
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
    if (
      !this.props.account ||
      this.props.proposal.asset.status !== STATUS.PROPOSAL.APPLIED ||
      this.props.account.address === this.props.proposal.asset.employer ||
      this.props.account.address === this.props.proposal.asset.leader ||
      this.props.proposal.asset.team
        .filter((item) => item !== 0)
        .map((item) => item.asset.worker)
        .includes(this.props.account.address)
    ) {
      return null;
    }
    let deflationaryRate = 1;
    deflationaryMultiplier().then((rate) => {
      deflationaryRate = rate;
    });
    return (
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={
            "#team-apply-" +
            this.props.proposal.publicKey +
            "-" +
            this.props.prefix +
            "-" +
            this.props.id
          }
          style={{
            backgroundColor: "rgb(239, 35, 60)",
            minWidth: "40px",
            marginTop: "auto",
            marginBottom: "auto",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <strong>Apply</strong>
        </button>
        <div
          className="modal fade"
          id={
            "team-apply-" +
            this.props.proposal.publicKey +
            "-" +
            this.props.prefix +
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
              <form
                className="form-inside-input"
                onSubmit={this.onJoinAsTeamFormSubmit}
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
                    src={JoinAsTeamLogo}
                  />
                  <h3
                    className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center"
                    id={
                      "modal-label-" +
                      this.props.proposal.publicKey +
                      "-" +
                      this.props.prefix
                    }
                  >
                    <strong>Join As Team Member</strong>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    {
                      "Start Collaborating With Other Amazing Workers, Just Like You!"
                    }
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
                  <h6
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <strong>Leader Brief</strong>
                  </h6>
                  <p
                    className="text-justify"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      overflowWrap: "break-word",
                    }}
                  >
                    {parse(this.props.proposal.asset.term.brief)}
                  </p>
                  <div className="row">
                    <div className="col-lg-4 details">
                      <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                        <strong>Role</strong>
                      </h6>
                    </div>
                    <div className="col details">
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                        }}
                      >
                        {this.props.role}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 details">
                      <h6
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          color: "rgb(239, 35, 60)",
                        }}
                      >
                        <strong>Potential Earning</strong>
                      </h6>
                    </div>
                    <div className="col details">
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                          color: "rgb(239, 35, 60)",
                        }}
                      >
                        <strong>
                          {utils.convertBeddowsToLSK(
                            this.props.proposal.asset.potentialEarning
                          )}{" "}
                          CLNC
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 details">
                      <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                        <strong>Working TIme Limit</strong>
                      </h6>
                    </div>
                    <div className="col details">
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                        }}
                      >
                        {this.props.proposal.asset.term.maxTime} Days
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 details">
                      <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                        <strong>Maximum Revision</strong>
                      </h6>
                    </div>
                    <div className="col details">
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                        }}
                      >
                        {this.props.proposal.asset.term.maxRevision} Times
                      </p>
                    </div>
                  </div>
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
                      I have read the provisions above, and am willing to apply
                      as a team
                    </label>
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
                        {"Commitment Fee: " +
                          utils.convertBeddowsToLSK(
                            this.props.proposal.asset.term.commitmentFee
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
                        Commitment fee will be kept until project is finished.{" "}
                        <br />
                        <p
                          style={{
                            color: "#EF233C",
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          <strong>
                            Potential Bonus:{" "}
                            {utils.convertBeddowsToLSK(
                              utils
                                .BigNum(MISCELLANEOUS.TEAM_CASHBACK_PERCENTAGE)
                                .mul(deflationaryRate)
                                .mul(this.props.proposal.asset.potentialEarning)
                                .round()
                                .toString()
                            )}{" "}
                            CLNC
                          </strong>
                        </p>
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
                        disabled={!this.state.checked}
                        value="Apply"
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

export default JoinAsTeamDialog;
