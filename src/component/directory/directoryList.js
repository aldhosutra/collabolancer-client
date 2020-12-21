import React from "react";
import Loading from "../general/loading";
import NoData from "../general/nodata";
import Pagination from "../general/pagination";
import "../app/availableItemList.css";
import DirectoryCard from "./directoryCard";
const { getAddressFromPublicKey } = require("@liskhq/lisk-cryptography");

class DirectoryList extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      prevPage: 1,
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
    const limit = parseInt(this.props.limit) || 10;
    const pageCount = this.props.directory
      ? Math.ceil(this.props.directory.length / limit)
      : 0;
    const offset = (this.state.page - 1) * limit;
    return this.props.directory ? (
      this.props.directory.length > 0 ? (
        <div>
          {this.props.directory.slice(offset, offset + limit).map((item) => (
            <DirectoryCard key={item} address={getAddressFromPublicKey(item)} />
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
          <NoData reload={"false"} />
        </div>
      )
    ) : (
      <Loading />
    );
  }
}

export default DirectoryList;
