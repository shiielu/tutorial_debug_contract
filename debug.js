const { ethers } = require("hardhat");
const abiFile = require("./artifacts/contracts/Hello.sol/Hello.json")

async function debug() {
    const provider = ethers.getDefaultProvider(process.env.ALCHEMY_URL)
    const wallet = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider);
    const deployedAddress = "0xE13Dc4318F77ebB2D70eF52A643D34B56B9692b2";
    const abi = new ethers.Interface(abiFile.abi)
    const data = abi.encodeFunctionData("hello", ["hello"]);
    const unsignedTx = {
        to: deployedAddress,
        data
    }
    const tx = await wallet.sendTransaction(unsignedTx);
    console.log(tx);
    console.log("---------------------------------------------")
    const txReceipt = await tx.wait()
    console.log(txReceipt);
}
debug()