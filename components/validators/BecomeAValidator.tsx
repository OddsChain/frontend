import { MINIMUM_STAKE_AMOUNT } from "@/utils";
import styles from "../../styles/components/validators/BecomeAValidator.module.css";

export const BecomeAValidator = () => {
  const userOddsBalance = 4000 * 10 ** 18;
  const isValidator = true;

  return (
    <div className={styles.becomeAValidator}>
      <h2>Stake And Become A Validator Today</h2>
      <h4>Activities Of A Validator.</h4>

      <ul>
        <li>Accept or deny publicly unverifiable wagers.</li>
        <li>Earn rewards for validating bets.</li>
        <li>Reporting Malicious Validators & Earning Their Stake.</li>
      </ul>

      <div className={styles.userBalanceAndFaucet}>
        {userOddsBalance && (
          <p className={styles.userOddsBalance}>
            Your ODDS Balance: <span>{userOddsBalance / 10 ** 18} </span> ODDS
          </p>
        )}

        <a className={styles.visitFaucet} href="/">
          Visit Faucet &gt;
        </a>
      </div>

      <p className={styles.minimumStake}>
        Minimum Stake: <span>{MINIMUM_STAKE_AMOUNT / 10 ** 18} </span>ODDS
      </p>

      {isValidator ? (
        <p className={styles.alreadyValidator}>You are already a validator!</p>
      ) : (
        <button className={styles.become}>Become A Validator</button>
      )}
    </div>
  );
};
