import { store_account_get, deflationaryMultiplier } from "./utils";
import { STATUS, ACCOUNT, MISCELLANEOUS } from "./constants";
import {
  BaseTransaction,
  TransactionError,
  utils,
} from "@liskhq/lisk-transactions";
import { getAddressFromPublicKey } from "@liskhq/lisk-cryptography";

/**
 * This custom transaction can only be executed by project member, whether is owner, leader, or team member.
 * After project is marked as finished, it is exactly one dat, that will be the opportunity to open a dispute,
 * and if it has passed this transaction can be executed, so the funds can be disbursed,
 * this scheme is fair for everyone
 *
 * Required:
 * this.asset.projectPublicKey
 */
class ClaimPrizeTransaction extends BaseTransaction {
  static get TYPE() {
    return 113;
  }

  /**
   * Set the `ClaimPrizeTransaction` transaction FEE to 0.
   * Every time a user posts a transaction to the network, the transaction fee is paid to the delegate who includes the transaction into the block that the delegate forges.
   */
  static get FEE() {
    return `0`;
  }

  /**
   * Prepares the necessary data for the `apply` and `undo` step.
   * In this case, many account need to be prepared, the goal is to retrieve all team member and worker
   */
  async prepare(store) {
    // retrieve project details
    await store.account.cache([
      {
        address: this.senderId,
      },
      {
        address: getAddressFromPublicKey(this.asset.projectPublicKey),
      },
    ]);

    // retrieve winner proposal details
    const projectAccount = store.account.get(
      getAddressFromPublicKey(this.asset.projectPublicKey)
    );
    await store.account.cache([
      {
        address: getAddressFromPublicKey(projectAccount.asset.winner),
      },
      {
        address: projectAccount.asset.employer,
      },
    ]);

    // retrieve leader account
    const proposalAccount = store.account.get(
      getAddressFromPublicKey(projectAccount.asset.winner)
    );
    await store.account.cache([
      {
        address: proposalAccount.asset.leader,
      },
    ]);

    // retrieve team member
    const teamAddressList = proposalAccount.asset.team
      .filter((el) => el !== 0)
      .map((data) => getAddressFromPublicKey(data));
    await store.account.cache({
      address_in: teamAddressList,
    });

    // retrieve team worker account
    const teamAccounts = [];
    teamAddressList.forEach((item) => {
      const team = store.account.get(item);
      teamAccounts.push(team.asset.worker);
    });
    if (teamAccounts.length > 0) {
      await store.account.cache({
        address_in: teamAccounts,
      });
    }
  }

  /**
   * Validation of asset property
   */
  validateAsset() {
    const errors = [];
    if (
      !this.asset.projectPublicKey ||
      typeof this.asset.projectPublicKey !== "string"
    ) {
      errors.push(
        new TransactionError(
          'Invalid "asset.projectPublicKey" defined on transaction',
          this.id,
          ".asset.projectPublicKey",
          this.asset.projectPublicKey,
          "projectPublicKey is required, and must be string"
        )
      );
    }
    return errors;
  }

  /**
   * applyAsset is where the custom logic is implemented.
   * applyAsset() and undoAsset() uses the information from the `store`.
   */
  applyAsset(store) {
    const errors = [];
    try {
      const teamAccounts = [];
      const sender = store.account.get(this.senderId);
      const projectAccount = store_account_get(
        this.asset.projectPublicKey,
        store
      );
      const employerAccount = store.account.get(projectAccount.asset.employer);
      const proposalAccount = store_account_get(
        projectAccount.asset.winner,
        store
      );
      const leaderAccount = store.account.get(proposalAccount.asset.leader);
      proposalAccount.asset.team
        .filter((el) => el !== 0)
        .forEach((item) => {
          teamAccounts.push(store_account_get(item, store));
        });
      if (
        Object.prototype.hasOwnProperty.call(sender.asset, "type") &&
        sender.asset.type === ACCOUNT.EMPLOYER
      ) {
        if (projectAccount.asset.employer !== sender.address) {
          errors.push(
            new TransactionError(
              "Sender is employer, but not owner of this project",
              this.id,
              "sender.address",
              sender.address,
              "Project Owner is: " + projectAccount.asset.employer
            )
          );
        }
      } else if (
        Object.prototype.hasOwnProperty.call(sender.asset, "type") &&
        sender.asset.type === ACCOUNT.WORKER
      ) {
        if (
          !teamAccounts.map((el) => el.asset.worker).includes(sender.address) ||
          proposalAccount.asset.leader !== sender.address
        ) {
          errors.push(
            new TransactionError(
              "Sender is worker, but not leader or team member of this project",
              this.id,
              "sender.address",
              sender.address,
              "Project Leader is: " +
                proposalAccount.asset.leader +
                ", and team member list is: " +
                this.teamAddressList.toString()
            )
          );
        }
      }
      if (
        Object.prototype.hasOwnProperty.call(projectAccount.asset, "type") &&
        projectAccount.asset.type !== ACCOUNT.PROJECT
      ) {
        errors.push(
          new TransactionError(
            "specified projectPublicKey is not a project account",
            this.id,
            ".asset.projectPublicKey",
            projectAccount.asset.type,
            `Type mush be ${ACCOUNT.PROJECT}`
          )
        );
      }
      if (
        ![
          STATUS.PROJECT.FINISHED,
          STATUS.PROJECT.REFUSED,
          STATUS.PROJECT.TERMINATED,
          STATUS.PROJECT.CANCELLED,
          STATUS.PROJECT.DISPUTE_CLOSED,
        ].includes(projectAccount.asset.status)
      ) {
        errors.push(
          new TransactionError(
            `Project account status is not in ${[
              STATUS.PROJECT.FINISHED,
              STATUS.PROJECT.REFUSED,
              STATUS.PROJECT.TERMINATED,
              STATUS.PROJECT.CANCELLED,
              STATUS.PROJECT.DISPUTE_CLOSED,
            ].toString()}, therefore you can't claim prize`,
            this.id,
            "projectAccount.asset.status",
            projectAccount.asset.status,
            `Status must be ${[
              STATUS.PROJECT.FINISHED,
              STATUS.PROJECT.REFUSED,
              STATUS.PROJECT.TERMINATED,
              STATUS.PROJECT.CANCELLED,
              STATUS.PROJECT.DISPUTE_CLOSED,
            ].toString()}`
          )
        );
      }
      if (
        projectAccount.asset.canBeClaimedOn !== null &&
        this.timestamp < projectAccount.asset.canBeClaimedOn
      ) {
        errors.push(
          new TransactionError(
            "Cant claim prize yet",
            this.id,
            ".timestamp",
            this.timestamp,
            "It's still: " +
              (
                projectAccount.asset.canBeClaimedOn - this.timestamp
              ).toString() +
              " seconds more"
          )
        );
      }
      if (errors.length === 0) {
        let deflation = 1;
        deflationaryMultiplier().then((rate) => {
          deflation = rate;
        });
        const teamPaymentList = [];
        let notRejectedTeamLength = 0;
        teamAccounts.forEach((item) => {
          const workerAccount = store.account.get(item.asset.worker);
          notRejectedTeamLength =
            item.asset.status === STATUS.TEAM.REJECTED ||
            item.asset.guilty === true
              ? notRejectedTeamLength
              : notRejectedTeamLength + 1;
          teamPaymentList.push({
            address: workerAccount.address,
            amount: utils.BigNum(item.asset.freezedFund),
            releasedFee: utils.BigNum(item.asset.freezedFee),
            cashback: utils
              .BigNum(item.asset.freezedFund)
              .mul(MISCELLANEOUS.TEAM_CASHBACK_PERCENTAGE * deflation)
              .round(),
            status: item.asset.status,
            guilty: item.asset.guilty,
          });
        });
        teamPaymentList.forEach((element) => {
          const workerAccount = store.account.get(element.address);
          const workerAsset = {
            joined: [],
            contributorOf: [],
            ...workerAccount.asset,
          };
          workerAsset.earning = utils
            .BigNum(workerAsset.earning)
            .add(element.amount)
            .add(element.releasedFee)
            .add(element.cashback)
            .toString();
          workerAsset.log.unshift({
            timestamp: this.timestamp,
            id: this.id,
            type: this.type,
            value: utils
              .BigNum(0)
              .add(element.amount)
              .add(element.releasedFee)
              .add(element.cashback)
              .toString(),
          });
          const joinedIndex = workerAsset.joined.indexOf(
            projectAccount.publicKey
          );
          if (joinedIndex > -1) {
            workerAsset.joined.splice(joinedIndex, 1);
          }
          if (element.guilty === false) {
            workerAsset.contributorOf.unshift(projectAccount.publicKey);
          } else {
            workerAsset.guilty.unshift(projectAccount.publicKey);
          }
          store.account.set(workerAccount.address, {
            ...workerAccount,
            balance: utils
              .BigNum(workerAccount.balance)
              .add(element.amount)
              .add(element.releasedFee)
              .add(element.cashback)
              .toString(),
            asset: workerAsset,
          });
        });
        const leaderAsset = {
          joined: [],
          leaderOf: [],
          ...leaderAccount.asset,
        };
        const leaderEarning = utils
          .BigNum(proposalAccount.asset.freezedFund)
          .add(proposalAccount.asset.freezedFee)
          .add(
            utils
              .BigNum(proposalAccount.asset.freezedFund)
              .mul(
                MISCELLANEOUS.LEADER_CASHBACK_PERCENTAGE *
                  notRejectedTeamLength *
                  deflation
              )
              .round()
          )
          .toString();
        leaderAsset.earning = utils
          .BigNum(leaderAsset.earning)
          .add(leaderEarning)
          .toString();
        leaderAsset.log.unshift({
          timestamp: this.timestamp,
          id: this.id,
          type: this.type,
          value: utils.BigNum(0).add(leaderEarning).toString(),
        });
        const leaderIndex = leaderAsset.joined.indexOf(
          projectAccount.publicKey
        );
        if (leaderIndex > -1) {
          leaderAsset.joined.splice(leaderIndex, 1);
        }
        if (proposalAccount.asset.guilty === true) {
          leaderAsset.guilty.unshift(projectAccount.publicKey);
        } else if (proposalAccount.asset.cancelled === true) {
          leaderAsset.cancelled.unshift(projectAccount.publicKey);
        } else {
          leaderAsset.leaderOf.unshift(projectAccount.publicKey);
        }
        store.account.set(leaderAccount.address, {
          ...leaderAccount,
          balance: utils
            .BigNum(leaderAccount.balance)
            .add(leaderEarning)
            .toString(),
          asset: leaderAsset,
        });
        const employerAsset = {
          open: [],
          done: [],
          ...employerAccount.asset,
        };
        employerAsset.spent = utils
          .BigNum(employerAsset.spent)
          .sub(projectAccount.asset.freezedFund)
          .sub(projectAccount.asset.freezedFee)
          .toString();
        employerAsset.log.unshift({
          timestamp: this.timestamp,
          id: this.id,
          type: this.type,
          value: utils
            .BigNum(0)
            .add(projectAccount.asset.freezedFund)
            .add(projectAccount.asset.freezedFee)
            .add(
              utils
                .BigNum(projectAccount.asset.freezedFund)
                .mul(MISCELLANEOUS.EMPLOYER_CASHBACK_PERCENTAGE * deflation)
                .round()
            )
            .toString(),
        });
        if (projectAccount.asset.terminated === true) {
          employerAsset.terminated.unshift(projectAccount.publicKey);
        } else if (projectAccount.asset.guilty === true) {
          employerAsset.guilty.unshift(projectAccount.publicKey);
        } else {
          employerAsset.done.unshift(projectAccount.publicKey);
        }
        const employerOpenIndex = employerAsset.ongoing.indexOf(
          projectAccount.publicKey
        );
        if (employerOpenIndex > -1) {
          employerAsset.ongoing.splice(employerOpenIndex, 1);
        }
        store.account.set(employerAccount.address, {
          ...employerAccount,
          balance: utils
            .BigNum(employerAccount.balance)
            .add(projectAccount.asset.freezedFund)
            .add(projectAccount.asset.freezedFee)
            .add(
              utils
                .BigNum(projectAccount.asset.freezedFund)
                .mul(MISCELLANEOUS.EMPLOYER_CASHBACK_PERCENTAGE * deflation)
                .round()
            )
            .toString(),
          asset: employerAsset,
        });
        const projectAsset = {
          ...projectAccount.asset,
          oldStatus: projectAccount.asset.status,
          status: STATUS.PROJECT.CLAIMED,
        };
        projectAsset.cashback = utils
          .BigNum(projectAccount.asset.freezedFund)
          .mul(MISCELLANEOUS.EMPLOYER_CASHBACK_PERCENTAGE * deflation)
          .round()
          .toString();
        projectAsset.activity.unshift({
          timestamp: this.timestamp,
          id: this.id,
          type: this.type,
        });
        store.account.set(projectAccount.address, {
          ...projectAccount,
          asset: projectAsset,
        });
        store.account.set(proposalAccount.address, {
          ...proposalAccount,
          asset: {
            ...proposalAccount.asset,
            oldStatus: proposalAccount.asset.status,
            status: STATUS.PROPOSAL.CLAIMED,
            cashback: utils
              .BigNum(proposalAccount.asset.freezedFund)
              .mul(
                MISCELLANEOUS.LEADER_CASHBACK_PERCENTAGE *
                  notRejectedTeamLength *
                  deflation
              )
              .round()
              .toString(),
          },
        });
        teamAccounts.forEach((team) => {
          store.account.set(team.address, {
            ...team,
            asset: {
              ...team.asset,
              oldStatus: team.asset.status,
              status: STATUS.TEAM.CLAIMED,
              cashback: utils
                .BigNum(
                  teamPaymentList.filter(
                    (el) => el.address === team.asset.worker
                  )[0].cashback
                )
                .toString(),
            },
          });
        });
      }
    } catch (err) {
      console.log(err);
      errors.push(
        new TransactionError(`[Unexpected Error] - ${err.toString()}`)
      );
    }
    return errors; // array of TransactionErrors, returns empty array if no errors are thrown
  }

  /**
   * Inverse of `applyAsset`.
   * Undoes the changes made in applyAsset()
   */
  undoAsset(store) {
    const teamAccounts = [];
    const projectAccount = store_account_get(
      this.asset.projectPublicKey,
      store
    );
    const employerAccount = store.account.get(projectAccount.asset.employer);
    const proposalAccount = store_account_get(
      projectAccount.asset.winner,
      store
    );
    const leaderAccount = store.account.get(proposalAccount.asset.leader);
    proposalAccount.asset.team
      .filter((el) => el !== 0)
      .forEach((item) => {
        teamAccounts.push(store_account_get(item));
      });
    const teamPaymentList = [];
    teamAccounts.forEach((item) => {
      const workerAccount = store.account.get(item.asset.worker);
      teamPaymentList.push({
        address: workerAccount.address,
        amount: utils.BigNum(item.asset.freezedFund),
        releasedFee: utils.BigNum(item.asset.freezedFee),
        cashback: item.asset.cashback,
        status: item.asset.oldStatus,
        guilty: item.asset.guilty,
      });
    });
    teamPaymentList.forEach((element) => {
      const workerAccount = store.account.get(element.address);
      const workerAsset = {
        joined: [],
        contributorOf: [],
        ...workerAccount.asset,
      };
      workerAsset.earning = utils
        .BigNum(workerAsset.earning)
        .sub(element.amount)
        .sub(element.releasedFee)
        .sub(element.cashback)
        .toString();
      workerAsset.log.shift();
      if (!workerAsset.joined.includes(projectAccount.publicKey)) {
        workerAsset.joined.unshift(projectAccount.publicKey);
      }
      if (element.guilty === false) {
        workerAsset.contributorOf.shift();
      } else {
        workerAsset.guilty.shift();
      }
      store.account.set(workerAccount.address, {
        ...workerAccount,
        balance: utils
          .BigNum(workerAccount.balance)
          .sub(element.amount)
          .sub(element.releasedFee)
          .sub(element.cashback)
          .toString(),
        asset: workerAsset,
      });
    });
    const leaderAsset = {
      joined: [],
      leaderOf: [],
      ...leaderAccount.asset,
    };
    leaderAsset.earning = utils
      .BigNum(leaderAsset.earning)
      .sub(proposalAccount.asset.freezedFund)
      .sub(proposalAccount.asset.freezedFee)
      .sub(proposalAccount.asset.cashback)
      .toString();
    leaderAsset.log.shift();
    if (!leaderAsset.joined.includes(projectAccount.publicKey)) {
      leaderAsset.joined.unshift(projectAccount.publicKey);
    }
    if (proposalAccount.asset.guilty === true) {
      leaderAsset.guilty.shift();
    } else if (proposalAccount.asset.cancelled === true) {
      leaderAsset.cancelled.shift();
    } else {
      leaderAsset.leaderOf.shift();
    }
    store.account.set(leaderAccount.address, {
      ...leaderAccount,
      balance: utils
        .BigNum(leaderAccount.balance)
        .sub(proposalAccount.asset.freezedFund)
        .sub(proposalAccount.asset.freezedFee)
        .sub(proposalAccount.asset.cashback)
        .toString(),
      asset: leaderAsset,
    });
    const employerAsset = {
      open: [],
      done: [],
      ...employerAccount.asset,
    };
    employerAsset.spent = utils
      .BigNum(employerAsset.spent)
      .add(projectAccount.asset.freezedFund)
      .add(projectAccount.asset.freezedFee)
      .toString();
    employerAsset.log.shift();
    if (projectAccount.asset.terminated === true) {
      employerAsset.terminated.shift();
    } else if (projectAccount.asset.guilty === true) {
      employerAsset.guilty.shift();
    } else {
      employerAsset.done.shift();
    }
    if (!employerAsset.ongoing.includes(projectAccount.publicKey)) {
      employerAsset.ongoing.unshift(projectAccount.publicKey);
    }
    store.account.set(employerAccount.address, {
      ...employerAccount,
      balance: utils
        .BigNum(employerAccount.balance)
        .sub(projectAccount.asset.freezedFund)
        .sub(projectAccount.asset.freezedFee)
        .sub(projectAccount.asset.cashback)
        .toString(),
      asset: employerAsset,
    });
    const projectAsset = {
      ...projectAccount.asset,
      status: projectAccount.asset.oldStatus,
      cashback: "0",
    };
    delete projectAsset.oldStatus;
    projectAsset.activity.shift();
    store.account.set(projectAccount.address, {
      ...projectAccount,
      asset: projectAsset,
    });
    const proposalAsset = {
      ...proposalAccount.asset,
      status: proposalAccount.asset.oldStatus,
      cashback: "0",
    };
    delete proposalAsset.oldStatus;
    store.account.set(proposalAccount.address, {
      ...proposalAccount,
      asset: proposalAsset,
    });
    teamAccounts.forEach((team) => {
      const teamAsset = {
        ...team.asset,
        status: team.asset.oldStatus,
        cashback: "0",
      };
      delete teamAsset.oldStatus;
      store.account.set(team.address, {
        ...team,
        asset: teamAsset,
      });
    });
    return [];
  }
}

export default ClaimPrizeTransaction;
