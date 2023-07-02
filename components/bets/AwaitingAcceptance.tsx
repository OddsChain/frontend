// import { AWAITING_ACCEPTANCE_BETS } from "@/fakeData";
import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { ADDRESS_ZERO, truncateAddr } from "@/utils";
import { GET_AWAITING_ACCEPTANCE_BETS } from "@/queries";
import { useQuery } from "@apollo/client";

export const AwaitingAcceptance = () => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selecetdBet, setSelectedBet] = useState();

  // APOLLO QUERY - GET AWAITING ACCEPTANCE BETS
  const { data: AWAITING_ACCEPTANCE_BETS } = useQuery(
    GET_AWAITING_ACCEPTANCE_BETS
  );

  return (
    <main className={styles.main}>
      <div className={styles.openBets}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.title}>
            <h3>Bets Awaiting Validator Acceptance</h3>
          </div>

          <div className={styles.bets}>
            {AWAITING_ACCEPTANCE_BETS &&
            AWAITING_ACCEPTANCE_BETS.bets &&
            AWAITING_ACCEPTANCE_BETS.bets.length > 0 ? (
              // @ts-ignore
              AWAITING_ACCEPTANCE_BETS.bets.map((bet, index) => {
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
              })
            ) : (
              <p className="emptyList">No bets waiting acceptance</p>
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
                  <span>Validator</span>
                  {/* @ts-ignore */}
                  <p>{truncateAddr(selecetdBet.validator)}</p>
                </div>
              </div>

              <div className={styles.awaitingAcceptanceDetails}>
                <div className="loader"></div>
                <h3>Note</h3>
                {/* @ts-ignore */}
                {selecetdBet.validator == ADDRESS_ZERO ? (
                  <p>
                    This bet is currently waiting on chainlink network to
                    provide a verifiable random number to assign a validator to
                    the bet. Be patient and check back in a few minutes time.
                  </p>
                ) : (
                  <p>
                    This bet has been succesfully assigned a validator thanks to
                    chainlink VRF and is currently being reviewed by the
                    validator to make sure the bet details are properly publicly
                    verifiable by any user accross the globe.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
