import React from "react";
import NoData from "../general/nodata";
import Pagination from "../general/pagination";
import Dispute from "./dispute";

class VotedDisputeList extends React.Component {
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
    if (!this.props.account || !this.props.project) return null;
    let votedDisputes = this.props.project.asset.openedDisputes.filter(
      (item) =>
        item.asset.vote.litigant.indexOf(this.props.account.address) !== -1 ||
        item.asset.vote.defendant.indexOf(this.props.account.address) !== -1
    );
    const limit = this.state.itemPerPage;
    const pageCount = Math.ceil(votedDisputes.length / limit);
    const votedDisputesList = [];
    for (
      let i = (this.state.page - 1) * limit;
      i < (this.state.page - 1) * limit + limit;
      i++
    ) {
      if (i >= votedDisputes.length) break;
      votedDisputesList.push(
        <Dispute
          id={i}
          key={i}
          account={this.props.account}
          project={this.props.project}
          dispute={votedDisputes[i]}
        />
      );
    }
    return (
      <div>
        {votedDisputes.length > 0 ? (
          <div>
            {votedDisputesList}
            {votedDisputes.length > this.state.itemPerPage ? (
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
          <div
            style={{
              padding: "20px",
              borderWidth: 2,
              borderRadius: 2,
              borderColor: "#eeeeee",
              borderStyle: "dashed",
              marginBottom: "28px",
            }}
          >
            <NoData
              message="No Dispute That You Have Voted!"
              reload={"false"}
            />
          </div>
        )}
      </div>
    );
  }
}

export default VotedDisputeList;
