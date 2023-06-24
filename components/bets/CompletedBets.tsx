import { COMPLETED_BETS, OPEN_BETS } from "@/fakeData";
import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { BET_CREATION_FEE, getBetEndDate, truncateAddr } from "@/utils";

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

  // TEST VARIABLES
  const currentTimestamp = 1697489088;
  const isWinner = true;
  const requiredNumberOfValidators = 5;

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
                        <span>Participants</span>
                        <p>{bet.participants.length}</p>
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
              {currentTimestamp > selecetdBet.claimWaitTime &&
                // @ts-ignore
                selecetdBet.currentlyChallenged == false &&
                // @ts-ignore
                selecetdBet.reportOutcome == 0 && (
                  <div className={styles.amountWonAndClaimWinnings}>
                    {/* @ts-ignore */}
                    {isWinner == true && amountWon && (
                      <p className={styles.amountWon}>
                        {/* @ts-ignore */}
                        Amount Won: <span>{amountWon / 10 ** 18} Odds</span>
                      </p>
                    )}

                    <button className={styles.claimWinnings}>
                      Claim Winnings
                    </button>
                  </div>
                )}

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
