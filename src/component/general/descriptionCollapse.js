import React from "react";
import "./descriptionCollapse.css";
const parse = require("html-react-parser");

class DescriptionCollapse extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 0,
      collapsed: false,
      hover: false,
    };
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState((state) => {
      return {
        ...state,
        height: height,
      };
    });
  }

  componentDidUpdate() {
    const height = this.divElement.clientHeight;
    if (height !== this.state.height) {
      this.setState((state) => {
        return {
          ...state,
          height: height,
        };
      });
    }
  }

  render() {
    return (
      <div>
        <div
          className="collapse description-collapse"
          id={this.props.id}
          style={{ height: this.state.height > 120 ? "7.5rem" : "auto" }}
        >
          <p
            className="text-justify"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: this.props.fontSize,
            }}
            ref={(divElement) => {
              this.divElement = divElement;
            }}
          >
            {parse(this.props.description)}
          </p>
        </div>
        {this.state.height > 120 ? (
          <div>
            <button
              class="collapsed"
              data-toggle="collapse"
              data-target={"#" + this.props.id}
              aria-expanded="false"
              aria-controls={this.props.id}
              style={{
                backgroundColor: this.state.hover ? "#EDF2F4" : "white",
                padding: "4px",
                marginTop: "16px",
                marginBottom: "16px",
                width: "100%",
                textAlign: "center",
                background: "none",
                border: "none",
                outline: "none",
              }}
              onMouseEnter={() => {
                this.setState((state) => {
                  return {
                    ...state,
                    hover: true,
                  };
                });
              }}
              onMouseLeave={() => {
                this.setState((state) => {
                  return {
                    ...state,
                    hover: false,
                  };
                });
              }}
              onClick={() => {
                this.setState((state) => {
                  return {
                    ...state,
                    collapsed: !this.state.collapsed,
                  };
                });
              }}
            >
              <strong>
                {this.state.collapsed
                  ? new DOMParser().parseFromString("&#11205;", "text/html")
                      .body.textContent + " Less"
                  : new DOMParser().parseFromString("&#11206;", "text/html")
                      .body.textContent + " Read More"}
              </strong>
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default DescriptionCollapse;
