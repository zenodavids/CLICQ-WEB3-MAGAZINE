import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import {
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
} from '../constants/contractUtils'

const CreateArticle = () => {
  // Define state variables using the `useState` hook
  const [article, setArticle] = useState({ header: '', body: '' }) // state for article header and body
  const [ifReady, setIfReady] = useState(false) // state for checking if the component is ready
  const [banner, setBanner] = useState(null) // state for article banner

  // Define some constants for API access
  const projectId = '2HR1ziNfwlZQpvJGE5InBYyZw0v'
  const apiKeySecret = 'c415732d27d68169c8d917c924e3e5f6'
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + apiKeySecret).toString('base64')

  // Create an IPFS client using the `create` function from the `ipfs-http-client` package
  const client = create({
    host: 'ipfs.infura.io', // the IPFS host
    port: 5001, // the IPFS API port
    protocol: 'https', // the protocol for the API
    apiPath: '/api/v0', // the API path
    headers: {
      authorization: auth, // the authorization header
    },
  })

  // Destructure `header` and `body` from the `article` state object
  const { header, body } = article

  // Define a function that updates the `article` state object when the user types in the input fields
  const onChange = (e) => {
    setArticle(() => ({ ...article, [e.target.name]: e.target.value }))
  }

  // Define a function that saves the article to IPFS and returns the path of the added file
  const saveArticleToIpfs = async () => {
    try {
      const added = await client.add(JSON.stringify(article))
      return added.path
    } catch (err) {
      console.log('error: ', err)
    }
  }

  // Define a function that saves the article to the Ethereum blockchain using the Smart Contract
  const saveArticle = async (saveArticleHash) => {
    // Check if the Web3 provider is available in the browser
    if (typeof window.ethereum !== 'undefined') {
      // Get the provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      // Create a new contract instance using the Smart Contract's address and ABI
      const contract = new ethers.Contract(
        SMART_CONTRACT_ADDRESS,
        SMART_CONTRACT_ABI,
        signer
      )

      // Call the `createArticle` function from the Smart Contract to save the article
      try {
        const setupFromContract = await contract.createArticle(
          article.header,
          saveArticleHash
        )
        console.log('setupFromContract: ', setupFromContract)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  // Get the router object using the `useRouter` hook from Next.js
  const reRouteToHome = useRouter()

  // Define an asynchronous function called `createNewArticle`
  const createNewArticle = async () => {
    // If `header` or `body` are empty, return early
    if (!header || !body) return
    // Save the article to IPFS and get its hash
    const createNewArticleHash = await saveArticleToIpfs()
    // Save the article hash to a database
    await saveArticle(createNewArticleHash)
    // Redirect the user to the home page
    reRouteToHome.push(`/`)
  }

  // Create a reference to a DOM element using React's `useRef` hook
  const articleUseRef = useRef(null)

  // Define a function to activate a file input dialog box
  const activateHandleFile = () => {
    articleUseRef.current.click()
  }

  // Define an asynchronous function to upload an image to IPFS
  const uploadImageToIPFS = async (e) => {
    // Get the uploaded file from the input event
    const uploadedFile = e.target.files[0]
    // If there is no uploaded file, return early
    if (!uploadedFile) return
    // Add the uploaded file to IPFS and get its path
    const added = await client.add(uploadedFile)
    // Update the article state with the new image path
    setArticle((state) => ({ ...state, articleBanner: added.path }))
    // Set the banner state to the uploaded file
    setBanner(uploadedFile)
  }

  // Use the `dynamic` function from Next.js to import the `react-simplemde-editor` component
  const TextEditor = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
  })

  // Define an effect hook that sets `ifReady` to `true`
  useEffect(() => {
    setIfReady(true)
  }, [])

  return (
    // Define a div with the class 'createArticlecontainer'
    <div className='createArticlecontainer'>
      {/* If `banner` is defined, display an image with the `createArticleBannerStyle` class */}
      {banner && (
        <img
          className='createArticleBannerStyle'
          src={URL.createObjectURL(banner)}
        />
      )}
      {/* Define an input for the header with a placeholder and initial value */}
      <input
        onChange={onChange}
        name='header'
        placeholder='headerTag : HEADER'
        value={article.header}
        className='createArticleheaderStyle'
      />
      {/* Use the `react-simplemde-editor` component for the article body */}
      <TextEditor
        className='createArticletextEditorStyling'
        placeholder="What's the body?"
        value={article.body}
        onChange={(value) => setArticle({ ...article, body: value })}
      />
      {/* If `ifReady` is true, display the 'Publish' and 'Add cover image' buttons */}
      {ifReady && (
        <>
          <div className='createArticlefloat1'>
            <button
              className='createArticlebutton'
              type='button'
              onClick={createNewArticle}
            >
              Publish
            </button>
          </div>
          <div className='createArticlefloat2'>
            <button
              onClick={activateHandleFile}
              className='createArticlebutton'
            >
              Add cover image
            </button>
          </div>
        </>
      )}
      {/* Define a hidden file input for selecting an image or PDF */}
      <input
        id='selectImage'
        className='createArticleHiddenInput'
        type='file'
        accept='image/*,.pdf'
        onChange={uploadImageToIPFS}
        ref={articleUseRef}
      />
    </div>
  )
}

export default CreateArticle
