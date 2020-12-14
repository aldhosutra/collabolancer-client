import React from "react";
import { MISCELLANEOUS } from "../../transactions/constants";
import { postProject } from "../../utils/transaction";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import PostProjectDialogLogo from "../../asset/undraw_hiring_cyhs.svg";
import config from "../../config/config.json";
import "./modal.css";
import { Editor } from "@tinymce/tinymce-react";
const { utils } = require("@liskhq/lisk-transactions");

class PostProjectDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      "form-title": "",
      "form-description": "",
      "form-category": "none",
      "form-prize": "",
      "form-maxtime": "",
      "form-maxrevision": "",
    };
    this.handlePostProjectFormChange = this.handlePostProjectFormChange.bind(
      this
    );
    this.onPostProjectFormSubmit = this.onPostProjectFormSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handlePostProjectFormChange(event) {
    const targetID = event.target.id;
    const targetValue = event.target.value;
    this.setState((state) => {
      return { ...state, [targetID]: targetValue };
    });
  }

  onPostProjectFormSubmit(e) {
    if (!this.state.clicked) {
      this.setState((state) => {
        return {
          ...state,
          clicked: true,
        };
      });
    } else {
      return;
    }
    e.preventDefault();
    try {
      postProject(
        getSession("secret"),
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
              "Post project successfull, page will be reloaded after " +
                config.block_time / 1000 +
                " seconds!, click this to cancel auto reload",
              {
                autoClose: config.block_time,
                closeButton: false,
                pauseOnHover: false,
                draggable: false,
                onClick: () => {
                  clearTimeout(reloader);
                },
              }
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
            let reloader = setTimeout(() => {
              window.location.reload();
            }, config.block_time);
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
    this.setState((state) => {
      return {
        ...state,
        clicked: false,
      };
    });
  }

  componentDidMount() {
    window.$(document).on("focusin", function (e) {
      if (
        window
          .$(e.target)
          .closest(
            ".tox-tinymce, .tox-tinymce-aux, .moxman-window, .tam-assetmanager-root"
          ).length
      ) {
        e.stopImmediatePropagation();
      }
    });
  }

  handleEditorChange = (content, editor) => {
    this.setState((state) => {
      return {
        ...state,
        "form-description": content,
      };
    });
  };

  render() {
    return (
      <div>
        <div className="col">
          <div className="d-flex justify-content-end justify-content-xl-end">
            <button
              className="btn btn-primary border rounded-0 top-button"
              type="button"
              data-toggle="modal"
              data-target="#postProject"
              style={{
                backgroundColor: "#d90429",
                width: "250px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Post New Project
            </button>
          </div>
          <div
            className="modal full fade"
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
                  <div className="container">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                </div>
                <form
                  className="form-inside-input"
                  onSubmit={this.onPostProjectFormSubmit}
                >
                  <div className="modal-body mx-4">
                    <div className="container">
                      <img
                        role="status"
                        style={{
                          width: "180px",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginBottom: "16px",
                          display: "block",
                        }}
                        alt="Solo Proposal"
                        src={PostProjectDialogLogo}
                      />
                      <h3
                        className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center"
                        id="myModalLabel"
                      >
                        <strong>Post New Project</strong>
                      </h3>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          textAlign: "center",
                        }}
                      >
                        Setup Project that Act as a Contract,
                        <br />
                        Describe your Provision and Requirement Below!
                      </p>
                      <div
                        className="border rounded-0 text-center"
                        style={{
                          marginTop: "10px",
                          marginBottom: "20px",
                          marginRight: "auto",
                          marginLeft: "auto",
                          width: "100px",
                        }}
                      />
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
                        <p style={{ fontWeight: "bold" }}>
                          Project Description
                        </p>
                        <Editor
                          init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | image bullist numlist outdent indent | removeformat | help",
                          }}
                          onEditorChange={this.handleEditorChange}
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
                          {this.props.category ? (
                            this.props.category.map((data) => (
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
                          How Much Total Prize in CLNC You Will Pay For Worker?
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
                  </div>
                  <div className="container">
                    <div
                      className="modal-footer pt-3 mb-1 form-footer"
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
                            If you are fooling around in this project, this fee
                            will never back
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostProjectDialog;
