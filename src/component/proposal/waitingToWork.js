import React from "react";
import WaitingToWorkLogo from "../../asset/undraw_season_change_f99v.svg";

class WaitingToWork extends React.PureComponent {
  render() {
    const height = this.props.height || 10;
    return (
      <div style={{ minHeight: height + "vh" }}>
        <div
          className="d-flex justify-content-center"
          style={{
            width: "200px",
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
                marginBottom: "16px",
                display: "block",
              }}
              alt="Waiting to Work"
              src={WaitingToWorkLogo}
            />
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
              }}
            >
              {"Team Status Not Yet Selected, Please Wait Employer Decision!"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default WaitingToWork;
