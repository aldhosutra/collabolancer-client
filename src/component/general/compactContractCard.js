import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CompactContractCard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isHover: false,
    };
    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({ isHover: !this.state.isHover });
  }

  render() {
    const bgColor = this.state.isHover ? "#EDF2F4" : "white";
    return (
      <div
        className="card"
        style={{
          fontFamily: "Poppins, sans-serif",
          marginBottom: "8px",
          backgroundColor: bgColor,
          minHeight: "70px",
        }}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <div
          className="card-body"
          style={{ marginTop: "auto", marginBottom: "auto" }}
        >
          <div className="row">
            <div className="col-3" style={{ margin: "auto" }}>
              <FontAwesomeIcon icon={["fas", this.props.icon]} size="2x" />
            </div>
            <div className="col">
              <h6 className="w-100 dark-grey-text font-weight-bold my-1">
                <strong>{this.props.name}</strong>
              </h6>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "24px",
                }}
              >
                {this.props.value}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompactContractCard;
