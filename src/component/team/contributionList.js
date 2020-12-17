import React from "react";
import { STATUS } from "../../transactions/constants";
import WaitingToWork from "../proposal/waitingToWork";
import TeamNotSelected from "./teamNotSelected";
import WorkingOnIt from "../proposal/workingOnIt";
import WorkItem from "../general/workItem";
import Pagination from "../general/pagination";

class ContributionList extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      prevPage: 1,
      itemPerPage: 5,
    };
  }

  componentDidUpdate() {
    if (this.state.prevPage !== this.state.page) {
      this.setState((state) => {
        return { ...state, prevPage: state.page };
      });
    }
  }

  render() {
    let messageWidget;
    switch (this.props.team.asset.status) {
      case STATUS.TEAM.APPLIED:
        messageWidget = <WaitingToWork />;
        break;
      case STATUS.TEAM.NOT_SELECTED:
        messageWidget = <TeamNotSelected />;
        break;
      case STATUS.TEAM.SELECTED:
        messageWidget = <WorkingOnIt />;
        break;
      default:
        messageWidget = null;
        break;
    }
    const workItemList = [];
    const limit = this.state.itemPerPage;
    const pageCount = Math.ceil(
      this.props.team.asset.contribution.length / limit
    );
    for (
      let i = (this.state.page - 1) * limit;
      i < (this.state.page - 1) * limit + limit;
      i++
    ) {
      if (i >= this.props.team.asset.contribution.length) break;
      const contribution = this.props.team.asset.contribution[i];
      const statusNote = this.props.team.asset.statusNote.filter(
        (item) => item.contribution === contribution.publicKey
      )[0];
      workItemList.push(
        <WorkItem
          key={i}
          id={i}
          type={"contribution"}
          maxTime={this.props.maxTime}
          workStarted={this.props.workStarted}
          target={this.props.proposal}
          source={this.props.team}
          account={this.props.account}
          supervisor={this.props.proposal.asset.leader}
          file={contribution}
          note={statusNote}
        />
      );
    }
    return (
      <div>
        {messageWidget === null ? (
          <div>
            <p style={{ fontFamily: "Poppins, sans-serif" }}>
              <strong>Contribution List:</strong>
            </p>
            {workItemList}
            {this.props.team.asset.contribution.length >
            this.state.itemPerPage ? (
              <div style={{ marginTop: "16px" }}>
                <Pagination
                  currentPage={this.state.page}
                  totalCount={pageCount}
                  callback={(selected) => {
                    this.setState((state) => {
                      return { ...state, page: selected };
                    });
                  }}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div>{messageWidget}</div>
        )}
      </div>
    );
  }
}

export default ContributionList;
