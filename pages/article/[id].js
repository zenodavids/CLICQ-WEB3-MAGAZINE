// Import necessary packages and components
import { ethers } from 'ethers' // Allows for use of the ethers.js library for Ethereum development
import { AccountContext } from '../../context' // Imports the AccountContext from a custom context
import { useContext } from 'react' // Allows for use of context in React components
import { useRouter } from 'next/router' // Allows for routing in Next.js
import Link from 'next/link' // Allows for creation of links in Next.js
import { css } from '@emotion/css' // Allows for styling with CSS-in-JS
import {
  OWNER_ADDRESS,
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
  QUICKNODE_HTTP_URL,
} from '../../constants' // Imports constants used throughout the application

const infuraIPFSuri = 'https://himarkblog.infura-ipfs.io/ipfs/' // Sets the URL for the IPFS gateway

export default function Article({ article }) {
  const routeToArticlePage = useRouter() // Gets the current route using useRouter hook
  const { id } = routeToArticlePage.query // Gets the ID parameter from the route

  const ownerWalletConnected = useContext(AccountContext) // Gets the connected wallet address from the AccountContext

  // If the page is still loading, show a loading message
  if (routeToArticlePage.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {/* If the article exists, display the article */}
      {article && (
        <div className={`${container} boxShadow`}>
          {/* If the connected wallet is the same as the article owner's wallet, show the Edit Article button */}
          {OWNER_ADDRESS === ownerWalletConnected && (
            <div className={editArticle}>
              <Link href={`/edit-article/${[id]}`}>Edit article</Link>
            </div>
          )}
          {/* If the article has a cover image, display it */}
          {article.articleBanner && (
            <img src={article.articleBanner} className={articleBannerStyle} />
          )}
          {/* Display the article header and body */}
          <h1 style={{ paddingTop: '1rem' }}>
            {article.header.substr(article.header.indexOf(' ') + 2)}
          </h1>
          <div className={bodyContainer}>
            <p className={articleHeader}>{article.body}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Function to generate the static paths for the articles
export async function getStaticPaths() {
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

// Function to fetch the article data for the specified ID
export async function getStaticProps({ params }) {
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

const editArticle = css`
  margin: 0;
  padding: 1rem;
  background: none;
`

const articleBannerStyle = css`
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: bottom;
`

const container = css`
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding: 10px;
`

const bodyContainer = css`
  width: 100%;
  padding: 10px;
  line-height: 1.6;
  margin: 60px -20px 0 0;
  padding: 0 1px 0 5px;
  & img {
    max-width: 900px;
  }
`
const articleHeader = css`
  width: 100%;
  margin: 40px auto;
  padding: 0;
`
