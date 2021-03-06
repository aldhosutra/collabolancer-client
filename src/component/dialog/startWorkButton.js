import React from "react";
import { toast } from "react-toastify";
import { STATUS } from "../../transactions/constants";
import { getSession } from "../../utils/tools";
import { startWork } from "../../utils/transaction";
import config from "../../config/config";

class StartWorkButton extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
    this.onStartWork = this.onStartWork.bind(this);
  }

  onStartWork() {
    if (!this.state.clicked) {
      this.setState(() => {
        return {
          clicked: true,
        };
      });
    } else {
      return;
    }
    try {
      startWork(
        getSession("secret"),
        this.props.project.publicKey,
        this.props.proposal.publicKey
      )
        .then((data) => {
          if (!data.errors) {
            toast.success(
              "Start work successful, page will be reloaded after " +
                config.block_time / 1000 +
                " seconds!, click this to cancel auto reload",
              {
                autoClose: config.block_time,
                closeButton: false,
                pauseOnHover: false,
                draggable: false,
                onClick: () => {
                  clearTimeout(reloader);
                },
              }
            );
            window.$("#modal-" + this.props.proposal.publicKey).modal("hide");
            let reloader = setTimeout(() => {
              window.location.reload();
            }, config.block_time);
          } else {
            toast.error(
              data.message +
                ": " +
                data.errors.map((err) => err.message).toString()
            );
          }
        })
        .catch((err) => {
          toast.error(`Error: ${err.message}`);
        });
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
    this.setState((state) => {
      return {
        clicked: false,
      };
    });
  }

  render() {
    if (
      this.props.account &&
      this.props.account.address === this.props.project.asset.employer &&
      this.props.project.asset.status === STATUS.PROJECT.OPEN
    ) {
      return (
        <button
          className="btn btn-light"
          type="button"
          data-dismiss="modal"
          style={{
            width: "150px",
            backgroundColor: "#ef233c",
            color: "rgb(255,255,255)",
          }}
          disabled={!this.props.enabled}
          onClick={() => {
            this.onStartWork();
          }}
        >
          Hire Me
        </button>
      );
    } else {
      return null;
    }
  }
}

export default StartWorkButton;
