import React from "react";
import "./login.css";
import { getAccounts, setSession, getSession } from "../../utils/tools";
import { getAddressFromPassphrase } from "@liskhq/lisk-cryptography";
import employerLogo from "../../asset/undraw_businessman_97x4.svg";
import workerLogo from "../../asset/undraw_Work_time_re_hdyv.svg";
import solverLogo from "../../asset/undraw_conference_speaker_6nt7.svg";
import { toast } from "react-toastify";

import { Link, Redirect, withRouter } from "react-router-dom";
import Register from "./register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ACCOUNT } from "../../transactions/constants";

const login = async (userPassphrase) => {
  if (userPassphrase) {
    let ret = false;
    const userAddress = getAddressFromPassphrase(userPassphrase);
    await getAccounts({
      limit: 1,
      address: userAddress,
    })
      .then((res) => {
        if (
          [ACCOUNT.EMPLOYER, ACCOUNT.WORKER, ACCOUNT.SOLVER].includes(
            res.data[0].asset.type
          )
        ) {
          toast.success("Login Successful! Happy Collaborating!");
          setSession("secret", userPassphrase);
          ret = true;
        } else {
          toast.warning("No valid account found, check passphrase.");
        }
      })
      .catch((err) => {
        toast.warning("No valid account found, check passphrase.");
      });
    return ret;
  } else {
    toast.warning("Passphrase are empty, check again!");
    return false;
  }
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      signInPassphrase: "",
      index: 0,
      regIndex: -1,
      passwordShow: false,
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }
    const query = new URLSearchParams(this.props.location.search);
    const tab = [
      <div>
        <p>Passphrase</p>
        <div
          className="input-group"
          style={{ width: "100%", height: "40px", marginBottom: "30px" }}
        >
          <input
            className="border rounded-0 form-control"
            type={this.state.passwordShow ? "text" : "password"}
            name="passphrase"
            placeholder="Input Your Passphrase Here"
            style={{
              height: "40px",
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                if (await login(this.state.signInPassphrase)) {
                  if (query.get("target")) {
                    this.setState({ redirect: query.get("target") });
                  } else {
                    this.setState({ redirect: "/app" });
                  }
                }
              }
            }}
            onChange={(event) => {
              const text = event.target.value;
              this.setState((state) => ({
                ...state,
                signInPassphrase: text,
              }));
            }}
          />
          <div className="input-group-append">
            <button
              className="btn border"
              type="button"
              style={{
                height: "40px",
              }}
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
                icon={this.state.passwordShow ? "eye-slash" : "eye"}
              />
            </button>
          </div>
        </div>
        <div className="text-center">
          <div
            className="btn border link guest"
            style={{
              backgroundColor: "white",
              width: "200px",
              marginBottom: "8px",
            }}
            onClick={() => {
              toast.success("Happy Exploring as Guest!");
              if (query.get("target")) {
                this.setState({ redirect: query.get("target") });
              } else {
                this.setState({ redirect: "/app/project" });
              }
            }}
          >
            Explore as Guest
          </div>
          <button
            className="btn btn-primary border rounded-0"
            type="button"
            style={{
              width: "200px",
              backgroundColor: "#ef233c",
              marginBottom: "8px",
            }}
            onClick={async () => {
              if (await login(this.state.signInPassphrase)) {
                if (query.get("target") !== undefined) {
                  this.setState({ redirect: query.get("target") });
                } else {
                  this.setState({ redirect: "/app" });
                }
              }
            }}
          >
            <strong>Sign In</strong>
          </button>
        </div>
      </div>,
      <div className="row">
        <div
          className="col-xs-12 col-md-4 details link"
          style={{ padding: "30px", cursor: "pointer" }}
          onClick={() =>
            this.setState((state) => ({
              ...state,
              regIndex: 0,
            }))
          }
        >
          <div>
            <img
              className="img-fluid d-flex justify-content-center"
              src={workerLogo}
              style={{ height: "200px", margin: "auto", display: "block" }}
              alt="I Am A Worker"
            />
            <p
              className="text-center"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "25px",
                marginTop: "20px",
                fontWeight: "bolder",
              }}
            >
              I Am A Worker
            </p>
          </div>
        </div>
        <div
          className="col-xs-12 col-md-4 details link"
          style={{ padding: "30px", cursor: "pointer" }}
          onClick={() =>
            this.setState((state) => ({
              ...state,
              regIndex: 1,
            }))
          }
        >
          <div>
            <img
              className="img-fluid d-flex justify-content-center"
              src={employerLogo}
              style={{ margin: "auto", height: "200px", display: "block" }}
              alt="I Am An Employer"
            />
            <p
              className="text-center"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "25px",
                marginTop: "20px",
                fontWeight: "bolder",
              }}
            >
              I Am An Employer
            </p>
          </div>
        </div>
        <div
          className="col-xs-12 col-md-4 details link"
          style={{ padding: "30px", cursor: "pointer" }}
          onClick={() =>
            this.setState((state) => ({
              ...state,
              regIndex: 2,
            }))
          }
        >
          <div>
            <img
              className="img-fluid d-flex justify-content-center"
              src={solverLogo}
              style={{ height: "200px", display: "block" }}
              alt="I Am A Solver"
            />
            <p
              className="text-center"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "25px",
                marginTop: "20px",
                fontWeight: "bolder",
              }}
            >
              I Am A Solver
            </p>
          </div>
        </div>
      </div>,
    ];
    return getSession("secret") ? (
      <Redirect push to={{ pathname: "/app" }} />
    ) : (
      <div
        className="login-dark"
        style={{ minHeight: "100vh", height: "100%" }}
      >
        <div id="overlay" style={{ minHeight: "100vh", height: "100%" }}>
          <div className="container">
            <Link to="/">
              <p
                className="text-right brand-login"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "rgb(255,255,255)",
                  letterSpacing: 0,
                  fontWeight: 900,
                  marginTop: 0,
                  marginBottom: "0px",
                  paddingTop: "30px",
                  fontStyle: "normal",
                  paddingBottom: "30px",
                }}
              >
                Collabolancer
              </p>
            </Link>
            <p
              className="main-head"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                color: "rgb(255,255,255)",
                marginBottom: "30px",
              }}
            >
              COLLABORATING IS JUST A FEW CLICKS AWAY
            </p>
            <div
              className="justify-content-xl-center align-items-xl-center"
              style={{
                backgroundColor: "#ffffff",
                fontFamily: "Poppins, sans-serif",
                margin: "auto",
                paddingRight: "30px",
                paddingLeft: "30px",
                paddingTop: "30px",
                paddingBottom: "30px",
                marginBottom: "30px",
              }}
            >
              <div className="text-center" style={{ marginBottom: "30px" }}>
                <button
                  className="btn btn-primary border rounded-0 login-button"
                  type="button"
                  style={{
                    color:
                      this.state.index === 0
                        ? "rgb(255,255,255)"
                        : "rgb(0,0,0)",
                    backgroundColor:
                      this.state.index === 0 ? "#2b2d42" : "rgb(255,255,255)",
                  }}
                  onClick={() =>
                    this.setState({
                      index: 0,
                      regIndex: -1,
                    })
                  }
                >
                  Login
                </button>
                <button
                  className="btn btn-secondary border rounded-0 login-button"
                  type="button"
                  style={{
                    color:
                      this.state.index === 1
                        ? "rgb(255,255,255)"
                        : "rgb(0,0,0)",
                    backgroundColor:
                      this.state.index === 1 ? "#2b2d42" : "rgb(255,255,255)",
                  }}
                  onClick={() =>
                    this.setState((state) => ({
                      ...state,
                      index: 1,
                    }))
                  }
                >
                  Register
                </button>
              </div>
              {this.state.regIndex > -1 ? (
                <Register index={this.state.regIndex} />
              ) : (
                tab[this.state.index]
              )}
            </div>
            <p className="invisible" style={{ marginBottom: "0px" }}>
              (c) Collabolancer
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
