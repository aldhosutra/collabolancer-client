import React from "react";
import { ACCOUNT } from "../../transactions/constants";
import NoData from "../general/nodata";
import Proposal from "./proposal";

import PostProposalDialog from "../dialog/postProposalDialog";

class ProposalList extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
    };
  }

  render() {
    let actionButton = null;
    if (
      this.props.account &&
      this.props.project &&
      this.props.account.address === this.props.project.asset.employer &&
      this.props.project.asset.proposal.length > 0
    ) {
      actionButton = (
        <div>
          <button
            className="btn btn-primary border rounded-0 top-button"
            type="button"
            style={{
              paddingRight: "24px",
              paddingLeft: "24px",
              backgroundColor: "#EF233C",
              marginRight: "10px",
              fontFamily: "Poppins, sans-serif",
              marginBottom: "10px",
            }}
          >
            <strong>Choose Winner!</strong>
          </button>
        </div>
      );
    } else if (
      this.props.account &&
      this.props.project &&
      this.props.account.asset.type === ACCOUNT.WORKER &&
      !this.props.project.asset.proposal
        .map((item) => item.asset.leader)
        .includes(this.props.account.address)
    ) {
      actionButton = <PostProposalDialog project={this.props.project} />;
    }
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
            aria-controls="proposal-list"
            role="button"
            href="#proposal-list"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "rgb(255,255,255)",
            }}
            onClick={() => {
              return this.setState((state) => {
                return { ...state, collapsed: !this.state.collapsed };
              });
            }}
          >
            <strong>
              {this.state.collapsed
                ? new DOMParser().parseFromString("&#11206;", "text/html").body
                    .textContent
                : new DOMParser().parseFromString("&#11208;", "text/html").body
                    .textContent}{" "}
              Proposal ({this.props.project.asset.proposal.length})
            </strong>
          </h5>
        </div>
        <div id="proposal-list" className="collapse show">
          <div
            className="border rounded-0"
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
              {actionButton}
            </div>
            {this.props.project.asset.proposal.length > 0 ? (
              <Proposal />
            ) : (
              <NoData message="No Proposal Has Applied!" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalList;
