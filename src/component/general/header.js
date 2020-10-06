/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logoColor from "../../asset/collabolancer.svg";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "./header.css";
const { utils } = require("@liskhq/lisk-transactions");

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      navbarShow: false,
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    sessionStorage.removeItem("secret");
    toast.success("Logout Successful! See You Later!");
    this.setState({ redirect: "/" });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div style={{ fontFamily: "Poppins, sans-serif", height: "70px" }}>
        <nav
          className="navbar navbar-light navbar-expand-md navigation-clean border rounded-0 fixed-top"
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
                <h5 className="py-2 text-black">Menu</h5>
              </div>
              <ul className="nav navbar-nav d-md-flex ml-auto justify-content-md-end">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
                    href="#"
                    style={{
                      color: "#d90429",
                      fontWeight: "900",
                      marginRight: "20px",
                    }}
                  >
                    Browse
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link"
                    href="#"
                    style={{ marginRight: "20px" }}
                  >
                    Activity
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
                    <a
                      className="dropdown-toggle nav-link"
                      data-toggle="dropdown"
                      aria-expanded="true"
                      href="#"
                      style={{
                        backgroundImage:
                          'url("https://avatar.lisk.ws/' +
                          this.props.account.address +
                          '")',
                        backgroundPosition: "left",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        paddingLeft: "50px",
                      }}
                    >
                      {this.props.account.address}
                    </a>
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
                    <a className="dropdown-item" role="presentation" href="#">
                      Profile
                    </a>
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
      </div>
    );
  }
}

export default Header;
