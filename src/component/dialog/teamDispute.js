import React from "react";
import { MISCELLANEOUS, STATUS } from "../../transactions/constants";
import * as constants from "@liskhq/lisk-constants";
import disputeLogo from "../../asset/undraw_judge_katerina_limpitsouni_ny1q.svg";
import holdOnLogo from "../../asset/undraw_loading_frh4.svg";
import { renderAvatar } from "../avatar";
import { openDispute } from "../../utils/transaction";
import { getSession } from "../../utils/tools";
import config from "../../config/config.json";
import { toast } from "react-toastify";
import CompactContractCard from "../general/compactContractCard";
import "./modal.css";
import { Editor } from "@tinymce/tinymce-react";
const { utils } = require("@liskhq/lisk-transactions");

class TeamDisputeDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      available: false,
      "form-suit": "",
      "form-maxdays": "",
    };
    this.handleTeamDisputeFormChange = this.handleTeamDisputeFormChange.bind(
      this
    );
    this.onTeamDisputeFormSubmit = this.onTeamDisputeFormSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleTeamDisputeFormChange(event) {
    const targetID = event.target.id;
    const targetValue = event.target.value;
    this.setState((state) => {
      return { ...state, [targetID]: targetValue };
    });
  }

  onTeamDisputeFormSubmit(e) {
    e.preventDefault();
    try {
      openDispute(
        getSession("secret"),
        this.props.team.publicKey,
        this.props.project.publicKey,
        this.state["form-suit"],
        parseInt(this.state["form-maxdays"])
      )
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Open Team vs Leader dispute successfull, page will be reloaded after " +
                config.block_time / 1000 +
                " seconds!",
              {
                autoClose: config.block_time,
              }
            );
            this.setState((state) => {
              return {
                ...state,
                "form-suit": "",
                "form-maxdays": "",
              };
            });
            window
              .$("#team-vs-leader-open-dispute-" + this.props.project.publicKey)
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

  handleEditorChange = (content, editor) => {
    this.setState((state) => {
      return {
        ...state,
        "form-suit": content,
      };
    });
  };

  componentDidMount() {
    window.$(document).on("focusin", function (e) {
      if (
        window
          .$(e.target)
          .closest(
            ".tox-tinymce, .tox-tinymce-aux, .moxman-window, .tam-assetmanager-root"
          ).length
      ) {
        e.stopImmediatePropagation();
      }
    });
    if (
      [
        STATUS.PROJECT.FINISHED,
        STATUS.PROJECT.TERMINATED,
        STATUS.PROJECT.DISPUTED,
        STATUS.PROJECT.DISPUTE_CLOSED,
      ].includes(this.props.project.asset.status) &&
      [STATUS.TEAM.REJECTED].includes(this.props.team.asset.status) &&
      [STATUS.PROPOSAL.SUBMITTED, STATUS.PROPOSAL.DISPUTE_CLOSED].includes(
        this.props.proposal.asset.status
      ) &&
      utils
        .BigNum(this.props.proposal.asset.freezedFund)
        .gte(this.props.proposal.asset.potentialEarning) &&
      Date.now() <
        (constants.EPOCH_TIME_SECONDS +
          this.props.project.asset.canBeClaimedOn) *
          1000
    ) {
      this.setState({
        available: true,
      });
    }
  }

  render() {
    if (
      !this.props.team ||
      !this.props.account ||
      this.props.team.asset.worker !== this.props.account.address ||
      ![STATUS.TEAM.REJECTED].includes(this.props.team.asset.status) ||
      this.props.team.asset.forceReject !== false
    ) {
      return null;
    }
    return (
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={
            "#team-vs-leader-open-dispute-" + this.props.project.publicKey
          }
          style={{
            paddingRight: "24px",
            paddingLeft: "24px",
            backgroundColor: this.state.available ? "#EF233C" : "#2B2D42",
            fontFamily: "Poppins, sans-serif",
            marginBottom: "10px",
          }}
        >
          <strong>Open Dispute</strong>
        </button>
        {this.state.available ? (
          <div>
            <div
              className="modal full fade"
              id={"team-vs-leader-open-dispute-" + this.props.project.publicKey}
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div className="modal-dialog modal-lg" role="document">
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
                  <form
                    className="form-inside-input"
                    onSubmit={this.onTeamDisputeFormSubmit}
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
                        src={disputeLogo}
                      />
                      <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                        <strong>Feel Aggrieved by the Leader Decision?</strong>
                      </h3>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          textAlign: "center",
                        }}
                      >
                        Open 'Team vs Leader' dispute,
                        <br />
                        and seek 'immutable & transparent' justice with power of
                        blockchain
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
                      <h6 style={{ marginBottom: "16px" }}>
                        <strong>Dispute Details:</strong>
                      </h6>
                      <div
                        style={{
                          padding: "20px",
                          borderWidth: 2,
                          borderRadius: 2,
                          borderColor: "#eeeeee",
                          borderStyle: "dashed",
                          marginBottom: "28px",
                        }}
                      >
                        <div className="row" style={{ marginBottom: "16px" }}>
                          <div className="col-lg-5">
                            <div
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                                  this.props.account.address,
                                  250
                                )}')`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "left",
                                marginBottom: "1rem",
                                paddingLeft: "50px",
                                height: "40px",
                              }}
                            >
                              <p
                                style={{
                                  lineHeight: "15px",
                                  fontSize: "14px",
                                  marginBottom: "0px",
                                }}
                              >
                                Litigant [YOU]
                              </p>
                              <strong>{this.props.account.address}</strong>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <h3 className="w-100 font-weight-bold text-center">
                              VS
                            </h3>
                          </div>
                          <div className="col-lg-5">
                            <div
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                                  this.props.proposal.asset.leader,
                                  250
                                )}')`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "left",
                                marginBottom: "1rem",
                                paddingLeft: "50px",
                                height: "40px",
                              }}
                            >
                              <p
                                style={{
                                  lineHeight: "15px",
                                  fontSize: "14px",
                                  marginBottom: "0px",
                                }}
                              >
                                Defendant [Leader]
                              </p>
                              <strong>
                                {this.props.proposal.asset.leader}
                              </strong>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 details">
                            <CompactContractCard
                              icon={"comment-dollar"}
                              name={"Defendant Fund Locked"}
                              value={
                                utils.convertBeddowsToLSK(
                                  this.props.team.asset.potentialEarning
                                ) + " CLNC"
                              }
                              tooltip={
                                "Defendant Fund Locked, is amount that will be contested in this dispute. This fund will go to winning party"
                              }
                            />
                          </div>
                          <div className="col-lg-4 details">
                            <CompactContractCard
                              icon={"comment-dollar"}
                              name={"Litigant Fee Locked"}
                              value={
                                utils.convertBeddowsToLSK(
                                  this.props.proposal.asset.term.commitmentFee
                                ) + " CLNC"
                              }
                              tooltip={
                                "Litigant Fee Locked, is amount of fee that litigant have paid as bail in this project contract to defendant fee vault. This will go to winning party"
                              }
                            />
                          </div>
                          <div className="col-lg-4 details">
                            <CompactContractCard
                              icon={"comment-dollar"}
                              name={"Defendant Fee Locked"}
                              value={
                                utils.convertBeddowsToLSK(
                                  this.props.project.asset.commitmentFee
                                ) + " CLNC"
                              }
                              tooltip={
                                "Defendant Fee Locked, is amount of fee that defendant have paid as bail in this project contract, most likely this fee is located at defendant fee vault. This will go to winning party"
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="md-form mb-4 text-left">
                        <p
                          data-error="wrong"
                          data-success="right"
                          htmlFor="form-suit"
                          style={{ fontWeight: "bold" }}
                        >
                          Suit:
                        </p>
                        <Editor
                          init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | image bullist numlist outdent indent | removeformat | help",
                          }}
                          onEditorChange={this.handleEditorChange}
                        />
                      </div>
                      <div className="md-form mb-4">
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="form-maxdays"
                          style={{ fontWeight: "bold" }}
                        >
                          How Long (in days) this Dispute will Open?
                        </label>
                        <input
                          type="number"
                          step="any"
                          placeholder={
                            "Make sure it is not too short, or not too long, maximum is: " +
                            Math.max(
                              MISCELLANEOUS.DISPUTE_MINIMAL_OPEN_PERIOD,
                              this.props.project.asset.maxTime
                            ) +
                            " days!"
                          }
                          id="form-maxdays"
                          name="form-maxdays"
                          value={this.state["form-maxdays"]}
                          className="form-control validate"
                          onChange={this.handleTeamDisputeFormChange}
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
                            {"Open Dispute Fee: FREE"}
                          </div>
                          <div
                            style={{
                              textAlign: "right",
                              color: "#8D99AE",
                              fontSize: "12px",
                            }}
                          >
                            All Fund Vault and Fee Vault for Corresponding Case
                            Account will be locked in Dispute Contract
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
                            value="Open Dispute"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="modal fade"
              id={"team-vs-leader-open-dispute-" + this.props.project.publicKey}
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
                      src={holdOnLogo}
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
                      You can't open a dispute yet. To open a dispute, this
                      condition must be met:
                    </p>
                    <ul style={{ textAlign: "justify" }}>
                      <li>
                        Project status must be, either:{" "}
                        {STATUS.PROJECT.FINISHED}, {STATUS.PROJECT.TERMINATED},{" "}
                        {STATUS.PROJECT.DISPUTED}, or{" "}
                        {STATUS.PROJECT.DISPUTE_CLOSED}
                      </li>
                      <li>
                        Proposal status must be, either:{" "}
                        {STATUS.PROPOSAL.SUBMITTED}, or{" "}
                        {STATUS.PROPOSAL.DISPUTE_CLOSED}
                      </li>
                      <li>
                        Proposal Fund Vault, must be greater than its Potential
                        Earning, indicating there are team earning in Proposal
                        Vault
                      </li>
                      <li>Must be still in Open Dispute Time Limit Period</li>
                    </ul>
                    <h6
                      className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center"
                      style={{ color: "#EF233C" }}
                    >
                      <strong>
                        Project and/or Proposal Status is not meets!
                      </strong>
                    </h6>
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
                            backgroundColor: "#EF233C",
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontFamily: "Poppins, sans-serif",
                            width: "150px",
                          }}
                          onClick={() => {
                            window
                              .$(
                                "#team-vs-leader-open-dispute-" +
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
        )}
      </div>
    );
  }
}

export default TeamDisputeDialog;
