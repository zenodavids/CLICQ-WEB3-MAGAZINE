const { ethers } = require('hardhat')
// this line of code imports the hardhat library, which is an Ethereum development tool

require('dotenv').config({ path: '.env' })
// this line of code imports the dotenv library, which is a library that helps to define the environment variables

async function main() {
  const Clicq = await ethers.getContractFactory('Clicq')
  // this line of code sets the Clicq variable to the contract factory for the Clicq contract

  const clicq = await Clicq.deploy()
  // this line of code deploys the Clicq contract to the blockchain

  await clicq.deployed()
  // this line of code waits for the contract to be deployed

  console.log('Clicq Contract Address:', clicq.address)
  // this line of code logs the address of the deployed Clicq contract
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
// this line of code is a try/catch error handler that handles any errors that may occur during the deployment process
