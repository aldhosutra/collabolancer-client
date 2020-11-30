import React, { useMemo } from "react";
import { MISCELLANEOUS, STATUS } from "../../transactions/constants";
import { toast } from "react-toastify";
import { getSession } from "../../utils/tools";
import { submitContribution } from "../../utils/transaction";
import SubmitContributionLogo from "../../asset/undraw_upload_87y9.svg";
import Dropzone from "react-dropzone";
const base91 = require("node-base91");
const mime = require("mime-types");

class SubmitContributionDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      filename: "",
      filemime: "",
      fileextension: "",
      filedata: "",
    };
    this.onSubmitContribution = this.onSubmitContribution.bind(this);
  }

  onSubmitContribution() {
    try {
      submitContribution(
        getSession("secret"),
        this.props.team.publicKey,
        this.state.fileextension,
        this.state.filemime,
        this.state.filename,
        this.state.filedata
      )
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Submit contribution successfull, changes can be seen after up to 15 seconds!"
            );
            window
              .$(
                "#submit-contribution-" +
                  this.props.team.publicKey +
                  "-" +
                  this.props.id
              )
              .modal("hide");
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

  render() {
    if (
      !this.props.team ||
      !this.props.account ||
      this.props.account.address !== this.props.team.asset.worker ||
      ![STATUS.TEAM.SELECTED, STATUS.TEAM.REQUEST_REVISION].includes(
        this.props.team.asset.status
      )
    ) {
      return null;
    }
    return (
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={
            "#submit-contribution-" +
            this.props.team.publicKey +
            "-" +
            this.props.id
          }
          style={{
            backgroundColor: "rgb(239, 35, 60)",
            minWidth: "40px",
            marginTop: "auto",
            marginBottom: "auto",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <strong>Submit Contribution</strong>
        </button>
        <div
          className="modal fade"
          id={
            "submit-contribution-" +
            this.props.team.publicKey +
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
              <div
                className="modal-header text-center"
                style={{ borderBottom: "0 none" }}
              >
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
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
                  src={SubmitContributionLogo}
                />
                <h3
                  className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center"
                  id={"modal-label-" + this.props.team.publicKey}
                >
                  <strong>Submit Contribution</strong>
                </h3>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                  }}
                >
                  From Contribution to Collaboration
                  <br />
                  Submit Your Amazing Work!
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
                {this.state.filename !== "" ? (
                  <div
                    className="border rounded-0"
                    style={{ padding: "8px", minHeight: "120px" }}
                  >
                    <div
                      className="row"
                      style={{
                        marginLeft: "0px",
                        marginRight: "0px",
                        fontFamily: "Poppins, sans-serif",
                        minHeight: "102px",
                      }}
                    >
                      <div
                        className="col-lg-4 details"
                        style={{
                          color: "#EF233C",
                          border: "1px solid #EF233C",
                          margin: "auto",
                        }}
                      >
                        <p
                          style={{
                            overflowWrap: "break-word",
                            textAlign: "center",
                          }}
                        >
                          <strong style={{ fontSize: "30px" }}>
                            .{this.state.fileextension}
                          </strong>
                          <br />
                          {this.state.filemime}
                        </p>
                      </div>
                      <div
                        className="col-lg-6 details"
                        style={{ margin: "auto" }}
                      >
                        <p
                          style={{
                            overflowWrap: "break-word",
                            marginBottom: "5px",
                          }}
                        >
                          File to be Submitted:
                          <br />
                          <strong>{this.state.filename}</strong>
                          <br />
                          <strong>
                            ({parseInt(this.state.filedata.length) / 1000000}{" "}
                            MB)
                          </strong>
                        </p>
                      </div>
                      <div
                        className="col-lg-2 d-flex justify-content-center details"
                        style={{ margin: "auto" }}
                      >
                        <button
                          className="btn btn-primary border rounded-0 top-button"
                          type="button"
                          style={{
                            paddingRight: "24px",
                            paddingLeft: "24px",
                            backgroundColor: "#EF233C",
                            marginRight: "10px",
                            fontFamily: "Poppins, sans-serif",
                            marginBottom: "10px",
                          }}
                          onClick={() => {
                            this.setState((state) => {
                              return {
                                ...state,
                                filename: "",
                                filemime: "",
                                fileextension: "",
                                filedata: "",
                              };
                            });
                          }}
                        >
                          <strong>Delete</strong>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        const binaryStr = reader.result;
                        this.setState((state) => {
                          return {
                            ...state,
                            filename: acceptedFiles[0].name,
                            filemime: mime
                              .contentType(acceptedFiles[0].type)
                              .split(";")[0],
                            fileextension: mime.extension(
                              acceptedFiles[0].type
                            ),
                            filedata: base91.encode(binaryStr),
                          };
                        });
                      };
                      reader.readAsArrayBuffer(acceptedFiles[0]);
                    }}
                    maxFiles={1}
                    maxSize={1500000}
                  >
                    {({
                      getRootProps,
                      getInputProps,
                      isDragActive,
                      isDragAccept,
                      isDragReject,
                    }) => {
                      const style = useMemo(
                        () => ({
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "20px",
                          borderWidth: 2,
                          borderRadius: 2,
                          borderColor: "#eeeeee",
                          borderStyle: "dashed",
                          backgroundColor: "#fafafa",
                          color: "#bdbdbd",
                          outline: "none",
                          minHeight: "120px",
                          transition: "border .24s ease-in-out",
                          fontFamily: "Poppins, sans-serif",
                          ...(isDragActive
                            ? {
                                borderColor: "#2196f3",
                              }
                            : {}),
                          ...(isDragAccept
                            ? {
                                borderColor: "#00e676",
                              }
                            : {}),
                          ...(isDragReject
                            ? {
                                borderColor: "#ff1744",
                              }
                            : {}),
                        }),
                        [isDragActive, isDragReject, isDragAccept]
                      );
                      return (
                        <section className="container">
                          <div {...getRootProps({ style })}>
                            <input {...getInputProps()} />
                            <p
                              style={{
                                marginTop: "auto",
                                marginBottom: "auto",
                              }}
                            >
                              Drag 'n' drop some files here, or click to select
                              files, Max filesize is{" "}
                              {MISCELLANEOUS.FILE_MAXSIZE / 1000000} MB
                            </p>
                          </div>
                        </section>
                      );
                    }}
                  </Dropzone>
                )}
                <p
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    marginTop: "10px",
                    marginBottom: "0px",
                  }}
                >
                  {this.props.proposal.asset.term.maxRevision -
                    this.props.team.asset.contribution.length >
                  1
                    ? `You Have: ${
                        this.props.proposal.asset.term.maxRevision -
                        this.props.team.asset.contribution.length
                      } Remaining Attempt to Submit Contribution`
                    : "This is you Final Attempt to Submit Contribution!"}
                </p>
              </div>
              <div
                className="modal-footer mx-5 pt-3 mb-1"
                style={{ borderTop: "0 none", justifyContent: "center" }}
              >
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-primary border rounded-0 top-button"
                      style={{
                        backgroundColor: "rgb(239, 35, 60)",
                        marginTop: "auto",
                        marginBottom: "auto",
                        fontFamily: "Poppins, sans-serif",
                        width: "150px",
                      }}
                      onClick={() => {
                        this.onSubmitContribution();
                      }}
                    >
                      <strong>Submit</strong>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubmitContributionDialog;
