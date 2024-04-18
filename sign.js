const { ethers } = require("hardhat");
const abiFile = require("./artifacts/contracts/Hello.sol/Hello.json")

async function sign() {
    const provider = ethers.getDefaultProvider(process.env.ALCHEMY_URL);
    const wallet = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider);
    const deployedAddress = "0xE13Dc4318F77ebB2D70eF52A643D34B56B9692b2";

    const abi = new ethers.Interface(abiFile.abi)
    const data = abi.encodeFunctionData("hello", ["hello"]);
    // console.log(data)

    const sender = await wallet.getAddress();
    const unsignedTx = {
        from: sender,
        to: deployedAddress,
        data: data
    }
    const populatedTx = await wallet.populateTransaction(unsignedTx)
    populatedTx.data = "0xa777d0dc00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000005776f726c64000000000000000000000000000000000000000000000000000000"
    const signedTx = await wallet.signTransaction(populatedTx);
    console.log(signedTx)
}
sign()

0000000000000000000000000000000000000000000000000000000000000020
0000000000000000000000000000000000000000000000000000000000000005
776f726c64000000000000000000000000000000000000000000000000000000