/* eslint-disable jsx-a11y/alt-text */
// Import necessary packages and components
import { ethers } from 'ethers' // Allows for use of the ethers.js library for Ethereum development
import { Component } from 'react'
import { withRouter } from 'next/router'
import { ShareState } from '../../constants/createShareStateContext' // Imports the ShareState from a custom context
import Link from 'next/link' // Allows for creation of links in Next.js
import { css } from '@emotion/css' // Allows for styling with CSS-in-JS
import {
  OWNER_ADDRESS,
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
  QUICKNODE_HTTP_URL,
} from '../../constants/contractUtils' // Imports constants used throughout the application

class Article extends Component {
  static contextType = ShareState
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      ownerWalletConnected: null,
    }
  }

  componentDidMount() {
    const { router } = this.props
    const { id } = router.query // Gets the ID parameter from the route
    this.setState({ id })

    const ownerWalletConnected = this.context // Gets the connected wallet address from the ShareState
    this.setState({ ownerWalletConnected })
  }

  render() {
    const { article } = this.props
    const { id, ownerWalletConnected } = this.state

    // If the page is still loading, show a loading message
    if (this.props.router.isFallback) {
      return <div>Loading... Please Wait.</div>
    }

    return (
      <div>
        {/* If the article exists, display the article */}
        {article && (
          <div className='createArticlecontainer boxShadow'>
            {/* If the connected wallet is the same as the article owner's wallet, show the Edit Article button */}
            {OWNER_ADDRESS === ownerWalletConnected && (
              <div style={{ margin: '0', padding: '1rem', background: 'none' }}>
                <Link href={`/edit-article/${[id]}`}>Edit article</Link>
              </div>
            )}
            {/* If the article has a cover image, display it */}
            {article.articleBanner && (
              //  eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.articleBanner}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  ObjectPosition: 'bottom',
                }}
              />
            )}
            {/* Display the article header and body */}
            <h1 style={{ paddingTop: '1rem' }}>
              {article.header.substr(article.header.indexOf(' ') + 2)}
            </h1>
            <div className='articleBodyContainer'>
              <p style={{ width: '100%', margin: '40px auto', padding: '0' }}>
                {article.body}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Article)

// Function to generate the static paths for the articles
export const getStaticPaths = async () => {
  // Create an ethers provider using the QUICKNODE_HTTP_URL constant
  let provider
  provider = new ethers.providers.JsonRpcProvider(QUICKNODE_HTTP_URL)

  // Create an ethers contract using the SMART_CONTRACT_ADDRESS and SMART_CONTRACT_ABI constants
  const contract = new ethers.Contract(
    SMART_CONTRACT_ADDRESS,
    SMART_CONTRACT_ABI,
    provider
  )

  // Fetch the articles from the contract
  const data = await contract.fetchArticles()

  // Create an array of article paths using the article IDs from the fetched data
  const paths = data.map((d) => ({ params: { id: d[2] } }))

  // Return the article paths and fallback true to allow for dynamic generation of pages
  return {
    paths,
    fallback: true,
  }
}

const infuraIPFSuri = 'https://himarkblog.infura-ipfs.io/ipfs/' // Sets the URL for the IPFS gateway

// Function to fetch the article data for the specified ID
export const getStaticProps = async ({ params }) => {
  // Get the ID parameter from the function params
  const { id } = params

  // Set the IPFS URL based on the ID parameter
  const ipfsUrl = `${infuraIPFSuri}${id}`

  // Fetch the data from the IPFS URL
  const response = await fetch(ipfsUrl)
  const data = await response.json()

  // If the data contains a articleBanner property, append the IPFS URL to it
  if (data.articleBanner) {
    let articleBanner = `${infuraIPFSuri}${data.articleBanner}`
    data.articleBanner = articleBanner
  }

  // Return the props object with the article data
  return {
    props: {
      article: data,
    },
  }
}

const articleHeader = css`
  width: 100%;
  margin: 40px auto;
  padding: 0;
`
