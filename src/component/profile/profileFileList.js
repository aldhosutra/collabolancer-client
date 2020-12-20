import React from "react";
import { getBatch } from "../../utils/tools";
import Loading from "../general/loading";
import NoData from "../general/nodata";
import Pagination from "../general/pagination";
import "../app/availableItemList.css";
import OwnedFileCard from "./ownedFileCard";

class ProfileFileList extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      prevPage: 1,
      files: [],
      total: 0,
    };
    this.load = this.load.bind(this);
  }

  async load() {
    const limit = parseInt(this.props.limit) || 10;
    const offset = (this.state.page - 1) * limit;
    await getBatch(this.props.publicKeyList.slice(offset, offset + limit))
      .then((response) => response.json())
      .then((data) => {
        this.setState((state) => {
          return {
            ...state,
            files: data.data,
            total: this.props.publicKeyList.length,
          };
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
    return this.state.files ? (
      this.state.files.length > 0 ? (
        <div>
          {this.state.files.map((file) => (
            <OwnedFileCard key={file.publicKey} file={file} />
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

export default ProfileFileList;
