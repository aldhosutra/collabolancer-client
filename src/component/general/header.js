/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logoColor from "../../asset/collabolancer.svg";
import { Link, Redirect, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "./header.css";
import { renderAvatar } from "../avatar";
import {
  getSessionExpire,
  guestProfile,
  removeSession,
} from "../../utils/tools";
import Countdown from "react-countdown";
import SendCLNCDialog from "../dialog/sendCLNC";
import { utils } from "@liskhq/lisk-transactions";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      navbarShow: false,
      expire: "",
    };
    this.logout = this.logout.bind(this);
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

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }
    const activeMenuStyle = {
      color: "#d90429",
      fontWeight: "900",
      marginRight: "20px",
      background: "none",
      border: "none",
      outline: "none",
    };
    const notActiveMenuStyle = {
      marginRight: "20px",
      background: "none",
      border: "none",
      outline: "none",
    };
    return (
      <div style={{ fontFamily: "Poppins, sans-serif", height: "70px" }}>
        <nav
          className="navbar navbar-light navbar-expand-lg navigation-clean border-bottom rounded-0 fixed-top"
          style={{ height: "70px", backgroundColor: "white" }}
        >
          <div className="container">
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
                <h5
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="py-2 text-black"
                >
                  Menu
                </h5>
              </div>
              <ul className="nav navbar-nav d-md-flex ml-auto justify-content-md-end">
                <li className="nav-item" role="presentation">
                  <Link style={{ textDecoration: "none" }} to={`/app/project/`}>
                    <button
                      className={
                        this.props.active === "Project"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      style={
                        this.props.active === "Project"
                          ? activeMenuStyle
                          : notActiveMenuStyle
                      }
                    >
                      Project
                    </button>
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link style={{ textDecoration: "none" }} to={`/app/dispute/`}>
                    <button
                      className={
                        this.props.active === "Dispute"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      style={
                        this.props.active === "Dispute"
                          ? activeMenuStyle
                          : notActiveMenuStyle
                      }
                    >
                      Dispute
                    </button>
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/app/directory/`}
                  >
                    <button
                      className={
                        this.props.active === "Directory"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      style={
                        this.props.active === "Directory"
                          ? activeMenuStyle
                          : notActiveMenuStyle
                      }
                    >
                      Directory
                    </button>
                  </Link>
                </li>
                <div
                  className="navdivider"
                  style={{ borderLeft: "1px solid #dee2e6" }}
                />
                {this.props.account && this.props.account !== guestProfile ? (
                  <li
                    className="dropdown nav-item"
                    style={{
                      marginLeft: "20px",
                      marginRight: "20px",
                    }}
                  >
                    <div>
                      <div
                        className="dropdown-toggle nav-link"
                        data-toggle="dropdown"
                        aria-expanded="true"
                        style={{
                          backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                            this.props.account
                              ? this.props.account.address
                              : "",
                            250
                          )}')`,
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
                            window.$(".modal").modal("hide");
                            window.$(".modal-backdrop").remove();
                            window.location.reload();
                          }}
                          renderer={({ minutes, seconds, completed }) => {
                            if (completed) {
                              return (
                                <span
                                  style={{
                                    backgroundColor: "rgb(248,0,47)",
                                    display: "inline-block",
                                    minWidth: "70px",
                                    color: "#ffffff",
                                    marginLeft: "10px",
                                    paddingLeft: "15px",
                                    paddingRight: "15px",
                                    fontWeight: "bold",
                                    fontSize: "14px",
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
                                    minWidth: "70px",
                                    color: "#ffffff",
                                    marginLeft: "10px",
                                    paddingLeft: "15px",
                                    paddingRight: "15px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    fontSize: "14px",
                                  }}
                                >
                                  {minutes}:{seconds}
                                </span>
                              );
                            }
                          }}
                        />
                      </div>
                      <div
                        className="dropdown-menu"
                        role="menu"
                        style={{
                          animationName: "slideIn",
                          animationDuration: "0.3s",
                        }}
                      >
                        <Link
                          className="dropdown-item"
                          style={{ textDecoration: "none" }}
                          to={`/app/profile/${this.props.account.address}`}
                        >
                          Profile
                        </Link>
                        <div className="dropdown-divider" role="presentation" />
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
                          data-target={"#sendModal"}
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
                    </div>
                  </li>
                ) : (
                  <li
                    className="d-flex justify-content-center dropdown nav-item"
                    style={{
                      margin: "auto",
                    }}
                  >
                    <div
                      className="d-flex justify-content-center auth-button"
                      style={{
                        width: "250px",
                      }}
                    >
                      <Link to={"/auth?target=" + this.props.location.pathname}>
                        <div
                          className="btn btn-light border rounded-0 action-button"
                          role="button"
                          style={{
                            backgroundColor: "#ef233c",
                            width: "200px",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "14px",
                            color: "white",
                          }}
                        >
                          <strong>Authenticate</strong>
                        </div>
                      </Link>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <SendCLNCDialog id={"sendModal"} account={this.props.account} />
      </div>
    );
  }
}

export default withRouter(Header);
