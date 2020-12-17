/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Footer from "../general/footer";
import Header from "../general/header";
import Quote from "../general/quote";
import { getAccounts, getSession } from "../../utils/tools";
import { Redirect } from "react-router-dom";
import AvailableDisputeList from "./availableDisputeList";
import "./browse.css";
const {
  getAddressAndPublicKeyFromPassphrase,
} = require("@liskhq/lisk-cryptography");

class BrowseDispute extends React.Component {
  constructor() {
    super();
    this.state = {
      account: null,
    };
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
          this.setState({ account: res.data[0] });
        }
      });
    }
  }

  componentDidMount() {
    this.onLoad();
  }

  render() {
    return getSession("secret") ? (
      <div>
        <Header account={this.state.account} active="Dispute" />
        <div
          className="container"
          style={{
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <div className="row">
            <div className="col" style={{ marginBottom: "16px" }}>
              <p
                className="d-xl-flex align-items-xl-center top-available"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "0px",
                }}
              >
                {this.state.account ? `Opened Disputes` : "Loading..."}
              </p>
            </div>
          </div>
        </div>
        <div className="container mb-5">
          <AvailableDisputeList limit="5" />
        </div>
        <Quote />
        <Footer />
      </div>
    ) : (
      <Redirect push to={"/auth"} />
    );
  }
}

export default BrowseDispute;
