import React from "react";
import Loading from "../general/loading";
import NoData from "../general/nodata";
import Pagination from "../general/pagination";
import "../app/availableItemList.css";
import ActivityCard from "./activityCard";

class ProfileActivityList extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      prevPage: 1,
      activity: [],
      total: 0,
    };
    this.load = this.load.bind(this);
  }

  async load() {
    const limit = parseInt(this.props.limit) || 10;
    const offset = (this.state.page - 1) * limit;
    this.setState((state) => {
      return {
        ...state,
        activity: this.props.activityList.slice(offset, offset + limit),
        total: this.props.activityList.length,
      };
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
    return this.state.activity ? (
      this.state.activity.length > 0 ? (
        <div>
          {this.state.activity.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              minus={this.props.minus}
            />
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

export default ProfileActivityList;
