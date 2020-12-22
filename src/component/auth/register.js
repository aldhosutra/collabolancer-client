import React from "react";
import employerLogo from "../../asset/undraw_businessman_97x4.svg";
import workerLogo from "../../asset/undraw_Work_time_re_hdyv.svg";
import solverLogo from "../../asset/undraw_conference_speaker_6nt7.svg";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { setSession } from "../../utils/tools";
import {
  createAccount,
  registerEmployer,
  registerWorker,
  registerSolver,
} from "../../utils/transaction";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      account: createAccount(),
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }
    const role = ["Worker", "Employer", "Solver"];
    const logo = [workerLogo, employerLogo, solverLogo];
    const action = [registerWorker, registerEmployer, registerSolver];
    const motto = [
      "WORK LIKE NEVER BEFORE",
      "HIRE WITH BUILT-IN TRUST",
      "SOLVE DISPUTE WITH YOUR VOICE",
    ];
    return (
      <div className="row">
        <div className="col-md-3 details">
          <div>
            <img
              className="img-fluid d-md-flex d-lg-flex d-xl-flex justify-content-md-center justify-content-lg-center"
              src={logo[this.props.index]}
              style={{ width: "70%", margin: "auto", display: "block" }}
              width="200px"
              height="200px"
              alt="img"
            />
            <p
              className="text-center"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "30px",
                fontWeight: "bold",
                marginTop: "25px",
              }}
            >
              {motto[this.props.index]}
            </p>
          </div>
        </div>
        <div className="col">
          <p
            style={{
              backgroundColor: "#ef233c",
              color: "rgb(255,255,255)",
              fontWeight: "bold",
              fontSize: "14px",
              padding: "10px",
            }}
          >
            IMPORTANT! Please write down passphrase below, if you lost this
            passphrase, you will lose access to your account!
          </p>
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>Public Key</p>
          <p style={{ overflowWrap: "break-word" }}>
            {this.state.account.publicKey}
          </p>
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>Address</p>
          <p style={{ overflowWrap: "break-word" }}>
            {this.state.account.address}
          </p>
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>Passphrase</p>
          <p style={{ overflowWrap: "break-word" }}>
            {this.state.account.passphrase}
          </p>
          <div className="form-check" style={{ marginBottom: "16px" }}>
            <input
              className="form-check-input"
              type="checkbox"
              id="formCheck-1"
              onChange={(event) =>
                this.setState({
                  checked: event.target.checked,
                })
              }
            />
            <label className="form-check-label" htmlFor="formCheck-1">
              i have write down above passphrase
            </label>
          </div>
          <div className="d-flex justify-content-end justify-content-xl-end">
            <button
              className="btn btn-primary text-center"
              type="button"
              style={{ backgroundColor: "rgb(248,0,47)", width: "250px" }}
              disabled={!this.state.checked}
              onClick={() => {
                try {
                  action[this.props.index](this.state.account.passphrase).then(
                    (res) => {
                      if (res.meta.status) {
                        toast.success(
                          "Register Account Successful! Happy Collaborating!"
                        );
                        setSession("secret", this.state.account.passphrase);
                        this.setState({ redirect: "/app" });
                      }
                    }
                  );
                } catch (err) {
                  toast.error(err.message);
                }
              }}
            >
              Register As {role[this.props.index]}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
