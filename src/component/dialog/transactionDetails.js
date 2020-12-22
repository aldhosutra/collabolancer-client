import React from "react";
import TransactionDetailsLogo from "../../asset/undraw_detailed_analysis_xn7y.svg";
import { getTransactionName, getTransactions } from "../../utils/tools";
import * as constants from "@liskhq/lisk-constants";
import "./modal.css";
import Loading from "../general/loading";
import dateFormat from "dateformat";
import { utils } from "@liskhq/lisk-transactions";

class TransactionDetailsDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      transaction: null,
    };
  }

  async componentDidUpdate() {
    if (
      (window.$("#" + this.props.id).data("bs.modal") || {})._isShown &&
      this.state.transaction === null
    ) {
      await getTransactions({ id: this.props.transactionId }).then((data) => {
        this.setState((state) => {
          return {
            ...state,
            transaction: data.data[0],
          };
        });
      });
    }
  }

  renderTransactionAsset(data, key) {
    let subItem = null;
    let isObject = false;
    if (typeof data === "object") {
      if (!data || data.length === 0 || data === "") {
        subItem = (
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              overflowWrap: "break-word",
            }}
          >
            {"null"}
          </p>
        );
      } else {
        isObject = true;
        subItem = Object.keys(data).map((subKey, subIndex) => {
          return this.renderTransactionAsset(data[subKey], subKey);
        });
      }
    } else {
      subItem = (
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            overflowWrap: "break-word",
          }}
        >
          {data ? data.toString() : "null"}
        </p>
      );
    }
    return (
      <div
        className="row"
        key={"transaction-" + this.props.transactionId + "-asset-" + key}
      >
        <div className="col-lg-3 details">
          <h6
            style={{
              fontFamily: "Poppins, sans-serif",
              marginBottom: "1rem",
            }}
          >
            <strong>
              {key}
              {isObject ? ` [obj]` : null}
            </strong>
          </h6>
        </div>
        <div className="col details">{subItem}</div>
      </div>
    );
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
                    onClick={() => {
                      window.$("#" + this.props.id).modal("hide");
                    }}
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
                    alt="Transaction Details"
                    src={TransactionDetailsLogo}
                  />
                  <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                    <strong>Transaction Details</strong>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    {"Inspect every transaction data, trustworthy!"}
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
                  {this.state.transaction !== null ? (
                    <div>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          color: "#EF233C",
                        }}
                      >
                        <strong>Transaction Data:</strong>
                      </p>
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
                        <div className="row">
                          <div className="col-lg-3 details">
                            <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                              <strong>Transaction Type</strong>
                            </h6>
                          </div>
                          <div className="col details">
                            <p
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              {getTransactionName(this.state.transaction.type) +
                                ` [Type ${this.state.transaction.type}]`}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 details">
                            <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                              <strong>ID</strong>
                            </h6>
                          </div>
                          <div className="col details">
                            <p
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              {this.state.transaction.id}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 details">
                            <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                              <strong>Block ID</strong>
                            </h6>
                          </div>
                          <div className="col details">
                            <p
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              {this.state.transaction.blockId}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 details">
                            <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                              <strong>Block Height</strong>
                            </h6>
                          </div>
                          <div className="col details">
                            <p
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              {this.state.transaction.height}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 details">
                            <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                              <strong>Fee</strong>
                            </h6>
                          </div>
                          <div className="col details">
                            <p
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              {utils.convertBeddowsToLSK(
                                this.state.transaction.fee
                              )}{" "}
                              CLNC
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 details">
                            <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                              <strong>Timestamp</strong>
                            </h6>
                          </div>
                          <div className="col details">
                            <p
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              {dateFormat(
                                new Date(
                                  (constants.EPOCH_TIME_SECONDS +
                                    this.state.transaction.timestamp) *
                                    1000
                                ),
                                "mmmm dS, yyyy - h:MM:ss TT"
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 details">
                            <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                              <strong>Sender</strong>
                            </h6>
                          </div>
                          <div className="col details">
                            <p
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              {this.state.transaction.senderId}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 details">
                            <h6 style={{ fontFamily: "Poppins, sans-serif" }}>
                              <strong>Confirmation</strong>
                            </h6>
                          </div>
                          <div className="col details">
                            <p
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              {this.state.transaction.confirmations}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          color: "#EF233C",
                        }}
                      >
                        <strong>Transaction Assets:</strong>
                      </p>
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
                        {Object.keys(this.state.transaction.asset).map(
                          (key, index) => {
                            return this.renderTransactionAsset(
                              this.state.transaction.asset[key],
                              key
                            );
                          }
                        )}
                      </div>
                    </div>
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionDetailsDialog;
