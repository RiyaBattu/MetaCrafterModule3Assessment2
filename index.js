import { useState, useEffect } from "react";
import { ethers } from "ethers";
import cryptoMakingTreeAbi from "../artifacts/contracts/MySmartContract.sol/SmartContractWithFrontendInteraction.json";

export default function Homepage() {
    const [meMessage, setMeMessage] = useState("EtherHail!");
    const [defaultAccount, setDefaultAccount] = useState(undefined);
    const [balance, setBalance] = useState(undefined);
    const [ethWallet, setEthWallet] = useState(undefined);
    const [mySmartContract, setMySmartContract] = useState(undefined);
    const [redeemedAmount, setRedeemedAmount] = useState(0);

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const smcABI = cryptoMakingTreeAbi.abi;

    const getBalance = async () => {
        if (mySmartContract) {
            setBalance((await mySmartContract.getBalance()).toNumber());
        }
    };

    const deposit = async () => {
        if (mySmartContract) {
            let tx = await mySmartContract.deposit(1);
            await tx.wait();
            getBalance();
        }
    };

    const withdraw = async () => {
        if (mySmartContract) {
            let tx = await mySmartContract.withdraw(1);
            await tx.wait();
            getBalance();
        }
    };

    const getWallet = async () => {
        if (window.ethereum) {
            setEthWallet(window.ethereum);
            console.log("getWallet is executed");
        }

        if (ethWallet) {
            const account = await ethWallet.request({ method: "eth_accounts" });
            accountHandler(account);
        }
    };

    const accountHandler = async (accounts) => {
        if (accounts) {
            console.log("Account connected =", accounts);
            setDefaultAccount(accounts);
        } else {
            console.log("No Account Found");
        }
    };

    const connectWalletHandler = async () => {
        if (!ethWallet) {
            alert("MetaMask Wallet is required to Connect");
            return;
        }

        const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });

        accountHandler(accounts);

        getMyContract();
    };

    const getMyContract = async () => {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, smcABI, signer);

        setMySmartContract(contract);
    };

    const redeem = async () => {
        try {
            if (mySmartContract) {
                let tx = await mySmartContract.redeem();
                await tx.wait();
                setRedeemedAmount(balance);
                getBalance();
            }
        } catch (error) {
            console.error("Error while redeeming:", error.message);
        }
    };

    const initUser = () => {
        if (!ethWallet) {
            return <p>Please Install the MetaMask extension in your Browser</p>;
        }

        if (!defaultAccount) {
            return (<button onClick={connectWalletHandler}>Enable wallet for Ethereum contracts</button>)
        }

        getBalance();

        return (
            <div>
                <h3>Your Account : {defaultAccount}</h3>
                <p>Your Balance : {balance}</p>
                <h3><button onClick={deposit}>Commit 1 ETH</button></h3>
                <h3><button onClick={withdraw}>Retrieve 1 ETH</button></h3>
                <h3><button onClick={redeem}>Redeem</button></h3>
                <p>Redeemed Amount : {redeemedAmount}</p> {/* Display the redeemed amount */}
            </div>
        )
    };

    useEffect(() => { getWallet(); }, []);

    return (
        <main className="container">
            <header><h1>Welcome to Metacrafters ATM- Unleashing Crypto Possibilities</h1></header>
            <h2>{meMessage}</h2>
            {initUser()}
            <style jsx>{`
                *{
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 1500px;
                    height: 800px;
                    background-image: url("https://publish.one37pm.net/wp-content/uploads/2022/03/A-Blockchain-Bridge.jpg?fit=680%2C453");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    width: 100vw;
                    height: 100vh;
                    text-align: center;
                    color: blue;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    color: white;
                }
            `}
            </style>
        </main>
    );
}
