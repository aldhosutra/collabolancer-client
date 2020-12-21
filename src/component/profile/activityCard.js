import React from "react";
import * as constants from "@liskhq/lisk-constants";
import { getTransactionName } from "../../utils/tools";
import TransactionDetailsDialog from "../dialog/transactionDetails";
const dateFormat = require("dateformat");
const { utils } = require("@liskhq/lisk-transactions");

class ActivityCard extends React.PureComponent {
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
    const minusMultiplier = this.props.minus ? -1 : 1;
    const showBalance = this.props.noBalance ? false : true;
    return (
      <div>
        <button
          style={{
            marginBottom: "0px",
            overflowWrap: "break-word",
            width: "100%",
            textAlign: "left",
            padding: "0px",
            background: "none",
            border: "none",
            outline: "none",
            color: "black",
            textDecoration: "none",
          }}
          type="button"
          data-toggle="modal"
          data-target={"#transaction-details-" + this.props.activity.id}
        >
          <div
            className="card"
            style={{
              fontFamily: "Poppins, sans-serif",
              marginBottom: "8px",
              backgroundColor: bgColor,
            }}
            onMouseEnter={this.toggleHoverTrue}
            onMouseLeave={this.toggleHoverFalse}
          >
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div style={{ overflowWrap: "break-word" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <strong>
                        {getTransactionName(this.props.activity.type)}
                      </strong>
                    </p>
                    <p
                      style={{
                        color: "#EF233C",
                        fontSize: "12px",
                        marginBottom: "0px",
                      }}
                    >
                      {dateFormat(
                        new Date(
                          (constants.EPOCH_TIME_SECONDS +
                            this.props.activity.timestamp) *
                            1000
                        ),
                        "mmmm dS, yyyy - h:MM:ss TT"
                      )}
                    </p>
                    {this.props.activity.id}
                  </div>
                </div>
                {showBalance ? (
                  <div className="col-lg-3">
                    <h4
                      className="text-right"
                      style={{
                        color: utils
                          .BigNum(this.props.activity.value)
                          .mul(minusMultiplier)
                          .gt(0)
                          ? "#00b679"
                          : "#d90429",
                        fontWeight: "bold",
                      }}
                    >
                      {utils.convertBeddowsToLSK(
                        utils
                          .BigNum(this.props.activity.value)
                          .mul(minusMultiplier)
                          .toString()
                      )}{" "}
                      CLNC
                    </h4>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </button>
        <TransactionDetailsDialog
          id={"transaction-details-" + this.props.activity.id}
          transactionId={this.props.activity.id}
        />
      </div>
    );
  }
}

export default ActivityCard;
