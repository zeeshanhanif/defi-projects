const BasicNFT = artifacts.require("BasicNFT");

module.exports = function (deployer) {
  deployer.deploy(BasicNFT);
};
