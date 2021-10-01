const URIBasedNFT = artifacts.require("URIBasedNFT");

module.exports = function (deployer) {
  deployer.deploy(URIBasedNFT);
};
