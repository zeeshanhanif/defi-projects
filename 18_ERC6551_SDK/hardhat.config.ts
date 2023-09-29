import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

dotenv.config();

//const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY = process.env.WALLET1_PRIVATE_KEY;
//const PRIVATE_KEY = process.env.WALLET2_PRIVATE_KEY;
const ALCHEMY_KEY_MUMBAI = process.env.ALCHEMY_KEY_MUMBAI;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
        {
            version: "0.8.19",
            settings: {
                metadata: {
                    bytecodeHash: "none",
                },
                optimizer: {
                    enabled: true,
                    runs: 1337,
                },
            },
        },
    ],
    settings: {
        outputSelection: {
            "*": {
                "*": ["storageLayout"],
            },
        },
    },
  },

  paths: {
    artifacts: "build/artifacts",
    cache: "build/cache",
    sources: "contracts",
  },

  networks: {

    localhost: {
      url:' http://127.0.0.1:8545/'
    },
    
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY_MUMBAI}`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },

};

export default config;
