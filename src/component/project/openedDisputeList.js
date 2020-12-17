import React from "react";
import NoData from "../general/nodata";
import Pagination from "../general/pagination";
import Dispute from "./dispute";

class OpenedDisputeList extends React.Component {
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
    let openedDisputes = this.props.project.asset.openedDisputes;
    const limit = this.state.itemPerPage;
    const pageCount = Math.ceil(openedDisputes.length / limit);
    const openedDisputesList = [];
    for (
      let i = (this.state.page - 1) * limit;
      i < (this.state.page - 1) * limit + limit;
      i++
    ) {
      if (i >= openedDisputes.length) break;
      openedDisputesList.push(
        <Dispute
          id={i}
          key={i}
          account={this.props.account}
          project={this.props.project}
          proposal={openedDisputes[i]}
        />
      );
    }
    return (
      <div>
        {openedDisputes.length > 0 ? (
          <div>
            {openedDisputesList}
            {openedDisputes.length > this.state.itemPerPage ? (
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
            <NoData message="No Dispute Opened!" reload={"false"} />
          </div>
        )}
      </div>
    );
  }
}

export default OpenedDisputeList;
