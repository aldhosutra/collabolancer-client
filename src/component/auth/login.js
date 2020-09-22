import React from "react";
import "./login.css";
import { getAccounts } from "../../utils/tools";
import { getAddressFromPassphrase } from "@liskhq/lisk-cryptography";
import employerLogo from "../../asset/undraw_businessman_97x4.svg";
import workerLogo from "../../asset/undraw_Work_time_re_hdyv.svg";
import solverLogo from "../../asset/undraw_conference_speaker_6nt7.svg";
import { toast } from "react-toastify";

import { Link, Redirect } from "react-router-dom";
import Register from "./register";

const { ACCOUNT } = require("../../transactions/constants");

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
          sessionStorage.setItem("secret", userPassphrase);
          ret = true;
        } else {
          toast.warning("No valid account found, check passphrase.");
        }
      })
      .catch((err) => {
        toast.error(err.message);
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
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const tab = [
      <div>
        <p>Passphrase</p>
        <input
          className="border rounded-0"
          type="password"
          name="passphrase"
          placeholder="Input Your Passphrase Here"
          style={{ width: "100%", height: "40px", marginBottom: "30px" }}
          onChange={(event) => {
            const text = event.target.value;
            this.setState((state) => ({
              ...state,
              signInPassphrase: text,
            }));
          }}
        />
        <div className="d-flex justify-content-xl-center">
          <button
            className="btn btn-primary text-center border rounded-0"
            type="button"
            style={{ width: "150px", backgroundColor: "#ef233c" }}
            onClick={async () => {
              if (await login(this.state.signInPassphrase)) {
                this.setState({ redirect: "/app" });
              }
            }}
          >
            Sign In
          </button>
        </div>
      </div>,
      <div className="row">
        <div
          className="col details"
          style={{ padding: "30px" }}
          onClick={() =>
            this.setState((state) => ({
              ...state,
              regIndex: 0,
            }))
          }
        >
          <div>
            <img
              className="img-fluid d-md-flex d-lg-flex d-xl-flex justify-content-md-center justify-content-lg-center justify-content-xl-center"
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
              }}
            >
              I Am A Worker
            </p>
          </div>
        </div>
        <div
          className="col details"
          style={{ padding: "30px" }}
          onClick={() =>
            this.setState((state) => ({
              ...state,
              regIndex: 1,
            }))
          }
        >
          <div>
            <img
              className="img-fluid d-md-flex d-lg-flex d-xl-flex justify-content-md-center justify-content-lg-center justify-content-xl-center"
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
              }}
            >
              I Am An Employer
            </p>
          </div>
        </div>
        <div
          className="col details"
          style={{ padding: "30px" }}
          onClick={() =>
            this.setState((state) => ({
              ...state,
              regIndex: 2,
            }))
          }
        >
          <div>
            <img
              className="img-fluid d-md-flex d-lg-flex d-xl-flex justify-content-md-center justify-content-lg-center justify-content-xl-center"
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
              }}
            >
              I Am A Solver
            </p>
          </div>
        </div>
      </div>,
    ];
    return sessionStorage.getItem("secret") ? (
      <Redirect to={{ pathname: "/app" }} />
    ) : (
      <div
        className="login-dark"
        style={{ minHeight: "100vh", height: "100%" }}
      >
        <div id="overlay" style={{ minHeight: "100vh", height: "100%" }}>
          <div className="container">
            <Link to="/">
              <p
                className="text-right"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "rgb(255,255,255)",
                  fontSize: "30px",
                  letterSpacing: 0,
                  fontWeight: 900,
                  marginTop: 0,
                  marginBottom: "0px",
                  paddingTop: "30px",
                  paddingRight: "30px",
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
                paddingLeft: "30px",
                paddingRight: "30px",
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
                marginRight: "30px",
                marginLeft: "30px",
                paddingTop: "30px",
                paddingBottom: "30px",
                marginBottom: "30px",
              }}
            >
              <div className="text-center" style={{ marginBottom: "30px" }}>
                <button
                  className="btn btn-primary border rounded-0"
                  type="button"
                  style={{
                    width: "150px",
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
                  className="btn btn-secondary border rounded-0"
                  type="button"
                  style={{
                    width: "150px",
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

export default Login;
