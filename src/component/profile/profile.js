/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Footer from "../general/footer";
import Header from "../general/header";
import Quote from "../general/quote";
import { getAccounts, getSession, guestProfile } from "../../utils/tools";
import { withRouter } from "react-router-dom";
import Loading from "../general/loading";
import { toast } from "react-toastify";
import { ACCOUNT } from "../../transactions/constants";
import NoData from "../general/nodata";
import EmployerProfile from "./employerProfile";
import WorkerProfile from "./workerProfile";
import SolverProfile from "./solverProfile";
const {
  getAddressAndPublicKeyFromPassphrase,
} = require("@liskhq/lisk-cryptography");

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      account: null,
      profile: null,
      index: 0,
    };
    this.loadAccount = this.loadAccount.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
  }

  loadProfile() {
    if (this.props.match.params.address) {
      try {
        getAccounts({
          address: this.props.match.params.address,
        })
          .then((res) => {
            if (
              [ACCOUNT.EMPLOYER, ACCOUNT.WORKER, ACCOUNT.SOLVER].includes(
                res.data[0].asset.type
              )
            ) {
              this.setState({ profile: { code: 200, data: res.data[0] } });
            } else {
              this.setState({
                profile: {
                  code: 403,
                  data:
                    this.props.match.params.address +
                    " Is Not a Valid Profile Account!",
                },
              });
            }
          })
          .catch(() => {
            this.setState({
              profile: { code: 404, data: "Profile Not Found, Check Address!" },
            });
          });
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      }
    }
  }

  loadAccount() {
    if (getSession("secret")) {
      const timeout = 3000;
      getAccounts({
        address: getAddressAndPublicKeyFromPassphrase(getSession("secret"))
          .address,
      }).then((res) => {
        if (res.data.length === 0) {
          setTimeout(() => {
            this.onLoad();
          }, timeout);
        } else {
          this.setState({ account: res.data[0] });
        }
      });
    } else {
      this.setState({ account: guestProfile });
    }
  }

  componentDidMount() {
    this.loadAccount();
    this.loadProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      if (
        this.state.profile &&
        this.state.profile.data.address !== this.props.match.params.address
      ) {
        window.location.reload();
      }
    }
  }

  render() {
    let profilePage = null;
    if (this.state.profile && this.state.profile.code === 200) {
      switch (this.state.profile.data.asset.type) {
        case ACCOUNT.EMPLOYER:
          profilePage = <EmployerProfile profile={this.state.profile} />;
          break;
        case ACCOUNT.WORKER:
          profilePage = <WorkerProfile profile={this.state.profile} />;
          break;
        case ACCOUNT.SOLVER:
          profilePage = <SolverProfile profile={this.state.profile} />;
          break;
        default:
          break;
      }
    }
    return (
      <div>
        <Header account={this.state.account} />
        {this.state.profile ? (
          this.state.profile.code === 200 ? (
            <div>
              <div
                className="container"
                style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              >
                {profilePage}
              </div>
            </div>
          ) : (
            <NoData
              code={this.state.profile.code}
              message={this.state.profile.data}
              reload={"false"}
            />
          )
        ) : (
          <Loading />
        )}
        <Quote />
        <Footer />
      </div>
    );
  }
}

export default withRouter(Profile);
