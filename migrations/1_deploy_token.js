const MyNFT = artifacts.require("MyNFT");

module.exports = async function (deployer) {
  const myNFT = await deployer.deploy(MyNFT, "MY NFT", "NFT");

  console.log("My NFT deployed to:", myNFT.address);
};

// truffle migrate --network polygonTestnet
// truffle run verify SourceMinter --network polygonTestnet
