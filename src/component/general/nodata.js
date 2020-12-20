import React from "react";
import NoDataLogo from "../../asset/undraw_empty_xct9.svg";

class NoData extends React.PureComponent {
  render() {
    const height = this.props.height || 50;
    const reloadButton = this.props.reload === "false" ? false : true;
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
            {this.props.code ? (
              <h4
                style={{
                  fontFamily: "Poppins, sans-serif",
                  textAlign: "center",
                  marginTop: ".5rem",
                }}
              >
                <strong>{this.props.code}</strong>
              </h4>
            ) : null}
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
              }}
            >
              {this.props.message ? this.props.message : "No Data"}
            </p>
            {reloadButton ? (
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
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <strong>Reload Page</strong>
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NoData;
