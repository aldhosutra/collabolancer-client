import React from "react";
import TeamNotSelectedLogo from "../../asset/undraw_heartbroken_cble.svg";

class TeamNotSelected extends React.PureComponent {
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
              alt="Team not Selected"
              src={TeamNotSelectedLogo}
            />
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
              }}
            >
              {
                "Team Status is Not Selected, Keep Up The Spirit to Join Another Collaboration!"
              }
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamNotSelected;
