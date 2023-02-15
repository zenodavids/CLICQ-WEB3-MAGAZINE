import { useState } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { OWNER_ADDRESS } from '../constants'
import '../styles/globals.css'
import { css } from '@emotion/css'
import { AccountContext } from '../context.js'
import 'easymde/dist/easymde.min.css'
import FxTicker from '../components/FxTicker'
import { NewsTicker } from '../components/NewsTicker'
import AlphavantageAPI from '../components/AlphavantageAPI'

function MyApp({ Component, pageProps }) {
  /* create local state to save account information after signin */

  /* create local state to save account information after signin */
  const [account, setAccount] = useState(null)
  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: '7db3a1b57c0646f09a470e804f7fb9e8',
          },
        },
      },
    })
    return web3Modal
  }

  /* the connect function uses web3 modal to connect to the user's wallet */
  const connect = async () => {
    try {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
      setAccount(accounts[0])
    } catch (err) {
      console.log('error:', err)
    }
  }

  return (
    <div>
      <NewsTicker />
      <FxTicker />
      {/* <AlphavantageAPI /> */}
      {/* navbar start */}
      <nav className='navbar'>
        {/* logo */}
        <div className='logo'></div>
        {/* navigation menu */}
        <ul className='nav-links'>
          {/* NAVIGATION MENUS */}

          <div className='menu'>
            <li>
              <Link href='/'>Home</Link>
            </li>

            {
              //  if the signed in user is the contract owner, we
              //  show the nav link to create a new post
              account === OWNER_ADDRESS && (
                <li>
                  <Link href='/createarticle'>Create Article</Link>
                </li>
              )
            }

            {!account && (
              <li className='connect-btn'>
                <Link href='' onClick={connect}>
                  Connect
                </Link>
              </li>
            )}
            {/* if connected, show the wallet address */}
            {account && (
              <Link style={{ pointerEvents: 'none' }} href=''>
                <li style={{ paddingBottom: '0', marginBottom: '-4px' }}>
                  {`${account.slice(0, 4)}...${account.slice(38)}`}
                </li>
              </Link>
            )}
          </div>
        </ul>
      </nav>
      {/* navbar end */}

      <div className='body'>
        <div className='container'>
          <AccountContext.Provider value={account}>
            <Component {...pageProps} />
          </AccountContext.Provider>{' '}
        </div>
      </div>
    </div>
  )
}

export default MyApp
