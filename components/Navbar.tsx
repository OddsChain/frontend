import React from "react";
import styles from "../styles/components/Navbar.module.css";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect, useContractRead } from "wagmi";
import { ODDS_ADDRESS, truncateAddr } from "@/utils";
import { ODDS_ABI } from "@/abi";

export const Navbar = () => {
  const connector = new MetaMaskConnector();
  const { connect } = useConnect();
  const { address, isConnected } = useAccount({
    onConnect({ address }) {
      // @ts-ignore
      localStorage.setItem("connected", address);
    },
    // @ts-ignore
    onDisconnect({ address }) {
      // @ts-ignore
      localStorage.setItem("connected", ADDRESS_ZERO);
    },
  });

  // SMART CONTARCT READ FUNCTIONS

  // GTE USER DETAILS
  const { data: userDetails, isLoading } = useContractRead({
    address: ODDS_ADDRESS,
    abi: ODDS_ABI,
    functionName: "getUserDetails",
    args: [address],
  });

  return (
    <div className={styles.navBar}>
      <a href="/" className={styles.logo}>
        ODDS
      </a>

      {isConnected && (
        <div className={styles.centerLinks}>
          <a href="/bets">Bets</a>
          <a href="/validators">Validators</a>
          <a href="/account">Account</a>
          <a href="/faucet">Faucet</a>
        </div>
      )}

      {!isConnected ? (
        <div className={styles.endButtons}>
          <a
            href="https://francis-4.gitbook.io/odds/"
            className={styles.docs}
            target="_blank"
          >
            Docs
          </a>
          <button
            className={styles.connect}
            onClick={() => connect({ connector })}
          >
            Connect
          </button>
        </div>
      ) : (
        <div className={styles.endButtons}>
          <p className={styles.addr}>{address && truncateAddr(address)}</p>
          <p className={styles.balance}>
            {/* @ts-ignore */}
            {userDetails &&
              // @ts-ignore
              (parseInt(userDetails.balance.toString()) / 10 ** 18).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};
