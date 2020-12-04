import React from "react";
import ContractCard from "./contractCard";
import fundLogo from "../../asset/undraw_Savings_re_eq4w.svg";
import feeLogo from "../../asset/undraw_printing_invoices_5r4r.svg";
import bonusLogo from "../../asset/undraw_happy_birthday_s72n.svg";
import StatusCard from "./statusCard";

class ProjectContractDetail extends React.PureComponent {
  render() {
    return (
      <div className="row" style={{ marginBottom: "16px" }}>
        <div className="col">
          <StatusCard contract={this.props.contract} />
        </div>
        <div className="col">
          <ContractCard
            img={fundLogo}
            type={this.props.contract.asset.type}
            name={"Fund"}
            value={this.props.contract.asset.freezedFund}
            status={this.props.contract.asset.status}
          />
        </div>
        <div className="col">
          <ContractCard
            img={feeLogo}
            type={this.props.contract.asset.type}
            name={"Fee"}
            value={this.props.contract.asset.freezedFee}
            status={this.props.contract.asset.status}
          />
        </div>
        <div className="col">
          <ContractCard
            img={bonusLogo}
            type={this.props.contract.asset.type}
            name={"Bonus"}
            value={this.props.contract.asset.cashback}
            status={this.props.contract.asset.status}
          />
        </div>
      </div>
    );
  }
}

export default ProjectContractDetail;
