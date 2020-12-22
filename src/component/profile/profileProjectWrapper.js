import React from "react";
import NoData from "../general/nodata";
import ProfileProjectList from "./profileProjectList";

class ProfileProjectWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  render() {
    const projectCategoryOrderKey = [];
    const projectCategoryOrderData = [];
    for (let i = 0; i < this.props.order.length; i++) {
      if (this.props.account.asset[this.props.order[i]].length > 0) {
        projectCategoryOrderData.push(
          <div
            key={"profile-data-" + this.props.order[i]}
            style={{ display: this.state.index === i ? "block" : "none" }}
          >
            <ProfileProjectList
              limit={10}
              publicKeyList={this.props.account.asset[this.props.order[i]]}
            />
          </div>
        );
      } else {
        projectCategoryOrderData.push(
          <div
            key={"profile-data-" + this.props.order[i]}
            style={{ display: this.state.index === i ? "block" : "none" }}
          >
            <NoData
              message={
                "No " +
                this.props.label[i]
                  .replaceAll("-", " ")
                  .replace(/\w\S*/g, (txt) => {
                    return (
                      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                    );
                  }) +
                " Project"
              }
              reload={"false"}
            />
          </div>
        );
      }
      projectCategoryOrderKey.push(
        <button
          key={"profile-key-" + this.props.order[i]}
          className="btn border-0"
          id={"profile-" + this.props.order[i]}
          type="button"
          style={{
            borderRadius: "25px",
            paddingLeft: "16px",
            paddingRight: "16px",
            marginLeft: "16px",
            marginRight: "16px",
            marginTop: "16px",
            color: this.state.index === i ? "rgb(255,255,255)" : "rgb(0,0,0)",
            backgroundColor:
              this.state.index === i ? "#ef233c" : "rgb(255,255,255)",
          }}
          onClick={() =>
            this.setState((state) => {
              return { ...state, index: i };
            })
          }
        >
          {this.props.label[i].replaceAll("-", " ").replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })}
        </button>
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
          {projectCategoryOrderKey}
        </div>
        <div>{projectCategoryOrderData}</div>
      </div>
    );
  }
}

export default ProfileProjectWrapper;
