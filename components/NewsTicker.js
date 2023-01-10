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
  // Declare a state variable called "posts" and a function "setPosts" to update the value of "posts"
  const [posts, setPosts] = useState(['Loading NEWS Updates... Please wait.'])

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

      // Fetch the posts data from the contract using the "fetchPosts" method
      const data = await contract.fetchPosts()

      // Log the fetched data to the console
      console.log('======== fetch all post titles ========')
      console.log(data)

      // Update the state variable "posts" with the fetched data
      setPosts(JSON.parse(JSON.stringify(data)))
    }
    fetchData()
  }, []) // The useEffect hook will only run once because it has an empty array as the second argument

  if (!posts) {
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
          {posts
            .map((post, index) => (
              <Link
                href={`post/${post[2]}`}
                key={index}
                className='w-inline-block a'
              >
                <li className='tickerItem'>
                  {`${post[1].substr(post[1].indexOf(' ') + 2)}`}
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
