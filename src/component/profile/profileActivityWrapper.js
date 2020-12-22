import React from "react";
import { toast } from "react-toastify";
import { getTransactions } from "../../utils/tools";
import NoData from "../general/nodata";
import ProfileActivityList from "./profileActivityList";

class ProfileActivityWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      sentTransaction: [],
      receivedTransaction: [],
    };
  }

  async componentDidMount() {
    let sentTransaction = [];
    let receivedTransaction = [];
    await getTransactions({ senderId: this.props.account.address, type: 8 })
      .then((data) => {
        sentTransaction = data.data;
      })
      .catch((err) => {
        toast.error(`Error in Retrieving Sent Activity: ${err.message}`);
      });
    await getTransactions({ recipientId: this.props.account.address, type: 8 })
      .then((data) => {
        receivedTransaction = data.data;
      })
      .catch((err) => {
        toast.error(`Error in Retrieving Received Activity: ${err.message}`);
      });
    this.setState((state) => {
      return {
        ...state,
        sentTransaction: sentTransaction,
        receivedTransaction: receivedTransaction,
      };
    });
  }

  render() {
    const activityCategoryOrderKey = [];
    activityCategoryOrderKey.push(
      <button
        key={"profile-activity-key-sent"}
        className="btn border-0"
        id={"profile-activity-sent"}
        type="button"
        style={{
          borderRadius: "25px",
          paddingLeft: "16px",
          paddingRight: "16px",
          marginLeft: "16px",
          marginRight: "16px",
          marginTop: "16px",
          color: this.state.index === 0 ? "rgb(255,255,255)" : "rgb(0,0,0)",
          backgroundColor:
            this.state.index === 0 ? "#ef233c" : "rgb(255,255,255)",
        }}
        onClick={() =>
          this.setState((state) => {
            return { ...state, index: 0 };
          })
        }
      >
        {"Sent"}
      </button>
    );
    activityCategoryOrderKey.push(
      <button
        key={"profile-activity-key-received"}
        className="btn border-0"
        id={"profile-activity-received"}
        type="button"
        style={{
          borderRadius: "25px",
          paddingLeft: "16px",
          paddingRight: "16px",
          marginLeft: "16px",
          marginRight: "16px",
          marginTop: "16px",
          color: this.state.index === 1 ? "rgb(255,255,255)" : "rgb(0,0,0)",
          backgroundColor:
            this.state.index === 1 ? "#ef233c" : "rgb(255,255,255)",
        }}
        onClick={() =>
          this.setState((state) => {
            return { ...state, index: 1 };
          })
        }
      >
        {"Received"}
      </button>
    );
    activityCategoryOrderKey.push(
      <button
        key={"profile-activity-key-role"}
        className="btn border-0"
        id={"profile-activity-role"}
        type="button"
        style={{
          borderRadius: "25px",
          paddingLeft: "16px",
          paddingRight: "16px",
          marginLeft: "16px",
          marginRight: "16px",
          marginTop: "16px",
          color: this.state.index === 2 ? "rgb(255,255,255)" : "rgb(0,0,0)",
          backgroundColor:
            this.state.index === 2 ? "#ef233c" : "rgb(255,255,255)",
        }}
        onClick={() =>
          this.setState((state) => {
            return { ...state, index: 2 };
          })
        }
      >
        {"As " +
          this.props.account.asset.type
            .replaceAll("-", " ")
            .replace(/\w\S*/g, (txt) => {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })}
      </button>
    );
    const activityCategoryOrderData = [];
    if (this.state.sentTransaction.length > 0) {
      activityCategoryOrderData.push(
        <div
          key={"profile-activity-data-sent"}
          style={{ display: this.state.index === 0 ? "block" : "none" }}
        >
          <ProfileActivityList
            minus={true}
            limit={10}
            activityList={this.state.sentTransaction.map((item) => {
              return {
                timestamp: item.timestamp,
                id: item.id,
                type: item.type,
                value: item.asset.amount,
              };
            })}
          />
        </div>
      );
    } else {
      activityCategoryOrderData.push(
        <div
          key={"profile-activity-data-sent"}
          style={{ display: this.state.index === 0 ? "block" : "none" }}
        >
          <NoData message={"No Sent Transaction Activity"} reload={"false"} />
        </div>
      );
    }
    if (this.state.receivedTransaction.length > 0) {
      activityCategoryOrderData.push(
        <div
          key={"profile-activity-data-received"}
          style={{ display: this.state.index === 1 ? "block" : "none" }}
        >
          <ProfileActivityList
            minus={false}
            limit={10}
            activityList={this.state.receivedTransaction.map((item) => {
              return {
                timestamp: item.timestamp,
                id: item.id,
                type: item.type,
                value: item.asset.amount,
              };
            })}
          />
        </div>
      );
    } else {
      activityCategoryOrderData.push(
        <div
          key={"profile-activity-data-received"}
          style={{ display: this.state.index === 1 ? "block" : "none" }}
        >
          <NoData
            message={"No Received Transaction Activity"}
            reload={"false"}
          />
        </div>
      );
    }
    if (this.props.account.asset.log.length > 0) {
      activityCategoryOrderData.push(
        <div
          key={"profile-activity-data-role"}
          style={{ display: this.state.index === 2 ? "block" : "none" }}
        >
          <ProfileActivityList
            minus={false}
            limit={10}
            activityList={this.props.account.asset.log}
          />
        </div>
      );
    } else {
      activityCategoryOrderData.push(
        <div
          key={"profile-activity-data-role"}
          style={{ display: this.state.index === 2 ? "block" : "none" }}
        >
          <NoData
            message={
              "No " +
              this.props.account.asset.type
                .replaceAll("-", " ")
                .replace(/\w\S*/g, (txt) => {
                  return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
                }) +
              " Transaction Activity"
            }
            reload={"false"}
          />
        </div>
      );
    }
    return (
      <div
        className="border"
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingBottom: "16px",
        }}
      >
        <div className="text-center" style={{ marginBottom: "16px" }}>
          {activityCategoryOrderKey}
        </div>
        <div>{activityCategoryOrderData}</div>
      </div>
    );
  }
}

export default ProfileActivityWrapper;
