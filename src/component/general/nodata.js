import React from "react";
import NoDataLogo from "../../asset/undraw_empty_xct9.svg";

class NoData extends React.PureComponent {
  render() {
    const height = this.props.height || 50;
    return (
      <div style={{ minHeight: height + "vh" }}>
        <div
          className="d-flex justify-content-center"
          style={{
            width: "250px",
            margin: "auto",
            paddingTop: height / 5 + "vh",
          }}
        >
          <div>
            <img
              role="status"
              style={{
                width: "180px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
              alt="No Data"
              src={NoDataLogo}
            />
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
              }}
            >
              No Data
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary border rounded-0 top-button"
              type="button"
              style={{
                backgroundColor: "#d90429",
                width: "120px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                fontSize: "14px",
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NoData;
