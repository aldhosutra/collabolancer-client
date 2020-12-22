/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Footer from "../general/footer";
import Header from "../general/header";
import Quote from "../general/quote";
import {
  getAccounts,
  getStateCenter,
  getSession,
  guestProfile,
} from "../../utils/tools";
import Loading from "../general/loading";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import CompactContractCard from "../general/compactContractCard";
import DirectoryList from "./directoryList";
import { getAddressAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";
import NoData from "../general/nodata";

class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      account: null,
      stateCenter: null,
      index: 0,
    };
    this.onLoad = this.onLoad.bind(this);
    this.loadStateCenterData = this.loadStateCenterData.bind(this);
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
    } else {
      this.setState({ account: guestProfile });
    }
  }

  loadStateCenterData() {
    getStateCenter()
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          this.setState({ stateCenter: res.data });
        } else {
          this.setState({ stateCenter: "nodata" });
        }
      })
      .catch((err) => {
        toast.error(`Error: ${err.message}`);
      });
  }

  componentDidMount() {
    this.onLoad();
    this.loadStateCenterData();
  }

  render() {
    const tab =
      this.state.stateCenter && this.state.stateCenter !== "nodata"
        ? [
            <div
              key={"directory-employer"}
              style={{ display: this.state.index === 0 ? "block" : "none" }}
            >
              <DirectoryList
                limit={10}
                directory={this.state.stateCenter.asset.user.employer}
              />
            </div>,
            <div
              key={"directory-worker"}
              style={{ display: this.state.index === 1 ? "block" : "none" }}
            >
              <DirectoryList
                limit={10}
                directory={this.state.stateCenter.asset.user.worker}
              />
            </div>,
            <div
              key={"directory-solver"}
              style={{ display: this.state.index === 2 ? "block" : "none" }}
            >
              <DirectoryList
                limit={10}
                directory={this.state.stateCenter.asset.user.solver}
              />
            </div>,
          ]
        : [null, null, null];
    return (
      <div>
        <Header account={this.state.account} active="Directory" />
        <div className="container mb-5">
          <div
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
                  {"Account Directory"}
                </p>
              </div>
            </div>
          </div>
          {this.state.account && this.state.stateCenter ? (
            this.state.stateCenter !== "nodata" ? (
              <div>
                <div className="container mb-5">
                  <div className="row">
                    <div className="col-lg-4">
                      <CompactContractCard
                        icon={"user-tie"}
                        name={"Employer Account"}
                        value={
                          this.state.stateCenter.asset.user.employer.length
                        }
                        tooltip={
                          "Number of Employer Account Registered on Collabolancer Blockchain"
                        }
                      />
                    </div>
                    <div className="col-lg-4">
                      <CompactContractCard
                        icon={"user-cog"}
                        name={"Worker Account"}
                        value={this.state.stateCenter.asset.user.worker.length}
                        tooltip={
                          "Number of Worker Account Registered on Collabolancer Blockchain"
                        }
                      />
                    </div>
                    <div className="col-lg-4">
                      <CompactContractCard
                        icon={"user-shield"}
                        name={"Solver Account"}
                        value={this.state.stateCenter.asset.user.solver.length}
                        tooltip={
                          "Number of Solver Account Registered on Collabolancer Blockchain"
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="container" style={{ marginBottom: "32px" }}>
                  <div className="border" style={{ padding: "16px" }}>
                    <div
                      className="text-center"
                      style={{ marginBottom: "16px" }}
                    >
                      <button
                        className="btn"
                        id="opened-dispute-tab"
                        type="button"
                        style={{
                          borderRadius: "25px",
                          paddingLeft: "16px",
                          paddingRight: "16px",
                          marginLeft: "16px",
                          marginRight: "16px",
                          color:
                            this.state.index === 0
                              ? "rgb(255,255,255)"
                              : "rgb(0,0,0)",
                          backgroundColor:
                            this.state.index === 0
                              ? "#ef233c"
                              : "rgb(255,255,255)",
                          fontWeight: this.state.index === 0 ? "900" : "normal",
                        }}
                        onClick={() =>
                          this.setState({
                            index: 0,
                          })
                        }
                      >
                        Employer
                      </button>
                      <button
                        className="btn"
                        id="opened-dispute-tab"
                        type="button"
                        style={{
                          borderRadius: "25px",
                          paddingLeft: "16px",
                          paddingRight: "16px",
                          marginLeft: "16px",
                          marginRight: "16px",
                          color:
                            this.state.index === 1
                              ? "rgb(255,255,255)"
                              : "rgb(0,0,0)",
                          backgroundColor:
                            this.state.index === 1
                              ? "#ef233c"
                              : "rgb(255,255,255)",
                          fontWeight: this.state.index === 1 ? "900" : "normal",
                        }}
                        onClick={() =>
                          this.setState({
                            index: 1,
                          })
                        }
                      >
                        Worker
                      </button>
                      <button
                        className="btn"
                        id="closed-dispute-tab"
                        type="button"
                        style={{
                          borderRadius: "25px",
                          paddingLeft: "16px",
                          paddingRight: "16px",
                          marginLeft: "16px",
                          marginRight: "16px",
                          color:
                            this.state.index === 2
                              ? "rgb(255,255,255)"
                              : "rgb(0,0,0)",
                          backgroundColor:
                            this.state.index === 2
                              ? "#ef233c"
                              : "rgb(255,255,255)",
                          fontWeight: this.state.index === 2 ? "900" : "normal",
                        }}
                        onClick={() =>
                          this.setState((state) => ({
                            ...state,
                            index: 2,
                          }))
                        }
                      >
                        Solver
                      </button>
                    </div>
                    <div>{tab}</div>
                  </div>
                </div>
              </div>
            ) : (
              <NoData />
            )
          ) : (
            <Loading />
          )}
        </div>
        <Quote />
        <Footer />
      </div>
    );
  }
}

export default withRouter(Directory);
