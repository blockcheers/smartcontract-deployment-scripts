async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Get the Contract factories and Signers here.
  const MyNFT = await ethers.getContractFactory("MyNFT");

  // deploy contracts
  const myNFT = await MyNFT.deploy(
    "MY NFT",
    "NFT"
  );
  console.log("MyNFT Address: ", myNFT.address);

  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(myNFT, "MyNFT");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../contracts-data";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// npx hardhat run scripts/deploy.js --network <chain name>

// to verify contract
// npx hardhat verify --network <chain name> <contract address> <param 1> <param 2>
