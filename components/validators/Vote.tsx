import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { ODDS_ADDRESS, getBetEndDate, truncateAddr } from "@/utils";
import { GET_REPORTED_BETS } from "@/queries";
import { useQuery } from "@apollo/client";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { ODDS_ABI } from "@/abi";

export const Vote = () => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selecetdBet, setSelectedBet] = useState();
  const [voterChoice, setVoterChoice] = useState<boolean>();

  ///////// SMART CONTRACT READ FUNCTIONS ///////////

  // GET CURRENT TIMESTAMP
  const { data: currentTimestamp } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getCurrentTimeStamp",
  });

  // GET REQUIRED NUMBER OF VALIDATORS
  const { data: requiredNumberOfValidators } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getRequiredNumberOfValidators",
  });

  // GET HAS VOTED
  const { data: hasVoted } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "hasVoted",
    // @ts-ignore
    args: [selecetdBet && selecetdBet.betID],
  });

  ///////// SMART CONTRACT WRITE FUNCTIONS ///////////

  // VOTE
  const { config: voteConfig, error: voteErr } = usePrepareContractWrite({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "voteValidator",
    // @ts-ignore
    args: [selecetdBet && selecetdBet.betID, voterChoice],
  });
  const { write: voteValidator } = useContractWrite(voteConfig);

  // APOLLO QUERY - GET OPEN BETS
  const { data: REPORTED_BETS } = useQuery(GET_REPORTED_BETS, {
    // @ts-ignore
    variables: { currentTimestamp: parseInt(currentTimestamp) },
  });

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
            <h3>Vote Reports</h3>
          </div>

          <div className={styles.bets}>
            {REPORTED_BETS &&
            REPORTED_BETS.bets &&
            REPORTED_BETS.bets.length > 0 ? (
              // @ts-ignore
              REPORTED_BETS.bets.map((bet, index) => {
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
                        <span>Reporter</span>
                        <p>{truncateAddr(bet.reporter)}</p>
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
              <p>No bets to vote on</p>
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
                  <p>{selecetdBet.participants.length}</p>
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

                <div className={styles.selectedBetStat}>
                  <span>Validator</span>
                  {/* @ts-ignore */}
                  <p>{truncateAddr(selecetdBet.validator)}</p>
                </div>

                <>
                  {/* @ts-ignore */}
                  {selecetdBet.currentlyChallenged == true &&
                    requiredNumberOfValidators && (
                      <div className={styles.selectedBetStat}>
                        <span>Vote Support</span>
                        {/* @ts-ignore */}
                        {
                          <p>
                            {/* @ts-ignore */}
                            {(selecetdBet.support * 100) /
                              // @ts-ignore
                              requiredNumberOfValidators.toString()}
                            %
                          </p>
                        }
                      </div>
                    )}

                  {/* @ts-ignore */}
                  {selecetdBet.currentlyChallenged == true &&
                    requiredNumberOfValidators && (
                      <div className={styles.selectedBetStat}>
                        <span>Vote Against</span>
                        {/* @ts-ignore */}
                        {
                          <p>
                            {/* @ts-ignore */}
                            {(selecetdBet.oppose * 100) /
                              // @ts-ignore
                              requiredNumberOfValidators.toString()}
                            %
                          </p>
                        }
                      </div>
                    )}
                </>

                <div className={styles.selectedBetStat}>
                  <span>Outcome</span>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.outCome == 1 && "Yes"}</p>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.outCome == 2 && "No"}</p>
                </div>
              </div>

              {/* @ts-ignore */}
              {hasVoted == true && (
                <div className={styles.challenged}>
                  <p className={styles.voted}>
                    Thank You For Voting On This Report!.
                  </p>
                </div>
              )}
              {/* @ts-ignore */}
              {hasVoted == false && (
                // @ts-ignore
                <>
                  <div className={styles.voteDecision}>
                    <p>Vote Decision: </p>
                    <button
                      className={styles.disagree}
                      onClick={() => setVoterChoice(false)}
                    >
                      Disagree
                    </button>
                    <p>Or</p>
                    <button
                      className={styles.agree}
                      onClick={() => setVoterChoice(true)}
                    >
                      Agree
                    </button>
                    <p>Selected Option: {voterChoice ? "Agree" : "Disagree"}</p>
                  </div>

                  <button
                    className={styles.vote}
                    disabled={!voteValidator}
                    onClick={() => voteValidator?.()}
                  >
                    Place Vote
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
