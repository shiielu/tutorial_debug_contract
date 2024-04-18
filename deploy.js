const { ethers } = require("hardhat");
const abiFile = require("./artifacts/contracts/Hello.sol/Hello.json")
async function deploy() {
    const provider = ethers.getDefaultProvider(process.env.ALCHEMY_URL)
    const wallet = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider);
    const contractFactory = new ethers.ContractFactory(abiFile.abi, abiFile.bytecode, wallet);
    const contract = await contractFactory.deploy();
    console.log(contract);
}
deploy()