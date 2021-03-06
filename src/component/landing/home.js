import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import "../general/header.css";
import logoColor from "../../asset/collabolancer.svg";
import headerImage from "../../asset/undraw_work_together_h63l.svg";
import trustless from "../../asset/undraw_verified_tw20.svg";
import collaboration from "../../asset/undraw_connected_world_wuay.svg";
import lowFee from "../../asset/undraw_pay_online_b1hk.svg";
import cashback from "../../asset/undraw_gifts_btw0.svg";
import immutable from "../../asset/undraw_security_o890.svg";
import democratize from "../../asset/undraw_voting_nvu7.svg";
import Footer from "../general/footer";
import Quote from "../general/quote";
import { parseDocumentTitle } from "../../utils/tools";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      navbarShow: false,
    };
  }

  componentDidMount() {
    document.title = parseDocumentTitle("Home");
  }

  render() {
    return (
      <div>
        <div>
          <nav
            className="navbar navbar-light navbar-expand-lg fixed-top border rounded-0 navigation-clean-button"
            style={{ height: "70px" }}
          >
            <div className="container">
              <h1
                className="navbar-brand"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "rgb(248,0,47)",
                  backgroundImage: "url(" + logoColor + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left",
                  paddingLeft: "40px",
                }}
              >
                Collabolancer
              </h1>
              <button
                className="navbar-toggler"
                onClick={() =>
                  this.setState((state) => ({
                    ...state,
                    navbarShow: true,
                  }))
                }
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className={`navbar-collapse ${
                  this.state.navbarShow ? "show" : ""
                }`}
                id="navcol-1"
                style={{
                  transition:
                    "visibility 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out",
                }}
              >
                <div className="offcanvas-header mt-3">
                  <button
                    className="btn btn-outline-danger btn-close float-right"
                    onClick={() =>
                      this.setState((state) => ({
                        ...state,
                        navbarShow: false,
                      }))
                    }
                  >
                    x
                  </button>
                  <h5
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    className="py-2 text-black"
                  >
                    Menu
                  </h5>
                </div>
                <ul className="nav navbar-nav d-md-flex ml-auto justify-content-md-end">
                  <li className="nav-item text-center" role="presentation">
                    <Link to="/auth">
                      <h1
                        className="btn btn-light border rounded-0 action-button"
                        role="button"
                        style={{
                          backgroundColor: "#ef233c",
                          width: "200px",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                          color: "white",
                        }}
                      >
                        <strong>Launch App</strong>
                      </h1>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="container">
          <div
            className="row d-flex flex-wrap-reverse motto-container"
            style={{
              marginLeft: "0px",
              marginRight: "0px",
              paddingTop: "10%",
              paddingBottom: "10%",
            }}
          >
            <div className="col-lg-8 motto" style={{ padding: "60px" }}>
              <h1
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "65px",
                  overflowWrap: "break-word",
                }}
              >
                <strong>Stop Bidding,</strong>
                <br />
                <strong style={{ color: "#ef233c" }}>
                  Start Collaborating
                </strong>
              </h1>
              <p
                className="text-justify"
                style={{ fontSize: "24px", fontFamily: "Poppins, sans-serif" }}
              >
                Collabolancer is a proof-of-concept smart freelancing platform
                that enables seamless collaboration. Lets make a better world
                together, not alone.
              </p>
            </div>
            <div
              className="col d-flex motto-img"
              style={{ minHeight: "300px" }}
            >
              <div
                className="d-xl-flex"
                style={{
                  backgroundImage: "url(" + headerImage + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>
        </div>
        <div className="whyus">
          <div className="container">
            <h1
              className="text-center"
              style={{
                fontFamily: "Poppins, sans-serif",
                marginBottom: "30px",
                marginTop: "30px",
              }}
            >
              <strong>Why Blockchain?</strong>
            </h1>
            <p
              className="text-center subwhyus"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Blockchain technology has disrupted many sectors of our everyday
              life. Believe it or not, Freelancers Marketplace will be next
              blockchain-disrupted sector, and Collabolancer will be a part of
              that. Here's Why!
            </p>
            <div className="row" style={{ marginBottom: "30px" }}>
              <div className="col" style={{ padding: "5px" }}>
                <div
                  className="whyusbox shadow"
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "60px",
                    margin: "10px",
                    height: "520px",
                  }}
                >
                  <div
                    className="d-xl-flex"
                    style={{
                      width: "180px",
                      height: "180px",
                      backgroundImage: "url(" + trustless + ")",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      marginBottom: "10px",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  />
                  <h1
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "28px",
                    }}
                  >
                    <strong>Trustless</strong>
                  </h1>
                  <p
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "17px",
                    }}
                  >
                    Collabolancer is based on Smart Contract Technology,
                    enabling trustless contact between you, your team, and
                    employer
                  </p>
                </div>
              </div>
              <div className="col" style={{ padding: "5px" }}>
                <div
                  className="whyusbox shadow"
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "60px",
                    margin: "10px",
                    height: "520px",
                  }}
                >
                  <div
                    className="d-xl-flex"
                    style={{
                      width: "180px",
                      height: "180px",
                      backgroundImage: "url(" + collaboration + ")",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      marginBottom: "10px",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  />
                  <h1
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "28px",
                    }}
                  >
                    <strong>Collaboration</strong>
                  </h1>
                  <p
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "17px",
                    }}
                  >
                    By utilizing trustless ecosystem, now you can seamlessly
                    collaborate with other over the world, something that never
                    possible before!
                  </p>
                </div>
              </div>
              <div className="col" style={{ padding: "5px" }}>
                <div
                  className="whyusbox shadow"
                  style={{
                    margin: "10px",
                    backgroundColor: "#ffffff",
                    padding: "60px",
                    height: "520px",
                  }}
                >
                  <div
                    className="d-xl-flex"
                    style={{
                      width: "180px",
                      height: "180px",
                      backgroundImage: "url(" + lowFee + ")",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      marginBottom: "10px",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  />
                  <h1
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "28px",
                    }}
                  >
                    <strong>Low Fees</strong>
                  </h1>
                  <p
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "17px",
                    }}
                  >
                    Because there is no third party involved, fees is being cut
                    extremely. Starting now, earn more, worry less
                  </p>
                </div>
              </div>
              <div className="col" style={{ padding: "5px" }}>
                <div
                  className="whyusbox shadow"
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "60px",
                    margin: "10px",
                    height: "520px",
                  }}
                >
                  <div
                    className="d-xl-flex"
                    style={{
                      width: "180px",
                      height: "180px",
                      backgroundImage: "url(" + cashback + ")",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      marginBottom: "10px",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  />
                  <h1
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "28px",
                    }}
                  >
                    <strong>Cashback</strong>
                  </h1>
                  <p
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "17px",
                    }}
                  >
                    Collabolancer aim to give incentive to every
                    collaboration-related action, and apply milestone principle.
                    Because Collaboration Matters!
                  </p>
                </div>
              </div>
              <div className="col" style={{ padding: "5px" }}>
                <div
                  className="whyusbox shadow"
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "60px",
                    margin: "10px",
                    height: "520px",
                  }}
                >
                  <div
                    className="d-xl-flex"
                    style={{
                      width: "180px",
                      height: "180px",
                      backgroundImage: "url(" + immutable + ")",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      marginBottom: "10px",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  />
                  <h1
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "28px",
                    }}
                  >
                    <strong>Immutable</strong>
                  </h1>
                  <p
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "17px",
                    }}
                  >
                    Every contribution or submission that you send, are stored
                    on immutable record of Infromation. You can own your file
                    and control it your way, forever!
                  </p>
                </div>
              </div>
              <div className="col" style={{ padding: "5px" }}>
                <div
                  className="whyusbox shadow"
                  style={{
                    margin: "10px",
                    backgroundColor: "#ffffff",
                    padding: "60px",
                    height: "520px",
                  }}
                >
                  <div
                    className="d-xl-flex"
                    style={{
                      width: "180px",
                      height: "180px",
                      backgroundImage: "url(" + democratize + ")",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      marginBottom: "10px",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  />
                  <h1
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "28px",
                    }}
                  >
                    <strong>Democratize</strong>
                  </h1>
                  <p
                    className="text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "17px",
                    }}
                  >
                    Collabolancer provides a democratic-inspired method of
                    settling your dispute using wisdom of the crowd. Your Vote
                    Matters!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Quote />
        <Footer />
      </div>
    );
  }
}

export default Home;
