/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { getAccounts, getSession } from "../../utils/tools";
import { Redirect } from "react-router-dom";
import "./browse.css";
import loadingLogo from "../../asset/undraw_synchronize_ccxk.svg";
import logoColor from "../../asset/collabolancer.svg";
import { ACCOUNT } from "../../transactions/constants";
const {
  getAddressAndPublicKeyFromPassphrase,
} = require("@liskhq/lisk-cryptography");

class Browse extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    if (getSession("secret")) {
      const timeout = 3000;
      getAccounts({
        address: getAddressAndPublicKeyFromPassphrase(getSession("secret"))
          .address,
      }).then((res) => {
        if (res.data.length === 0) {
          setTimeout(() => {
            this.onLoad();
          }, timeout);
        } else {
          const account = res.data[0];
          if (
            account.asset.type === ACCOUNT.EMPLOYER ||
            account.asset.type === ACCOUNT.WORKER
          ) {
            this.setState({ redirect: "/app/project" });
          } else if (account.asset.type === ACCOUNT.SOLVER) {
            this.setState({ redirect: "/app/dispute" });
          }
        }
      });
    }
  }

  componentDidMount() {
    this.onLoad();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }
    return (
      <div className="d-flex" style={{ height: "100vh" }}>
        <div
          className="shadow-lg bg-white rounded"
          style={{ margin: "auto", padding: "32px" }}
        >
          <img
            role="status"
            style={{
              width: "35px",
              display: "block",
              marginBottom: "16px",
            }}
            alt="Solo Proposal"
            src={logoColor}
          />
          <img
            role="status"
            style={{
              width: "160px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "32px",
              display: "block",
            }}
            alt="Solo Proposal"
            src={loadingLogo}
          />
          <h3
            className="w-100 dark-grey-text font-weight-bold text-center"
            style={{ marginBottom: "8px" }}
          >
            <strong>Please Wait</strong>
          </h3>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              textAlign: "center",
            }}
          >
            {"Loading current account information..."}
          </p>
          <div
            className="text-center"
            style={{ marginBottom: "16px", marginTop: "32px" }}
          >
            <div
              className="spinner-border text-danger"
              role="status"
              style={{
                height: "25px",
                width: "25px",
              }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Browse;
