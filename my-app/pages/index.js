import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { WHITELIST_CONTRACT_ADDRESS, abi } from "../constants";

export default function Home() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // joinedWhitelist keeps track of whether the current metamask address has joined the Whitelist or not
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // numberOfWhitelisted tracks the number of addresses's whitelisted
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  var walletAddress = "0x";

  const [numberOfMaxPerWhitelisted, setNumberOfMaxPerWhitelisted] = useState(0);
  const [numberOfAllMaxWhitelisted, setNumberOfAllMaxWhitelisted] = useState(0);
  const [numberOfWhitelisted_1_ENFP, setNumberOfWhitelisted_1_ENFP] = useState(0);
  const [numberOfWhitelisted_2_INTJ, setNumberOfWhitelisted_2_INTJ] = useState(0);
  const [numberOfWhitelisted_3_ENFJ, setNumberOfWhitelisted_3_ENFJ] = useState(0);
  const [numberOfWhitelisted_4_ISTJ, setNumberOfWhitelisted_4_ISTJ] = useState(0);
  const [numberOfWhitelisted_5_ESTJ, setNumberOfWhitelisted_5_ESTJ] = useState(0);
  const [numberOfWhitelisted_6_ISFJ, setNumberOfWhitelisted_6_ISFJ] = useState(0);
  const [numberOfWhitelisted_7_ENTP, setNumberOfWhitelisted_7_ENTP] = useState(0);
  const [numberOfWhitelisted_8_ISTP, setNumberOfWhitelisted_8_ISTP] = useState(0);
  const [numberOfWhitelisted_9_ESTP, setNumberOfWhitelisted_9_ESTP] = useState(0);
  const [numberOfWhitelisted_10_ENTJ, setNumberOfWhitelisted_10_ENTJ] = useState(0);
  const [numberOfWhitelisted_11_ISFP, setNumberOfWhitelisted_11_ISFP] = useState(0);
  const [numberOfWhitelisted_12_ESFP, setNumberOfWhitelisted_12_ESFP] = useState(0);
  const [numberOfWhitelisted_13_INFJ, setNumberOfWhitelisted_13_INFJ] = useState(0);
  const [numberOfWhitelisted_14_INFP, setNumberOfWhitelisted_14_INFP] = useState(0);
  const [numberOfWhitelisted_15_ESFJ, setNumberOfWhitelisted_15_ESFJ] = useState(0);
  const [numberOfWhitelisted_16_INTP, setNumberOfWhitelisted_16_INTP] = useState(0);
  const [numberOfAllWhitelisted, setNumberOfAllWhitelisted] = useState(0);

  const [containsWhitelist_1_ENFP, setContainsWhitelist_1_ENFP] = useState(false);
  const [containsWhitelist_2_INTJ, setContainsWhitelist_2_INTJ] = useState(false);
  const [containsWhitelist_3_ENFJ, setContainsWhitelist_3_ENFJ] = useState(false);
  const [containsWhitelist_4_ISTJ, setContainsWhitelist_4_ISTJ] = useState(false);
  const [containsWhitelist_5_ESTJ, setContainsWhitelist_5_ESTJ] = useState(false);
  const [containsWhitelist_6_ISFJ, setContainsWhitelist_6_ISFJ] = useState(false);
  const [containsWhitelist_7_ENTP, setContainsWhitelist_7_ENTP] = useState(false);
  const [containsWhitelist_8_ISTP, setContainsWhitelist_8_ISTP] = useState(false);
  const [containsWhitelist_9_ESTP, setContainsWhitelist_9_ESTP] = useState(false);
  const [containsWhitelist_10_ENTJ, setContainsWhitelist_10_ENTJ] = useState(false);
  const [containsWhitelist_11_ISFP, setContainsWhitelist_11_ISFP] = useState(false);
  const [containsWhitelist_12_ESFP, setContainsWhitelist_12_ESFP] = useState(false);
  const [containsWhitelist_13_INFJ, setContainsWhitelist_13_INFJ] = useState(false);
  const [containsWhitelist_14_INFP, setContainsWhitelist_14_INFP] = useState(false);
  const [containsWhitelist_15_ESFJ, setContainsWhitelist_15_ESFJ] = useState(false);
  const [containsWhitelist_16_INTP, setContainsWhitelist_16_INTP] = useState(false);

  /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   *
   * A `Provider` is needed to interact with the blockchain - reading transactions, reading balances, reading state, etc.
   *
   * A `Signer` is a special type of Provider used in case a `write` transaction needs to be made to the blockchain, which involves the connected account
   * needing to make a digital signature to authorize the transaction being sent. Metamask exposes a Signer API to allow your website to
   * request signatures from the user using Signer functions.
   *
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const getMaxWhitelistedAddresses = async () => {
    try {
      const signer = await getProviderOrSigner();
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const result = await whitelistContract.getMaxWhitelistedAddresses();
      setNumberOfMaxPerWhitelisted(result);
    } catch (err) {
      console.error(err);
    }
  }

  const getAllMaxWhitelistedAddresses = async () => {
    try {
      const signer = await getProviderOrSigner();
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const result = await whitelistContract.getAllMaxWhitelistedAddresses();
      setNumberOfAllMaxWhitelisted(result);
    } catch (err) {
      console.error(err);
    }
  }

  const getNumAddressesWhitelisted = async (mbtiOrder) => {
    try {
      const signer = await getProviderOrSigner();
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const result = await whitelistContract.getNumAddressesWhitelisted(mbtiOrder);
      switch(mbtiOrder) {
      case 0:
        setNumberOfWhitelisted_1_ENFP(result);
        break;
      case 1:
        setNumberOfWhitelisted_2_INTJ(result);
        break;
      case 2:
        setNumberOfWhitelisted_3_ENFJ(result);
        break;
      case 3:
        setNumberOfWhitelisted_4_ISTJ(result);
        break;
      case 4:
        setNumberOfWhitelisted_5_ESTJ(result);
        break;
      case 5:
        setNumberOfWhitelisted_6_ISFJ(result);
        break;
      case 6:
        setNumberOfWhitelisted_7_ENTP(result);
        break;
      case 7:
        setNumberOfWhitelisted_8_ISTP(result);
        break;
      case 8:
        setNumberOfWhitelisted_9_ESTP(result);
        break;
      case 9:
        setNumberOfWhitelisted_10_ENTJ(result);
        break;
      case 10:
        setNumberOfWhitelisted_11_ISFP(result);
        break;
      case 11:
        setNumberOfWhitelisted_12_ESFP(result);
        break;
      case 12:
        setNumberOfWhitelisted_13_INFJ(result);
        break;
      case 13:
        setNumberOfWhitelisted_14_INFP(result);
        break;
      case 14:
        setNumberOfWhitelisted_15_ESFJ(result);
        break;
      case 15:
        setNumberOfWhitelisted_16_INTP(result);
        break;
      }
    } catch (err) {
      console.error(err);
    }
  }

  const getAllNumAddressesWhitelisted = async () => {
    try {
      const signer = await getProviderOrSigner();
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const result = await whitelistContract.getAllNumAddressesWhitelisted();
      setNumberOfAllWhitelisted(result);
    } catch (err) {
      console.error(err);
    }
  }

  const addAddressToWhitelist = async (mbtiOrder, targetAddress) => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );

      const tx = await whitelistContract.addAddressToWhitelist(mbtiOrder, targetAddress);
      setLoading(true);
      await tx.wait();
      setLoading(false);

    } catch (err) {
      console.error(err);
    }
  }

  const removeAddressFromWhitelist = async (mbtiOrder, targetAddress) => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );

      const tx = await whitelistContract.removeAddressFromWhitelist(mbtiOrder, targetAddress);
      setLoading(true);
      await tx.wait();
      setLoading(false);

    } catch (err) {
      console.error(err);
    }
  }

  const containsAddressToWhitelist = async (mbtiOrder, targetAddress) => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );

      const result = await whitelistContract.containsAddressToWhitelist(mbtiOrder, targetAddress);
      switch(mbtiOrder) {
      case 0:
        setContainsWhitelist_1_ENFP(result);
        break;
      case 1:
        setContainsWhitelist_2_INTJ(result);
        break;
      case 2:
        setContainsWhitelist_3_ENFJ(result);
        break;
      case 3:
        setContainsWhitelist_4_ISTJ(result);
        break;
      case 4:
        setContainsWhitelist_5_ESTJ(result);
        break;
      case 5:
        setContainsWhitelist_6_ISFJ(result);
        break;
      case 6:
        setContainsWhitelist_7_ENTP(result);
        break;
      case 7:
        setContainsWhitelist_8_ISTP(result);
        break;
      case 8:
        setContainsWhitelist_9_ESTP(result);
        break;
      case 9:
        setContainsWhitelist_10_ENTJ(result);
        break;
      case 10:
        setContainsWhitelist_11_ISFP(result);
        break;
      case 11:
        setContainsWhitelist_12_ESFP(result);
        break;
      case 12:
        setContainsWhitelist_13_INFJ(result);
        break;
      case 13:
        setContainsWhitelist_14_INFP(result);
        break;
      case 14:
        setContainsWhitelist_15_ESFJ(result);
        break;
      case 15:
        setContainsWhitelist_16_INTP(result);
        break;
      }

    } catch (err) {
      console.error(err);
    }
  }

  const addMyAddressToWhitelist = async (mbtiOrder) => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );

      const tx = await whitelistContract.addMyAddressToWhitelist(mbtiOrder);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      queryAll()
    } catch (err) {
      console.error(err);
    }
  }

  const removeMyAddressFromWhitelist = async (mbtiOrder) => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );

      const tx = await whitelistContract.removeMyAddressFromWhitelist(mbtiOrder);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      queryAll()
    } catch (err) {
      console.error(err);
    }
  }

  const containsMyAddressToWhitelist = async (mbtiOrder) => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );

      const result = await whitelistContract.containsMyAddressToWhitelist(mbtiOrder);
      switch(mbtiOrder) {
      case 0:
        setContainsWhitelist_1_ENFP(result);
        break;
      case 1:
        setContainsWhitelist_2_INTJ(result);
        break;
      case 2:
        setContainsWhitelist_3_ENFJ(result);
        break;
      case 3:
        setContainsWhitelist_4_ISTJ(result);
        break;
      case 4:
        setContainsWhitelist_5_ESTJ(result);
        break;
      case 5:
        setContainsWhitelist_6_ISFJ(result);
        break;
      case 6:
        setContainsWhitelist_7_ENTP(result);
        break;
      case 7:
        setContainsWhitelist_8_ISTP(result);
        break;
      case 8:
        setContainsWhitelist_9_ESTP(result);
        break;
      case 9:
        setContainsWhitelist_10_ENTJ(result);
        break;
      case 10:
        setContainsWhitelist_11_ISFP(result);
        break;
      case 11:
        setContainsWhitelist_12_ESFP(result);
        break;
      case 12:
        setContainsWhitelist_13_INFJ(result);
        break;
      case 13:
        setContainsWhitelist_14_INFP(result);
        break;
      case 14:
        setContainsWhitelist_15_ESFJ(result);
        break;
      case 15:
        setContainsWhitelist_16_INTP(result);
        break;
      }

    } catch (err) {
      console.error(err);
    }
  }

  /**
   * addAddressToWhitelist: Adds the current connected address to the whitelist
   */
  const faddMyAddressToWhitelist = async (mbtiOrder) => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      // call the addAddressToWhitelist from the contract
      const tx = await whitelistContract.addMyAddressToWhitelist(mbtiOrder);
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      // get the updated number of addresses in the whitelist
      await fgetAllNumAddressesWhitelisted();
      setJoinedWhitelist(true);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * getNumberOfWhitelisted:  gets the number of whitelisted addresses
   */
  const fgetAllNumAddressesWhitelisted = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // No need for the Signer here, as we are only reading state from the blockchain
      const provider = await getProviderOrSigner();
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );
      // call the numAddressesWhitelisted from the contract
      const _numberOfWhitelisted = await whitelistContract.getAllNumAddressesWhitelisted();
      setNumberOfWhitelisted(_numberOfWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * checkIfAddressInWhitelist: Checks if the address is in whitelist
   */
  const fcontainsAddressToWhitelist = async (mbtiOrder) => {
    try {
      // We will need the signer later to get the user's address
      // Even though it is a read transaction, since Signers are just special kinds of Providers,
      // We can use it in it's place
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await signer.getAddress();
      // call the whitelistedAddresses from the contract
      const _joinedWhitelist = await whitelistContract.containsAddressToWhitelist(
        mbtiOrder, address
      );
      setJoinedWhitelist(_joinedWhitelist);
    } catch (err) {
      console.error(err);
    }
  };

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);

      fcontainsAddressToWhitelist(0);
      fgetAllNumAddressesWhitelisted();
      queryAll();
    } catch (err) {
      console.error(err);
    }
  };

  const queryAll = async () => {
    try {
      // getProviderOrSigner();
      // const signer = await getProviderOrSigner(true);
      // const address = await signer.getAddress();
      // walletAddress = address;
      await getProviderOrSigner();

      getMaxWhitelistedAddresses();
      getAllMaxWhitelistedAddresses();
      for (var i=0; i<16; i++) {
        getNumAddressesWhitelisted(i);
        containsMyAddressToWhitelist(i);
      }
      getAllNumAddressesWhitelisted();
    } catch (err) {
      console.error(err);
    }
  }

  /*
    renderButton: Returns a button based on the state of the dapp
  */
  const renderButton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return (
          <div className={styles.description}>
            Thanks for joining the Whitelist!
          </div>
        );
      } else if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else {
        return (
          <button onClick={(e) => {faddMyAddressToWhitelist(0); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_1 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_1_ENFP) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(0); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(0); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_2 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_2_INTJ) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(1); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(1); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_3 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_3_ENFJ) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(2); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(2); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_4 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_4_ISTJ) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(3); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(3); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_5 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_5_ESTJ) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(4); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(4); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_6 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_6_ISFJ) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(5); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(5); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_7 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_7_ENTP) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(6); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(6); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_8 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_8_ISTP) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(7); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(7); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_9 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_9_ESTP) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(8); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(8); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_10 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_10_ENTJ) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(9); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(9); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_11 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_11_ISFP) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(10); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(10); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_12 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_12_ESFP) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(11); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(11); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return;
    }
  };

  const renderButton_13 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_13_INFJ) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(12); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(12); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_14 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_14_INFP) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(13); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(13); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_15 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_15_ESFJ) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(14); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(14); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const renderButton_16 = () => {
    if (walletConnected) {
      if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (containsWhitelist_16_INTP) {
        return (
          <button onClick={(e) => {removeMyAddressFromWhitelist(15); }} className={styles.button}>
            Disjoin the Whitelist
          </button>
        );
      } else {
        return (
          <button onClick={(e) => {addMyAddressToWhitelist(15); }} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  // useEffects are used to react to changes in state of the website
  // The array at the end of function call represents what state changes will trigger this effect
  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
        </div>

        <div>
        <div>perWhitelistLimit: {numberOfMaxPerWhitelisted}</div>
        <div>allWhitelistLimit: {numberOfAllMaxWhitelisted}</div>
        <div>whitelistCount_1_ENFP: {numberOfWhitelisted_1_ENFP}</div>
        <div>whitelistCount_2_INTJ: {numberOfWhitelisted_2_INTJ}</div>
        <div>whitelistCount_3_ENFJ: {numberOfWhitelisted_3_ENFJ}</div>
        <div>whitelistCount_4_ISTJ: {numberOfWhitelisted_4_ISTJ}</div>
        <div>whitelistCount_5_ESTJ: {numberOfWhitelisted_5_ESTJ}</div>
        <div>whitelistCount_6_ISFJ: {numberOfWhitelisted_6_ISFJ}</div>
        <div>whitelistCount_7_ENTP: {numberOfWhitelisted_7_ENTP}</div>
        <div>whitelistCount_8_ISTP: {numberOfWhitelisted_8_ISTP}</div>
        <div>whitelistCount_9_ESTP: {numberOfWhitelisted_9_ESTP}</div>
        <div>whitelistCount_10_ENTJ: {numberOfWhitelisted_10_ENTJ}</div>
        <div>whitelistCount_11_ISFP: {numberOfWhitelisted_11_ISFP}</div>
        <div>whitelistCount_12_ESFP: {numberOfWhitelisted_12_ESFP}</div>
        <div>whitelistCount_13_INFJ: {numberOfWhitelisted_13_INFJ}</div>
        <div>whitelistCount_14_INFP: {numberOfWhitelisted_14_INFP}</div>
        <div>whitelistCount_15_ESFJ: {numberOfWhitelisted_15_ESFJ}</div>
        <div>whitelistCount_16_INTP: {numberOfWhitelisted_16_INTP}</div>
        <div>allWhitelistCount: {numberOfAllWhitelisted}</div>

        <div>containsAddress_1_ENFP: {containsWhitelist_1_ENFP.toString()} {renderButton_1()}</div>
        <div>containsAddress_2_ENFP: {containsWhitelist_2_INTJ.toString()} {renderButton_2()}</div>
        <div>containsAddress_3_ENFP: {containsWhitelist_3_ENFJ.toString()} {renderButton_3()}</div>
        <div>containsAddress_4_ENFP: {containsWhitelist_4_ISTJ.toString()} {renderButton_4()}</div>
        <div>containsAddress_5_ENFP: {containsWhitelist_5_ESTJ.toString()} {renderButton_5()}</div>
        <div>containsAddress_6_ENFP: {containsWhitelist_6_ISFJ.toString()} {renderButton_6()}</div>
        <div>containsAddress_7_ENFP: {containsWhitelist_7_ENTP.toString()} {renderButton_7()}</div>
        <div>containsAddress_8_ENFP: {containsWhitelist_8_ISTP.toString()} {renderButton_8()}</div>
        <div>containsAddress_9_ENFP: {containsWhitelist_9_ESTP.toString()} {renderButton_9()}</div>
        <div>containsAddress_10_ENFP: {containsWhitelist_10_ENTJ.toString()} {renderButton_10()}</div>
        <div>containsAddress_11_ENFP: {containsWhitelist_11_ISFP.toString()} {renderButton_11()}</div>
        <div>containsAddress_12_ENFP: {containsWhitelist_12_ESFP.toString()} {renderButton_12()}</div>
        <div>containsAddress_13_ENFP: {containsWhitelist_13_INFJ.toString()} {renderButton_13()}</div>
        <div>containsAddress_14_ENFP: {containsWhitelist_14_INFP.toString()} {renderButton_14()}</div>
        <div>containsAddress_15_ENFP: {containsWhitelist_15_ESFJ.toString()} {renderButton_15()}</div>
        <div>containsAddress_16_ENFP: {containsWhitelist_16_INTP.toString()} {renderButton_16()}</div>
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>
    </div>
  );
}
