import React from "react";
import NoData from "../general/nodata";
import ProfileFileList from "./profileFileList";

class ProfileFileWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  render() {
    let fileCategoryOrderData = null;
    if (this.props.account.asset.file.length > 0) {
      fileCategoryOrderData = (
        <ProfileFileList
          limit={10}
          publicKeyList={this.props.account.asset.file}
        />
      );
    } else {
      fileCategoryOrderData = (
        <NoData message={"No Owned File"} reload={"false"} />
      );
    }
    return (
      <div className="border" style={{ padding: "16px" }}>
        <div>{fileCategoryOrderData}</div>
      </div>
    );
  }
}

export default ProfileFileWrapper;
