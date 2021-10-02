const DemoNFT = artifacts.require("DemoNFT");

module.exports = async function (deployer) {
  await deployer.deploy(DemoNFT);
  const demonft = await DemoNFT.deployed();
  console.log("NFT address ",demonft.address);

  const addressToAwardToken = "0xb11846818Eda46eCa2E0481A4A4AFEBB4CAC18d5";
  // At this moment these URI does not exists we are just using dummy URIs
  const txt1 = await demonft.createNFT(addressToAwardToken,"http://www.drinkebynft.com/a1.json");
  const txt2 = await demonft.createNFT(addressToAwardToken,"http://www.drinkebynft.com/a2.json");
  const txt3 = await demonft.createNFT(addressToAwardToken,"http://www.drinkebynft.com/a3.json");
};
