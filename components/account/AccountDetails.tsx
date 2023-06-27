import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import styles from "../../styles/components/account/AccountDetails.module.css";
import { ODDS_ADDRESS, ODDS_TOKEN_ADDRESS } from "@/utils";
import { ODDS_ABI, ODDS_TOKEN_ABI } from "@/abi";
import { useState } from "react";

export const AccountDetails = () => {
  const [fundAmount, setFundAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const { address: userAddress } = useAccount();

  ///////// SMART CONTRACT READ FUNCTIONS ///////////

  // GET USER details
  const { data: userDetails } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getUserDetails",
    args: [userAddress],
  });

  console.log(userDetails);

  ///////// SMART CONTRACT WRITE FUNCTIONS ///////////

  // FUND ACCOUNT
  const { config: fundAccountConfig } = usePrepareContractWrite({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "fundAccount",
    args: [fundAmount * 10 ** 18],
  });
  const { write: fundAccount } = useContractWrite(fundAccountConfig);

  // WITHDRAW FROM ACCOUNT
  const { config: withdrawFromAccountConfig } = usePrepareContractWrite({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "withdrawFromAccount",
    args: [withdrawAmount * 10 ** 18],
  });
  const { write: withdrawFromAccount } = useContractWrite(
    withdrawFromAccountConfig
  );

  // APPROVE TOKEN FUND
  const { config: approveTokenConfig } = usePrepareContractWrite({
    address: ODDS_TOKEN_ADDRESS,
    abi: ODDS_TOKEN_ABI,
    functionName: "approve",
    args: [ODDS_ADDRESS, fundAmount],
  });
  const { write: approveToken } = useContractWrite(approveTokenConfig);

  return (
    <div className={styles.accountDetails}>
      <h2>My Account Details</h2>

      <div className={styles.userAddress}>
        <span>User Address </span>
        <p>{userAddress}</p>
      </div>

      {userDetails && (
        <div className={styles.userStats}>
          <div className={styles.accountStat}>
            <span>Total Bets Won</span>
            <p>
              {userDetails.totalWinnings
                ? userDetails.totalWinnings.toString()
                : "0"}
            </p>
          </div>

          <div className={styles.accountStat}>
            <span>Balance</span>
            {/* @ts-ignore */}
            <p>
              {userDetails.balance
                ? (userDetails.balance.toString() / 10 ** 18).toFixed(2)
                : "0"}{" "}
              <span className={styles.odds}>ODDS</span>
            </p>
          </div>

          <div className={styles.accountStat}>
            <span>Total Bets Partcipated</span>
            <p>
              {userDetails.totalBetsParticipated
                ? userDetails.totalBetsParticipated.toString()
                : "0"}
            </p>
          </div>

          <div className={styles.accountStat}>
            <span>Win Ratio</span>
            {userDetails.totalWinnings && userDetails.totalBetsParticipated ? (
              <p>
                {/* @ts-ignore */}
                {(userDetails.totalWinnings.toString() /
                  userDetails.totalBetsParticipated.toString()) *
                  100}{" "}
                %
              </p>
            ) : (
              <p>0 %</p>
            )}
          </div>
        </div>
      )}

      <div className={styles.accountFunding}>
        <div className={styles.fundAccount}>
          <h4>Fund Account</h4>
          <div className={styles.inputAnButton}>
            <input onChange={(e) => setFundAmount(e.target.value)} />
            <button disabled={!fundAccount} onClick={() => fundAccount?.()}>
              Fund
            </button>

            <button disabled={!approveToken} onClick={() => approveToken?.()}>
              Approve
            </button>
          </div>
        </div>

        <div className={styles.withdrawAccount}>
          <h4>Withdraw Account</h4>
          <div className={styles.inputAnButton}>
            <input onChange={(e) => setWithdrawAmount(e.target.value)} />
            <button
              disabled={!withdrawFromAccount}
              onClick={() => withdrawFromAccount?.()}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
