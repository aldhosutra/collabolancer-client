import React from "react";
import DisputeReportLogo from "../../asset/undraw_people_search_wctu.svg";
import "./modal.css";
import { renderAvatar } from "../avatar";
import { utils } from "@liskhq/lisk-transactions";
import { getAddressFromPublicKey } from "@liskhq/lisk-cryptography";

class DisputeReportDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      index: "litigant",
    };
  }

  render() {
    return (
      <div className="d-flex justify-content-center justify-content-lg-center">
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={"#dispute-report-" + this.props.dispute.publicKey}
          style={{
            backgroundColor: "#2B2D42",
            minWidth: "200px",
            marginTop: "auto",
            marginBottom: "auto",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <strong>See Report</strong>
        </button>
        <div
          className="modal full fade"
          id={"dispute-report-" + this.props.dispute.publicKey}
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
                    alt="Dispute Report"
                    src={DisputeReportLogo}
                  />
                  <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                    <strong>Dispute Report</strong>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Transparency to support justice, with power of Blockchain!
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
                  <div
                    className="row"
                    style={{ marginBottom: "16px", marginTop: "16px" }}
                  >
                    <div className="col">
                      <button
                        className="btn btn-primary border rounded-0 top-button"
                        style={{
                          color:
                            this.state.index === "litigant" ? "white" : "black",
                          marginBottom: "0px",
                          overflowWrap: "break-word",
                          backgroundColor:
                            this.state.index === "litigant"
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
                              index: "litigant",
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
                              marginBottom: "16px",
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
                          <div className="row">
                            <div
                              className="col text-center"
                              style={{ padding: "12px" }}
                            >
                              <p
                                className="w-100 dark-grey-text my-1"
                                style={{ fontSize: "14px" }}
                              >
                                Total Vote Power:
                              </p>
                              <div
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontSize: "25px",
                                }}
                              >
                                <strong>
                                  {utils
                                    .convertBeddowsToLSK(
                                      this.props.dispute.asset.score.litigant
                                    )
                                    .toString()}
                                </strong>
                              </div>
                              <p
                                className="w-100 dark-grey-text my-1"
                                style={{ fontSize: "14px" }}
                              >
                                [
                                {utils
                                  .BigNum(
                                    this.props.dispute.asset.score.litigant
                                  )
                                  .div(
                                    utils
                                      .BigNum(
                                        this.props.dispute.asset.score.defendant
                                      )
                                      .add(
                                        this.props.dispute.asset.score.litigant
                                      )
                                  )
                                  .mul(100)
                                  .round(2)
                                  .toString()}
                                %]
                              </p>
                            </div>
                            <div
                              className="col text-center"
                              style={{ padding: "12px" }}
                            >
                              <p
                                className="w-100 dark-grey-text my-1"
                                style={{ fontSize: "14px" }}
                              >
                                Voted By:
                              </p>
                              <div
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontSize: "25px",
                                }}
                              >
                                <strong>
                                  {
                                    this.props.dispute.asset.vote.litigant
                                      .length
                                  }{" "}
                                  Solver
                                </strong>
                              </div>
                              <p
                                className="w-100 dark-grey-text my-1"
                                style={{ fontSize: "14px" }}
                              >
                                [
                                {(this.props.dispute.asset.vote.litigant
                                  .length /
                                  (this.props.dispute.asset.vote.defendant
                                    .length +
                                    this.props.dispute.asset.vote.litigant
                                      .length)) *
                                  100}
                                %]
                              </p>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-primary border rounded-0 top-button"
                        style={{
                          color:
                            this.state.index === "defendant"
                              ? "white"
                              : "black",
                          marginBottom: "0px",
                          overflowWrap: "break-word",
                          backgroundColor:
                            this.state.index === "defendant"
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
                              index: "defendant",
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
                              marginBottom: "16px",
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
                          <div className="row">
                            <div
                              className="col text-center"
                              style={{ padding: "12px" }}
                            >
                              <p
                                className="w-100 dark-grey-text my-1"
                                style={{ fontSize: "14px" }}
                              >
                                Total Vote Power:
                              </p>
                              <div
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontSize: "25px",
                                }}
                              >
                                <strong>
                                  {utils
                                    .convertBeddowsToLSK(
                                      this.props.dispute.asset.score.defendant
                                    )
                                    .toString()}
                                </strong>
                              </div>
                              <p
                                className="w-100 dark-grey-text my-1"
                                style={{ fontSize: "14px" }}
                              >
                                [
                                {utils
                                  .BigNum(
                                    this.props.dispute.asset.score.defendant
                                  )
                                  .div(
                                    utils
                                      .BigNum(
                                        this.props.dispute.asset.score.defendant
                                      )
                                      .add(
                                        this.props.dispute.asset.score.litigant
                                      )
                                  )
                                  .mul(100)
                                  .round(2)
                                  .toString()}
                                %]
                              </p>
                            </div>
                            <div
                              className="col text-center"
                              style={{ padding: "12px" }}
                            >
                              <p
                                className="w-100 dark-grey-text my-1"
                                style={{ fontSize: "14px" }}
                              >
                                Voted By:
                              </p>
                              <div
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontSize: "25px",
                                }}
                              >
                                <strong>
                                  {
                                    this.props.dispute.asset.vote.defendant
                                      .length
                                  }{" "}
                                  Solver
                                </strong>
                              </div>
                              <p
                                className="w-100 dark-grey-text my-1"
                                style={{ fontSize: "14px" }}
                              >
                                [
                                {(this.props.dispute.asset.vote.defendant
                                  .length /
                                  (this.props.dispute.asset.vote.defendant
                                    .length +
                                    this.props.dispute.asset.vote.litigant
                                      .length)) *
                                  100}
                                %]
                              </p>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <h6
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      marginTop: "32px",
                    }}
                  >
                    <strong>
                      List of Solver Account that Vote For "{this.state.index}":
                    </strong>
                  </h6>
                  <div
                    style={{
                      height: "400px",
                      overflow: "scroll",
                      overflowX: "hidden",
                      marginTop: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    {this.props.dispute.asset.vote[this.state.index].map(
                      (item) => {
                        return (
                          <div
                            style={{
                              paddingTop: "8px",
                              paddingBottom: "8px",
                              borderBottom: "1px solid #dee2e6",
                              borderTop: "1px solid #dee2e6",
                            }}
                          >
                            <div className="col d-flex justify-content-start details">
                              <p
                                className="role-address"
                                style={{
                                  overflowWrap: "break-word",
                                  fontFamily: "Poppins, sans-serif",
                                  backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                                    getAddressFromPublicKey(item),
                                    250
                                  )}')`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "contain",
                                  backgroundPosition: "left",
                                  paddingLeft: "50px",
                                  marginTop: "auto",
                                  marginBottom: "auto",
                                  height: "40px",
                                  lineHeight: "40px",
                                }}
                              >
                                {getAddressFromPublicKey(item)}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
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

export default DisputeReportDialog;
