import React from "react";
import { getBatch } from "../../utils/tools";
import Loading from "../general/loading";
import NoData from "../general/nodata";
import Pagination from "../general/pagination";
import ProjectCard from "../project/projectCard";
import "../app/availableItemList.css";

class ProfileProjectList extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      prevPage: 1,
      projects: [],
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
            projects: data.data,
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
    return this.state.projects ? (
      this.state.projects.length > 0 ? (
        <div>
          {this.state.projects.map((project) => (
            <ProjectCard key={project.publicKey} project={project} />
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

export default ProfileProjectList;
