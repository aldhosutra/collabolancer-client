/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Footer from "../general/footer";
import Header from "../general/header";
import Quote from "../general/quote";
import {
  getAccounts,
  getCategory,
  getSession,
  guestProfile,
} from "../../utils/tools";
import AvailableProjectList from "./availableProjectList";
import PostProjectDialog from "../dialog/postProjectDialog";
import "./browse.css";
import Loading from "../general/loading";
import { ACCOUNT } from "../../transactions/constants";
import { getAddressAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";

class BrowseProject extends React.Component {
  constructor() {
    super();
    this.state = {
      category: null,
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
          if (res.data[0].asset.type === ACCOUNT.EMPLOYER) {
            getCategory()
              .then((response) => response.json())
              .then((data) => {
                this.setState((state) => {
                  return { ...state, category: data.category.available };
                });
              });
          }
        }
      });
    } else {
      this.setState({ account: guestProfile });
    }
  }

  componentDidMount() {
    this.onLoad();
  }

  render() {
    return (
      <div>
        <Header account={this.state.account} active="Project" />
        {this.state.account ? (
          <div>
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
                    {this.state.account ? `Available Project` : "Loading..."}
                  </p>
                </div>
                {this.state.account &&
                this.state.account.asset.type === ACCOUNT.EMPLOYER ? (
                  <PostProjectDialog category={this.state.category} />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="container mb-5">
              <AvailableProjectList limit="5" />
            </div>
          </div>
        ) : (
          <Loading />
        )}
        <Quote />
        <Footer />
      </div>
    );
  }
}

export default BrowseProject;
