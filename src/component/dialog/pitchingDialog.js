import React from "react";
import PitchingLogo from "../../asset/undraw_all_the_data_h4ki.svg";
import { STATUS } from "../../transactions/constants";
import { renderAvatar } from "../avatar";
import StartWorkButton from "./startWorkButton";
import "./modal.css";
import { profileParser } from "../../utils/tools";
import parse from "html-react-parser";

class PitchingDialog extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  render() {
    let hireMe = "";
    let hireCheckbox = <div></div>;
    if (
      this.props.account &&
      this.props.account.address === this.props.project.asset.employer &&
      this.props.project.asset.status === STATUS.PROJECT.OPEN
    ) {
      hireMe = " / Hire Me";
      hireCheckbox = (
        <div style={{ paddingLeft: "24px" }}>
          <input
            className="form-check-input"
            type="checkbox"
            id={"check-" + this.props.proposal.publicKey}
            onChange={(event) =>
              this.setState({
                checked: event.target.checked,
              })
            }
          />
          <label
            className="form-check-label"
            htmlFor={"check-" + this.props.proposal.publicKey}
          >
            I have read this worker pitching, and I want to hire this worker!
          </label>
        </div>
      );
    }
    return (
      <div className="d-flex justify-content-center justify-content-lg-center details">
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          data-toggle="modal"
          data-target={"#modal-" + this.props.proposal.publicKey}
          style={{
            marginRight: "8px",
            backgroundColor: "#2B2D42",
            margin: "auto",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <strong>Pitching{hireMe}</strong>
        </button>
        <div
          className="modal full fade"
          id={"modal-" + this.props.proposal.publicKey}
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
              <div className="modal-body">
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
                    alt="Pitching Logo"
                    src={PitchingLogo}
                  />
                  <h3
                    className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center"
                    id={"modal-label-" + this.props.proposal.publicKey}
                  >
                    <strong>Why Should I Be Hired?</strong>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    {
                      "This is to show the Employer, how amazing this worker are!"
                    }
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
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                        this.props.proposal.asset.leader,
                        250
                      )}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "left",
                      paddingLeft: "30px",
                    }}
                  >
                    <strong>
                      {profileParser(this.props.proposal.asset.leader, () => {
                        window.$(".modal").modal("hide");
                        window.$(".modal-backdrop").remove();
                      })}
                    </strong>
                  </p>
                  <div className="text-justify">
                    {parse(this.props.proposal.asset.pitching)}
                  </div>
                  {hireCheckbox}
                </div>
              </div>
              <div className="container">
                <div className="modal-footer" style={{ borderTop: "0 none" }}>
                  <button
                    className="btn btn-light"
                    type="button"
                    data-dismiss="modal"
                    style={{
                      width: "150px",
                      backgroundColor: "#2B2D42",
                      color: "rgb(255,255,255)",
                    }}
                  >
                    OK
                  </button>
                  <StartWorkButton
                    enabled={this.state.checked}
                    proposal={this.props.proposal}
                    account={this.props.account}
                    project={this.props.project}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PitchingDialog;
