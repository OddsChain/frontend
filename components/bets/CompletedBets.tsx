import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { ODDS_ADDRESS, getBetEndDate, truncateAddr } from "@/utils";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { ODDS_ABI } from "@/abi";
import { useQuery } from "@apollo/client";
import { GET_COMPLETED_BETS } from "@/queries";

export const CompletedBets = () => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selecetdBet, setSelectedBet] = useState();

  const { address } = useAccount();

  ///////// SMART CONTRACT READ FUNCTIONS ///////////

  // GET CURRENT TIMESTAMP
  const { data: currentTimestamp } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getCurrentTimeStamp",
  });

  // GET IS WINNER
  const { data: isWinner } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getIsWinner",
    // @ts-ignore
    args: [selecetdBet && selecetdBet.betID, address],
  });

  // GET USER WINNINGS
  const { data: amountWon } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getUserWinnings",
    // @ts-ignore
    args: [selecetdBet && selecetdBet.betID, address],
  });

  // GET REQUIRED NUMBER OF VALIDATORS
  const { data: requiredNumberOfValidators } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getRequiredNumberOfValidators",
  });

  ///////// SMART CONTRACT WRITE FUNCTIONS ///////////

  // CLAIM BET WINNINGS
  const { config: claimWinningConfig, error: claimErr } =
    usePrepareContractWrite({
      address: ODDS_ADDRESS,
      abi: ODDS_ABI,
      functionName: "claimSingleBetWinnings",
      // @ts-ignore
      args: [selecetdBet && selecetdBet.betID],
    });
  const { write: claimWinning } = useContractWrite(claimWinningConfig);

  // CLAIM REFUND
  const { config: claimRefundConfig, error: refundErr } =
    usePrepareContractWrite({
      address: ODDS_ADDRESS,
      abi: ODDS_ABI,
      functionName: "claimBetRefund",
      // @ts-ignore
      args: [selecetdBet && selecetdBet.betID],
    });
  const { write: claimRefund } = useContractWrite(claimRefundConfig);

  // APOLLO QUERY - GET COMPLETED BETS
  const { data: COMPLETED_BETS } = useQuery(GET_COMPLETED_BETS, {
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
            <h3>Completed Bets</h3>
          </div>

          <div className={styles.bets}>
            {COMPLETED_BETS &&
            COMPLETED_BETS.bets &&
            COMPLETED_BETS.bets.length > 0 ? (
              // @ts-ignore
              COMPLETED_BETS.bets.map((bet, index) => {
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
              <p className="emptyList">No completed bets</p>
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
                {selecetdBet.currentlyChallenged == true && (
                  <div className={styles.selectedBetStat}>
                    <span>Vote Quorum</span>
                    {/* @ts-ignore */}
                    {selecetdBet.outCome == 1 && (
                      <p>
                        {/* @ts-ignore */}
                        {(selecetdBet.support * 100) /
                          // @ts-ignore
                          requiredNumberOfValidators}
                        %
                      </p>
                    )}

                    {/* @ts-ignore */}
                    {selecetdBet.outCome == 2 && (
                      <p>
                        {/* @ts-ignore */}
                        {(selecetdBet.oppose * 100) /
                          // @ts-ignore
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
                  <span>Outcome</span>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.outCome == 1 && "Yes"}</p>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.outCome == 2 && "No"}</p>
                </div>

                {currentTimestamp && (
                  <div className={styles.selectedBetStat}>
                    <span>Claim Time Left</span>
                    <p>
                      {getBetEndDate(
                        // @ts-ignore
                        selecetdBet.claimWaitTime.toString() -
                          // @ts-ignore
                          currentTimestamp.toString()
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* @ts-ignore */}
              {currentTimestamp.toString() > selecetdBet.claimWaitTime &&
                // @ts-ignore
                selecetdBet.reportOutcome == 0 && (
                  <div className={styles.amountWonAndClaimWinnings}>
                    <>
                      {isWinner == true && amountWon && (
                        <p className={styles.amountWon}>
                          Amount Won: {/* @ts-ignore */}
                          <span>{amountWon.toString() / 10 ** 18} Odds</span>
                        </p>
                      )}
                    </>

                    <button
                      className={styles.claimWinnings}
                      disabled={!claimWinning}
                      onClick={() => claimWinning?.()}
                    >
                      Claim Winnings
                    </button>
                  </div>
                )}

              {/* @ts-ignore */}
              {selecetdBet.reportOutcome == 1 && (
                <div className={styles.amountWonAndClaimWinnings}>
                  <>
                    {isWinner == true && amountWon && (
                      <p className={styles.amountWon}>
                        Amount Won: {/* @ts-ignore */}
                        <span>{amountWon.toString() / 10 ** 18} Odds</span>
                      </p>
                    )}
                  </>

                  <button
                    className={styles.claimWinnings}
                    disabled={!claimWinning}
                    onClick={() => claimWinning?.()}
                  >
                    Claim Winnings
                  </button>
                </div>
              )}

              {/* @ts-ignore */}
              {selecetdBet.reportOutcome == 2 && (
                <div className={styles.refund} style={{ marginTop: "30px" }}>
                  <p>
                    Bet has been sucessfully challenged. Validator Made The
                    Wrong Decision. All Bet Participants are valid for a refund!
                  </p>
                  <button
                    className={styles.claimWinnings}
                    disabled={!claimRefund}
                    onClick={() => claimRefund?.()}
                  >
                    Claim Refund
                  </button>
                </div>
              )}

              {/* @ts-ignore */}
              {selecetdBet.currentlyChallenged == true && (
                <div className={styles.challenged}>
                  <img src="/icons/loading.png" className={styles.loading} />
                  <p>
                    Other Validators are currrently challenging the outcome of
                    this bet. Be patient until voting is over and the fate of
                    the bet would be decided.
                  </p>
                </div>
              )}

              <p className="error">
                {claimErr?.message.includes("#12") &&
                  "You have already claimed your winnings"}

                {claimErr?.message.includes("#08") &&
                  "You did not win this bet"}

                {refundErr?.message.includes("#06") &&
                  "You did not partake in this bet"}

                {refundErr?.message.includes("#28") &&
                  "You have already claimed your refund"}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
