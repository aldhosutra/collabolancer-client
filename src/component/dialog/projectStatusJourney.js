import React from "react";
import ProjectJourney from "../../asset/undraw_destinations_fpv7.svg";
import { MISCELLANEOUS, STATUS } from "../../transactions/constants";

class ProjectStatusJourneyDialog extends React.PureComponent {
  render() {
    const projectStatusData = [
      {
        status: STATUS.PROJECT.OPEN,
        description:
          "The project has been created, and employer has sent the prize and fee to project contract. Project is open to all workers to participate in making proposals, and registering as potential winners",
      },
      {
        status: STATUS.PROJECT.WORKING,
        description:
          "The project employer has selected the worker and / or team as the winner of the project, the worker and / without his team can start working on the project according to the requirements",
      },
      {
        status: STATUS.PROJECT.SUBMITTED,
        description:
          "The worker (leader) has sent the result of his work as an application, the employer needs to review it and then decide to accept or request revision / refusal of the proposed job. Because the workers have done their job, funds are temporarily transferred from the project contract to the proposal contract",
      },
      {
        status: STATUS.PROJECT.REQUEST_REVISION,
        description:
          "The employer decides not to accept the previous submitted files. Because the worker still has the opportunity based on the maximum revised limit, so the project status is Requesting Revision. In this case, fund that previously transferred from project contract to proposal contract, are being sent back to project contract",
      },
      {
        status: STATUS.PROJECT.REJECTED,
        description:
          "The employer decides not to accept the previous job, because the worker does not have the opportunity based on the revised maximum limit, the worker (and his team) are rejected, and the project prize is not given. Rejected Project need to be marked as refused to be able to proceed.",
      },
      {
        status: STATUS.PROJECT.REFUSED,
        description:
          "The project status is rejected, and marked refused, and a dispute can be opened by the party with the objection within the initial time limit of: " +
          MISCELLANEOUS.FUND_FREEZED_PERIOD / 60 / 60 / 24 +
          " day(s)",
      },
      {
        status: STATUS.PROJECT.FINISHED,
        description:
          "Employer accept the submitted work. On the other hand, Worker's team have opportunity to open a dispute if they have objection to the leader within the initial time limit of: " +
          MISCELLANEOUS.FUND_FREEZED_PERIOD / 60 / 60 / 24 +
          " day(s)",
      },
      {
        status: STATUS.PROJECT.CANCELLED,
        description:
          "The worker cann't submit work or submit revision after maximum working time limit has passed, so employer decided to cancel the project, fund is transferred back to project contract, and team fee are returned. This status is final, so no one can open a dispute",
      },
      {
        status: STATUS.PROJECT.TERMINATED,
        description:
          "Workers have submitted submissions or revisions, but after: " +
          (
            MISCELLANEOUS.SUBMIT_TO_TERMINATE_MIN_PERIOD /
            60 /
            60 /
            24
          ).toString() +
          " day(s) or after the deadline specified in the project contract, the employer does accept the submission. Therefore, workers decide to terminate the project, and funds from the employer are sent to workers according to the portion and the provisions. This status is final, so dispute can't be opened after termination",
      },
      {
        status: STATUS.PROJECT.DISPUTED,
        description:
          "The party who feels aggrieved in this project open a dispute, and the funds that are disputed between defendant and litigants are transferred to the dispute contract. Dispute will be open for specified time, and after that, dispute can be closed by anyone",
      },
      {
        status: STATUS.PROJECT.DISPUTE_CLOSED,
        description:
          "After dispute maximum opened days has been passed, dispute are closed, vote weight has been calculated and the winner has been decided. Fund will be transferred according to dispute provisions",
      },
      {
        status: STATUS.PROJECT.CLAIMED,
        description:
          "The project journey are finally done, bonus for each party is calculated according to contract, and funds from Fund Vault, Fee Vault and Bonus Vault are transferred to corresponding account",
      },
    ];
    return (
      <div>
        <div
          className="modal fade"
          id={this.props.id}
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
                  alt="Project Journey"
                  src={ProjectJourney}
                />
                <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                  <strong>Project Status Journey</strong>
                </h3>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                  }}
                >
                  {
                    "Understand your project status, and be part of that journey!"
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
                <div
                  style={{
                    overflow: "scroll",
                    overflowX: "hidden",
                    height: "200px",
                  }}
                >
                  {projectStatusData.map((item) => {
                    return (
                      <div
                        key={item.status}
                        className="row"
                        style={{
                          width: "100%",
                          padding: "8px",
                          backgroundColor:
                            this.props.current === item.status
                              ? "#ef233c"
                              : "white",
                          color:
                            this.props.current === item.status
                              ? "white"
                              : "inherit",
                        }}
                      >
                        <div className="col-lg-4">
                          <h5 style={{ fontFamily: "Poppins, sans-serif" }}>
                            <strong>
                              {item.status
                                .replaceAll("-", " ")
                                .replace(/\w\S*/g, (txt) => {
                                  return (
                                    txt.charAt(0).toUpperCase() +
                                    txt.substr(1).toLowerCase()
                                  );
                                })}
                            </strong>
                          </h5>
                        </div>
                        <div className="col">
                          <p style={{ fontFamily: "Poppins, sans-serif" }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                        window.$("#" + this.props.id).modal("hide");
                      }}
                    >
                      <strong>OK</strong>
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

export default ProjectStatusJourneyDialog;
