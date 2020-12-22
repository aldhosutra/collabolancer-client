import React from "react";
import * as constants from "@liskhq/lisk-constants";
import StatusNoteLogo from "../../asset/undraw_ideas_s70l.svg";
import "./modal.css";
import parse from "html-react-parser";
import dateFormat from "dateformat";

class StatusNoteDialog extends React.Component {
  render() {
    return (
      <div>
        <div
          className="modal full fade"
          id={this.props.id}
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content form-elegant">
              <div className="modal-header" style={{ borderBottom: "0 none" }}>
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
                    alt="Status Note"
                    src={StatusNoteLogo}
                  />
                  <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                    <strong>This is What The Reviewer Thinks!</strong>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Everyone want's best result!
                    <br />
                    Find out how to get closer to that!
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
                    <div>
                      <p style={{ margin: "0px" }}>
                        <strong>
                          {"["}
                          {this.props.note.status
                            .replaceAll("-", " ")
                            .replace(/\w\S*/g, (txt) => {
                              return (
                                txt.charAt(0).toUpperCase() +
                                txt.substr(1).toLowerCase()
                              );
                            })}
                          {"]"}
                        </strong>
                      </p>
                      <p
                        style={{
                          color: "#EF233C",
                          fontSize: "12px",
                          marginBottom: "0px",
                        }}
                      >
                        {dateFormat(
                          new Date(
                            (constants.EPOCH_TIME_SECONDS +
                              this.props.note.time) *
                              1000
                          ),
                          "mmmm dS, yyyy - h:MM:ss TT"
                        )}
                      </p>
                      <div
                        className="text-justify"
                        style={{
                          margin: "0px",
                        }}
                      >
                        {parse(this.props.note.reason)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div
                  className="modal-footer pt-3 mb-1 form-footer"
                  style={{ borderTop: "0 none", justifyContent: "center" }}
                >
                  <div className="row">
                    <div className="col">
                      <button
                        className="btn btn-primary border rounded-0"
                        style={{
                          backgroundColor: "#2B2D42",
                          width: "200px",
                        }}
                        data-dismiss="modal"
                      >
                        OK
                      </button>
                    </div>
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

export default StatusNoteDialog;
