import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { ODDS_ADDRESS, truncateAddr } from "@/utils";
import { useQuery } from "@apollo/client";
import { BET_TO_REPORT } from "@/queries";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ODDS_ABI } from "@/abi";

export const ReportBet = () => {
  const [inputBetID, setInputbetID] = useState();
  const [reportDescription, setReportDescription] = useState();

  ///////// SMART CONTRACT WRITE FUNCTIONS ///////////

  // REPORT VALIDATOR
  const { config: reportBetConfig, error: reportErr } = usePrepareContractWrite(
    {
      address: ODDS_ADDRESS,
      abi: ODDS_ABI,
      functionName: "reportValidator",
      args: [inputBetID, reportDescription],
    }
  );
  const { write: reportBet } = useContractWrite(reportBetConfig);

  // APOLLO QUERY - GET OPEN BETS
  const { refetch, data: SELECTED_BET } = useQuery(BET_TO_REPORT, {
    // @ts-ignore
    variables: { betID: inputBetID && parseInt(inputBetID) },
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
            <h3>Report Bet</h3>
          </div>

          <div className={styles.bets}>
            <div className={styles.reportBetForm}>
              {/* bet ids */}
              <div className={styles.betID}>
                <p>Bet ID</p>
                <input
                  placeholder="Bet ID..."
                  // @ts-ignore
                  onChange={(e) => setInputbetID(e.target.value)}
                />
              </div>

              {/* reason */}
              <p>Report Description</p>
              <textarea
                // @ts-ignore
                onChange={(e) => setReportDescription(e.target.value)}
              />

              {/* report button */}
              <button disabled={!reportBet} onClick={() => reportBet?.()}>
                Report
              </button>

              {reportErr &&
                reportErr.message &&
                reportErr.message.includes("#02") && (
                  <p className="error">
                    {"Bet Hasnt Been Accepted By A Validator"}
                  </p>
                )}

              {reportErr &&
                reportErr.message &&
                reportErr.message.includes("#04") && (
                  <p className="error">{"Bet Isnt A Public Bet"}</p>
                )}

              {reportErr &&
                reportErr.message &&
                reportErr.message.includes("#22") && (
                  <p className="error">{"Bet Already Reported"}</p>
                )}

              {reportErr &&
                reportErr.message &&
                reportErr.message.includes("#24") && (
                  <p className="error">
                    {"Challenge Time For Bet Has Been Exceeded"}
                  </p>
                )}

              {reportErr &&
                reportErr.message &&
                reportErr.message.includes("#37") && (
                  <p className="error">{"No Validator Assigned To Bet"}</p>
                )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h2>Selected Bet</h2>

          {SELECTED_BET &&
            SELECTED_BET.bets &&
            SELECTED_BET.bets.length > 0 &&
            // @ts-ignore
            SELECTED_BET.bets.map((bet) => {
              return (
                <div className={styles.selectedBet}>
                  {/* bet details up top */}
                  <div className={styles.betDetails}>
                    <div className={styles.up}>
                      <span className={styles.betDetailsTitle}>
                        Bet Details{" "}
                      </span>
                      {/* @ts-ignore */}
                      <span className={styles.id}>ID: </span>

                      {/* @ts-ignore */}
                      <span>{bet.betID}</span>
                    </div>

                    <div className={styles.down}>
                      {/* @ts-ignore */}
                      <p>{bet.betDescription}</p>
                    </div>
                  </div>

                  {/* bet stats */}
                  <div className={styles.selectedBetStats}>
                    <div className={styles.selectedBetStat}>
                      <span>Yes Percentage</span>

                      <p>
                        {calculateYesPercentage(
                          bet.yesParticipants,
                          bet.noParticipants
                        )}{" "}
                        %
                      </p>
                    </div>

                    <div className={styles.selectedBetStat}>
                      <span>No Percentage</span>
                      <p>
                        {calculateYesPercentage(
                          bet.noParticipants,
                          bet.yesParticipants
                        )}{" "}
                        %
                      </p>
                    </div>

                    <div className={styles.selectedBetStat}>
                      <span>Validators</span>
                      {/* @ts-ignore */}
                      <p>{bet.validators}</p>
                    </div>

                    <div className={styles.selectedBetStat}>
                      <span>Public Validation</span>
                      {/* @ts-ignore */}
                      <p>{bet.betType ? "True" : "False"}</p>
                    </div>

                    <div className={styles.selectedBetStat}>
                      <span>Participants</span>
                      {/* @ts-ignore */}
                      <p>{bet.participants}</p>
                    </div>

                    <div className={styles.selectedBetStat}>
                      <span>Yes Pool</span>

                      <p>
                        {/* @ts-ignore */}
                        {(bet.yesPool / 10 ** 18).toFixed(2)}{" "}
                        <span className={styles.odds}>Odds</span>
                      </p>
                    </div>

                    <div className={styles.selectedBetStat}>
                      <span>No Pool</span>
                      <p>
                        {/* @ts-ignore */}
                        {(bet.noPool / 10 ** 18).toFixed(2)}{" "}
                        <span className={styles.odds}>Odds</span>
                      </p>
                    </div>

                    <div className={styles.selectedBetStat}>
                      <span>Creator</span>
                      {/* @ts-ignore */}
                      <p>{truncateAddr(bet.creator)}</p>
                    </div>

                    <div className={styles.selectedBetStat}>
                      <span>Outcome</span>
                      {/* @ts-ignore */}
                      <p>{bet.outCome == 1 && "Yes"}</p>
                      {/* @ts-ignore */}
                      <p>{bet.outCome == 2 && "No"}</p>

                      <p>{bet.outCome == 0 && "Undecided"}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};
