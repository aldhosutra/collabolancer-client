import React from "react";

// ID
// owner
// supervisor
// onAccepted
// onRejected

class WorkItem extends React.Component {
  render() {
    return (
      <div>
        <div className="border rounded-0" style={{ padding: "8px" }}>
          <div
            className="row"
            style={{
              marginLeft: "0px",
              marginRight: "0px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <div
              className="col-lg-2 details"
              style={{
                color: "#EF233C",
                border: "1px solid #EF233C",
              }}
            >
              <p style={{ overflowWrap: "break-word", textAlign: "center" }}>
                <strong style={{ fontSize: "30px" }}>.zip</strong>
                <br />
                application/zip
              </p>
            </div>
            <div className="col-lg-5 details" style={{ margin: "auto" }}>
              <p style={{ overflowWrap: "break-word" }}>
                <strong>12 September 2020</strong>
                <br />
                <strong>
                  36c93f251f55a14e995c65e1193470584491280b7d36b0a4248292120c47d6f7
                </strong>
              </p>
            </div>
            <div className="col-lg-5 details" style={{ margin: "auto" }}>
              <p>
                13 September 2020 - [Request Revision]
                <br />
                The design is not in our brand language, please read brief
              </p>
            </div>
          </div>
        </div>
        <div className="border rounded-0" style={{ padding: "8px" }}>
          <div
            className="row"
            style={{
              marginLeft: "0px",
              marginRight: "0px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <div
              className="col-lg-2 details"
              style={{
                color: "#EF233C",
                border: "1px solid #EF233C",
              }}
            >
              <p style={{ overflowWrap: "break-word", textAlign: "center" }}>
                <strong style={{ fontSize: "30px" }}>.zip</strong>
                <br />
                application/zip
              </p>
            </div>
            <div className="col-lg-5 details" style={{ margin: "auto" }}>
              <p style={{ overflowWrap: "break-word" }}>
                <strong>12 September 2020</strong>
                <br />
                <strong>
                  36c93f251f55a14e995c65e1193470584491280b7d36b0a4248292120c47d6f7
                </strong>
              </p>
            </div>
            <div
              className="col-lg-5 d-flex justify-content-center details"
              style={{ margin: "auto" }}
            >
              <div>
                <button
                  className="btn btn-primary border rounded-0 top-button"
                  type="button"
                  style={{
                    paddingRight: "24px",
                    paddingLeft: "24px",
                    backgroundColor: "#EF233C",
                    marginRight: "10px",
                    fontFamily: "Poppins, sans-serif",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Accept</strong>
                </button>
                <button
                  className="btn btn-primary border rounded-0 top-button"
                  type="button"
                  style={{
                    paddingRight: "24px",
                    paddingLeft: "24px",
                    backgroundColor: "#1D3557",
                    marginRight: "10px",
                    fontFamily: "Poppins, sans-serif",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Reject</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkItem;
