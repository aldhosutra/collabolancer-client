import React from "react";
import WorkinggOnItLogo from "../../asset/undraw_working_remotely_jh40.svg";

class WorkinggOnIt extends React.PureComponent {
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
              alt="Working on It"
              src={WorkinggOnItLogo}
            />
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
              }}
            >
              {"Worker is On Its Way!"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkinggOnIt;
