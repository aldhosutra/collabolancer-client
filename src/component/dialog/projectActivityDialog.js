import React from "react";
import ProjectActivityLogo from "../../asset/undraw_Activity_tracker_re_2lvv.svg";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActivityCard from "../profile/activityCard";

class ProjectActivityDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      index: "litigant",
    };
  }

  render() {
    return (
      <div className="d-flex justify-content-center justify-content-lg-center">
        <div
          className=""
          type="button"
          data-toggle="modal"
          data-target={"#project-activity-" + this.props.project.publicKey}
          style={{
            fontFamily: "Poppins, sans-serif",
            marginLeft: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={"info-circle"}
            size="lg"
            color="#ef233c"
            title="Activity Details"
          />
        </div>
        <div
          className="modal full fade"
          id={"project-activity-" + this.props.project.publicKey}
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
                    src={ProjectActivityLogo}
                  />
                  <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                    <strong>Project Activity</strong>
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    How's the Project Going? Let's Check it Out!
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
                  <h6
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      marginTop: "32px",
                    }}
                  >
                    <strong>Project Activity List:</strong>
                  </h6>
                  <div
                    style={{
                      marginTop: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    {this.props.project.asset.activity.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        noBalance={true}
                      />
                    ))}
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

export default ProjectActivityDialog;
