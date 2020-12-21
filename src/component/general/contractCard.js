import React from "react";
const { utils } = require("@liskhq/lisk-transactions");

class ContractCard extends React.PureComponent {
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
        className="card"
        style={{
          fontFamily: "Poppins, sans-serif",
          marginBottom: "8px",
          backgroundColor: bgColor,
          minHeight: "225px",
        }}
        onMouseEnter={this.toggleHoverTrue}
        onMouseLeave={this.toggleHoverFalse}
      >
        <div
          className="card-body"
          style={{ marginTop: "auto", marginBottom: "auto" }}
          data-toggle="tooltip"
          data-placement="top"
          title={this.props.tooltip}
          onClick={this.props.onClick}
        >
          <img
            role="status"
            style={{
              height: "100px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "16px",
              display: "block",
            }}
            alt={this.props.name}
            src={this.props.img}
          />
          <h6 className="w-100 dark-grey-text font-weight-bold my-1 text-center">
            <strong>
              {this.props.type.replaceAll("-", " ").replace(/\w\S*/g, (txt) => {
                return (
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
              })}{" "}
              {this.props.name} Vault
            </strong>
          </h6>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              textAlign: "center",
            }}
          >
            {utils.convertBeddowsToLSK(this.props.value)} CLNC
          </p>
        </div>
      </div>
    );
  }
}

export default ContractCard;
