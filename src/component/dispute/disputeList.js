import React from "react";
import { ACCOUNT, STATUS } from "../../transactions/constants";
import ClosedDisputeList from "./closedDisputeList";
import OpenedDisputeList from "./openedDisputeList";
import VotedDisputeList from "./votedDisputeList";
import { withRouter } from "react-router-dom";

class DisputeList extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
      index: 0,
    };
  }

  componentDidMount() {
    if (
      this.props.account.asset.type === ACCOUNT.SOLVER &&
      this.props.project.asset.openedDisputes
        .filter(
          (item) =>
            item.asset.vote.litigant.indexOf(this.props.account.publicKey) !==
              -1 ||
            item.asset.vote.defendant.indexOf(this.props.account.publicKey) !==
              -1
        )
        .map((item) => item.publicKey)
        .indexOf(this.props.location.hash.split("#dispute-")[1]) !== -1
    ) {
      this.setState((state) => {
        return {
          ...state,
          index: 1,
        };
      });
    }
  }

  render() {
    if (
      !this.props.project ||
      ![
        STATUS.PROJECT.FINISHED,
        STATUS.PROJECT.REFUSED,
        STATUS.PROJECT.TERMINATED,
        STATUS.PROJECT.DISPUTED,
        STATUS.PROJECT.DISPUTE_CLOSED,
      ].includes(this.props.project.asset.status)
    ) {
      return <div></div>;
    }
    const tab = [
      <OpenedDisputeList
        project={this.props.project}
        account={this.props.account}
      />,
      <VotedDisputeList
        project={this.props.project}
        account={this.props.account}
      />,
      <ClosedDisputeList
        project={this.props.project}
        account={this.props.account}
      />,
    ];
    return (
      <div>
        <div
          style={{
            marginTop: "28px",
            backgroundColor: "#EF233C",
            paddingTop: "8px",
            paddingRight: "16px",
            paddingBottom: "8px",
            paddingLeft: "16px",
          }}
        >
          <h5
            data-toggle="collapse"
            aria-expanded="false"
            aria-controls="dispute-list"
            role="button"
            href="#dispute-list"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "rgb(255,255,255)",
            }}
            onClick={() => {
              return this.setState((state) => {
                return { ...state, collapsed: !this.state.collapsed };
              });
            }}
          >
            <strong>
              {this.state.collapsed
                ? new DOMParser().parseFromString("&#11206;", "text/html").body
                    .textContent
                : new DOMParser().parseFromString("&#11208;", "text/html").body
                    .textContent}{" "}
              Dispute
            </strong>
          </h5>
        </div>
        <div id="dispute-list" className="collapse show">
          <div
            className="border rounded-0"
            style={{
              marginTop: 0,
              paddingTop: "8px",
              paddingRight: "16px",
              paddingBottom: "8px",
              paddingLeft: "16px",
            }}
          >
            <div className="text-center" style={{ marginBottom: "30px" }}>
              <button
                className="btn btn-primary border rounded-0"
                id="opened-dispute-tab"
                type="button"
                style={{
                  width: "150px",
                  color:
                    this.state.index === 0 ? "rgb(255,255,255)" : "rgb(0,0,0)",
                  backgroundColor:
                    this.state.index === 0 ? "#2b2d42" : "rgb(255,255,255)",
                }}
                onClick={() =>
                  this.setState({
                    index: 0,
                  })
                }
              >
                Open
              </button>
              {this.props.account &&
              this.props.account.asset.type === ACCOUNT.SOLVER ? (
                <button
                  className="btn btn-primary border rounded-0"
                  id="voted-dispute-tab"
                  type="button"
                  style={{
                    width: "150px",
                    color:
                      this.state.index === 1
                        ? "rgb(255,255,255)"
                        : "rgb(0,0,0)",
                    backgroundColor:
                      this.state.index === 1 ? "#2b2d42" : "rgb(255,255,255)",
                  }}
                  onClick={() =>
                    this.setState({
                      index: 1,
                    })
                  }
                >
                  Voted By You
                </button>
              ) : null}
              <button
                className="btn btn-secondary border rounded-0"
                id="closed-dispute-tab"
                type="button"
                style={{
                  width: "150px",
                  color:
                    this.state.index === 2 ? "rgb(255,255,255)" : "rgb(0,0,0)",
                  backgroundColor:
                    this.state.index === 2 ? "#2b2d42" : "rgb(255,255,255)",
                }}
                onClick={() =>
                  this.setState((state) => ({
                    ...state,
                    index: 2,
                  }))
                }
              >
                Closed
              </button>
            </div>
            {tab[this.state.index]}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DisputeList);
