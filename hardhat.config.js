require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("hello", "Prints Hello World", () => console.log("Hello World!"));

task("deploy", "Deploys Contract", async () => {
  const contractFactory = await ethers.getContractFactory("LandRegistry");
  const contract = await contractFactory.deploy("0xc2009D705d37A9341d6cD21439CF6B4780eaF2d7");
  await contract.deployed();
  console.log("contract deployed to:", contract.address);
});

// defining accounts to reuse.
const accounts = process.env.PRIV_KEY ? [process.env.PRIV_KEY] : [];

module.exports = {
  defaultNetwork: "local",
  networks: {
    hardhat: {
      chainId: 1337
    },
    local: {
      url: "http://127.0.0.1:8545",
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      accounts
    },
    ropsten: {
      url: process.env.ROPSTEN_RPC_URL, // rpc providers: infura, alchemy
      accounts // private keys
    },
    polygonMumbai: {
      url: process.env.POLYGON_MUMBAI_RPC_URL,
      accounts,
      gasPrice: 90000000000,
      timeout: 100000000
    },
    polygonMain: {
      url: process.env.POLYGON_MAINNET_RPC_URL,
      accounts
    }
  },
  solidity: {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
}