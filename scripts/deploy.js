const { ethers } = require('hardhat')
require('dotenv').config({ path: '.env' })
const fs = require('fs')

async function main() {
  /* these two lines deploy the contract to the network */
  const Clicq = await ethers.getContractFactory('Clicq')
  // deploy the contract
  const clicq = await Clicq.deploy()
  // wait for the contract to be deployed.
  await clicq.deployed()

  console.log('Clicq Contract Address:', clicq.address)

  /* this code writes the contract addresses to a local
  file named addresses.js that we can use in the app */
  fs.writeFileSync(
    './addresses.js',
    `
  export const SMART_CONTRACT_ADDRESS = "${clicq.address}"
  export const OWNER_ADDRESS = "${clicq.signer.address}"
  `
  )
}
// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
