import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic'
import {
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
  QUICKNODE_HTTP_URL,
} from '../../constants/contractUtils'

const projectId = '2HR1ziNfwlZQpvJGE5InBYyZw0v'
const apiKeySecret = 'c415732d27d68169c8d917c924e3e5f6'

const auth =
  'Basic ' + Buffer.from(projectId + ':' + apiKeySecret).toString('base64')

const infuraClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
})

const infuraIPFSuri = 'https://himarkblog.infura-ipfs.io/ipfs/'

const EditArticle = () => {
  const [article, setArticle] = useState(null)
  const [editing, setEditing] = useState(true)

  // Get the current route from the Next.js router
  const router = useRouter()
  const { id } = router.query

  // Use an effect hook to fetch the article data from the blockchain and IPFS
  useEffect(() => {
    fetchArticle()
  }, [id])

  async function fetchArticle() {
    // Check if the article ID is present in the query parameters
    if (!id) return
    let provider

    // Create an Ethereum provider object to connect to the QUICKNODE_HTTP_URL
    provider = new ethers.providers.JsonRpcProvider(QUICKNODE_HTTP_URL)

    // Create an Ethereum contract object to interact with the smart contract at SMART_CONTRACT_ADDRESS
    const contract = new ethers.Contract(
      SMART_CONTRACT_ADDRESS,
      SMART_CONTRACT_ABI,
      provider
    )

    // Call the fetchArticle method of the smart contract to get the article data
    const val = await contract.fetchArticle(id)

    // Extract the article ID from the result of the fetchArticle method
    const articleId = val[0].toNumber()

    /* Next, fetch the IPFS metadata from the network using the IPFS URI and the article ID */
    const ipfsUrl = `${infuraIPFSuri}${id}`
    const response = await fetch(ipfsUrl)
    const data = await response.json()

    // If the metadata includes a cover image, update the articleBannerPath property to include the IPFS URI
    if (data.articleBanner) {
      let articleBannerPath = `${infuraIPFSuri}${data.articleBanner}`
      data.articleBannerPath = articleBannerPath
    }

    /* Finally, append the article ID to the article data object */
    /* We need this ID to make updates to the article later */
    data.id = articleId
    setArticle(data)
  }

  // Define a function to save the current article to IPFS and return the hash of the saved data
  async function saveArticleToIpfs() {
    try {
      const added = await infuraClient.add(JSON.stringify(article))
      return added.path
    } catch (err) {
      console.log('error: ', err)
    }
  }

  // Define a function to update the current article on the blockchain and IPFS
  async function updateArticle() {
    // Save the current article to IPFS and get the hash of the saved data
    const hash = await saveArticleToIpfs()
    // Initializes a Web3Provider with the current Ethereum provider
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // Retrieves the signer (user's wallet) associated with the provider
    const signer = provider.getSigner()

    // Initializes a Contract instance associated with the smart contract's address and ABI
    const contract = new ethers.Contract(
      SMART_CONTRACT_ADDRESS,
      SMART_CONTRACT_ABI,
      signer
    )

    // Updates the article in the smart contract, passing in its ID, header, hash, and a boolean flag indicating that it's published
    await contract.updateArticle(article.id, article.header, hash, true)

    // Navigates the user back to the home page
    router.push('/')
  }

  // If there is no article object, return null
  if (!article) return null

  const TextEditor = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
  })

  // Renders the article editing form and the article preview
  return (
    <div className='createArticlecontainer boxShadow'>
      {/* If the user is currently editing the article, display the markdown editor */}
      {editing && (
        <div>
          <input
            onChange={(e) => setArticle({ ...article, header: e.target.value })}
            name='header'
            placeholder='headerTag : HEADER'
            value={article.header}
            className='createArticleheaderStyle'
          />
          <TextEditor
            className='textEditorStyling'
            placeholder="What's the Content?"
            value={article.body}
            onChange={(value) => setArticle({ ...article, body: value })}
          />

          {/* Button to update the article in the smart contract */}
          <div className='createArticlefloat1'>
            <button className='createArticlebutton ' onClick={updateArticle}>
              Update Article
            </button>
          </div>
        </div>
      )}

      {/* Button to toggle between editing and viewing the article */}
      <div className='createArticlefloat2'>
        <button
          className='createArticlebutton '
          onClick={() => setEditing(editing ? false : true)}
        >
          {editing ? 'View article' : 'Edit article'}
        </button>
      </div>

      {/* If the user is not editing, display the article preview */}
      {!editing && (
        <div>
          {/* If the article has a cover image, display it */}
          {article.articleBannerPath && (
            <img src={article.articleBannerPath} style={{ width: '900px' }} />
          )}
          {/* Display the article header */}
          <h1>{article.header}</h1>
          {/* Display the article body in markdown format */}
          <div className={bodyContainer}>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditArticle
