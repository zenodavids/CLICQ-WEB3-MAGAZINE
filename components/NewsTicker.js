import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import {
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
  QUICKNODE_HTTP_URL,
  OWNER_ADDRESS,
} from '../constants'

export const NewsTicker = () => {
  // Declare a state variable called "articles" and a function "setArticles" to update the value of "articles"
  const [articles, setArticles] = useState([
    'Loading NEWS Updates... Please wait.',
  ])

  // Use the useEffect hook to fetch data from the Ethereum contract when the component mounts
  useEffect(() => {
    async function fetchData() {
      // Create a JSON RPC provider using the QUICKNODE_HTTP_URL environment variable
      let provider
      provider = new ethers.providers.JsonRpcProvider(QUICKNODE_HTTP_URL)

      // Create a new contract instance using the SMART_CONTRACT_ADDRESS and SMART_CONTRACT_ABI constants
      const contract = new ethers.Contract(
        SMART_CONTRACT_ADDRESS,
        SMART_CONTRACT_ABI,
        provider
      )

      // Fetch the articles data from the contract using the "fetchArticles" method
      const data = await contract.fetchArticles()

      // Log the fetched data to the console
      console.log('======== fetch all article Headers ========')
      console.log(data)

      // Update the state variable "articles" with the fetched data
      setArticles(JSON.parse(JSON.stringify(data)))
    }
    fetchData()
  }, []) // The useEffect hook will only run once because it has an empty array as the second argument

  if (!articles) {
    return (
      <div id='ticker'>
        <div className='title'>{currentDate}</div>
        <ul>
          <li className='tickerItem'>Loading NEWS Updates... Please wait.</li>
        </ul>
      </div>
    )
  }

  return (
    <div>
      <div id='ticker'>
        <div className='title'>NEWS</div>
        <ul>
          {/* ==================== */}
          {articles
            .map((article, index) => (
              <Link
                href={`article/${article[2]}`}
                key={index}
                className='w-inline-block a'
              >
                <li className='tickerItem'>
                  {`${article[1].substr(article[1].indexOf(' ') + 2)}`}
                </li>
              </Link>
            ))
            .reverse()}
          {/* =================== */}
        </ul>
      </div>
    </div>
  )
}
