import React from "react";
import CompactContractCard from "./compactContractCard";
import "./fontAwesome";
const { utils } = require("@liskhq/lisk-transactions");

class CompactDisputeContractDetail extends React.PureComponent {
  render() {
    return (
      <div className="row" style={{ marginBottom: "16px" }}>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"trophy"}
            name={"Winner"}
            value={
              this.props.dispute.asset.winner
                ? this.props.dispute.asset.winner
                    .replaceAll("-", " ")
                    .replace(/\w\S*/g, (txt) => {
                      return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                      );
                    })
                : "Unsentenced"
            }
            tooltip={"Winner of the Dispute, after dispute closed"}
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"vote-yea"}
            name={"Vote Count"}
            value={
              this.props.dispute.asset.vote.litigant.length +
              this.props.dispute.asset.vote.defendant.length
            }
            tooltip={
              "Number of Solver that already cast their vote to this dispute"
            }
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"receipt"}
            name={"Vote Commitment Fee"}
            value={
              utils.convertBeddowsToLSK(this.props.dispute.asset.castVoteFee) +
              " CLNC"
            }
            tooltip={
              "Amount that Solver need to be paid as a bail when casting their vote"
            }
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"balance-scale-right"}
            name={"Dispute Freezed Fund"}
            value={
              utils.convertBeddowsToLSK(this.props.dispute.asset.freezedFund) +
              " CLNC"
            }
            tooltip={
              "Amount that is being disputed. Kept in the dispute contract, and after the dispute is closed it will be transferred to the entitled parties"
            }
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"suitcase"}
            name={"Litigant Freezed Fee"}
            value={
              utils.convertBeddowsToLSK(
                this.props.dispute.asset.litigantFreezedFee
              ) + " CLNC"
            }
            tooltip={
              "Litigant's fee which is kept in the dispute contract. If the litigant is found guilty, this amount will be distributed to the defendant and / or the rightful parties (e.g Solver)"
            }
          />
        </div>
        <div className="col-lg-4">
          <CompactContractCard
            icon={"briefcase"}
            name={"Defendant Freezed Fee"}
            value={
              utils.convertBeddowsToLSK(
                this.props.dispute.asset.defendantFreezedFee
              ) + " CLNC"
            }
            tooltip={
              "Defendant's fee which is kept in the dispute contract. If the defendant is found guilty, this amount will be distributed to the litigant and / or the rightful parties (e.g Solver)"
            }
          />
        </div>
      </div>
    );
  }
}

export default CompactDisputeContractDetail;
