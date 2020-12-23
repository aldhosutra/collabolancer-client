import React from "react";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import { transfer } from "../../utils/transaction";
import SendLogo from "../../asset/undraw_transfer_money_rywa.svg";
import config from "../../config/config";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { utils } from "@liskhq/lisk-transactions";

class SendCLNCDialog extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      passwordShow: false,
      recipientId: "",
      amount: "",
      passphrase: "",
    };
    this.onSendFormSubmit = this.onSendFormSubmit.bind(this);
    this.handlePostProjectFormChange = this.handlePostProjectFormChange.bind(
      this
    );
  }

  handlePostProjectFormChange(event) {
    const targetID = event.target.id;
    const targetValue = event.target.value;
    this.setState((state) => {
      return { ...state, [targetID]: targetValue };
    });
  }

  onSendFormSubmit(e) {
    e.preventDefault();
    try {
      if (this.state["passphrase"] === getSession("secret")) {
        transfer(
          this.state["recipientId"],
          utils.convertLSKToBeddows(this.state["amount"]).toString(),
          getSession("secret")
        )
          .then((data) => {
            if (!data.errors) {
              toast.success(
                "Send CLNC Successful, transfer will be complete after up to " +
                  config.block_time / 1000 +
                  " seconds!"
              );
              this.setState((state) => {
                return {
                  ...state,
                  recipientId: "",
                  amount: "",
                  passphrase: "",
                };
              });
              window.$("#" + this.props.id).modal("hide");
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
      } else {
        toast.error(
          "Passphrase doesn't match with your account, please check again!"
        );
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  }

  render() {
    return (
      <div>
        <div
          className="modal full fade"
          id={this.props.id}
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
              <form
                className="form-inside-input"
                onSubmit={this.onSendFormSubmit}
              >
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
                      alt="Send CLNC"
                      src={SendLogo}
                    />
                    <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                      <strong>Send CLNC</strong>
                    </h3>
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      Transfer your CLNC Balance Securely
                      <br />
                      with Power Of Blockchain
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
                        htmlFor="recipientId"
                        style={{ fontWeight: "bold" }}
                      >
                        Recipient Address
                      </label>
                      <input
                        type="text"
                        placeholder="Input Recipient Address"
                        id="recipientId"
                        name="recipientId"
                        className="form-control validate"
                        onChange={this.handlePostProjectFormChange}
                        value={this.state["recipientId"]}
                        required
                      />
                    </div>
                    <div className="md-form mb-4">
                      <label
                        data-error="wrong"
                        data-success="right"
                        htmlFor="amount"
                        style={{ fontWeight: "bold" }}
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        placeholder="Input CLNC Amount"
                        id="amount"
                        name="amount"
                        value={this.state["amount"]}
                        className="form-control validate"
                        onChange={this.handlePostProjectFormChange}
                        required
                      />
                      <p
                        style={{
                          color: "gray",
                          fontSize: "14px",
                          marginTop: "8px",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Fee: 0.1 CLNC
                      </p>
                    </div>
                    <div className="md-form mb-4">
                      <p
                        data-error="wrong"
                        data-success="right"
                        htmlFor="passphrase"
                        style={{ fontWeight: "bold", marginBottom: "8px" }}
                      >
                        Passphrase
                      </p>
                      <div className="input-group">
                        <input
                          type={this.state.passwordShow ? "text" : "password"}
                          placeholder="Input Your Account Passphrase"
                          id="passphrase"
                          name="passphrase"
                          className="form-control validate"
                          onChange={this.handlePostProjectFormChange}
                          value={this.state["passphrase"]}
                          required
                        />
                        <div className="input-group-append">
                          <button
                            className="btn border"
                            type="button"
                            onClick={() =>
                              this.setState((state) => {
                                return {
                                  ...state,
                                  passwordShow: !this.state.passwordShow,
                                };
                              })
                            }
                          >
                            <FontAwesomeIcon
                              icon={
                                this.state.passwordShow ? "eye-slash" : "eye"
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div
                    className="modal-footer pt-3 mb-1 form-footer"
                    style={{ borderTop: "0 none" }}
                  >
                    <div className="row">
                      <div
                        className="col-lg-auto form-fee"
                        style={{
                          marginRight: "5px",
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
                          {"Total: " +
                            utils
                              .BigNum(
                                this.state["amount"] === ""
                                  ? 0
                                  : this.state["amount"]
                              )
                              .add(0.1)
                              .toString() +
                            " CLNC"}
                        </div>
                        <div
                          style={{
                            textAlign: "right",
                            color: "#8D99AE",
                            fontSize: "12px",
                          }}
                        >
                          {"Current Balance: " +
                            utils.convertBeddowsToLSK(
                              utils
                                .BigNum(
                                  this.props.account
                                    ? this.props.account.balance
                                    : 0
                                )
                                .toString()
                            ) +
                            " CLNC"}
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
                          value="Send"
                        />
                      </div>
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

export default SendCLNCDialog;
