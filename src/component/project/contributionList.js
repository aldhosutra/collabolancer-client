import React from "react";
import { STATUS } from "../../transactions/constants";
import WaitingToWork from "./waitingToWork";
import TeamNotSelected from "./teamNotSelected";
import WorkingOnIt from "./workingOnIt";
import WorkItem from "./workItem";

class ContributionList extends React.Component {
  render() {
    let messageWidget;
    switch (this.props.team.asset.status) {
      case STATUS.TEAM.APPLIED:
        messageWidget = <WaitingToWork />;
        break;
      case STATUS.TEAM.NOT_SELECTED:
        messageWidget = <TeamNotSelected />;
        break;
      case STATUS.TEAM.REQUEST_REVISION:
        messageWidget = <WorkingOnIt />;
        break;
      case STATUS.TEAM.SELECTED:
        messageWidget = <WorkingOnIt />;
        break;
      default:
        messageWidget = null;
        break;
    }
    return (
      <div>
        {messageWidget === null ? (
          <div>
            <p style={{ fontFamily: "Poppins, sans-serif" }}>
              Contribution List:
            </p>
            <WorkItem />
          </div>
        ) : (
          <div>{messageWidget}</div>
        )}
      </div>
    );
  }
}

export default ContributionList;
