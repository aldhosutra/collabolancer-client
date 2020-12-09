import React from "react";
import LeaderDisputeDialog from "../dialog/leaderDispute";
import SubmitSubmissionDialog from "../dialog/submitSubmission";
import SubmissionList from "./submissionList";

class SubmittedWork extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
    };
  }

  render() {
    return (
      <div>
        <div
          style={{
            marginTop: "28px",
            backgroundColor: "#EF233C",
            paddingTop: "8px",
            paddingRight: "16px",
            paddingBottom: "8px",
            paddingLeft: "16px",
          }}
        >
          <h5
            data-toggle="collapse"
            aria-expanded="false"
            aria-controls="submitted-work"
            role="button"
            href="#submitted-work"
            onClick={() => {
              return this.setState({ collapsed: !this.state.collapsed });
            }}
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "rgb(255,255,255)",
            }}
          >
            <strong>
              {this.state.collapsed
                ? new DOMParser().parseFromString("&#11206;", "text/html").body
                    .textContent
                : new DOMParser().parseFromString("&#11208;", "text/html").body
                    .textContent}{" "}
              Leader's Submitted Work
            </strong>
          </h5>
        </div>
        <div
          id="submitted-work"
          className="border rounded-0 collapse show"
          style={{
            marginTop: 0,
            paddingTop: "8px",
            paddingRight: "16px",
            paddingBottom: "8px",
            paddingLeft: "16px",
          }}
        >
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "16px" }}
          >
            <SubmitSubmissionDialog
              id={this.props.id}
              prefix={this.props.prefix}
              project={this.props.project}
              proposal={this.props.proposal}
              account={this.props.account}
            />
            <LeaderDisputeDialog
              project={this.props.project}
              proposal={this.props.proposal}
              account={this.props.account}
            />
          </div>
          <SubmissionList
            project={this.props.project}
            proposal={this.props.proposal}
            account={this.props.account}
          />
        </div>
      </div>
    );
  }
}

export default SubmittedWork;
