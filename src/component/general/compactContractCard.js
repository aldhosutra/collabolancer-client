import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CompactContractCard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isHover: false,
    };
    this.toggleHoverTrue = this.toggleHoverTrue.bind(this);
    this.toggleHoverFalse = this.toggleHoverFalse.bind(this);
  }

  toggleHoverTrue() {
    this.setState({ isHover: true });
  }

  toggleHoverFalse() {
    this.setState({ isHover: false });
  }

  render() {
    const bgColor = this.state.isHover ? "#EDF2F4" : "white";
    return (
      <div
        className="card compact-card"
        style={{
          fontFamily: "Poppins, sans-serif",
          marginBottom: "8px",
          backgroundColor: bgColor,
          minHeight: "70px",
          height: "100%",
        }}
        onMouseEnter={this.toggleHoverTrue}
        onMouseLeave={this.toggleHoverFalse}
      >
        <div
          className="card-body compact-card-body"
          style={{ marginTop: "auto", marginBottom: "auto" }}
          data-toggle="tooltip"
          data-placement="top"
          title={this.props.tooltip}
          onClick={this.props.onClick}
        >
          <div className="row">
            <div className="col-3 compact-card-img" style={{ margin: "auto" }}>
              <FontAwesomeIcon icon={["fas", this.props.icon]} size="2x" />
            </div>
            <div className="col">
              <h6 className="w-100 dark-grey-text font-weight-bold my-1 compact-card-title">
                <strong>{this.props.name}</strong>
              </h6>
              <div
                className="compact-card-value"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "20px",
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
