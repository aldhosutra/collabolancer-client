import React from "react";
import { getOpenedDisputes } from "../../utils/tools";
import Loading from "../general/loading";
import NoData from "../general/nodata";
import Pagination from "../general/pagination";
import DisputeCard from "../dispute/disputeCard";

class AvailableDisputeList extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      prevPage: 1,
      disputes: [],
      total: 0,
    };
    this.load = this.load.bind(this);
  }

  async load() {
    const limit = parseInt(this.props.limit) || 10;
    const offset = (this.state.page - 1) * limit;
    await getOpenedDisputes(offset, limit)
      .then((response) => response.json())
      .then((data) => {
        this.setState((state) => {
          return { ...state, disputes: data.data, total: data.meta.count };
        });
      });
  }

  componentDidUpdate() {
    if (this.state.prevPage !== this.state.page) {
      this.load();
      this.setState((state) => {
        return { ...state, prevPage: state.page };
      });
    }
  }

  componentDidMount() {
    this.load();
  }

  render() {
    const limit = parseInt(this.props.limit) || 10;
    const pageCount = Math.ceil(this.state.total / limit);
    return this.state.disputes ? (
      this.state.disputes.length > 0 ? (
        <div>
          {this.state.disputes.map((dispute) => (
            <DisputeCard key={dispute.publicKey} dispute={dispute} />
          ))}
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
        <NoData />
      )
    ) : (
      <Loading />
    );
  }
}

export default AvailableDisputeList;
