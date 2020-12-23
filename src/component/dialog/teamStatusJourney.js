import React from "react";
import teamJourney from "../../asset/undraw_destinations_fpv7.svg";
import { STATUS } from "../../transactions/constants";

class TeamStatusJourneyDialog extends React.PureComponent {
  render() {
    const teamStatusData = [
      {
        status: STATUS.TEAM.APPLIED,
        description:
          "The worker has joined a proposal, and put down a security deposit as fee. It remains only to wait for the decision of the project employer, to determine the winning worker",
      },
      {
        status: STATUS.TEAM.NOT_SELECTED,
        description:
          "This worker is declared not selected by the project employer. In the terms of the team contract, there is no reduction in the form of a penalty",
      },
      {
        status: STATUS.TEAM.SELECTED,
        description:
          "This worker is declared selected, together with other workers who are members of the same proposal, and ready to do the job. Workers also receive a portion of the penalty fee from other workers who are not selected",
      },
      {
        status: STATUS.TEAM.SUBMITTED,
        description:
          "Team have submitted the results of their work as contribution. The money has been sent from proposal contract to the team contract, and then awaits the result of the proposal leader decision",
      },
      {
        status: STATUS.TEAM.REQUEST_REVISION,
        description:
          "This could be because: Proposal Leader rejects the team's work, or it could be because the project employer rejects the team leader work. However, because the team still has the opportunity based on the maximum revision limit, the status becomes Request Revision. In this case, the fund that previously transferred from the proposal contract to the team contract, are being sent back to the proposal contract",
      },
      {
        status: STATUS.TEAM.REJECTED,
        description:
          "This could be because: Proposal Leader rejects the team's work, or it could be because the project employer rejects the team leader work. And, because the team had no opportunity based on the maximum revision limit, the team was rejected, and project prize were not given",
      },
      {
        status: STATUS.TEAM.DISPUTED,
        description:
          "The party who feels aggrieved in this team contract has opened a dispute, and the funds that are disputed between defendant and litigants are transferred to the dispute contract. Dispute will be open for specified time, and after that, dispute can be closed by anyone",
      },
      {
        status: STATUS.TEAM.DISPUTE_CLOSED,
        description:
          "After dispute maximum opened days has been passed, dispute are closed, vote weight has been calculated and the winner has been decided. Fund will be transferred according to dispute provisions",
      },
      {
        status: STATUS.TEAM.CLAIMED,
        description:
          "The team journey are finally done, bonus for each party is calculated according to contract, and funds from Fund Vault, Fee Vault and Bonus Vault are transferred to corresponding account",
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
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
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
                  alt="Solo Team"
                  src={teamJourney}
                />
                <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                  <strong>Team Status Journey</strong>
                </h3>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                  }}
                >
                  {"Understand your team status, and be part of that journey!"}
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
                  {teamStatusData.map((item) => {
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

export default TeamStatusJourneyDialog;
