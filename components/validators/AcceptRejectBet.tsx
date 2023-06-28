import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { ODDS_ADDRESS, truncateAddr } from "@/utils";
import { GET_AWAITING_ACCEPT_BETS } from "@/queries";
import { useQuery } from "@apollo/client";
import { ODDS_ABI } from "@/abi";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

export const AcceptRejectBet = () => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selecetdBet, setSelectedBet] = useState();
  const [validatorChoice, setValidatorChoice] = useState<boolean>();

  const { address } = useAccount();

  ///////// SMART CONTRACT WRITE FUNCTIONS ///////////

  // ACCEPT OR DENY BET
  const { config: acceptOrDenyBetConfig, error: acceptOrDenyErr } =
    usePrepareContractWrite({
      address: ODDS_ADDRESS,
      abi: ODDS_ABI,
      functionName: "acceptOrDenyBet",
      // @ts-ignore
      args: [selecetdBet && selecetdBet.betID, validatorChoice],
    });
  const { write: acceptOrDenyBet } = useContractWrite(acceptOrDenyBetConfig);

  // APOLLO QUERY - GET OPEN BETS
  const { data: AWAITING_ACCEPTANCE_BETS } = useQuery(
    GET_AWAITING_ACCEPT_BETS,
    {
      variables: { address },
    }
  );

  return (
    <main className={styles.main}>
      <div className={styles.openBets}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.title}>
            <h3>Accept / Deny Bets</h3>
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
              <p className="emptyList">No bets to accept or deny</p>
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
                  <span>Validator Address</span>
                  {/* @ts-ignore */}
                  <p>{truncateAddr(selecetdBet.validator)}</p>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>Creator</span>
                  {/* @ts-ignore */}
                  <p>{truncateAddr(selecetdBet.creator)}</p>
                </div>
              </div>

              <div className={styles.acceptOrDenyDesc}>
                <h3>Note</h3>
                <p>
                  You've been assigned as the validator for this bet. Review and
                  assertain if this bet is publicly verifiable by your fellow
                  validators and accept or deny accordingly.
                </p>
              </div>

              <div className={styles.acceptOrDeny}>
                <button
                  className={styles.accept}
                  onClick={() => setValidatorChoice(true)}
                >
                  Accept
                </button>
                <p>Or</p>
                <button
                  className={styles.deny}
                  onClick={() => setValidatorChoice(false)}
                >
                  Deny
                </button>

                <p>Selected Choice: {validatorChoice ? "Accept" : "Deny"}</p>
              </div>

              <button
                disabled={!acceptOrDenyBet}
                onClick={() => acceptOrDenyBet?.()}
                className={styles.takeAction}
              >
                Take Action
              </button>

              <p className="error">
                {acceptOrDenyErr &&
                  acceptOrDenyErr.message &&
                  acceptOrDenyErr.message.includes("#17") &&
                  "Not Validator For This Bet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
