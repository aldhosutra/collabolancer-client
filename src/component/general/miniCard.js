import React from "react";

class MiniCard extends React.PureComponent {
  render() {
    return (
      <div style={{ marginRight: "14px" }}>
        <p className="border" style={{ padding: "8px" }}>
          <strong>{this.props.value}</strong> {this.props.label}
        </p>
      </div>
    );
  }
}

export default MiniCard;
