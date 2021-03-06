import { getStateCenterAccount, store_account_get } from "./utils";
import { ACCOUNT, MISCELLANEOUS, STATUS } from "./constants";
import {
  BaseTransaction,
  TransactionError,
  utils,
} from "@liskhq/lisk-transactions";
import { getAddressFromPublicKey } from "@liskhq/lisk-cryptography";

/**
 * This transaction can only be executed when dispute are exceeding the time limit by anybody.
 * Voting will be calculated based on voter balance as their voting weight,
 * and winning party will be the one who has larger total voting weight.
 * The losing voters fee will then distributed to winner voter
 *
 * Required:
 * this.asset.disputePublicKey
 */
class CloseDisputeTransaction extends BaseTransaction {
  static get TYPE() {
    return 118;
  }

  /**
   * Set the `CloseDisputeTransaction` transaction FEE to 0 LSK (FREE).
   * Every time a user posts a transaction to the network, the transaction fee is paid to the delegate who includes the transaction into the block that the delegate forges.
   */
  static get FEE() {
    return `0`;
  }

  /**
   * Prepares the necessary data for the `apply` and `undo` step.
   */
  async prepare(store) {
    await store.account.cache([
      {
        address: getStateCenterAccount().address,
      },
      {
        address: getAddressFromPublicKey(this.asset.disputePublicKey),
      },
    ]);

    const disputeAccount = store.account.get(
      getAddressFromPublicKey(this.asset.disputePublicKey)
    );
    await store.account.cache([
      {
        address: getAddressFromPublicKey(disputeAccount.asset.project),
      },
      {
        address: getAddressFromPublicKey(disputeAccount.asset.case),
      },
      {
        address: getAddressFromPublicKey(
          disputeAccount.asset.targetFundAccount
        ),
      },
    ]);

    const litigantVoters = disputeAccount.asset.vote.litigant.map((el) =>
      getAddressFromPublicKey(el)
    );
    if (litigantVoters.length > 0) {
      await store.account.cache({
        address_in: litigantVoters,
      });
    }

    const defendantVoters = disputeAccount.asset.vote.defendant.map((el) =>
      getAddressFromPublicKey(el)
    );
    if (defendantVoters.length > 0) {
      await store.account.cache({
        address_in: defendantVoters,
      });
    }

    const projectAccount = store.account.get(
      getAddressFromPublicKey(disputeAccount.asset.project)
    );
    await store.account.cache([
      {
        address: getAddressFromPublicKey(projectAccount.asset.winner),
      },
    ]);

    const proposalAccount = store.account.get(
      getAddressFromPublicKey(projectAccount.asset.winner)
    );
    if (proposalAccount.asset.team.filter((el) => el !== 0).length > 0) {
      await store.account.cache({
        address_in: proposalAccount.asset.team
          .filter((el) => el !== 0)
          .map((el) => getAddressFromPublicKey(el)),
      });
    }
  }

  /**
   * Validation of asset property
   */
  validateAsset() {
    const errors = [];
    if (
      !this.asset.disputePublicKey ||
      typeof this.asset.disputePublicKey !== "string"
    ) {
      errors.push(
        new TransactionError(
          'Invalid "asset.disputePublicKey" defined on transaction',
          this.id,
          ".asset.disputePublicKey",
          this.asset.disputePublicKey,
          "disputePublicKey is required, and must be string"
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
      const stateCenter = store_account_get(
        getStateCenterAccount().publicKey,
        store
      );
      const disputeAccount = store_account_get(
        this.asset.disputePublicKey,
        store
      );
      const projectAccount = store_account_get(
        disputeAccount.asset.project,
        store
      );
      const proposalAccount = store_account_get(
        projectAccount.asset.winner,
        store
      );
      const caseAccount = store_account_get(disputeAccount.asset.case, store);
      const targetFundAccount = store_account_get(
        disputeAccount.asset.targetFundAccount,
        store
      );
      const relatedAccount = {
        litigant: caseAccount,
        defendant: targetFundAccount,
      };
      const litigantVoters = disputeAccount.asset.vote.litigant.map((el) =>
        getAddressFromPublicKey(el)
      );
      const defendantVoters = disputeAccount.asset.vote.defendant.map((el) =>
        getAddressFromPublicKey(el)
      );
      if (
        Object.prototype.hasOwnProperty.call(disputeAccount.asset, "type") &&
        disputeAccount.asset.type !== ACCOUNT.DISPUTE
      ) {
        errors.push(
          new TransactionError(
            "disputePublicKey is not a Project Account",
            this.id,
            "disputeAccount.asset.type",
            disputeAccount.asset.type,
            `Type should be ${ACCOUNT.DISPUTE}`
          )
        );
      }
      if (
        !projectAccount.asset.openedDisputes.includes(
          this.asset.disputePublicKey
        )
      ) {
        errors.push(
          new TransactionError(
            "Dispute Object public key not exist in Project account opened dispute registry",
            this.id,
            ".asset.disputePublicKey",
            this.asset.disputePublicKey,
            "Dispute Object must be exist in projectAccount.asset.openedDisputes"
          )
        );
      }
      if (
        Object.prototype.hasOwnProperty.call(stateCenter.asset, "type") &&
        stateCenter.asset.type !== ACCOUNT.STATE
      ) {
        errors.push(
          new TransactionError(
            "FATAL: configured account is not a state center account, check your configuration",
            this.id,
            "stateCenter.asset.type",
            stateCenter.asset.type,
            `Type should be ${ACCOUNT.STATE}`
          )
        );
      }
      if (
        Object.prototype.hasOwnProperty.call(stateCenter.asset, "available") &&
        Object.prototype.hasOwnProperty.call(
          stateCenter.asset.available,
          "disputes"
        ) &&
        !stateCenter.asset.available.disputes.includes(
          this.asset.disputePublicKey
        )
      ) {
        errors.push(
          new TransactionError(
            "Dispute Object public key not exist in state center available dispute registry",
            this.id,
            ".asset.disputePublicKey",
            this.asset.disputePublicKey,
            "Dispute Object must be exist in stateCenter.asset.available.disputes"
          )
        );
      }
      if (
        this.timestamp <
        disputeAccount.asset.timestamp + disputeAccount.asset.maxDays * 86400
      ) {
        errors.push(
          new TransactionError(
            "maxDays is not yet passed, can't close dispute yet",
            this.id,
            "this.timestamp",
            this.timestamp,
            `Its still ${
              disputeAccount.asset.timestamp +
              disputeAccount.asset.maxDays * 86400 -
              this.timestamp
            } more seconds from maxDays limit`
          )
        );
      }
      if (errors.length === 0) {
        let litigantScore = "0";
        let defendantScore = "0";
        litigantVoters.forEach((item) => {
          const account = store.account.get(item);
          litigantScore = utils
            .BigNum(litigantScore)
            .add(account.balance)
            .toString();
        });
        defendantVoters.forEach((item) => {
          const account = store.account.get(item);
          defendantScore = utils
            .BigNum(defendantScore)
            .add(account.balance)
            .toString();
        });
        const disputeWinner = utils.BigNum(litigantScore).gt(defendantScore)
          ? "litigant"
          : "defendant";
        const disputeLoser =
          disputeWinner === "litigant" ? "defendant" : "litigant";
        const winnerAsset = relatedAccount[disputeWinner].asset;
        const loserAsset = relatedAccount[disputeLoser].asset;
        const disputeAsset = disputeAccount.asset;
        disputeAsset.score = {
          litigant: litigantScore,
          defendant: defendantScore,
        };
        disputeAsset.winner = disputeWinner;
        const teamLegth = proposalAccount.asset.team.filter((el) => el !== 0)
          .length;
        let teamBonus = 0;
        let solverBonus = "0";
        winnerAsset.freezedFee = utils
          .BigNum(winnerAsset.freezedFee)
          .add(disputeAsset[disputeWinner + "FreezedFee"])
          .add(
            utils
              .BigNum(disputeAsset[disputeLoser + "FreezedFee"])
              .mul(
                1.0 -
                  MISCELLANEOUS.DISPUTE_FREEZEDFEE_PINALTY_TOBE_SHARED_PERCENTAGE
              )
          )
          .toString();
        if (
          disputeAccount.asset.disputeType ===
          MISCELLANEOUS.DISPUTE_TYPE.LEADER_VS_EMPLOYER
        ) {
          winnerAsset.oldStatus = winnerAsset.status;
          if (disputeWinner === "litigant") {
            winnerAsset.status = STATUS.PROPOSAL.DISPUTE_CLOSED;
            winnerAsset.freezedFund = utils
              .BigNum(winnerAsset.freezedFund)
              .add(
                utils
                  .BigNum(winnerAsset.potentialEarning)
                  .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                  .round()
              )
              .toString();
            winnerAsset.team
              .filter((el) => el !== 0)
              .forEach((item) => {
                const teamAccount = store.account.get(
                  getAddressFromPublicKey(item)
                );
                const status = teamAccount.asset.oldStatus;
                if (teamAccount.asset.oldStatus === STATUS.TEAM.SUBMITTED) {
                  store.account.set(teamAccount.address, {
                    ...teamAccount,
                    asset: {
                      ...teamAccount.asset,
                      oldStatus: teamAccount.asset.status,
                      status: status,
                      forceReject: false,
                      freezedFund: utils
                        .BigNum(teamAccount.asset.freezedFund)
                        .add(
                          utils
                            .BigNum(teamAccount.asset.potentialEarning)
                            .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                            .round()
                        )
                        .toString(),
                    },
                  });
                } else if (
                  teamAccount.asset.oldStatus === STATUS.TEAM.REJECTED
                ) {
                  store.account.set(teamAccount.address, {
                    ...teamAccount,
                    asset: {
                      ...teamAccount.asset,
                      oldStatus: teamAccount.asset.status,
                      status: status,
                      forceReject: false,
                    },
                  });
                  winnerAsset.freezedFund = utils
                    .BigNum(winnerAsset.freezedFund)
                    .add(
                      utils
                        .BigNum(teamAccount.asset.potentialEarning)
                        .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                        .round()
                    );
                } else if (
                  [STATUS.TEAM.SELECTED, STATUS.TEAM.REQUEST_REVISION].includes(
                    teamAccount.asset.oldStatus
                  )
                ) {
                  store.account.set(teamAccount.address, {
                    ...teamAccount,
                    asset: {
                      ...teamAccount.asset,
                      oldStatus: teamAccount.asset.status,
                      status: status,
                      forceReject: false,
                    },
                  });
                  loserAsset.freezedFund = utils
                    .BigNum(loserAsset.freezedFund)
                    .add(
                      utils
                        .BigNum(teamAccount.asset.potentialEarning)
                        .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                        .round()
                    );
                } else {
                  console.log(
                    "ERROR: unkown team status for determining dispute prize distribution"
                  );
                }
              });
          } else {
            winnerAsset.freezedFund = utils
              .BigNum(winnerAsset.freezedFund)
              .add(disputeAsset.freezedFund)
              .toString();
            disputeAsset.freezedFund = "0";
            solverBonus = utils.BigNum(solverBonus).add(
              utils
                .BigNum(disputeAsset[disputeLoser + "FreezedFee"])
                .mul(
                  MISCELLANEOUS.DISPUTE_FREEZEDFEE_PINALTY_TOBE_SHARED_PERCENTAGE
                )
                .div(disputeAccount.asset.vote[disputeWinner].length)
                .round()
            );
          }
        } else if (
          disputeAccount.asset.disputeType ===
          MISCELLANEOUS.DISPUTE_TYPE.TEAM_VS_LEADER
        ) {
          winnerAsset.oldStatus = winnerAsset.status;
          loserAsset.oldStatus = loserAsset.status;
          if (disputeWinner === "litigant") {
            winnerAsset.status = STATUS.TEAM.DISPUTE_CLOSED;
            loserAsset.status = STATUS.PROPOSAL.DISPUTE_CLOSED;
            teamBonus = loserAsset.guilty
              ? 0
              : utils
                  .BigNum(
                    utils
                      .BigNum(loserAsset.potentialEarning)
                      .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                      .round()
                  )
                  .div(teamLegth)
                  .round();
            winnerAsset.freezedFund = utils
              .BigNum(winnerAsset.freezedFund)
              .add(
                utils
                  .BigNum(caseAccount.asset.potentialEarning)
                  .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                  .round()
              )
              .toString();
            disputeAsset.freezedFund = utils
              .BigNum(disputeAsset.freezedFund)
              .sub(
                utils
                  .BigNum(caseAccount.asset.potentialEarning)
                  .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                  .round()
              )
              .toString();
            loserAsset.team
              .filter((el) => el !== 0)
              .map((el) => getAddressFromPublicKey(el))
              .forEach((item) => {
                if (item === relatedAccount[disputeWinner].address) {
                  winnerAsset.freezedFund = utils
                    .BigNum(winnerAsset.freezedFund)
                    .add(teamBonus)
                    .toString();
                } else {
                  const team = store.account.get(item);
                  store.account.set(team.address, {
                    ...team,
                    asset: {
                      ...team.asset,
                      freezedFund: utils
                        .BigNum(team.asset.freezedFund)
                        .add(teamBonus)
                        .toString(),
                    },
                  });
                }
              });
          } else {
            winnerAsset.oldStatus = winnerAsset.status;
            winnerAsset.status = STATUS.PROPOSAL.DISPUTE_CLOSED;
            loserAsset.oldStatus = loserAsset.status;
            loserAsset.status = STATUS.TEAM.DISPUTE_CLOSED;
            winnerAsset.freezedFund = utils
              .BigNum(winnerAsset.freezedFund)
              .add(
                utils
                  .BigNum(caseAccount.asset.potentialEarning)
                  .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                  .round()
              )
              .add(
                winnerAsset.guilty
                  ? 0
                  : utils
                      .BigNum(winnerAsset.potentialEarning)
                      .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                      .round()
              )
              .toString();
            disputeAsset.freezedFund = utils
              .BigNum(disputeAsset.freezedFund)
              .sub(
                utils
                  .BigNum(caseAccount.asset.potentialEarning)
                  .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                  .round()
              )
              .toString();
            solverBonus = utils.BigNum(solverBonus).add(
              utils
                .BigNum(disputeAsset[disputeLoser + "FreezedFee"])
                .mul(
                  MISCELLANEOUS.DISPUTE_FREEZEDFEE_PINALTY_TOBE_SHARED_PERCENTAGE
                )
                .div(disputeAccount.asset.vote[disputeWinner].length)
                .round()
            );
          }
        }
        loserAsset.oldGuilty = loserAsset.guilty;
        loserAsset.guilty = true;
        disputeAsset.status = STATUS.DISPUTE.CLOSED;
        store.account.set(disputeAccount.address, {
          ...disputeAccount,
          asset: disputeAsset,
        });
        store.account.set(relatedAccount[disputeWinner].address, {
          ...relatedAccount[disputeWinner],
          asset: winnerAsset,
        });
        store.account.set(relatedAccount[disputeLoser].address, {
          ...relatedAccount[disputeLoser],
          asset: loserAsset,
        });
        disputeAccount.asset.vote[disputeWinner].forEach((el) => {
          const solverAccount = store.account.get(getAddressFromPublicKey(el));
          const solverAsset = solverAccount.asset;
          const earning = utils
            .BigNum(disputeAccount.asset.castVoteFee)
            .add(
              utils
                .BigNum(
                  disputeAccount.asset.vote.litigant.length +
                    disputeAccount.asset.vote.defendant.length
                )
                .mul(disputeAccount.asset.castVoteFee)
                .div(disputeAccount.asset.vote[disputeWinner].length)
                .round()
            )
            .add(solverBonus)
            .toString();
          solverAsset.win = solverAsset.win + 1;
          solverAsset.log.unshift({
            timestamp: this.timestamp,
            id: this.id,
            type: this.type,
            value: utils.BigNum(0).add(earning).toString(),
          });
          solverAsset.earning = utils
            .BigNum(solverAccount.asset.earning)
            .add(earning)
            .toString();
          store.account.set(solverAccount.address, {
            ...solverAccount,
            balance: utils
              .BigNum(solverAccount.balance)
              .add(earning)
              .toString(),
            asset: solverAsset,
          });
        });
        disputeAccount.asset.vote[disputeLoser].forEach((el) => {
          const solverAccount = store.account.get(getAddressFromPublicKey(el));
          store.account.set(solverAccount.address, {
            ...solverAccount,
            asset: {
              ...solverAccount.asset,
              lose: solverAccount.asset.lose + 1,
            },
          });
        });

        const projectAsset = projectAccount.asset;
        projectAsset.activity.unshift({
          timestamp: this.timestamp,
          id: this.id,
          type: this.type,
        });
        projectAsset.oldStatus = projectAsset.status;
        projectAsset.status =
          projectAsset.openedDisputes.length === 1
            ? STATUS.PROJECT.DISPUTE_CLOSED
            : STATUS.PROJECT.DISPUTED;
        projectAsset.openedDisputes.splice(
          projectAsset.openedDisputes.indexOf(disputeAccount.publicKey),
          1
        );
        projectAsset.closedDisputes.unshift(disputeAccount.publicKey);
        projectAsset.canBeClaimedOn =
          this.timestamp +
          MISCELLANEOUS.FUND_FREEZED_PERIOD *
            MISCELLANEOUS.DISPUTE_CLOSED_CANBECLOSEDON_MULTIPLIER;
        store.account.set(projectAccount.address, {
          ...projectAccount,
          asset: projectAsset,
        });

        const stateAsset = {
          ...stateCenter.asset,
          unavailable: {
            disputes: [],
            ...stateCenter.asset.unavailable,
          },
        };
        stateAsset.available.disputes.splice(
          stateAsset.available.disputes.indexOf(disputeAccount.publicKey),
          1
        );
        stateAsset.unavailable.disputes.unshift(disputeAccount.publicKey);
        store.account.set(stateCenter.address, {
          ...stateCenter,
          asset: stateAsset,
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
    const stateCenter = store_account_get(
      getStateCenterAccount().publicKey,
      store
    );
    const disputeAccount = store_account_get(
      this.asset.disputePublicKey,
      store
    );
    const projectAccount = store_account_get(
      disputeAccount.asset.project,
      store
    );
    const proposalAccount = store_account_get(
      projectAccount.asset.winner,
      store
    );
    const caseAccount = store_account_get(disputeAccount.asset.case, store);
    const targetFundAccount = store_account_get(
      disputeAccount.asset.targetFundAccount,
      store
    );
    const relatedAccount = {
      litigant: caseAccount,
      defendant: targetFundAccount,
    };
    const disputeWinner = disputeAccount.asset.winner;
    const disputeLoser =
      disputeWinner === "litigant" ? "defendant" : "litigant";
    const winnerAsset = relatedAccount[disputeWinner].asset;
    const loserAsset = relatedAccount[disputeLoser].asset;
    const disputeAsset = disputeAccount.asset;
    disputeAsset.score = {
      litigant: "0",
      defendant: "0",
    };
    const teamLegth = proposalAccount.asset.team.filter((el) => el !== 0)
      .length;
    let teamBonus = 0;
    let solverBonus = "0";
    winnerAsset.freezedFee = utils
      .BigNum(winnerAsset.freezedFee)
      .sub(disputeAsset[disputeWinner + "FreezedFee"])
      .sub(
        utils
          .BigNum(disputeAsset[disputeLoser + "FreezedFee"])
          .mul(
            1.0 -
              MISCELLANEOUS.DISPUTE_FREEZEDFEE_PINALTY_TOBE_SHARED_PERCENTAGE
          )
      )
      .toString();
    if (
      disputeAccount.asset.disputeType ===
      MISCELLANEOUS.DISPUTE_TYPE.LEADER_VS_EMPLOYER
    ) {
      if (disputeWinner === "litigant") {
        winnerAsset.status = winnerAsset.oldStatus;
        delete winnerAsset.oldStatus;
        winnerAsset.freezedFund = utils
          .BigNum(winnerAsset.freezedFund)
          .sub(
            utils
              .BigNum(winnerAsset.potentialEarning)
              .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
              .round()
          )
          .toString();
        winnerAsset.team
          .filter((el) => el !== 0)
          .forEach((item) => {
            const teamAccount = store.account.get(
              getAddressFromPublicKey(item)
            );
            const status = teamAccount.asset.status;
            if (teamAccount.asset.status === STATUS.TEAM.SUBMITTED) {
              store.account.set(teamAccount.address, {
                ...teamAccount,
                asset: {
                  ...teamAccount.asset,
                  status: teamAccount.asset.oldStatus,
                  oldStatus: status,
                  forceReject: true,
                  freezedFund: utils
                    .BigNum(teamAccount.asset.freezedFund)
                    .sub(
                      utils
                        .BigNum(teamAccount.asset.potentialEarning)
                        .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                        .round()
                    )
                    .toString(),
                },
              });
            } else if (teamAccount.asset.status === STATUS.TEAM.REJECTED) {
              store.account.set(teamAccount.address, {
                ...teamAccount,
                asset: {
                  ...teamAccount.asset,
                  status: teamAccount.asset.oldStatus,
                  oldStatus: status,
                  forceReject: true,
                },
              });
              winnerAsset.freezedFund = utils
                .BigNum(winnerAsset.freezedFund)
                .sub(
                  utils
                    .BigNum(teamAccount.asset.potentialEarning)
                    .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                    .round()
                );
            } else if (
              [STATUS.TEAM.SELECTED, STATUS.TEAM.REQUEST_REVISION].includes(
                teamAccount.asset.status
              )
            ) {
              store.account.set(teamAccount.address, {
                ...teamAccount,
                asset: {
                  ...teamAccount.asset,
                  status: teamAccount.asset.oldStatus,
                  oldStatus: status,
                  forceReject: true,
                },
              });
              loserAsset.freezedFund = utils
                .BigNum(loserAsset.freezedFund)
                .sub(
                  utils
                    .BigNum(teamAccount.asset.potentialEarning)
                    .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                    .round()
                );
            } else {
              console.log(
                "ERROR: unkown team status for determining dispute prize distribution"
              );
            }
          });
      } else {
        winnerAsset.freezedFund = utils
          .BigNum(winnerAsset.freezedFund)
          .sub(disputeAsset.freezedFund)
          .toString();
        solverBonus = utils.BigNum(
          utils
            .BigNum(disputeAsset[disputeLoser + "FreezedFee"])
            .mul(
              MISCELLANEOUS.DISPUTE_FREEZEDFEE_PINALTY_TOBE_SHARED_PERCENTAGE
            )
            .div(disputeAccount.asset.vote[disputeWinner].length)
            .round()
        );
      }
    } else if (
      disputeAccount.asset.disputeType ===
      MISCELLANEOUS.DISPUTE_TYPE.TEAM_VS_LEADER
    ) {
      if (disputeWinner === "litigant") {
        winnerAsset.status = winnerAsset.oldStatus;
        delete winnerAsset.oldStatus;
        loserAsset.status = loserAsset.oldStatus;
        delete loserAsset.oldStatus;
        teamBonus = loserAsset.oldGuilty
          ? 0
          : utils
              .BigNum(
                utils
                  .BigNum(loserAsset.potentialEarning)
                  .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                  .round()
              )
              .div(teamLegth)
              .round();
        winnerAsset.freezedFund = utils
          .BigNum(winnerAsset.freezedFund)
          .sub(
            utils
              .BigNum(caseAccount.asset.potentialEarning)
              .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
              .round()
          )
          .toString();
        disputeAsset.freezedFund = utils
          .BigNum(disputeAsset.freezedFund)
          .add(
            utils
              .BigNum(caseAccount.asset.potentialEarning)
              .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
              .round()
          )
          .toString();
        loserAsset.team
          .filter((el) => el !== 0)
          .map((el) => getAddressFromPublicKey(el))
          .forEach((item) => {
            if (item === relatedAccount[disputeWinner].address) {
              winnerAsset.freezedFund = utils
                .BigNum(winnerAsset.freezedFund)
                .sub(teamBonus)
                .toString();
            } else {
              const team = store.account.get(item);
              store.account.set(team.address, {
                ...team,
                asset: {
                  ...team.asset,
                  freezedFund: utils
                    .BigNum(team.asset.freezedFund)
                    .sub(teamBonus)
                    .toString(),
                },
              });
            }
          });
      } else {
        winnerAsset.status = winnerAsset.oldStatus;
        delete winnerAsset.oldStatus;
        loserAsset.status = loserAsset.oldStatus;
        delete loserAsset.oldStatus;
        winnerAsset.freezedFund = utils
          .BigNum(winnerAsset.freezedFund)
          .sub(
            utils
              .BigNum(caseAccount.asset.potentialEarning)
              .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
              .round()
          )
          .sub(
            winnerAsset.guilty
              ? 0
              : utils
                  .BigNum(winnerAsset.potentialEarning)
                  .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
                  .round()
          )
          .toString();
        disputeAsset.freezedFund = utils
          .BigNum(disputeAsset.freezedFund)
          .add(
            utils
              .BigNum(caseAccount.asset.potentialEarning)
              .mul(MISCELLANEOUS.DISPUTE_SEIZURE_PERCENTAGE)
              .round()
          )
          .toString();
        solverBonus = utils.BigNum(
          utils
            .BigNum(disputeAsset[disputeLoser + "FreezedFee"])
            .mul(
              MISCELLANEOUS.DISPUTE_FREEZEDFEE_PINALTY_TOBE_SHARED_PERCENTAGE
            )
            .div(disputeAccount.asset.vote[disputeWinner].length)
            .round()
        );
      }
    }
    loserAsset.guilty = loserAsset.oldGuilty;
    delete loserAsset.oldGuilty;
    disputeAsset.status = STATUS.DISPUTE.OPEN;
    store.account.set(disputeAccount.address, {
      ...disputeAccount,
      asset: disputeAsset,
    });
    store.account.set(relatedAccount[disputeWinner].address, {
      ...relatedAccount[disputeWinner],
      asset: winnerAsset,
    });
    store.account.set(relatedAccount[disputeLoser].address, {
      ...relatedAccount[disputeLoser],
      asset: loserAsset,
    });
    disputeAccount.asset.vote[disputeWinner].forEach((el) => {
      const solverAccount = store.account.get(getAddressFromPublicKey(el));
      const solverAsset = solverAccount.asset;
      const earning = utils
        .BigNum(disputeAccount.asset.castVoteFee)
        .sub(
          utils
            .BigNum(
              disputeAccount.asset.vote.litigant.length +
                disputeAccount.asset.vote.defendant.length
            )
            .mul(disputeAccount.asset.castVoteFee)
            .div(disputeAccount.asset.vote[disputeWinner].length)
            .round()
        )
        .sub(solverBonus)
        .toString();
      solverAsset.win = solverAsset.win - 1;
      solverAsset.log.shift();
      solverAsset.earning = utils
        .BigNum(solverAccount.asset.earning)
        .sub(earning)
        .toString();
      store.account.set(solverAccount.address, {
        ...solverAccount,
        balance: utils.BigNum(solverAccount.balance).sub(earning).toString(),
        asset: solverAsset,
      });
    });
    disputeAccount.asset.vote[disputeLoser].forEach((el) => {
      const solverAccount = store.account.get(getAddressFromPublicKey(el));
      store.account.set(solverAccount.address, {
        ...solverAccount,
        asset: {
          ...solverAccount.asset,
          lose: solverAccount.asset.lose - 1,
        },
      });
    });

    const projectAsset = projectAccount.asset;
    projectAsset.activity.shift();
    projectAsset.status = projectAsset.oldStatus;
    delete projectAsset.oldStatus;
    projectAsset.openedDisputes.unshift(disputeAccount.publicKey);
    projectAsset.closedDisputes.splice(
      projectAsset.closedDisputes.indexOf(disputeAccount.publicKey),
      1
    );
    projectAsset.canBeClaimedOn =
      projectAsset.canBeClaimedOn -
      MISCELLANEOUS.FUND_FREEZED_PERIOD *
        MISCELLANEOUS.DISPUTE_CLOSED_CANBECLOSEDON_MULTIPLIER;
    store.account.set(projectAccount.address, {
      ...projectAccount,
      asset: projectAsset,
    });

    const stateAsset = {
      ...stateCenter.asset,
      unavailable: {
        disputes: [],
        ...stateCenter.asset.unavailable,
      },
    };
    stateAsset.available.disputes.unshift(disputeAccount.publicKey);
    stateAsset.unavailable.disputes.splice(
      stateAsset.unavailable.disputes.indexOf(disputeAccount.publicKey),
      1
    );
    store.account.set(stateCenter.address, {
      ...stateCenter,
      asset: stateAsset,
    });
    return [];
  }
}

export default CloseDisputeTransaction;
