import React from "react";
import { STATUS } from "../../transactions/constants";

class DisputeList extends React.Component {
  render() {
    if (
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
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "rgb(255,255,255)",
            }}
          >
            <strong>Dispute</strong>
          </h5>
        </div>
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
          <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <div className="row">
              <div className="col details">
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    backgroundImage: 'url("assets/img/close.svg")',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "left",
                    paddingLeft: "30px",
                  }}
                >
                  <strong>9935147644029224811L</strong>
                </p>
              </div>
              <div className="col-auto d-flex justify-content-center details">
                <button
                  className="btn btn-primary border rounded-0 top-button"
                  type="button"
                  style={{
                    backgroundColor: "rgb(255,0,21)",
                    marginRight: "8px",
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
          <div className="border rounded-0" />
          <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <div className="row">
              <div className="col details">
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    backgroundImage: 'url("assets/img/close.svg")',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "left",
                    paddingLeft: "30px",
                  }}
                >
                  <strong>9935147644029224811L</strong>
                </p>
              </div>
              <div className="col-auto d-flex justify-content-center details">
                <button
                  className="btn btn-primary border rounded-0 top-button"
                  type="button"
                  style={{
                    backgroundColor: "rgb(255,0,21)",
                    marginRight: "8px",
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisputeList;
