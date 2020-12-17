import React from "react";
import ContractCard from "../general/contractCard";
import fundLogo from "../../asset/undraw_Savings_re_eq4w.svg";
import feeLogo from "../../asset/undraw_printing_invoices_5r4r.svg";
import bonusLogo from "../../asset/undraw_happy_birthday_s72n.svg";
import StatusCard from "../general/statusCard";
import { ACCOUNT, MISCELLANEOUS } from "../../transactions/constants";
import ProjectStatusJourneyDialog from "../dialog/projectStatusJourney";

class ProjectContractDetail extends React.PureComponent {
  render() {
    const contractType = this.props.contract.asset.type;
    let bonusRate = 0;
    switch (contractType) {
      case ACCOUNT.PROJECT:
        bonusRate = MISCELLANEOUS.EMPLOYER_CASHBACK_PERCENTAGE * 100;
        break;
      case ACCOUNT.PROPOSAL:
        bonusRate = MISCELLANEOUS.LEADER_CASHBACK_PERCENTAGE * 100;
        break;
      case ACCOUNT.TEAM:
        bonusRate = MISCELLANEOUS.TEAM_CASHBACK_PERCENTAGE * 100;
        break;
      default:
        bonusRate = 0;
        break;
    }
    const proposalBonus =
      contractType === ACCOUNT.PROPOSAL
        ? ", for proposals, the bonus is multiplied by the number of teams, so your bonus is: " +
          bonusRate *
            this.props.contract.asset.team.filter((item) => item !== 0).length +
          "%"
        : "";
    return (
      <div className="row" style={{ marginBottom: "16px" }}>
        <div className="col">
          <StatusCard
            contract={this.props.contract}
            onClick={() => {
              window
                .$("#project-status-journey-" + this.props.contract.publicKey)
                .modal("show");
            }}
          />
          <ProjectStatusJourneyDialog
            id={"project-status-journey-" + this.props.contract.publicKey}
            current={this.props.contract.asset.status}
          />
        </div>
        <div className="col">
          <ContractCard
            img={fundLogo}
            type={this.props.contract.asset.type}
            name={"Fund"}
            value={this.props.contract.asset.freezedFund}
            status={this.props.contract.asset.status}
            tooltip={
              "Fund Vault, are the funds which will become your funds and already available. When contract are claimed, this amount will be transferred to your account balance"
            }
          />
        </div>
        <div className="col">
          <ContractCard
            img={feeLogo}
            type={this.props.contract.asset.type}
            name={"Fee"}
            value={this.props.contract.asset.freezedFee}
            status={this.props.contract.asset.status}
            tooltip={
              "Fee Vault, are the funds that related to fee. Unlike funds, fee is your bail and/or your subordinate bail for participate in this project. If you and/or your subordinate doing something that break the contract, corresponding fee will be given to injured party. When contract are claimed, this amount will be transferred to your account balance"
            }
          />
        </div>
        <div className="col">
          <ContractCard
            img={bonusLogo}
            type={this.props.contract.asset.type}
            name={"Bonus"}
            value={this.props.contract.asset.cashback}
            status={this.props.contract.asset.status}
            tooltip={
              "Bonus Vault, is your bonus that available. For " +
              contractType +
              ", bonus rate is: " +
              bonusRate.toString() +
              "%" +
              proposalBonus
            }
          />
        </div>
      </div>
    );
  }
}

export default ProjectContractDetail;
