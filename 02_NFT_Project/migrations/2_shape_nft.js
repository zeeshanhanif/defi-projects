const ShapeNFT = artifacts.require("ShapeNFT");

module.exports = function (deployer) {
  deployer.deploy(ShapeNFT);
};
