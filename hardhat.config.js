/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const { SEPOLIA_URL_KEY, PRIVATE_KEY, API_URL_KEY } = process.env;

module.exports = {
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/QI8mv8OvEiYWvjReQZAEVmjNYOQKBnA_',
      accounts: [`0x${PRIVATE_KEY}`],
      networkId: "0xaa36a7.eth2"
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: [`0x${PRIVATE_KEY}`],
      networkId: "0x61.bsc"
    },
  },
  solidity: {
    version: '0.8.20',
  },
};
