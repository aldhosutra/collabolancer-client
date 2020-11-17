/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Footer from "../general/footer";
import Header from "../general/header";
import Quote from "../general/quote";
import { getAccounts, getCategory, getSession } from "../../utils/tools";
import { Redirect } from "react-router-dom";
import ProjectList from "../general/projectList";
import PostProjectDialog from "../dialog/postProjectDialog";
import "./browse.css";
const { ACCOUNT } = require("../../transactions/constants");
const {
  getAddressAndPublicKeyFromPassphrase,
} = require("@liskhq/lisk-cryptography");

class Browse extends React.Component {
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
    }
  }

  componentDidMount() {
    this.onLoad();
  }

  render() {
    const availableFor =
      this.state.account && this.state.account.asset.type === ACCOUNT.SOLVER
        ? "Disputes"
        : "Projects";
    return getSession("secret") ? (
      <div>
        <Header account={this.state.account} active="Browse" />
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
                {this.state.account
                  ? `Available ${availableFor}`
                  : "Loading..."}
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
          <ProjectList mode="available-project" limit="5" />
        </div>
        <Quote />
        <Footer />
      </div>
    ) : (
      <Redirect to={"/auth"} />
    );
  }
}

export default Browse;
