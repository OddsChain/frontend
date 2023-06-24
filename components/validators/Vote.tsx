import { COMPLETED_BETS } from "@/fakeData";
import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { getBetEndDate, truncateAddr } from "@/utils";

export const Vote = () => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selecetdBet, setSelectedBet] = useState();

  // TEST VARIABLES
  const currentTimestamp = 1697489088;
  const requiredNumberOfValidators = 5;
  const hasVoted = false;

  return (
    <main className={styles.main}>
      <div className={styles.openBets}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.title}>
            <h3>Vote Reports</h3>
          </div>

          <div className={styles.bets}>
            {COMPLETED_BETS &&
              COMPLETED_BETS.map((bet, index) => {
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
              })}
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
                    {Math.round(
                      // @ts-ignore
                      (selecetdBet.yesParticipants * 100) /
                        // @ts-ignore
                        (selecetdBet.yesParticipants +
                          // @ts-ignore
                          selecetdBet.noParticipants)
                    )}{" "}
                    %
                  </p>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>No Percentage</span>
                  <p>
                    {Math.round(
                      // @ts-ignore
                      (selecetdBet.noParticipants * 100) /
                        // @ts-ignore
                        (selecetdBet.yesParticipants +
                          // @ts-ignore
                          selecetdBet.noParticipants)
                    )}{" "}
                    %
                  </p>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>Validators</span>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.validators.length}</p>
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

                {/* @ts-ignore */}
                {selecetdBet.currentlyChallenged == true && (
                  <div className={styles.selectedBetStat}>
                    <span>Vote Quorum</span>
                    {/* @ts-ignore */}
                    {selecetdBet.outCome == 1 && (
                      <p>
                        {/* @ts-ignore */}
                        {(selecetdBet.support * 100) /
                          requiredNumberOfValidators}
                        %
                      </p>
                    )}

                    {/* @ts-ignore */}
                    {selecetdBet.outCome == 2 && (
                      <p>
                        {/* @ts-ignore */}
                        {(selecetdBet.oppose * 100) /
                          requiredNumberOfValidators}
                        %
                      </p>
                    )}
                  </div>
                )}

                {/* @ts-ignore */}
                {selecetdBet.currentlyChallenged && (
                  <div className={styles.selectedBetStat}>
                    <span>Voting Time</span>
                    <p>
                      {/* @ts-ignore */}
                      {getBetEndDate(selecetdBet.voteTime - currentTimestamp)}
                    </p>
                  </div>
                )}

                <div className={styles.selectedBetStat}>
                  <span>Validator(s)</span>
                  <div className={styles.validators}>
                    {/* @ts-ignore */}
                    {selecetdBet.validators.map((validator, index) => {
                      return (
                        <p>
                          {index + 1}. {truncateAddr(validator)}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>Outcome</span>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.outCome == 1 && "Yes"}</p>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.outCome == 2 && "No"}</p>
                </div>
              </div>

              {/* @ts-ignore */}
              {selecetdBet.currentlyChallenged == true && hasVoted == true && (
                <div className={styles.challenged}>
                  <p className={styles.voted}>
                    Thank You For Voting On This Report!.
                  </p>
                </div>
              )}
              {/* @ts-ignore */}
              {selecetdBet.currentlyChallenged == true && hasVoted == false && (
                // @ts-ignore
                <div className={styles.voteDecision}>
                  <p>Vote Decision: </p>
                  <button className={styles.disagree}>Disagree</button>
                  <p>Or</p>
                  <button className={styles.agree}>Agree</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
