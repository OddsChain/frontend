import { BET_TO_REPORT } from "@/fakeData";
import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { truncateAddr } from "@/utils";

export const ReportBet = () => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selecetdBet, setSelectedBet] = useState();

  return (
    <main className={styles.main}>
      <div className={styles.openBets}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.title}>
            <h3>Report Bet</h3>
          </div>

          <div className={styles.bets}>
            {BET_TO_REPORT &&
              BET_TO_REPORT.map((bet, index) => {
                return (
                  <div className={styles.reportBetForm}>
                    {/* bet ids */}
                    <div className={styles.betID}>
                      <p>Bet ID</p>
                      <input placeholder="Bet ID..." />
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

                    {/* reason */}
                    <p>Report Description</p>
                    <textarea />

                    {/* report button */}
                    <button>Report</button>
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

              <div className={styles.validationCount}>
                <p>
                  Validation Count:{" "}
                  <span>
                    {/* @ts-ignore */}
                    {selecetdBet.validationCount} / {/* @ts-ignore */}
                    {selecetdBet.validators.length}
                  </span>
                </p>
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
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
