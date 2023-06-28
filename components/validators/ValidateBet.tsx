import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { ODDS_ADDRESS, truncateAddr } from "@/utils";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { ODDS_ABI } from "@/abi";
import { GET_AWAITING_VALIDATION_BETS } from "@/queries";
import { useQuery } from "@apollo/client";

export const ValidateBet = () => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selecetdBet, setSelectedBet] = useState();
  const [userChoice, setUserChoice] = useState("");

  ///////// SMART CONTRACT READ FUNCTIONS ///////////

  // GET CURRENT TIMESTAMP
  const { data: currentTimestamp } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getCurrentTimeStamp",
  });

  // GET VALIDATOR ADDRESSES
  const { data: privateValidatorAddress } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getValidators",
    // @ts-ignore
    args: [selecetdBet && selecetdBet.betID],
  });

  ///////// SMART CONTRACT WRITE FUNCTIONS ///////////

  const { config: validateBetConfig, error: validateBetErr } =
    usePrepareContractWrite({
      address: ODDS_ADDRESS,
      abi: ODDS_ABI,
      functionName: "validateBet",
      // @ts-ignore
      args: [selecetdBet && selecetdBet.betID, userChoice],
    });
  const { write: validateBet } = useContractWrite(validateBetConfig);

  // APOLLO QUERY - GET OPEN BETS
  const { data: AWAITING_VALIDATED_BETS } = useQuery(
    GET_AWAITING_VALIDATION_BETS,
    {
      // @ts-ignore
      variables: { currentTimestamp: parseInt(currentTimestamp) },
    }
  );

  // SPECIFIC FUNCTIONS
  const calculateYesPercentage = (
    yesParticipants: string,
    noParticipants: string
  ) => {
    let result =
      (parseInt(yesParticipants) * 100) /
      (parseInt(noParticipants) + parseInt(yesParticipants));

    if (result) {
      return result.toFixed(2);
    } else {
      return "0";
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.openBets}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.title}>
            <h3>Validate Bets</h3>
          </div>

          <div className={styles.bets}>
            {AWAITING_VALIDATED_BETS &&
            AWAITING_VALIDATED_BETS.bets &&
            AWAITING_VALIDATED_BETS.bets.length > 0 ? (
              // @ts-ignore
              AWAITING_VALIDATED_BETS.bets.map((bet, index) => {
                return (
                  <div
                    className={
                      selectedBetIndex == index
                        ? styles.selectedBetIndex
                        : styles.bet
                    }
                  >
                    <div className={styles.stat}>
                      <span>Bet Details</span>
                      <p>{bet.betDescription}</p>
                    </div>

                    <div className={styles.betStats}>
                      <div className={styles.stat}>
                        <span>Public Validation</span>
                        <p>{bet.betType ? "True" : "False"}</p>
                      </div>

                      <div className={styles.stat}>
                        <span>Participants</span>
                        <p>{bet.participants}</p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedBetIndex(index);
                          // @ts-ignore
                          setSelectedBet(bet);
                        }}
                      >
                        View Bet
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No Bets To Be Validated</p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h2>Selected Bet</h2>

          {selecetdBet && (
            <div className={styles.selectedBet}>
              {/* bet details up top */}
              <div className={styles.betDetails}>
                <div className={styles.up}>
                  <span className={styles.betDetailsTitle}>Bet Details </span>
                  {/* @ts-ignore */}
                  <span className={styles.id}>ID: </span>

                  {/* @ts-ignore */}
                  <span>{selecetdBet.betID}</span>
                </div>

                <div className={styles.down}>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.betDescription}</p>
                </div>
              </div>

              <div className={styles.validationCount}>
                <p>
                  Validation Count:{" "}
                  <span>
                    {/* @ts-ignore */}
                    {selecetdBet.validationCount} / {/* @ts-ignore */}
                    {selecetdBet.validators}
                  </span>
                </p>
              </div>

              {/* bet stats */}
              <div className={styles.selectedBetStats}>
                <div className={styles.selectedBetStat}>
                  <span>Yes Percentage</span>

                  <p>
                    {calculateYesPercentage(
                      // @ts-ignore
                      selecetdBet.yesParticipants,
                      // @ts-ignore
                      selecetdBet.noParticipants
                    )}{" "}
                    %
                  </p>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>No Percentage</span>
                  <p>
                    {calculateYesPercentage(
                      // @ts-ignore
                      selecetdBet.noParticipants,
                      // @ts-ignore
                      selecetdBet.yesParticipants
                    )}{" "}
                    %
                  </p>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>Validators</span>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.validators}</p>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>Public Validation</span>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.betType ? "True" : "False"}</p>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>Participants</span>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.participants}</p>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>Yes Pool</span>

                  <p>
                    {/* @ts-ignore */}
                    {(selecetdBet.yesPool / 10 ** 18).toFixed(2)}{" "}
                    <span className={styles.odds}>Odds</span>
                  </p>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>No Pool</span>
                  <p>
                    {/* @ts-ignore */}
                    {(selecetdBet.noPool / 10 ** 18).toFixed(2)}{" "}
                    <span className={styles.odds}>Odds</span>
                  </p>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>Creator</span>
                  {/* @ts-ignore */}
                  <p>{truncateAddr(selecetdBet.creator)}</p>
                </div>

                {/* @ts-ignore */}
                {selecetdBet.betType ? (
                  <div className={styles.selectedBetStat}>
                    <span>Validator Address</span>
                    {/* @ts-ignore */}
                    <p>{truncateAddr(selecetdBet.validator)}</p>
                  </div>
                ) : (
                  <div className={styles.selectedBetStat}>
                    <span>Validator Address's</span>
                    <div className={styles.validatorList}>
                      {/* @ts-ignore */}
                      {privateValidatorAddress &&
                        // @ts-ignore
                        privateValidatorAddress.map((validator, index) => {
                          return (
                            <p>
                              {index + 1}. {truncateAddr(validator)}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.joinBet}>
                <button
                  className={styles.yes}
                  onClick={() => setUserChoice("1")}
                >
                  Yes
                </button>
                <p>Or</p>
                <button
                  className={styles.no}
                  onClick={() => setUserChoice("2")}
                >
                  No
                </button>

                <p>
                  Selected Choice: {userChoice == "1" && "Yes"}{" "}
                  {userChoice == "2" && "No"}
                </p>
              </div>

              <button
                className={styles.validateButton}
                disabled={!validateBet}
                onClick={() => validateBet?.()}
              >
                Validate
              </button>
              <p className="error">
                {validateBetErr?.message.includes("#17") &&
                  "You are not a valid validator for this bet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
