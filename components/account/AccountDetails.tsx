import styles from "../../styles/components/account/AccountDetails.module.css";

export const AccountDetails = () => {
  const userAddress = "0xC0089cB5F8f286EAF6574666397834722e044d9b";
  const userDetails = true;
  const totalBetsWon = 12;
  const balance = 13.21 * 10 ** 18;
  const totalBetsParticipated = 15;

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
            <p>{totalBetsWon.toString()}</p>
          </div>

          <div className={styles.accountStat}>
            <span>Balance</span>
            {/* @ts-ignore */}
            <p>{balance.toString() / 10 ** 18} ODDS</p>
          </div>

          <div className={styles.accountStat}>
            <span>Total Bets Partcipated</span>
            <p>{totalBetsParticipated.toString()}</p>
          </div>

          <div className={styles.accountStat}>
            <span>Win Ratio</span>
            <p>
              {/* @ts-ignore */}
              {(totalBetsWon.toString() / totalBetsParticipated.toString()) *
                100}{" "}
              %
            </p>
          </div>
        </div>
      )}

      <div className={styles.accountFunding}>
        <div className={styles.fundAccount}>
          <h4>Fund Account</h4>
          <div className={styles.inputAnButton}>
            <input />
            <button>Fund</button>
          </div>
        </div>

        <div className={styles.withdrawAccount}>
          <h4>Withdraw Account</h4>
          <div className={styles.inputAnButton}>
            <input />
            <button>Withdraw</button>
          </div>
        </div>
      </div>
    </div>
  );
};
