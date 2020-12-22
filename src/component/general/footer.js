import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

class Footer extends React.PureComponent {
  render() {
    return (
      <div
        className="footer-dark"
        style={{
          fontFamily: "Poppins, sans-serif",
          backgroundColor: "#2B2D42",
        }}
      >
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-6 item text">
                <Link
                  className="link-white"
                  to={"/"}
                  style={{ textDecoration: "none" }}
                >
                  <h3>Collabolancer</h3>
                </Link>
                <p>
                  Collabolancer is a decentralized Freelancing Platform powered
                  by Blockchain, providing trustless ecosystem and enabling
                  collaboration
                </p>
              </div>
              <div className="col-sm-6 col-md-3 item">
                <h3>Source Code</h3>
                <ul>
                  <li>
                    <a
                      href="https://github.com/aldhosutra/collabolancer"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ overflowWrap: "break-word" }}
                    >
                      https//github.com/aldhosutra/collabolancer
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/aldhosutra/collabolancer-client"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ overflowWrap: "break-word" }}
                    >
                      https//github.com/aldhosutra/collabolancer-client
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-3 item">
                <h3>About</h3>
                <ul>
                  <li>
                    <a
                      href="mailto:mail@collabolancer.com"
                      style={{ overflowWrap: "break-word" }}
                    >
                      Contact Us:
                      <br />
                      mail@collabolancer.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://explorer.lisk.io/address/15867767103092050493L"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ overflowWrap: "break-word" }}
                    >
                      Donate:&nbsp;
                      <br />
                      <strong>15867767103092050493L</strong>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-flex">
              <p
                className="copyright"
                style={{ paddingTop: "0px", fontSize: "12px" }}
              >
                Collabolancer © 2020 - Proudly Powered By:&nbsp;
              </p>
              <a
                href="https://lisk.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "12px" }}
              >
                Lisk SDK
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
