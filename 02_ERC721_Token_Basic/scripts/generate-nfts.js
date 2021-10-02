const URIBasedNFT = artifacts.require("URIBasedNFT");

module.exports = async callback => {
    const urinft = await URIBasedNFT.deployed();
    console.log("NFT address ",urinft.address);
    const addressToAwardToken = "0xb11846818Eda46eCa2E0481A4A4AFEBB4CAC18d5";
    // At this moment these URI does not exists we are just using dummy URIs
    //const txt1 = await urinft.createNFT(addressToAwardToken,"http://www.demorinkebynft.com/11.json");
    //const txt2 = await urinft.createNFT(addressToAwardToken,"http://www.demorinkebynft.com/12.json");
    const txt3 = await urinft.createNFT(addressToAwardToken,"http://www.demorinkebynft.com/13.json");
    const txt4 = await urinft.createNFT(addressToAwardToken,"http://www.demorinkebynft.com/14.json");

    callback();
};