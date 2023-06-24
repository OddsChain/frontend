import { OPEN_BETS } from "@/fakeData";
import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { BET_CREATION_FEE, getBetEndDate, truncateAddr } from "@/utils";

export const OpenBets = () => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selecetdBet, setSelectedBet] = useState();
  const [betAmount, setBetAmount] = useState<string>();
  const [userChoice, setUserChoice] = useState<string>();
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
  const currentTimestamp = 1687476088;
  const currentPossibleRewards = 10000000000000000000;

  return (
    <main className={styles.main}>
      <div className={popUp ? styles.openBetsBlur : styles.openBets}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.title}>
            <h3>Open Bets</h3>
            <img src="/icons/plus.jpg" onClick={() => setPopUp(true)} />
          </div>

          <div className={styles.bets}>
            {OPEN_BETS &&
              OPEN_BETS.map((bet, index) => {
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
                        <span>End Time</span>
                        <p>
                          {bet.endTime &&
                            getBetEndDate(
                              parseInt(bet.endTime.toString()) -
                                parseInt(currentTimestamp.toString())
                            )}
                        </p>
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
                  <span>End Time</span>
                  <p>
                    {currentTimestamp &&
                      getBetEndDate(
                        // @ts-ignore
                        parseInt(selecetdBet.endTime.toString()) -
                          parseInt(currentTimestamp.toString())
                      )}
                  </p>
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
              </div>

              {/* @ts-ignore */}
              {currentTimestamp && selecetdBet.endTime > currentTimestamp ? (
                <div className={styles.joinBet}>
                  <input
                    placeholder="Amount"
                    type="number"
                    onChange={(e) => setBetAmount(e.target.value)}
                  />
                  <button
                    className={styles.yes}
                    onClick={() => setUserChoice("1")}
                  >
                    Yes
                  </button>
                  <p>Or</p>
                  <button
                    className={styles.no}
                    onClick={() => setUserChoice("2")}
                  >
                    No
                  </button>
                </div>
              ) : (
                <p>Bet Entry Time Just Concluded!</p>
              )}

              {betAmount && currentPossibleRewards && userChoice && (
                <p className={styles.currentPossibleRewards}>
                  Current Possible Rewards:{" "}
                  <span>{currentPossibleRewards / 10 ** 18} Odds</span>
                </p>
              )}

              <button className={styles.placeBet}>Place Bet</button>
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
