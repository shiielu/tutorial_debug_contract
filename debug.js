const { ethers } = require("hardhat");
const abiFile = require("./artifacts/contracts/Hello.sol/Hello.json")

const deployedAddress = "0xE13Dc4318F77ebB2D70eF52A643D34B56B9692b2";
const provider = ethers.getDefaultProvider(process.env.ALCHEMY_URL)
const wallet = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider);
const abi = new ethers.Interface(abiFile.abi)

async function callTx() {
    const data = abi.encodeFunctionData("hello", ["hello"]);
    console.log("callTx data: \n" + data);
    const unsignedTx = {
        to: deployedAddress,
        data
    }
    const tx = await wallet.call(unsignedTx);
    console.log("callTx result: \n" + tx);
}

async function sendTx() {
    const data = abi.encodeFunctionData("hello", ["hello"]);
    console.log("sendTx data: \n" + data);
    const unsignedTx = {
        to: deployedAddress,
        data
    }
    const tx = await wallet.sendTransaction(unsignedTx);
    const txReceipt = await tx.wait()
    console.log("sendTx request: \n" + JSON.stringify(tx, null, 1));
    console.log("sendTx receipt: \n" + JSON.stringify(txReceipt, null, 1));
}

async function callRevertTx() {
    const data = abi.encodeFunctionData("hello", ["world"]);
    console.log("callRevertTx data: \n" + data);
    const unsignedTx = {
        to: deployedAddress,
        data
    }
    const tx = await wallet.call(unsignedTx);
    console.log("callRevertTx result: \n" + tx);
}

async function sendRevertTx() {
    const data = abi.encodeFunctionData("hello", ["hello"]);
    const sender = await wallet.getAddress();
    const unsignedTx = {
        from: sender,
        to: deployedAddress,
        data: data
    }
    // populateTransactionでunsignerTxで未設定のパラメータを自動設定する
    const populatedTx = await wallet.populateTransaction(unsignedTx)
    // populateTransactionは内部でcallを行い、問題があれば例外を投げる
    // 引数が正しくないTxを投げて無理やりRevertさせるために、populateTransactionのあとにdataをRevert用の値に書き換える
    populatedTx.data = abi.encodeFunctionData("hello", ["world"]);
    console.log("sendRevertTx data: \n" + populatedTx.data);
    const signedTx = await wallet.signTransaction(populatedTx);
    console.log("sendRevertTx signedTx: \n" + signedTx);
    const tx = await wallet.sendTransaction(signedTx);
    console.log("sendRevertTx request: \n" + JSON.stringify(tx, null, 1));
    console.log("---------------------------------------------")
    const txReceipt = await tx.wait()
    console.log("sendRevertTx tx receipt: \n" + JSON.stringify(txReceipt, null, 1));
}