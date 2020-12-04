import React from "react";
import { STATUS } from "../../transactions/constants";

class TeamDisputeDialog extends React.Component {
  render() {
    if (
      /* [
            STATUS.PROJECT.FINISHED,
            STATUS.PROJECT.TERMINATED,
            STATUS.PROJECT.DISPUTED,
            STATUS.PROJECT.DISPUTE_CLOSED,
        ].includes(this.props.project.asset.status) && */
      !this.props.team ||
      !this.props.account ||
      this.props.account.address !== this.props.team.asset.worker ||
      ![STATUS.TEAM.REJECTED].includes(this.props.team.asset.status)
    ) {
      return null;
    }
    return (
      <div>
        <button
          className="btn btn-primary border rounded-0 top-button"
          type="button"
          style={{
            paddingRight: "24px",
            paddingLeft: "24px",
            backgroundColor: "#EF233C",
            fontFamily: "Poppins, sans-serif",
            marginBottom: "10px",
          }}
        >
          <strong>Open Dispute</strong>
        </button>
      </div>
    );
  }
}

export default TeamDisputeDialog;
