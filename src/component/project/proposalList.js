import React from "react";
import { ACCOUNT } from "../../transactions/constants";
import NoData from "../general/nodata";
import Proposal from "./proposal";

import PostProposalDialog from "../dialog/postProposalDialog";
import Pagination from "../general/pagination";

class ProposalList extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
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
    const limit = this.state.itemPerPage;
    const pageCount = Math.ceil(
      this.props.project.asset.proposal.length / limit
    );
    const proposalList = [];
    for (
      let i = (this.state.page - 1) * limit;
      i < (this.state.page - 1) * limit + limit;
      i++
    ) {
      if (i >= this.props.project.asset.proposal.length) break;
      proposalList.push(
        <Proposal
          id={i}
          key={i}
          account={this.props.account}
          project={this.props.project}
          proposal={this.props.project.asset.proposal[i]}
        />
      );
    }
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
              style={{ marginBottom: "8px" }}
            >
              {actionButton}
            </div>
            {this.props.project.asset.proposal.length > 0 ? (
              <div>
                {proposalList}
                {this.props.project.asset.proposal.length >
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
              <NoData message="No Proposal Has Applied!" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalList;
