import {
  MINIMUM_STAKE_AMOUNT,
  ODDS_ADDRESS,
  ODDS_TOKEN_ADDRESS,
} from "@/utils";
import styles from "../../styles/components/validators/BecomeAValidator.module.css";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { ODDS_ABI, ODDS_TOKEN_ABI } from "@/abi";

export const BecomeAValidator = () => {
  const { address } = useAccount();

  ///////// SMART CONTRACT READ FUNCTIONS ///////////

  // GET IS VALIDATOR
  const { data: isValidator } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getIsValidator",
    args: [address],
  });

  // GET USER ODDS BALANCE
  const { data: userOddsBalance } = useContractRead({
    address: ODDS_TOKEN_ADDRESS,
    abi: ODDS_TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  ///////// SMART CONTRACT WRITE FUNCTIONS ///////////

  // JOIN VALIDATOR
  const { config: joinValidatorsConfig } = usePrepareContractWrite({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "joinValidators",
  });
  const { write: joinValidators } = useContractWrite(joinValidatorsConfig);

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
        <>
          {userOddsBalance && (
            <p className={styles.userOddsBalance}>
              Your ODDS Balance: {/* @ts-ignore */}
              <span>{userOddsBalance.toString() / 10 ** 18} </span> ODDS
            </p>
          )}
        </>

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
        <button
          className={styles.become}
          disabled={!joinValidators}
          onClick={() => joinValidators?.()}
        >
          Become A Validator
        </button>
      )}
    </div>
  );
};
