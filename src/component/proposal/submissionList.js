import React from "react";
import { STATUS } from "../../transactions/constants";
import WorkingOnIt from "./workingOnIt";
import WorkItem from "../general/workItem";
import Pagination from "../general/pagination";

class SubmissionList extends React.Component {
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
    const messageWidget =
      this.props.proposal.asset.status === STATUS.PROPOSAL.SELECTED ? (
        <WorkingOnIt />
      ) : null;
    const workItemList = [];
    const limit = this.state.itemPerPage;
    const pageCount = Math.ceil(
      this.props.project.asset.submission.length / limit
    );
    for (
      let i = (this.state.page - 1) * limit;
      i < (this.state.page - 1) * limit + limit;
      i++
    ) {
      if (i >= this.props.project.asset.submission.length) break;
      const submission = this.props.project.asset.submission[i];
      const statusNote = this.props.project.asset.statusNote.filter(
        (item) => item.submission === submission.publicKey
      )[0];
      workItemList.push(
        <WorkItem
          key={i}
          id={i}
          type={"submission"}
          maxTime={this.props.project.asset.maxTime}
          workStarted={this.props.project.asset.workStarted}
          target={this.props.project}
          source={this.props.proposal}
          account={this.props.account}
          supervisor={this.props.proposal.asset.employer}
          file={submission}
          note={statusNote}
        />
      );
    }
    return (
      <div>
        {messageWidget === null ? (
          <div>
            <p style={{ fontFamily: "Poppins, sans-serif" }}>
              <strong>Submission List:</strong>
            </p>
            {workItemList}
            {this.props.project.asset.submission.length >
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

export default SubmissionList;
