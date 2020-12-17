import React from "react";
import NoData from "../general/nodata";
import Pagination from "../general/pagination";
import Dispute from "./dispute";

class ClosedDisputeList extends React.Component {
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
    let closedDisputes = this.props.project.asset.closedDisputes;
    const limit = this.state.itemPerPage;
    const pageCount = Math.ceil(closedDisputes.length / limit);
    const closedDisputesList = [];
    for (
      let i = (this.state.page - 1) * limit;
      i < (this.state.page - 1) * limit + limit;
      i++
    ) {
      if (i >= closedDisputes.length) break;
      closedDisputesList.push(
        <Dispute
          id={i}
          key={i}
          account={this.props.account}
          project={this.props.project}
          proposal={closedDisputes[i]}
        />
      );
    }
    return (
      <div>
        {closedDisputes.length > 0 ? (
          <div>
            {closedDisputesList}
            {closedDisputes.length > this.state.itemPerPage ? (
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
            <NoData message="No Dispute Has Been Closed!" reload={"false"} />
          </div>
        )}
      </div>
    );
  }
}

export default ClosedDisputeList;
