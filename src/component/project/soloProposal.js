import React from "react";
import SoloProposalLogo from "../../asset/undraw_Tree_swing_646s.svg";

class SoloProposal extends React.PureComponent {
  render() {
    const height = this.props.height || 10;
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
                marginBottom: "16px",
                display: "block",
              }}
              alt="Solo Proposal"
              src={SoloProposalLogo}
            />
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
              }}
            >
              {"This is A Solo Proposal, Collaboration not Enabled"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SoloProposal;
