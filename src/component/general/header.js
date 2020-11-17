/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logoColor from "../../asset/collabolancer.svg";
import { Redirect, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "./header.css";
import { renderAvatar } from "../avatar";
import { transfer } from "../../utils/transaction";
import { getSession, getSessionExpire, removeSession } from "../../utils/tools";
import Countdown from "react-countdown";
const { utils } = require("@liskhq/lisk-transactions");

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      navbarShow: false,
      recipientId: "",
      amount: "",
      passphrase: "",
      expire: "",
    };
    this.logout = this.logout.bind(this);
    this.handlePostProjectFormChange = this.handlePostProjectFormChange.bind(
      this
    );
    this.onSendFormSubmit = this.onSendFormSubmit.bind(this);
  }

  componentDidMount() {
    this.setState((state) => {
      return {
        ...state,
        expire: getSessionExpire(),
      };
    });
  }

  logout() {
    removeSession("secret");
    toast.success("Logout Successful! See You Later!");
    this.setState({ redirect: "/" });
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
                "Post project duccessfull, changes can be seen after up to 15 seconds!"
              );
              this.setState((state) => {
                return {
                  ...state,
                  recipientId: "",
                  amount: "",
                  passphrase: "",
                };
              });
              window.$("#sendModal").modal("hide");
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const activeMenuStyle = {
      color: "#d90429",
      fontWeight: "900",
      marginRight: "20px",
    };
    const notActiveMenuStyle = {
      marginRight: "20px",
    };
    const avatar = `url('data:image/svg+xml,${renderAvatar(
      this.props.account ? this.props.account.address : "",
      250
    )}')`;
    return (
      <div style={{ fontFamily: "Poppins, sans-serif", height: "70px" }}>
        <nav
          className="navbar navbar-light navbar-expand-md navigation-clean border rounded-0 fixed-top"
          style={{ height: "70px", backgroundColor: "white" }}
        >
          <div className="container">
            <a
              href="#"
              onClick={() => {
                if (this.props.location.pathname !== "/app") {
                  this.setState({ redirect: "/app" });
                }
              }}
            >
              <h1
                className="navbar-brand"
                style={{
                  color: "rgb(248,0,47)",
                  backgroundImage: "url(" + logoColor + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left",
                  paddingLeft: "35px",
                }}
              >
                +
                <span
                  style={{
                    backgroundColor: "rgb(248,0,47)",
                    color: "#ffffff",
                    marginLeft: "10px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    fontWeight: "bold",
                  }}
                >
                  {this.props.account ? (
                    this.props.account.asset.type.charAt(0).toUpperCase() +
                    this.props.account.asset.type.slice(1)
                  ) : (
                    <div
                      className="spinner-border text-light"
                      role="status"
                      style={{
                        height: "25px",
                        width: "25px",
                      }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </span>
              </h1>
            </a>
            <button
              className="navbar-toggler"
              onClick={() =>
                this.setState((state) => ({
                  ...state,
                  navbarShow: true,
                }))
              }
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className={`navbar-collapse ${
                this.state.navbarShow ? "show" : ""
              }`}
              id="navcol-1"
              style={{
                transition:
                  "visibility 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out",
              }}
            >
              <div className="offcanvas-header mt-3">
                <button
                  className="btn btn-outline-danger btn-close float-right"
                  onClick={() =>
                    this.setState((state) => ({
                      ...state,
                      navbarShow: false,
                    }))
                  }
                >
                  x
                </button>
                <h5 className="py-2 text-black">Menu</h5>
              </div>
              <ul className="nav navbar-nav d-md-flex ml-auto justify-content-md-end">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
                    href="#"
                    style={
                      this.props.active === "Browse"
                        ? activeMenuStyle
                        : notActiveMenuStyle
                    }
                  >
                    Browse
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link"
                    href="#"
                    style={
                      this.props.active === "Profile"
                        ? activeMenuStyle
                        : notActiveMenuStyle
                    }
                  >
                    Profile
                  </a>
                </li>
                <div
                  className="navdivider"
                  style={{ borderLeft: "1px solid #dee2e6" }}
                />
                <li
                  className="dropdown nav-item"
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  {this.props.account ? (
                    <div
                      className="dropdown-toggle nav-link"
                      data-toggle="dropdown"
                      aria-expanded="true"
                      style={{
                        backgroundImage: avatar,
                        backgroundPosition: "left",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        paddingLeft: "50px",
                      }}
                    >
                      <a
                        href="#"
                        style={{ color: "#000000", textDecoration: "none" }}
                      >
                        {this.props.account.address}
                      </a>
                      <Countdown
                        date={getSessionExpire("secret")}
                        onComplete={() => {
                          removeSession("secret");
                          toast.error("Session Expire, Please Login Again!");
                          this.setState({
                            redirect:
                              "/auth?target=" + this.props.location.pathname,
                          });
                        }}
                        renderer={({ minutes, seconds, completed }) => {
                          if (completed) {
                            return (
                              <span
                                style={{
                                  backgroundColor: "rgb(248,0,47)",
                                  display: "inline-block",
                                  minWidth: "80px",
                                  color: "#ffffff",
                                  marginLeft: "10px",
                                  paddingLeft: "15px",
                                  paddingRight: "15px",
                                  fontWeight: "bold",
                                }}
                              >
                                Expired!
                              </span>
                            );
                          } else {
                            return (
                              <span
                                style={{
                                  backgroundColor: "rgb(248,0,47)",
                                  display: "inline-block",
                                  minWidth: "80px",
                                  color: "#ffffff",
                                  marginLeft: "10px",
                                  paddingLeft: "15px",
                                  paddingRight: "15px",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                }}
                              >
                                {minutes}:{seconds}
                              </span>
                            );
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="d-flex justify-content-center"
                      style={{
                        width: "250px",
                      }}
                    >
                      <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                  <div
                    className="dropdown-menu"
                    role="menu"
                    style={{
                      animationName: "slideIn",
                      animationDuration: "0.3s",
                    }}
                  >
                    <a
                      className="dropdown-item disabled"
                      role="presentation"
                      href="#"
                      style={{ color: "#ef233c" }}
                    >
                      Balance:{" "}
                      {this.props.account
                        ? utils
                            .convertBeddowsToLSK(this.props.account.balance)
                            .toString() + " CLNC"
                        : "(Loading...)"}
                    </a>
                    <button
                      className="btn btn-primary rounded-0 top-button dropdown-item"
                      type="button"
                      data-toggle="modal"
                      data-target="#sendModal"
                    >
                      Send CLNC
                    </button>
                    <div className="dropdown-divider" role="presentation" />
                    <a
                      className="dropdown-item"
                      role="presentation"
                      href="#"
                      onClick={this.logout}
                    >
                      Log Out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
          className="modal fade"
          id="sendModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content form-elegant">
              <div
                className="modal-header text-center"
                style={{ borderBottom: "0 none" }}
              >
                <h3
                  className="modal-title w-100 dark-grey-text font-weight-bold my-1"
                  id="myModalLabel"
                >
                  <strong>Send CLNC</strong>
                </h3>
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
                onSubmit={this.onSendFormSubmit}
              >
                <div className="modal-body mx-4">
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
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="passphrase"
                      style={{ fontWeight: "bold" }}
                    >
                      Passphrase
                    </label>
                    <input
                      type="text"
                      placeholder="Input Your Account Passphrase"
                      id="passphrase"
                      name="passphrase"
                      className="form-control validate"
                      onChange={this.handlePostProjectFormChange}
                      value={this.state["passphrase"]}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
