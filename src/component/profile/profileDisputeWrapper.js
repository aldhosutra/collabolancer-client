import React from "react";
import NoData from "../general/nodata";
import ProfileDisputeList from "./profileDisputeList";

class ProfileDisputeWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  render() {
    let disputeCategoryOrderData = null;
    if (this.props.account.asset.vote.length > 0) {
      disputeCategoryOrderData = (
        <ProfileDisputeList
          limit={10}
          publicKeyList={this.props.account.asset.vote}
        />
      );
    } else {
      disputeCategoryOrderData = (
        <NoData message={"No Voted Dispute"} reload={"false"} />
      );
    }
    return (
      <div className="border" style={{ padding: "16px" }}>
        <div>{disputeCategoryOrderData}</div>
      </div>
    );
  }
}

export default ProfileDisputeWrapper;
