import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import 'easymde/dist/easymde.min.css'
import React from 'react'
import Link from 'next/link'
import { OWNER_ADDRESS } from '../constants/contractUtils'
import '../styles/globals.css'
// import FxTicker from '../components/FxTicker'
import AlphavantageAPI from '../components/AlphavantageAPI'
import { NewsTicker } from '../components/NewsTicker'
import { ShareState } from '../constants/createShareStateContext.js'

class App extends React.Component {
  // Define a class component named App that extends the React.Component class
  constructor(props) {
    // Define a constructor method that takes in props as a parameter
    super(props) // Call the constructor of the parent class and pass the props parameter to it
    this.state = {
      // Set the initial state of the component
      account: null, // Set the account property of the state to null
    }
  }

  async accessWalletWithWeb3Modal() {
    // Define an asynchronous function named accessWalletWithWeb3Modal
    const web3Modal = new Web3Modal({
      // Create a new instance of the Web3Modal class and configure it with some options
      cacheProvider: false, // Set the cacheProvider option to false to disable caching of the provider
      providerOptions: {
        // Set the providerOptions option to an object that contains the configuration for the walletconnect provider
        walletconnect: {
          // Configure the walletconnect provider
          package: WalletConnectProvider, // Set the package option to the WalletConnectProvider class
          options: {
            // Set the options option to an object that contains the configuration for the provider
            infuraId: '7db3a1b57c0646f09a470e804f7fb9e8', // Set the infuraId option to the specified value
          },
        },
      },
    })
    return web3Modal // Return the created instance of Web3Modal
  }

  connectWallet = async () => {
    // Define an asynchronous arrow function named connectWallet
    try {
      // Begin a try-catch block to handle any errors that may occur
      const web3Modal = await this.accessWalletWithWeb3Modal() // Call the accessWalletWithWeb3Modal function to get an instance of Web3Modal
      const web3Connection = await web3Modal.connect() // Connect to the web3 provider using the instance of Web3Modal
      const provider = new ethers.providers.Web3Provider(web3Connection) // Create a new instance of the Web3Provider class using the connected web3 provider
      const accounts = await provider.listAccounts() // Get a list of accounts associated with the connected provider
      this.setState({ ownerWalletAddress: accounts[0] }) // Update the state of the component to set the ownerWalletAddress property to the first account in the list
    } catch (err) {
      // Catch any errors that occur during the execution of the try block
      console.log('error:', err) // Log the error message to the console
    }
  }

  render() {
    // Define the render method for the component
    const { Component, pageProps } = this.props // Destructure the Component and pageProps properties from the props object
    const { ownerWalletAddress } = this.state // Destructure the ownerWalletAddress property from the state object

    return (
      /* Create a div element that contains all the other elements */
      <div>
        {/* Render a NewsTicker component */}
        <NewsTicker />

        {/* Render an FxTicker component */}
        {/* <FxTicker /> */}
        <AlphavantageAPI />

        {/* Create a nav element with the class name 'navbar' */}
        <nav className='navbar'>
          {/* Create a div element with the class name 'logo'*/}
          <div className='logo'></div>

          {/* Create a ul element with the class name 'nav-links' */}
          <ul className='nav-links'>
            {/* Create a div element with the class name 'menu' */}
            <div className='menu'>
              {/* Create a li element */}
              <li>
                {/* Create a Link element */}
                <Link href='/'>Home</Link>
              </li>
              {ownerWalletAddress === OWNER_ADDRESS && (
                <li>
                  <Link href='/createarticle'>Create Article</Link>
                </li>
              )}
              {!ownerWalletAddress && (
                <li className='connect-btn'>
                  <Link href='' onClick={this.connectWallet}>
                    Connect Wallet
                  </Link>
                </li>
              )}
              {ownerWalletAddress && (
                <Link style={{ pointerEvents: 'none' }} href=''>
                  <li style={{ paddingBottom: '0', marginBottom: '-4px' }}>
                    {`${ownerWalletAddress.slice(
                      0,
                      4
                    )}...${ownerWalletAddress.slice(38)}`}
                  </li>
                </Link>
              )}
            </div>
          </ul>
        </nav>
        <div className='body'>
          <div className='container'>
            <ShareState.Provider value={ownerWalletAddress}>
              <Component {...pageProps} />
            </ShareState.Provider>{' '}
          </div>
        </div>
      </div>
    )
  }
}

export default App
