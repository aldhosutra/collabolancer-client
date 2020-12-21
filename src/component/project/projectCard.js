import React from "react";
import { Link } from "react-router-dom";
import { renderAvatar } from "../avatar";
const { htmlToText } = require("html-to-text");
const { utils } = require("@liskhq/lisk-transactions");

class ProjectCard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isHover: false,
    };
    this.toggleHoverTrue = this.toggleHoverTrue.bind(this);
    this.toggleHoverFalse = this.toggleHoverFalse.bind(this);
  }

  toggleHoverTrue() {
    this.setState({ isHover: true });
  }

  toggleHoverFalse() {
    this.setState({ isHover: false });
  }

  render() {
    const bgColor = this.state.isHover ? "#EDF2F4" : "white";
    const avatar = `url('data:image/svg+xml,${renderAvatar(
      this.props.project.asset.employer
        ? this.props.project.asset.employer
        : "",
      250
    )}')`;
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/app/project/${this.props.project.publicKey}`}
      >
        <div
          className="card"
          style={{
            fontFamily: "Poppins, sans-serif",
            marginBottom: "8px",
            backgroundColor: bgColor,
          }}
          onMouseEnter={this.toggleHoverTrue}
          onMouseLeave={this.toggleHoverFalse}
        >
          <div className="card-body">
            <div className="row">
              <div className="col" id="status">
                <h4 style={{ fontWeight: "bold", color: "black" }}>
                  {this.props.project.asset.title}
                </h4>
              </div>
              <div className="col-lg-2">
                <h4
                  className="text-right"
                  style={{ color: "#d90429", fontWeight: "bold" }}
                >
                  {utils.convertBeddowsToLSK(this.props.project.asset.prize)}{" "}
                  CLNC
                </h4>
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <h6
                className="text-muted mb-2"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "normal",
                }}
              >
                Posted by:
              </h6>
              <h6
                style={{
                  backgroundImage: avatar,
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  paddingLeft: "25px",
                  marginLeft: "10px",
                  color: "black",
                }}
              >
                <strong>{this.props.project.asset.employer}</strong>
              </h6>
            </div>
            <p
              className="text-justify card-text"
              style={{
                color: "black",
                overflow: "hidden",
                maxHeight: "4.5em",
                lineHeight: "1.5em",
              }}
            >
              {htmlToText(this.props.project.asset.description, {
                tags: {
                  img: {
                    format: "skip",
                  },
                },
              })}
            </p>
            <div className="row d-flex">
              <div className="col" id="status">
                <h1
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {this.props.project.asset.status
                    .replaceAll("-", " ")
                    .replace(/\w\S*/g, (txt) => {
                      return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                      );
                    })}
                </h1>
              </div>
              <div className="col">
                <h1
                  className="text-right"
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {this.props.project.asset.proposal.length} Proposal Applied
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProjectCard;
