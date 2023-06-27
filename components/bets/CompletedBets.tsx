import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import {
  BET_CREATION_FEE,
  ODDS_ADDRESS,
  getBetEndDate,
  truncateAddr,
} from "@/utils";
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
  const [betType, setBetType] = useState<boolean>(false);
  const [betEndTime, setBetEndTime] = useState<string>();

  // private validator management
  const [privateValidators, setPrivateValidators] = useState([]);
  const [validatorInput, setValidatorInput] = useState("");
  const [isCollectionComplete, setCollectionComplete] = useState(false);

  const handleAddValidator = () => {
    if (privateValidators.length < 3) {
      // @ts-ignore
      setPrivateValidators((prevValidators) => [
        // @ts-ignore
        ...prevValidators,
        validatorInput,
      ]);

      if (privateValidators.length + 1 == 3) {
        setCollectionComplete(true);
      }
    }
  };

  const [popUp, setPopUp] = useState<boolean>(false);

  const { address } = useAccount();

  ///////// SMART CONTRACT READ FUNCTIONS ///////////

  // GET CURRENT TIMESTAMP
  const { data: currentTimestamp } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getCurrentTimeStamp",
  });

  const { data: isWinner } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getIsWinner",
    args: [selecetdBet && selecetdBet.betID, address],
  });

  const { data: amountWon } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getUserWinnings",
    args: [selecetdBet && selecetdBet.betID, address],
  });

  const { data: requiredNumberOfValidators } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getRequiredNumberOfValidators",
  });

  ///////// SMART CONTRACT WRITE FUNCTIONS ///////////

  const { config: claimWinningConfig, error: claimErr } =
    usePrepareContractWrite({
      address: ODDS_ADDRESS,
      abi: ODDS_ABI,
      functionName: "claimSingleBetWinnings",
      args: [selecetdBet && selecetdBet.betID],
    });
  const { write: claimWinning } = useContractWrite(claimWinningConfig);

  // APOLLO QUERY - GET OPEN BETS
  const {
    loading,
    error,
    data: COMPLETED_BETS,
  } = useQuery(GET_COMPLETED_BETS, {
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

  // TEST VARIABLES

  return (
    <main className={styles.main}>
      <div className={popUp ? styles.openBetsBlur : styles.openBets}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.title}>
            <h3>Completed Bets</h3>
            <img src="/icons/plus.jpg" onClick={() => setPopUp(true)} />
          </div>

          <div className={styles.bets}>
            {COMPLETED_BETS &&
            COMPLETED_BETS.bets &&
            COMPLETED_BETS.bets.length > 0 ? (
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
              <p>No completed bets</p>
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
                      selecetdBet.yesParticipants,
                      selecetdBet.noParticipants
                    )}{" "}
                    %
                  </p>
                </div>

                <div className={styles.selectedBetStat}>
                  <span>No Percentage</span>
                  <p>
                    {calculateYesPercentage(
                      selecetdBet.noParticipants,
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
                  <span>Outcome</span>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.outCome == 1 && "Yes"}</p>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.outCome == 2 && "No"}</p>
                </div>

                {currentTimestamp && (
                  <div className={styles.selectedBetStat}>
                    <span>Claim Time Left</span>
                    {/* @ts-ignore */}
                    <p>
                      {getBetEndDate(
                        selecetdBet.claimWaitTime.toString() -
                          currentTimestamp.toString()
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* @ts-ignore */}
              {currentTimestamp > selecetdBet.claimWaitTime && (
                <div className={styles.amountWonAndClaimWinnings}>
                  {/* @ts-ignore */}
                  {isWinner == true && amountWon && (
                    <p className={styles.amountWon}>
                      {/* @ts-ignore */}
                      Amount Won:{" "}
                      <span>{amountWon.toString() / 10 ** 18} Odds</span>
                    </p>
                  )}

                  <button
                    className={styles.claimWinnings}
                    disabled={!claimWinning}
                    onClick={() => claimWinning?.()}
                  >
                    Claim Winnings
                  </button>
                </div>
              )}

              <p className="error">
                {claimErr?.message.includes("#06") &&
                  "You did not partake in this bet"}

                {claimErr?.message.includes("#12") &&
                  "You have already claimed your winnings"}

                {claimErr?.message.includes("#08") &&
                  "You did not win this bet"}
              </p>

              {/* @ts-ignore */}
              {selecetdBet.currentlyChallenged == false &&
                // @ts-ignore
                selecetdBet.reportOutcome == 2 &&
                // @ts-ignore
                currentTimestamp > selecetdBet.claimWaitTime &&
                // @ts-ignore
                selecetdBet.currentlyChallenged == false && (
                  <div className={styles.amountWonAndClaimWinnings}>
                    {/* @ts-ignore */}
                    {isWinner == true && amountWon && (
                      <p className={styles.amountWon}>Claim Refund</p>
                    )}

                    <button className={styles.claimWinnings}>
                      Claim Refund
                    </button>
                  </div>
                )}

              {/* @ts-ignore */}
              {selecetdBet.currentlyChallenged == true && (
                <div className={styles.challenged}>
                  <img src="/icons/loading.png" className={styles.loading} />
                  <p>
                    Bet is currently being challenged. Cant claim winnings if
                    won, until validation challenge is over.
                  </p>
                </div>
              )}
              {/* @ts-ignore */}
              {selecetdBet.currentlyChallenged == false &&
                // @ts-ignore
                selecetdBet.reportOutcome == 2 && (
                  <div className={styles.challenged}>
                    <img src="/icons/loading.png" className={styles.loading} />
                    <p>
                      Bet has been challenged. Validator Made The Wrong
                      Decision. Claim your refund.
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      {popUp && (
        <div className={styles.createPopUp}>
          <div className={styles.popUpTitle}>
            <h3>Create Bet</h3>
            <img src="/icons/cancel.png" onClick={() => setPopUp(false)} />
          </div>

          <div className={styles.popUpBetType}>
            <p>Bet Type</p>

            <div className={styles.options}>
              <button
                className={styles.public}
                onClick={() => setBetType(true)}
              >
                Public
              </button>
              <button
                className={styles.private}
                onClick={() => setBetType(false)}
              >
                Private
              </button>
              <p>
                Selected: <span>{betType ? "Public" : "Private"}</span>
              </p>
            </div>
          </div>

          {betType == true && (
            <p className={styles.betCreationFee}>
              Bet Creation Fee: <span>{BET_CREATION_FEE / 10 ** 18} </span> GLMR
            </p>
          )}

          <div className={styles.popUpDescription}>
            <p>Bet Description</p>
            <textarea />
          </div>

          {betType == false && (
            <div className={styles.popUpValidators}>
              <p>Validators</p>

              <div className={styles.popUpValidatorsInput}>
                <input
                  onChange={(e) => setValidatorInput(e.target.value)}
                  disabled={isCollectionComplete}
                />
                <button onClick={handleAddValidator}>Add</button>
                <button onClick={() => setPrivateValidators([])}>Clear</button>
              </div>

              <div className={styles.addedValidators}>
                {privateValidators.map((validator, index) => {
                  return (
                    <p>
                      {index + 1}. {validator}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          <div className={styles.betEntranceTime}>
            <p>Bet Entrance End Time</p>

            <div className={styles.inputAndDisplay}>
              <input
                onChange={(e) => setBetEndTime(e.target.value)}
                type="number"
              />
              {betEndTime && <p>{getBetEndDate(parseInt(betEndTime))}</p>}
            </div>
          </div>

          <button className={styles.createButton}>Create Bet</button>
        </div>
      )}
    </main>
  );
};
