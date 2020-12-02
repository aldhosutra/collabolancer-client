import React from "react";
import CompactContractCard from "./compactContractCard";
import StatusCard from "./statusCard";
import "./fontAwesome";
const { utils } = require("@liskhq/lisk-transactions");

class CompactContractDetail extends React.PureComponent {
  render() {
    return (
      <div className="row" style={{ marginBottom: "16px" }}>
        <div className="col-lg-4">
          <StatusCard contract={this.props.contract} compact={true} />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"comment-dollar"}
            type={this.props.contract.asset.type}
            name={"Earning Potential"}
            value={
              utils.convertBeddowsToLSK(
                this.props.contract.asset.potentialEarning
              ) + " CLNC"
            }
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"gavel"}
            type={this.props.contract.asset.type}
            name={"Guilty Status"}
            value={this.props.contract.asset.guilty.toString()}
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"hand-holding-usd"}
            type={this.props.contract.asset.type}
            name={"Fund Vault"}
            value={
              utils.convertBeddowsToLSK(this.props.contract.asset.freezedFund) +
              " CLNC"
            }
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"funnel-dollar"}
            type={this.props.contract.asset.type}
            name={"Fee Vault"}
            value={
              utils.convertBeddowsToLSK(this.props.contract.asset.freezedFee) +
              " CLNC"
            }
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"gift"}
            type={this.props.contract.asset.type}
            name={"Bonus Vault"}
            value={
              utils.convertBeddowsToLSK(this.props.contract.asset.cashback) +
              " CLNC"
            }
          />
        </div>
      </div>
    );
  }
}

export default CompactContractDetail;
