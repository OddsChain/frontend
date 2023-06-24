import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect } from "wagmi";
import { Navbar } from "@/components/Navbar";

export default function Home() {
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

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.landingPage}>
        <Navbar />

        <div className={styles.hero}>
          <div className={styles.txt}>
            <p className={styles.topText}>Bet on Your Terms:</p>
            <p className={styles.middleText}>
              Where Your Imagination Sets the Betting Stage
            </p>
            <p className={styles.bottomText}>
              Create any bet of your choice not being restricted to bets
              provided by the application, have private validators for your
              private bets and public validators for public ones. Earn & Start
              betting limitlessly!
            </p>
            <a href="" className={styles.getStarted}>
              Get Started &gt;
            </a>
          </div>

          <img src="/illustrations/heroImage.jpg" />
        </div>

        <div className={styles.footer}>
          <a href="https://www.freepik.com/free-vector/stability-concept-illustration_44954733.htm#&position=0&from_view=search&track=ais">
            Image by storyset on Freepik
          </a>
        </div>
      </main>
    </>
  );
}