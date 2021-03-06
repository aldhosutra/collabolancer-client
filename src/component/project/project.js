import React from "react";
import Header from "../general/header";
import {
  getAccounts,
  getProject,
  getSession,
  guestProfile,
  parseDocumentTitle,
  profileParser,
} from "../../utils/tools";
import { withRouter } from "react-router-dom";
import Quote from "../general/quote";
import Footer from "../general/footer";
import { renderAvatar } from "../avatar";
import NoData from "../general/nodata";
import Loading from "../general/loading";
import * as constants from "@liskhq/lisk-constants";
import ProjectDetails from "./projectDetails";
import ProposalList from "../proposal/proposalList";
import DescriptionCollapse from "../general/descriptionCollapse";
import dateFormat from "dateformat";
import { getAddressAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";

class Project extends React.Component {
  constructor() {
    super();
    this.state = {
      account: null,
      projectPublicKey: null,
      project: {},
    };
    this.onLoad = this.onLoad.bind(this);
    this.fetchProject = this.fetchProject.bind(this);
  }

  fetchProject(projectPublicKey) {
    getProject(projectPublicKey, true, false)
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {
          this.setState(
            (state) => {
              return {
                ...state,
                project: res.data[0],
              };
            },
            () => {
              const projectTitle =
                this.state.project.asset.title.length > 250
                  ? this.state.project.asset.title.slice(0, 250) + "..."
                  : this.state.project.asset.title;
              document.title = parseDocumentTitle(
                `${projectTitle} | ${this.state.project.asset.category
                  .replaceAll("-", " ")
                  .replace(/\w\S*/g, (txt) => {
                    return (
                      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                    );
                  })}`,
                true,
                this.state.account
              );
            }
          );
        }
      });
  }

  onLoad() {
    if (getSession("secret")) {
      const timeout = 3000;
      getAccounts({
        address: getAddressAndPublicKeyFromPassphrase(getSession("secret"))
          .address,
      }).then((res) => {
        if (res.data.length === 0) {
          setTimeout(() => {
            this.onLoad();
          }, timeout);
        } else {
          this.setState({ account: res.data[0] });
        }
      });
    } else {
      this.setState({ account: guestProfile });
    }
  }

  componentDidMount() {
    this.fetchProject(this.props.match.params.projectPublicKey);
    this.onLoad();
  }

  render() {
    return (
      <div>
        <Header account={this.state.account} active="Browse" />
        {Object.keys(this.state.project).length > 0 && this.state.account ? (
          this.state.project !== undefined ? (
            <div
              className="container"
              style={{
                minHeight: "100vh",
                marginTop: "30px",
                marginBottom: "30px",
                color: "EF233C",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <div>
                <div style={{ marginBottom: "12px" }}>
                  <h4>
                    <strong>{this.state.project.asset.title}</strong>
                    <br />
                  </h4>
                </div>
                <div className="d-flex flex-wrap">
                  <h6 className="text-muted">Posted By:</h6>
                  <h6
                    style={{
                      backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                        this.state.project.asset.employer,
                        250
                      )}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "left",
                      marginLeft: "10px",
                      paddingLeft: "25px",
                    }}
                  >
                    <strong>
                      {profileParser(this.state.project.asset.employer)}
                    </strong>
                  </h6>
                </div>
                <div
                  className="d-flex flex-wrap"
                  style={{ marginBottom: "8px" }}
                >
                  <h6 className="text-muted">On:</h6>
                  <h6
                    style={{
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "left",
                      marginLeft: "10px",
                    }}
                  >
                    <strong>
                      {dateFormat(
                        new Date(
                          (constants.EPOCH_TIME_SECONDS +
                            this.state.project.asset.postedOn) *
                            1000
                        ),
                        "mmmm dS, yyyy - h:MM:ss TT"
                      )}
                    </strong>
                  </h6>
                </div>
                <h6 className="text-muted">Description:</h6>
                <DescriptionCollapse
                  description={this.state.project.asset.description}
                  id="project-description"
                  fontSize={16}
                />
                <ProjectDetails
                  project={this.state.project}
                  account={this.state.account}
                />
                <ProposalList
                  project={this.state.project}
                  account={this.state.account}
                />
              </div>
            </div>
          ) : (
            <NoData />
          )
        ) : (
          <Loading />
        )}
        <div style={{ marginBottom: "64px" }}></div>
        <Quote />
        <Footer />
      </div>
    );
  }
}

export default withRouter(Project);
