import Head from "next/head";
import styles from "@/styles/Bets.module.css";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import {
  useAccount,
  useConnect,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import { ADDRESS_ZERO, ODDS_ADDRESS, ODDS_TOKEN_ADDRESS } from "@/utils";
import { ODDS_TOKEN_ABI } from "@/abi";

export default function Faucet() {
  const [mintAmount, setMintAmount] = useState<number>();
  const [mintAddress, setMintAddress] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const connector = new MetaMaskConnector();
  const { connect, error, isLoading, pendingConnector } = useConnect();
  const { address } = useAccount({
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

  ///////// SMART CONTRACT WRITE FUNCTIONS ///////////

  // MINT ODDS TOKENS
  const { config: mintConfig } = usePrepareContractWrite({
    address: ODDS_TOKEN_ADDRESS,
    abi: ODDS_TOKEN_ABI,
    functionName: "mintFree",
    // @ts-ignore
    args: [mintAddress, mintAmount * 10 ** 18],
  });
  const { write: mint } = useContractWrite(mintConfig);

  useEffect(() => {
    let connected = localStorage.getItem("connected");
    console.log("CNCTD", connected);
    if (connected != ADDRESS_ZERO) connect({ connector });
  }, []);

  function handleResize() {
    setIsSmallScreen(window.innerWidth <= 1100);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Odds | Faucet</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {isSmallScreen ? (
        <div className="smallScreen">
          <p>Screen Size Too Small</p>
          <span>Switch To A Bigger Device</span>
        </div>
      ) : (
        <main className={styles.landingPage}>
          <Navbar />

          <div className={styles.faucetPage}>
            <h3>Facuet</h3>

            <div className={styles.faucetInput}>
              <p>Mint some ODDS Tokens</p>
              {/* @ts-ignore */}
              <input
                // @ts-ignore
                onChange={(e) => setMintAmount(e.target.value)}
                placeholder="Amount"
                type="number"
              />
              {/* @ts-ignore */}
              <input
                // @ts-ignore
                onChange={(e) => setMintAddress(e.target.value)}
                placeholder="Address"
              />
              <button disabled={!mint} onClick={() => mint?.()}>
                Mint
              </button>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
