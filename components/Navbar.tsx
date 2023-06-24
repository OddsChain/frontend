import React from "react";
import styles from "../styles/components/Navbar.module.css";
import { truncateAddr } from "@/utils";

export const Navbar = () => {
  const isConnected = true;
  const address = "0x52047DE4458AfaaFF7C6B954C63033A21EfCD2E6";
  const userBalance = "10230000000000000000";

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
        </div>
      )}

      {!isConnected ? (
        <div className={styles.endButtons}>
          <a href="/" className={styles.docs}>
            Docs
          </a>
          <button className={styles.connect}>Connect</button>
        </div>
      ) : (
        <div className={styles.endButtons}>
          <p className={styles.addr}>{address && truncateAddr(address)}</p>
          <p className={styles.balance}>
            {userBalance && parseInt(userBalance) / 10 ** 18}
          </p>
        </div>
      )}
    </div>
  );
};
