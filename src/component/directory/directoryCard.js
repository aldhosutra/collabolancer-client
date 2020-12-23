import React from "react";
import { Link } from "react-router-dom";
import { renderAvatar } from "../avatar";

class DirectoryCard extends React.PureComponent {
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
    if (!this.props.address) return null;
    const bgColor = this.state.isHover ? "#EDF2F4" : "white";
    return (
      <div>
        <Link
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
          to={`/app/profile/${this.props.address}`}
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
              <div
                className="avatar-card"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  backgroundImage: `url('data:image/svg+xml,${renderAvatar(
                    this.props.address,
                    250
                  )}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "left",
                  paddingLeft: "50px",
                  height: "40px",
                }}
              >
                <strong
                  className="avatar-address"
                  style={{ lineHeight: "40px", fontSize: "18px" }}
                >
                  {this.props.address}
                </strong>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default DirectoryCard;
