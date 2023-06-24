import { ALL_BETS } from "@/fakeData";
import styles from "../../styles/components/bets/Bets.module.css";
import { useState } from "react";
import { ADDRESS_ZERO, getBetEndDate, truncateAddr } from "@/utils";

export const SearchBet = () => {
  const [selectedBetIndex, setSelectedBetIndex] = useState<number>(0);
  const [selecetdBet, setSelectedBet] = useState();
  const [betAmount, setBetAmount] = useState<string>();
  const [userChoice, setUserChoice] = useState<string>();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //   @ts-ignore
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const filteredResults = ALL_BETS.filter((bet) =>
      bet.betDescription.toLowerCase().includes(searchValue.toLowerCase())
    );
    // @ts-ignore
    setSearchResults(filteredResults);
  };

  // TEST VARIABLES
  const currentTimestamp = 1687476088;
  const currentPossibleRewards = 10000000000000000000;
  const isWinner = true;
  const amountWon = 10 * 10 ** 18;
  const requiredNumberOfValidators = 5;

  return (
    <main className={styles.main}>
      <div className={styles.openBets}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.searchTitle}>
            <h3>Search Bet</h3>
            <input
              placeholder="Search With Bet Description..."
              onChange={handleSearchChange}
            />
          </div>

          <div className={styles.bets}>
            {searchResults &&
              searchResults.map((bet, index) => {
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
                      {/* @ts-ignore */}
                      <p>{bet.betDescription}</p>
                    </div>

                    <div className={styles.betStats}>
                      <div className={styles.stat}>
                        <span>Public Validation</span>
                        {/* @ts-ignore */}
                        <p>{bet.betType ? "True" : "False"}</p>
                      </div>

                      {/* @ts-ignore */}
                      {bet.accepted && (
                        <div className={styles.stat}>
                          <span>End Time</span>
                          <p>
                            {/* @ts-ignore */}
                            {bet.endTime &&
                              getBetEndDate(
                                //@ts-ignore
                                bet.betEndTime.toString() -
                                  parseInt(currentTimestamp.toString())
                              )}
                          </p>
                        </div>
                      )}

                      {/* @ts-ignore */}
                      {bet.accepted == true && (
                        <div className={styles.stat}>
                          <span>Participants</span>
                          {/* @ts-ignore */}
                          <p>{bet.participants.length}</p>
                        </div>
                      )}

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

              {/* @ts-ignore */}
              {selecetdBet.validationCount >= 1 &&
                // @ts-ignore
                selecetdBet.betType == false &&
                // @ts-ignore
                selecetdBet.outCome == 0 && (
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
                )}

              {/* bet stats */}
              <div className={styles.selectedBetStats}>
                {/* @ts-ignore */}
                {selecetdBet.accepted && (
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
                )}

                {/* @ts-ignore */}
                {selecetdBet.accepted && (
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
                )}

                <div className={styles.selectedBetStat}>
                  <span>Validators</span>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.validators.length}</p>
                </div>

                {/* @ts-ignore */}
                {selecetdBet.accepted == true && selecetdBet.outcome == 0 && (
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
                )}

                <div className={styles.selectedBetStat}>
                  <span>Public Validation</span>
                  {/* @ts-ignore */}
                  <p>{selecetdBet.betType ? "True" : "False"}</p>
                </div>

                {/* @ts-ignore */}
                {selecetdBet.accepted == true && (
                  <div className={styles.selectedBetStat}>
                    <span>Participants</span>
                    {/* @ts-ignore */}
                    <p>{selecetdBet.participants.length}</p>
                  </div>
                )}

                {/* @ts-ignore */}
                {selecetdBet.accepted == true && (
                  <div className={styles.selectedBetStat}>
                    <span>Yes Pool</span>

                    <p>
                      {/* @ts-ignore */}
                      {(selecetdBet.yesPool / 10 ** 18).toFixed(2)}{" "}
                      <span className={styles.odds}>Odds</span>
                    </p>
                  </div>
                )}

                {/* @ts-ignore */}
                {selecetdBet.accepted == true && (
                  <div className={styles.selectedBetStat}>
                    <span>No Pool</span>
                    <p>
                      {/* @ts-ignore */}
                      {(selecetdBet.noPool / 10 ** 18).toFixed(2)}{" "}
                      <span className={styles.odds}>Odds</span>
                    </p>
                  </div>
                )}

                <div className={styles.selectedBetStat}>
                  <span>Creator</span>
                  {/* @ts-ignore */}
                  <p>{truncateAddr(selecetdBet.creator)}</p>
                </div>

                {/* @ts-ignore */}
                {selecetdBet.outCome != 0 && (
                  <div className={styles.selectedBetStat}>
                    <span>Outcome</span>
                    {/* @ts-ignore */}
                    <p>{selecetdBet.outCome == 1 && "Yes"}</p>
                    {/* @ts-ignore */}
                    <p>{selecetdBet.outCome == 2 && "No"}</p>
                  </div>
                )}

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

                {/* @ts-ignore */}
                {selecetdBet.currentlyChallenged == false &&
                  // @ts-ignore
                  selecetdBet.reportOutcome == 2 &&
                  // @ts-ignore
                  currentTimestamp > selecetdBet.claimWaitTime &&
                  // @ts-ignore
                  selecetdBet.currentlyChallenged == false && (
                    <div className={styles.amountWonAndClaimWinnings}>
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
                      <img
                        src="/icons/loading.png"
                        className={styles.loading}
                      />
                      <p>
                        Bet has been challenged. Validator Made The Wrong
                        Decision. Claim your refund.
                      </p>
                    </div>
                  )}
              </div>

              {/* @ts-ignore */}
              {selecetdBet.accepted == false && (
                <div className={styles.awaitingAcceptanceDetails}>
                  <img src="/icons/loading.png" />
                  <h3>Note</h3>
                  {/* @ts-ignore */}
                  {selecetdBet.validators[0] != ADDRESS_ZERO ? (
                    <p>
                      This bet has been assigned to a validator thanks to
                      chainlink VRF and is currently being reviewed by the
                      validator to make sure the bet details are properly
                      publicly verifiable by any user accross the globe.
                    </p>
                  ) : (
                    <p>
                      This bet is currently waiting on chainlink network to
                      provide a verifiable random number to assign a validator
                      to the bet. Be patient and check back in a few minutes
                      time.
                    </p>
                  )}
                </div>
              )}

              {/* @ts-ignore */}
              {selecetdBet.outCome != 0 &&
                //@ts-ignore
                currentTimestamp < selecetdBet.betEndTime && (
                  <div className={styles.amountWonAndClaimWinnings}>
                    {isWinner == true && amountWon && (
                      <p className={styles.amountWon}>
                        Amount Won: <span>{amountWon / 10 ** 18} Odds</span>
                      </p>
                    )}

                    <button className={styles.claimWinnings}>
                      Claim Winnings
                    </button>
                  </div>
                )}

              {/* @ts-ignore */}
              {selecetdBet.betOutcome == 0 &&
                currentTimestamp &&
                //@ts-ignore
                selecetdBet.endTime > currentTimestamp && (
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
                )}

              {/* @ts-ignore */}
              {selecetdBet.betOutcome == 0 &&
                currentTimestamp &&
                //@ts-ignore
                selecetdBet.endTime > currentTimestamp &&
                betAmount &&
                currentPossibleRewards &&
                userChoice && (
                  <p className={styles.currentPossibleRewards}>
                    Current Possible Rewards:{" "}
                    <span>{currentPossibleRewards / 10 ** 18} Odds</span>
                  </p>
                )}

              {/* @ts-ignore */}
              {selecetdBet.betOutcome == 0 &&
                currentTimestamp &&
                //@ts-ignore
                selecetdBet.endTime > currentTimestamp && (
                  <button className={styles.placeBet}>Place Bet</button>
                )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
