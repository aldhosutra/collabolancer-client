import React from "react";
import CompactContractCard from "./compactContractCard";
import StatusCard from "./statusCard";
import "./fontAwesome";
import { ACCOUNT, MISCELLANEOUS } from "../../transactions/constants";
import ProposalStatusJourneyDialog from "../dialog/proposalStatusJourney";
import TeamStatusJourneyDialog from "../dialog/teamStatusJourney";
import { utils } from "@liskhq/lisk-transactions";

class CompactContractDetail extends React.PureComponent {
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
    let statusDialog;
    if (this.props.contract.asset.type === ACCOUNT.PROPOSAL) {
      statusDialog = (
        <ProposalStatusJourneyDialog
          id={"proposal-status-journey-" + this.props.contract.publicKey}
          current={this.props.contract.asset.status}
        />
      );
    } else if (this.props.contract.asset.type === ACCOUNT.TEAM) {
      statusDialog = (
        <TeamStatusJourneyDialog
          id={"team-status-journey-" + this.props.contract.publicKey}
          current={this.props.contract.asset.status}
        />
      );
    }
    return (
      <div className="row" style={{ marginBottom: "16px" }}>
        <div className="col-lg-4">
          <StatusCard
            contract={this.props.contract}
            compact={true}
            onClick={() => {
              if (this.props.contract.asset.type === ACCOUNT.PROPOSAL) {
                window
                  .$(
                    "#proposal-status-journey-" + this.props.contract.publicKey
                  )
                  .modal("show");
              } else if (this.props.contract.asset.type === ACCOUNT.TEAM) {
                window
                  .$("#team-status-journey-" + this.props.contract.publicKey)
                  .modal("show");
              }
            }}
          />
          {statusDialog}
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"comment-dollar"}
            type={this.props.contract.asset.type}
            status={this.props.contract.asset.status}
            name={"Earning Potential"}
            value={
              utils.convertBeddowsToLSK(
                this.props.contract.asset.potentialEarning
              ) + " CLNC"
            }
            tooltip={
              "Potential Earning, is the amount of earning you can get by completing work according to the contract"
            }
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"gavel"}
            type={this.props.contract.asset.type}
            status={this.props.contract.asset.status}
            name={"Guilty Status"}
            value={this.props.contract.asset.guilty ? "Guilty!" : "Innocent"}
            tooltip={
              "Guilty Status, is the status of your guilt in this contract, is closely related to dispute outcome, can be 'guilty' or 'innocent'"
            }
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"hand-holding-usd"}
            type={this.props.contract.asset.type}
            status={this.props.contract.asset.status}
            name={"Fund Vault"}
            value={
              utils.convertBeddowsToLSK(this.props.contract.asset.freezedFund) +
              " CLNC"
            }
            tooltip={
              "Fund Vault, are the funds which will become your funds and already available. When contract are claimed, this amount will be transferred to your account balance"
            }
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"funnel-dollar"}
            type={this.props.contract.asset.type}
            status={this.props.contract.asset.status}
            name={"Fee Vault"}
            value={
              utils.convertBeddowsToLSK(this.props.contract.asset.freezedFee) +
              " CLNC"
            }
            tooltip={
              "Fee Vault, are the funds that related to fee. Unlike funds, fee is your bail and/or your subordinate bail for participate in this project. If you and/or your subordinate doing something that break the contract, corresponding fee will be given to injured party. When contract are claimed, this amount will be transferred to your account balance"
            }
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"gift"}
            type={this.props.contract.asset.type}
            status={this.props.contract.asset.status}
            name={"Bonus Vault"}
            value={
              utils.convertBeddowsToLSK(this.props.contract.asset.cashback) +
              " CLNC"
            }
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

export default CompactContractDetail;
