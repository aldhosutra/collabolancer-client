import React from "react";
import { ACCOUNT, STATUS } from "../../transactions/constants";
import NoData from "../general/nodata";
import Proposal from "./proposal";

import PostProposalDialog from "../dialog/postProposalDialog";
import Pagination from "../general/pagination";
import ChooseWinnerGuideDialog from "../dialog/ChooseWinnerGuideDialog";

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

  componentDidMount() {
    if (this.props.project.asset.status !== STATUS.PROJECT.OPEN) {
      this.setState((state) => {
        return {
          ...state,
          collapsed: false,
        };
      });
    }
  }

  componentDidUpdate() {
    if (this.state.prevPage !== this.state.page) {
      this.setState((state) => {
        return { ...state, prevPage: state.page };
      });
    }
  }

  render() {
    let proposalData = this.props.project.asset.proposal;
    if (this.props.project.asset.status !== STATUS.PROJECT.OPEN) {
      proposalData = proposalData.filter(
        (item) => item.publicKey !== this.props.project.asset.winner
      );
    }
    const limit = this.state.itemPerPage;
    const pageCount = Math.ceil(proposalData.length / limit);
    const proposalList = [];
    for (
      let i = (this.state.page - 1) * limit;
      i < (this.state.page - 1) * limit + limit;
      i++
    ) {
      if (i >= proposalData.length) break;
      proposalList.push(
        <Proposal
          id={i}
          key={i}
          account={this.props.account}
          project={this.props.project}
          proposal={proposalData[i]}
        />
      );
    }
    let actionButton = null;
    if (
      this.props.account &&
      this.props.project &&
      this.props.account.address === this.props.project.asset.employer &&
      proposalData.length > 0 &&
      this.props.project.asset.status === STATUS.PROJECT.OPEN
    ) {
      actionButton = <ChooseWinnerGuideDialog project={this.props.project} />;
    } else if (
      this.props.account &&
      this.props.project &&
      this.props.account.asset.type === ACCOUNT.WORKER &&
      this.props.project.asset.status === STATUS.PROJECT.OPEN &&
      !proposalData
        .map((item) => item.asset.leader)
        .includes(this.props.account.address)
    ) {
      actionButton = <PostProposalDialog project={this.props.project} />;
    }
    return (
      <div>
        {this.props.project.asset.status !== STATUS.PROJECT.OPEN ? (
          <div>
            <div
              className="border rounded-0 text-center"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                marginRight: "auto",
                marginLeft: "auto",
                width: "100px",
              }}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div
          style={{
            marginTop: "28px",
            backgroundColor:
              this.props.project.asset.status === STATUS.PROJECT.OPEN
                ? "#EF233C"
                : "#2B2D42",
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
              {this.props.project.asset.status === STATUS.PROJECT.OPEN
                ? "Proposal [" + proposalData.length + "]"
                : "Previously Applied Proposals"}
            </strong>
          </h5>
        </div>
        <div
          id="proposal-list"
          className={
            "collapse" +
            (this.props.project.asset.status === STATUS.PROJECT.OPEN
              ? " show"
              : "")
          }
        >
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
              className="d-flex justify-content-center justify-content-md-end"
              style={{ marginBottom: "8px" }}
            >
              {actionButton}
            </div>
            {proposalData.length > 0 ? (
              <div>
                {proposalList}
                {proposalData.length > this.state.itemPerPage ? (
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
              <NoData
                message={
                  this.props.project.asset.status !== STATUS.PROJECT.OPEN
                    ? "No Other Applied Proposal!"
                    : "No Proposal Has Applied!"
                }
                reload={"false"}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalList;
