import React from "react";

class Loading extends React.PureComponent {
  render() {
    const height = this.props.height || 50;
    return (
      <div style={{ minHeight: height + "vh" }}>
        <div
          className="d-flex justify-content-center"
          style={{
            width: "250px",
            margin: "auto",
            paddingTop: height / 2.5 + "vh",
          }}
        >
          <div>
            <div
              className="spinner-border text-danger"
              role="status"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
              }}
            >
              Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
