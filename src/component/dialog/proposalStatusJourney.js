import React from "react";
import proposalJourney from "../../asset/undraw_destinations_fpv7.svg";
import { STATUS } from "../../transactions/constants";

class ProposalStatusJourneyDialog extends React.PureComponent {
  render() {
    const proposalStatusData = [
      {
        status: STATUS.PROPOSAL.APPLIED,
        description:
          "The worker has submitted a proposal, and put down a security deposit as fee. It remains only to wait for the decision of the project employer, to determine the winning worker",
      },
      {
        status: STATUS.PROPOSAL.NOT_SELECTED,
        description:
          "This worker is declared not selected by the project employer. The fee is returned with a deduction based on the penalty fee in advance. The penalty is distributed to the winning worker.",
      },
      {
        status: STATUS.PROPOSAL.SELECTED,
        description:
          "This worker is declared selected, and ready to do the job. Workers also receive a portion of the penalty fee from other workers who are not selected",
      },
      {
        status: STATUS.PROPOSAL.SUBMITTED,
        description:
          "Workers have submitted the results of their work as submissions. The money has been sent to the proposal contract, and then awaits the result of the employer's decision",
      },
      {
        status: STATUS.PROPOSAL.REQUEST_REVISION,
        description:
          "The employer decides not to accept the previous submitted files. Because the worker still has the opportunity based on the maximum revised limit, so the project status is Requesting Revision. In this case, fund that previously transferred from project contract to proposal contract, are being sent back to project contract",
      },
      {
        status: STATUS.PROPOSAL.REJECTED,
        description:
          "The employer decides not to accept the previous job, because the worker does not have the opportunity based on the revised maximum limit, the worker (and his team) are rejected, and the project prize is not given",
      },
      {
        status: STATUS.PROPOSAL.DISPUTED,
        description:
          "The party (like team) who feels aggrieved in this proposal open a dispute, and the funds that are disputed between defendant and litigants are transferred to the dispute contract. Dispute will be open for specified time, and after that, dispute can be closed by anyone",
      },
      {
        status: STATUS.PROPOSAL.DISPUTE_CLOSED,
        description:
          "After dispute maximum opened days has been passed, dispute are closed, vote weight has been calculated and the winner has been decided. Fund will be transferred according to dispute provisions",
      },
      {
        status: STATUS.PROPOSAL.CLAIMED,
        description:
          "The proposal journey are finally done, bonus for each party is calculated according to contract, and funds from Fund Vault, Fee Vault and Bonus Vault are transferred to corresponding account",
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
                  alt="Proposal Journey"
                  src={proposalJourney}
                />
                <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-1 text-center">
                  <strong>Proposal Status Journey</strong>
                </h3>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                  }}
                >
                  {
                    "Understand your proposal status, and be part of that journey!"
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
                  {proposalStatusData.map((item) => {
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

export default ProposalStatusJourneyDialog;
