import { BETS_TO_BE_ACCEPTED } from "@/fakeData";
import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { truncateAddr } from "@/utils";

export const AcceptRejectBet = () => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selecetdBet, setSelectedBet] = useState();

  return (
    <main className={styles.main}>
      <div className={styles.openBets}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.title}>
            <h3>Accept / Deny Bets</h3>
          </div>

          <div className={styles.bets}>
            {BETS_TO_BE_ACCEPTED &&
              BETS_TO_BE_ACCEPTED.map((bet, index) => {
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
                        <span>Creator</span>
                        <p>{truncateAddr(bet.creator)}</p>
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
                  <span>Public Validation</span>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.betType ? "True" : "False"}</p>
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
              </div>

              <div className={styles.acceptOrDenyDesc}>
                <h3>Note</h3>
                <p>
                  You've been selected as the validatoro for this bet. Review
                  and assertain if this bet is publicly veriable by your fellow
                  validators and accept or deny accordingly.
                </p>
              </div>

              <div className={styles.acceptOrDeny}>
                <button className={styles.accept}>Accept</button>
                <p>Or</p>
                <button className={styles.deny}>Deny</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
