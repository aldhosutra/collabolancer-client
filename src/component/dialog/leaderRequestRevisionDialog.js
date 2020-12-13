import React from "react";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import { leaderRequestRevision } from "../../utils/transaction";
import leaderRequestRevisionLogo from "../../asset/undraw_feeling_blue_4b7q.svg";
import config from "../../config/config.json";
import "./modal.css";
import { Editor } from "@tinymce/tinymce-react";

class LeaderRequestRevisionDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      "form-reason": "",
    };
    this.handleLeaderRequestRevisionFormChange = this.handleLeaderRequestRevisionFormChange.bind(
      this
    );
    this.onLeaderRequestRevisionFormSubmit = this.onLeaderRequestRevisionFormSubmit.bind(
      this
    );
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleLeaderRequestRevisionFormChange(event) {
    const targetID = event.target.id;
    const targetValue = event.target.value;
    this.setState((state) => {
      return { ...state, [targetID]: targetValue };
    });
  }

  onLeaderRequestRevisionFormSubmit(e) {
    e.preventDefault();
    try {
      leaderRequestRevision(
        getSession("secret"),
        this.props.contribution,
        this.state["form-reason"]
      )
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Request Revision successfull, page will be reloaded after " +
                config.block_time / 1000 +
                " seconds!",
              {
                autoClose: config.block_time,
              }
            );
            this.setState((state) => {
              return {
                ...state,
                "form-reason": "",
              };
            });
            window
              .$(
                "#leader-request-revision-modal-" +
                  this.props.proposal.publicKey +
                  "-" +
                  this.props.id
              )
              .modal("hide");
            setTimeout(() => {
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
        "form-reason": content,
      };
    });
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={
            "#leader-request-revision-modal-" +
            this.props.proposal.publicKey +
            "-" +
            this.props.id
          }
          style={{
            paddingRight: "24px",
            paddingLeft: "24px",
            backgroundColor: "#EF233C",
            marginRight: "10px",
            fontFamily: "Poppins, sans-serif",
            marginBottom: "10px",
          }}
        >
          <strong>Request Revision</strong>
        </button>
        <div
          className="modal full fade"
          id={
            "leader-request-revision-modal-" +
            this.props.proposal.publicKey +
            "-" +
            this.props.id
          }
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content form-elegant">
              <div className="modal-header" style={{ borderBottom: "0 none" }}>
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
                onSubmit={this.onLeaderRequestRevisionFormSubmit}
              >
                <div className="modal-body mx-4">
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
                    src={leaderRequestRevisionLogo}
                  />
                  <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                    <strong>Request Revision on Contribution</strong>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Don't really like the contributed files?
                    <br />
                    Let's tell the Worker, so it will be fixed!
                  </p>
                  <div
                    className="border rounded-0"
                    style={{
                      marginTop: "10px",
                      marginBottom: "20px",
                      marginRight: "auto",
                      marginLeft: "auto",
                      width: "100px",
                    }}
                  />
                  <div className="md-form mb-4 text-left">
                    <p style={{ fontWeight: "bold" }}>Reason:</p>
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
                        {"Worker Still Have: " +
                          (
                            this.props.proposal.asset.term.maxRevision -
                            this.props.team.asset.contribution.length
                          ).toString() +
                          "  More Attempt!"}
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          color: "#8D99AE",
                          fontSize: "12px",
                        }}
                      >
                        Team contract status will be updated!
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
                        value="Request Revision"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeaderRequestRevisionDialog;
