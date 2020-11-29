import React from "react";
import { MISCELLANEOUS } from "../../transactions/constants";
import { toast } from "react-toastify";
import { deflationaryMultiplier, getSession } from "../../utils/tools";
import { postProposal } from "../../utils/transaction";
import PostProposalLogo from "../../asset/undraw_resume_1hqp.svg";
const { utils } = require("@liskhq/lisk-transactions");

class PostProposalDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      collaboration: false,
      "form-pitching": "",
      "form-term-rolelist": [],
      "form-term-brief": "",
      "form-term-maxtime": "",
      "form-term-maxrevision": "",
      "form-term-distribution-mode": MISCELLANEOUS.DISTRIBUTION.ALL_EQUAL,
      "form-term-distribution-value": "",
    };
    this.handlePostProposalFormChange = this.handlePostProposalFormChange.bind(
      this
    );
    this.onPostProposalFormSubmit = this.onPostProposalFormSubmit.bind(this);
  }

  handlePostProposalFormChange(event) {
    const targetID = event.target.id;
    const targetValue = event.target.value;
    this.setState((state) => {
      return { ...state, [targetID]: targetValue };
    });
  }

  onPostProposalFormSubmit(e) {
    e.preventDefault();
    try {
      postProposal(
        getSession("secret"),
        this.props.project.publicKey,
        this.state["form-pitching"],
        {
          roleList: this.state["form-term-rolelist"].filter((e) => {
            return e !== "";
          }),
          brief: this.state["form-term-brief"],
          maxTime: parseInt(this.state["form-term-maxtime"]),
          maxRevision: parseInt(this.state["form-term-maxrevision"]),
          distribution: {
            mode: this.state["form-term-distribution-mode"],
            value: parseInt(
              this.state["form-term-distribution-value"]
                ? this.state["form-term-distribution-value"]
                : 0
            ),
          },
        }
      )
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Post proposal successfull, changes can be seen after up to 15 seconds!"
            );
            this.setState((state) => {
              return {
                ...state,
                collaboration: false,
                "form-pitching": "",
                "form-term-rolelist": [],
                "form-term-brief": "",
                "form-term-maxtime": "",
                "form-term-maxrevision": "",
                "form-term-distribution-mode": "",
                "form-term-distribution-value": "",
              };
            });
            window.$("#postProposal").modal("hide");
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
    const roleListInput = [];
    let deflationaryRate = 1;
    deflationaryMultiplier().then((rate) => {
      deflationaryRate = rate;
    });
    for (let i = 0; i < this.state["form-term-rolelist"].length; i++) {
      roleListInput.push(
        <div
          key={"form-term-rolelist-" + i}
          className="row md-form mb-2"
          style={{ marginLeft: "0px", marginRight: "0px" }}
        >
          <input
            type="text"
            placeholder="Hit plus button to add more"
            id="form-term-rolelist"
            name="form-term-rolelist"
            className="form-control validate col-lg-10 col-sm-12"
            onChange={(event) => {
              const roleList = this.state["form-term-rolelist"];
              const targetValue = event.target.value;
              roleList[i] = targetValue;
              this.setState((state) => {
                return { ...state, "form-term-rolelist": roleList };
              });
            }}
            value={this.state["form-term-rolelist"][i]}
            required
          />
          <button
            className="btn btn-primary border rounded-0 top-button col"
            type="button"
            style={{
              marginRight: "8px",
              backgroundColor: "#EF233C",
              margin: "auto",
              fontFamily: "Poppins, sans-serif",
            }}
            onClick={() => {
              const roleList = this.state["form-term-rolelist"];
              roleList.splice(i + 1, 0, "");
              this.setState((state) => {
                return {
                  ...state,
                  collaboration: true,
                  "form-term-rolelist": roleList,
                };
              });
            }}
          >
            +
          </button>
          {this.state["form-term-rolelist"].length > 1 ? (
            <button
              className="btn btn-primary border rounded-0 top-button col"
              type="button"
              style={{
                marginRight: "8px",
                backgroundColor: "#2B2D42",
                margin: "auto",
                fontFamily: "Poppins, sans-serif",
              }}
              onClick={() => {
                const roleList = this.state["form-term-rolelist"];
                roleList.splice(i, 1);
                this.setState((state) => {
                  return {
                    ...state,
                    collaboration: true,
                    "form-term-rolelist": roleList,
                  };
                });
              }}
            >
              -
            </button>
          ) : (
            <div></div>
          )}
        </div>
      );
    }
    const yourShare =
      this.state["form-term-distribution-mode"] ===
      MISCELLANEOUS.DISTRIBUTION.LEADER_FIRST
        ? parseFloat(this.state["form-term-distribution-value"]).toFixed(2)
        : (100 / (this.state["form-term-rolelist"].length + 1)).toFixed(2);
    const teamShare =
      this.state["form-term-distribution-mode"] ===
      MISCELLANEOUS.DISTRIBUTION.LEADER_FIRST
        ? (
            (100.0 - parseFloat(this.state["form-term-distribution-value"])) /
            this.state["form-term-rolelist"].length
          ).toFixed(2)
        : (100 / (this.state["form-term-rolelist"].length + 1)).toFixed(2);
    return (
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target="#postProposal"
          style={{
            paddingRight: "24px",
            paddingLeft: "24px",
            backgroundColor: "#EF233C",
            marginRight: "10px",
            fontFamily: "Poppins, sans-serif",
            marginBottom: "10px",
          }}
        >
          <strong>Post New Proposal</strong>
        </button>
        <div
          className="modal fade"
          id="postProposal"
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
                onSubmit={this.onPostProposalFormSubmit}
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
                    src={PostProposalLogo}
                  />
                  <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                    <strong>Post New Proposal</strong>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Ready to Work? Let's Pitch your Best-Self!
                    <br />
                    Enable Collaboration, and earn many bonuses!
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
                  <div className="md-form mb-4">
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="form-pitching"
                      style={{ fontWeight: "bold" }}
                    >
                      Pitching, Why Employer Should Choose You?
                    </label>
                    <textarea
                      type="text"
                      placeholder="Pitch yourself! Give best reason why employer should choose you?"
                      id="form-pitching"
                      name="form-pitching"
                      className="form-control validate"
                      onChange={this.handlePostProposalFormChange}
                      value={this.state["form-pitching"]}
                      rows="4"
                      cols="50"
                      required
                    />
                  </div>
                  {!this.state.collaboration ? (
                    <div>
                      <button
                        className="btn btn-primary border rounded-0 top-button"
                        style={{
                          backgroundColor: "#EF233C",
                          width: "200px",
                        }}
                        onClick={() => {
                          this.setState((state) => {
                            return {
                              ...state,
                              collaboration: true,
                              "form-term-rolelist": [""],
                            };
                          });
                        }}
                      >
                        <strong>Enable Collaboration</strong>
                      </button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {this.state.collaboration ? (
                    <div>
                      <div
                        className="border rounded-0"
                        style={{ marginTop: "10px", marginBottom: "20px" }}
                      />
                      <label
                        data-error="wrong"
                        data-success="right"
                        htmlFor="form-term-rolelist"
                        style={{ fontWeight: "bold" }}
                      >
                        What Role You Need in Your Team?
                      </label>
                      <div className="md-form mb-4">{roleListInput}</div>
                      <div className="md-form mb-4">
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="form-term-brief"
                          style={{ fontWeight: "bold" }}
                        >
                          Tell a Brief Description for Your Team
                        </label>
                        <textarea
                          id="form-term-brief"
                          name="form-term-brief"
                          value={this.state["form-term-brief"]}
                          className="form-control validate"
                          placeholder="Maybe some specific terms, or how your team should contact each other?"
                          rows="4"
                          cols="50"
                          onChange={this.handlePostProposalFormChange}
                          required
                        />
                      </div>
                      <div className="md-form mb-4">
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="form-term-maxtime"
                          style={{ fontWeight: "bold" }}
                        >
                          How Long Your Team Should Finishing Project??
                        </label>
                        <input
                          type="number"
                          placeholder="Set this less than project working time limit, so as a leader, you have time to wrap up your project"
                          id="form-term-maxtime"
                          name="form-term-maxtime"
                          value={this.state["form-term-maxtime"]}
                          className="form-control validate"
                          onChange={this.handlePostProposalFormChange}
                          required
                        />
                      </div>
                      <div className="md-form mb-4">
                        <label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="form-term-maxrevision"
                          style={{ fontWeight: "bold" }}
                        >
                          How Much Chance For Your Team to Submit Revision?
                        </label>
                        <input
                          type="number"
                          placeholder="Your team should not slow you down, right?"
                          id="form-term-maxrevision"
                          name="form-term-maxrevision"
                          value={this.state["form-term-maxrevision"]}
                          className="form-control validate"
                          onChange={this.handlePostProposalFormChange}
                          required
                        />
                      </div>
                      <div className="md-form mb-4">
                        <p style={{ fontWeight: "bold", marginRight: "5px" }}>
                          How You Will Distribute Prize With Your Team?
                        </p>
                        <div onChange={this.handlePostProposalFormChange}>
                          <input
                            type="radio"
                            id="form-term-distribution-mode"
                            name="form-term-distribution-mode"
                            checked={
                              this.state["form-term-distribution-mode"] ===
                              MISCELLANEOUS.DISTRIBUTION.ALL_EQUAL
                            }
                            value={MISCELLANEOUS.DISTRIBUTION.ALL_EQUAL}
                            required
                          />
                          <label
                            htmlFor={MISCELLANEOUS.DISTRIBUTION.ALL_EQUAL}
                            style={{ marginLeft: "10px" }}
                          >
                            Prize will be distributed equally between me and my
                            team
                          </label>
                          <br />
                          <input
                            type="radio"
                            id="form-term-distribution-mode"
                            name="form-term-distribution-mode"
                            checked={
                              this.state["form-term-distribution-mode"] ===
                              MISCELLANEOUS.DISTRIBUTION.LEADER_FIRST
                            }
                            value={MISCELLANEOUS.DISTRIBUTION.LEADER_FIRST}
                            required
                          />
                          <label
                            htmlFor={MISCELLANEOUS.DISTRIBUTION.LEADER_FIRST}
                            style={{ marginLeft: "10px" }}
                          >
                            I will determine my share, the rest will be shared
                            equally between my team
                          </label>
                        </div>
                        {this.state["form-term-distribution-mode"] ===
                        MISCELLANEOUS.DISTRIBUTION.LEADER_FIRST ? (
                          <input
                            type="text"
                            placeholder="What percentage is your share?"
                            id="form-term-distribution-value"
                            name="form-term-distribution-value"
                            className="form-control validate"
                            onChange={this.handlePostProposalFormChange}
                            value={this.state["form-term-distribution-value"]}
                            required
                          />
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <div className="md-form mb-4">
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "#EF233C",
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          {(this.state["form-term-distribution-mode"] ===
                            MISCELLANEOUS.DISTRIBUTION.LEADER_FIRST &&
                            isNaN(
                              parseFloat(
                                this.state["form-term-distribution-value"]
                              )
                            )) ||
                          (parseFloat(
                            this.state["form-term-distribution-value"]
                          ) < 0 &&
                            parseFloat(
                              this.state["form-term-distribution-value"]
                            ) > 100)
                            ? "Percentage Should Be Between 0 and 100!"
                            : `Your Share: ${yourShare}% (${utils.convertBeddowsToLSK(
                                utils
                                  .BigNum(yourShare)
                                  .div(100)
                                  .mul(this.props.project.asset.prize)
                                  .toString()
                              )} CLNC); Each Team Share: ${teamShare}% (${utils.convertBeddowsToLSK(
                                utils
                                  .BigNum(teamShare)
                                  .div(100)
                                  .mul(this.props.project.asset.prize)
                                  .toString()
                              )} CLNC)`}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
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
                            this.props.project.asset.commitmentFee
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
                        {this.state.collaboration ? (
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
                                  .BigNum(
                                    this.state["form-term-rolelist"].length
                                  )
                                  .mul(
                                    MISCELLANEOUS.LEADER_CASHBACK_PERCENTAGE *
                                      deflationaryRate
                                  )
                                  .mul(this.props.project.asset.prize)
                                  .toString()
                              )}{" "}
                              CLNC
                            </strong>
                          </p>
                        ) : (
                          <p>
                            Get{" "}
                            {MISCELLANEOUS.LEADER_CASHBACK_PERCENTAGE *
                              100 *
                              deflationaryRate}
                            % bonus and more benefit, by enabling collaboration
                            for your proposal contract!
                          </p>
                        )}
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
                        value="Post"
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

export default PostProposalDialog;
