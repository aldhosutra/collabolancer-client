/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Footer from "../general/footer";
import Header from "../general/header";
import Quote from "../general/quote";
import { getAccounts, getCategory } from "../../utils/tools";
import { postProject } from "../../utils/transaction";
import { toast } from "react-toastify";
import "./browse.css";
import { Redirect } from "react-router-dom";
import ProjectList from "../general/projectList";
const { utils } = require("@liskhq/lisk-transactions");
const { ACCOUNT, MISCELLANEOUS } = require("../../transactions/constants");
const {
  getAddressAndPublicKeyFromPassphrase,
} = require("@liskhq/lisk-cryptography");

class Browse extends React.Component {
  constructor() {
    super();
    this.state = {
      "form-title": "",
      "form-description": "",
      "form-category": "none",
      "form-prize": "",
      "form-maxtime": "",
      "form-maxrevision": "",
      category: null,
      account: null,
      navbarShow: false,
    };
    this.onLoad = this.onLoad.bind(this);
    this.handlePostProjectFormChange = this.handlePostProjectFormChange.bind(
      this
    );
    this.onPostProjectFormSubmit = this.onPostProjectFormSubmit.bind(this);
  }

  handlePostProjectFormChange(event) {
    const targetID = event.target.id;
    const targetValue = event.target.value;
    this.setState((state) => {
      return { ...state, [targetID]: targetValue };
    });
  }

  onPostProjectFormSubmit(e) {
    e.preventDefault();
    try {
      postProject(
        sessionStorage.getItem("secret"),
        this.state["form-title"],
        this.state["form-description"],
        this.state["form-category"],
        utils.convertLSKToBeddows(this.state["form-prize"]).toString(),
        parseInt(this.state["form-maxtime"]),
        parseInt(this.state["form-maxrevision"])
      )
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Post project duccessfull, changes can be seen after up to 15 seconds!"
            );
            this.setState((state) => {
              return {
                ...state,
                "form-title": "",
                "form-description": "",
                "form-category": "none",
                "form-prize": "",
                "form-maxtime": "",
                "form-maxrevision": "",
              };
            });
            window.$("#postProject").modal("hide");
          } else {
            toast.error(
              data.message +
                ": " +
                data.errors.map((err) => err.message).toString()
            );
          }
        })
        .catch((err) => {
          toast.error(`Error: ${err.message}`);
        });
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  }

  onLoad() {
    if (sessionStorage.getItem("secret")) {
      const timeout = 3000;
      getAccounts({
        address: getAddressAndPublicKeyFromPassphrase(
          sessionStorage.getItem("secret")
        ).address,
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
    return sessionStorage.getItem("secret") ? (
      <div>
        <Header account={this.state.account} />
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
              <div className="col">
                <div className="d-flex justify-content-end justify-content-xl-end">
                  <button
                    className="btn btn-primary border rounded-0 top-button"
                    type="button"
                    data-toggle="modal"
                    data-target="#postProject"
                    style={{ backgroundColor: "#d90429", width: "250px" }}
                  >
                    Post New Project
                  </button>
                </div>
                <div
                  className="modal fade"
                  id="postProject"
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="myModalLabel"
                  aria-hidden="true"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content form-elegant">
                      <div
                        className="modal-header text-center"
                        style={{ borderBottom: "0 none" }}
                      >
                        <h3
                          className="modal-title w-100 dark-grey-text font-weight-bold my-1"
                          id="myModalLabel"
                        >
                          <strong>Post New Project</strong>
                        </h3>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <form
                        className="form-inside-input"
                        onSubmit={this.onPostProjectFormSubmit}
                      >
                        <div className="modal-body mx-4">
                          <div className="md-form mb-4">
                            <label
                              data-error="wrong"
                              data-success="right"
                              htmlFor="form-title"
                              style={{ fontWeight: "bold" }}
                            >
                              Project Title
                            </label>
                            <input
                              type="text"
                              placeholder="Give your project title, so your worker will know what it is about"
                              id="form-title"
                              name="form-title"
                              className="form-control validate"
                              onChange={this.handlePostProjectFormChange}
                              value={this.state["form-title"]}
                              required
                            />
                          </div>
                          <div className="md-form mb-4">
                            <label
                              data-error="wrong"
                              data-success="right"
                              htmlFor="form-description"
                              style={{ fontWeight: "bold" }}
                            >
                              Project Description
                            </label>
                            <textarea
                              id="form-description"
                              name="form-description"
                              value={this.state["form-description"]}
                              className="form-control validate"
                              placeholder="Elaborate more about your project, make sure your worker will understand what to be done about your project."
                              rows="4"
                              cols="50"
                              onChange={this.handlePostProjectFormChange}
                              required
                            />
                          </div>
                          <div className="md-form mb-4">
                            <label
                              data-error="wrong"
                              data-success="right"
                              htmlFor="form-category"
                              style={{ fontWeight: "bold", marginRight: "5px" }}
                            >
                              Category:{" "}
                            </label>
                            <select
                              name="form-category"
                              id="form-category"
                              onChange={this.handlePostProjectFormChange}
                              value={this.state["form-category"]}
                              required
                            >
                              <option value="none" disabled hidden></option>
                              {this.state.category ? (
                                this.state.category.map((data) => (
                                  <option key={data} value={data}>
                                    {data
                                      .replaceAll("-", " ")
                                      .replace(/\w\S*/g, (txt) => {
                                        return (
                                          txt.charAt(0).toUpperCase() +
                                          txt.substr(1).toLowerCase()
                                        );
                                      })}
                                  </option>
                                ))
                              ) : (
                                <option>Loading...</option>
                              )}
                            </select>
                          </div>
                          <div className="md-form mb-4">
                            <label
                              data-error="wrong"
                              data-success="right"
                              htmlFor="form-prize"
                              style={{ fontWeight: "bold" }}
                            >
                              How Much Total Prize in CLNC You Will Pay For
                              Worker?
                            </label>
                            <input
                              type="number"
                              step="any"
                              placeholder="Set it proportionally with task dificullities, your workers will love it!"
                              id="form-prize"
                              name="form-prize"
                              value={this.state["form-prize"]}
                              className="form-control validate"
                              onChange={this.handlePostProjectFormChange}
                              required
                            />
                          </div>
                          <div className="md-form mb-4">
                            <label
                              data-error="wrong"
                              data-success="right"
                              htmlFor="form-maxtime"
                              style={{ fontWeight: "bold" }}
                            >
                              How Much Time Limit You Will Set For This Project?
                            </label>
                            <input
                              type="number"
                              placeholder="After work is started, your worker will have time limit to submit the finished work"
                              id="form-maxtime"
                              name="form-maxtime"
                              value={this.state["form-maxtime"]}
                              className="form-control validate"
                              onChange={this.handlePostProjectFormChange}
                              required
                            />
                          </div>
                          <div className="md-form mb-4">
                            <label
                              data-error="wrong"
                              data-success="right"
                              htmlFor="form-maxrevision"
                              style={{ fontWeight: "bold" }}
                            >
                              How Much Revision You Will Tolerate?
                            </label>
                            <input
                              type="number"
                              placeholder="Specify how much time your worker can submit revision for their submission"
                              id="form-maxrevision"
                              name="form-maxrevision"
                              value={this.state["form-maxrevision"]}
                              className="form-control validate"
                              onChange={this.handlePostProjectFormChange}
                              required
                            />
                          </div>
                        </div>
                        <div
                          className="modal-footer mx-5 pt-3 mb-1 form-footer"
                          style={{ borderTop: "0 none" }}
                        >
                          <div className="row">
                            <div
                              className="col-auto form-fee"
                              style={{
                                marginRight: "5px",
                                maxWidth: "400px",
                                wordWrap: "break-word",
                              }}
                            >
                              <div
                                style={{
                                  textAlign: "right",
                                  color: "#8D99AE",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                }}
                              >
                                {"Commitment Fee: " +
                                  (this.state["form-prize"]
                                    ? utils
                                        .BigNum(this.state["form-prize"])
                                        .mul(
                                          MISCELLANEOUS.EMPLOYER_COMMITMENT_PERCENTAGE
                                        )
                                        .toString()
                                    : "0") +
                                  " CLNC"}
                              </div>
                              <div
                                style={{
                                  textAlign: "right",
                                  color: "#8D99AE",
                                  fontSize: "12px",
                                }}
                              >
                                Commitment fee will be kept until project is
                                finished. <br />
                                If you are folling around in this project, this
                                fee will never back
                              </div>
                            </div>
                            <div className="col">
                              <input
                                className="btn btn-primary border rounded-0 form-submit"
                                type="submit"
                                style={{
                                  backgroundColor: "#2B2D42",
                                  width: "200px",
                                }}
                                value="Post"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
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
