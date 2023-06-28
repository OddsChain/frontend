import React, { useState } from "react";
import {
  BET_CREATION_FEE,
  ODDS_ADDRESS,
  getBetEndDate,
  truncateAddr,
} from "@/utils";
import { GET_OPEN_BETS } from "@/queries";
import { useQuery } from "@apollo/client";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { ODDS_ABI } from "@/abi";
import styles from "../../styles/components/bets/Bets.module.css";

export const OpenBets = () => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selecetdBet, setSelectedBet] = useState();
  const [betAmount, setBetAmount] = useState<string>();
  const [userChoice, setUserChoice] = useState<boolean>();
  const [betType, setBetType] = useState<boolean>(false);
  const [betEndTime, setBetEndTime] = useState<string>();

  const [popUp, setPopUp] = useState<boolean>(false);

  // private validator management
  const [privateValidators, setPrivateValidators] = useState([]);
  const [validatorInput, setValidatorInput] = useState("");
  const [isCollectionComplete, setCollectionComplete] = useState(false);
  const [betDescription, setBetDescription] = useState("");

  const { address } = useAccount();

  ///////// SMART CONTRACT READ FUNCTIONS ///////////

  // GET CURRENT TIMESTAMP
  const { data: currentTimestamp } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getCurrentTimeStamp",
  });

  // GET USER POSSIBLE REWARDS
  const { data: currentPossibleRewards } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getUserPossibleRewards",
    // @ts-ignore
    args: [betAmount, selecetdBet && selecetdBet.betID, address, userChoice],
  });

  // GET VALIDATOR ADDRESSES
  const { data: privateValidatorAddress } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getValidators",
    // @ts-ignore
    args: [selecetdBet && selecetdBet.betID],
  });

  ///////// SMART CONTRACT WRITE FUNCTIONS ///////////

  // CREATE BET
  const { config: createBetConfig } = usePrepareContractWrite({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "createSingleBet",
    args: [
      {
        description: betDescription,
        betType: betType,
        betEndTime: betEndTime,
        validators: privateValidators,
      },
    ],
    // @ts-ignore
    value: betType ? "310000000000000000" : "0",
  });
  const { write: createBet } = useContractWrite(createBetConfig);

  // JOIN BET
  const { config: joinBetConfig } = usePrepareContractWrite({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "joinSingleBet",
    // @ts-ignore
    args: [selecetdBet && selecetdBet.betID, betAmount * 10 ** 18, userChoice],
  });
  const { write: joinBet } = useContractWrite(joinBetConfig);

  // APOLLO QUERY - GET OPEN BETS
  const { data: OPEN_BETS } = useQuery(GET_OPEN_BETS, {
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
            {OPEN_BETS && OPEN_BETS.bets && OPEN_BETS.bets.length > 0 ? (
              // @ts-ignore
              OPEN_BETS.bets.map((bet, index) => {
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
                                // @ts-ignore
                                parseInt(currentTimestamp.toString())
                            )}
                        </p>
                      </div>

                      <div className={styles.stat}>
                        <span>Participants</span>
                        <p>
                          {bet.participants ? bet.participants.toString() : "0"}
                        </p>
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
              <p className="emptyList">No Open Bets</p>
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
                  <span>End Time</span>
                  <p>
                    {/* @ts-ignore */}
                    {selecetdBet.endTime &&
                      currentTimestamp &&
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
                  {selecetdBet.creator && (
                    // @ts-ignore
                    <p>{truncateAddr(selecetdBet.creator)}</p>
                  )}
                </div>

                {/* @ts-ignore */}
                {selecetdBet.betType ? (
                  <div className={styles.selectedBetStat}>
                    <span>Validator Address</span>
                    {/* @ts-ignore */}
                    <p>{truncateAddr(selecetdBet.validator)}</p>
                  </div>
                ) : (
                  <div className={styles.selectedBetStat}>
                    <span>Validator Address's</span>
                    <div className={styles.validatorList}>
                      {" "}
                      {privateValidatorAddress &&
                        // @ts-ignore
                        privateValidatorAddress.map((validator, index) => {
                          return (
                            <p>
                              {index + 1}. {truncateAddr(validator)}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              <>
                {/* @ts-ignore */}
                {currentTimestamp && selecetdBet.endTime > currentTimestamp ? (
                  <div className={styles.joinBet}>
                    <input
                      placeholder="Amount"
                      type="number"
                      onChange={(e) => setBetAmount(e.target.value.toString())}
                    />
                    <button
                      className={styles.yes}
                      onClick={() => setUserChoice(true)}
                    >
                      Yes
                    </button>
                    <p>Or</p>
                    <button
                      className={styles.no}
                      onClick={() => setUserChoice(false)}
                    >
                      No
                    </button>

                    {userChoice == true && <p>Selected Choice: Yes</p>}

                    {userChoice == false && <p>Selected Choice: No</p>}
                  </div>
                ) : (
                  <p>Bet Entry Time Just Concluded!</p>
                )}
              </>

              <>
                {betAmount && currentPossibleRewards && userChoice && (
                  <p className={styles.currentPossibleRewards}>
                    Current Possible Rewards:{" "}
                    <span>
                      {/* @ts-ignore */}
                      {currentPossibleRewards.toString() / 10 ** 18} Odds
                    </span>
                  </p>
                )}
              </>

              <button
                className={styles.placeBet}
                disabled={!joinBet}
                onClick={() => joinBet?.()}
              >
                Place Bet
              </button>
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
              {/* @ts-ignore */}
              Bet Creation Fee: <span>{BET_CREATION_FEE / 10 ** 18} </span> GLMR
            </p>
          )}

          <div className={styles.popUpDescription}>
            <p>Bet Description</p>
            <textarea onChange={(e) => setBetDescription(e.target.value)} />
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

          <button
            className={styles.createButton}
            disabled={!createBet}
            onClick={() => createBet?.()}
          >
            Create Bet
          </button>
        </div>
      )}
    </main>
  );
};
