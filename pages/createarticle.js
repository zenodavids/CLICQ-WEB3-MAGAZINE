import { useState, useRef, useEffect } from 'react' // new
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
// import { create as ipfsHttpClient } from "ipfs-http-client";
import { create } from 'ipfs-http-client'
import { ipfsClient } from 'ipfs-http-client'
import { Buffer } from 'buffer'
// const ipfsClient = require("ipfs-http-client");

/* import contract address and contract owner address */
import {
  OWNER_ADDRESS,
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
} from '../constants'

/* define the ipfs endpoint */
// const client = create("https://ipfs.infura.io:5001/api/v0");
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////

/* configure the markdown editor to be client-side import */
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

const initialState = { header: '', body: '' }

function CreateArticle() {
  /* configure initial state to be used in the component */
  const [article, setArticle] = useState(initialState)
  const [image, setImage] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const fileRef = useRef(null)
  const { header, body } = article
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      /* delay rendering buttons until dynamic import is complete */
      setLoaded(true)
    }, 500)
  }, [])

  function onChange(e) {
    setArticle(() => ({ ...article, [e.target.name]: e.target.value }))
  }
  ////////////////////////////

  const projectId = '2HR1ziNfwlZQpvJGE5InBYyZw0v'
  const apiKeySecret = 'c415732d27d68169c8d917c924e3e5f6'
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + apiKeySecret).toString('base64')

  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
      authorization: auth,
    },
  })

  ///////////////////////////

  async function createNewArticle() {
    /* saves article to ipfs then anchors to smart contract */
    if (!header || !body) return
    const hash = await saveArticleToIpfs()
    await saveArticle(hash)
    router.push(`/`)
  }

  async function saveArticleToIpfs() {
    /* save article metadata to ipfs */
    try {
      const added = await client.add(JSON.stringify(article))
      return added.path
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function saveArticle(hash) {
    /* anchor aritcle to smart contract */
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        SMART_CONTRACT_ADDRESS,
        SMART_CONTRACT_ABI,
        signer
      )
      console.log('contract: ', contract)
      try {
        const val = await contract.createArticle(article.header, hash)
        /* optional - wait for transaction to be confirmed before rerouting */
        /* await provider.waitForTransaction(val.hash) */
        console.log('val: ', val)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  function triggerOnChange() {
    /* trigger handleFileChange handler of hidden file input */
    fileRef.current.click()
  }

  async function handleFileChange(e) {
    /* upload cover image to ipfs and save hash to state */
    const uploadedFile = e.target.files[0]
    if (!uploadedFile) return
    const added = await client.add(uploadedFile)
    setArticle((state) => ({ ...state, coverImage: added.path }))
    setImage(uploadedFile)
    // use similar dedicated Gateway to see your uploaded image https://(your gateway name).infura-ipfs.io/ipfs/${result.path}
  }

  return (
    <div className={container}>
      {image && (
        <img className={coverImageStyle} src={URL.createObjectURL(image)} />
      )}
      <input
        onChange={onChange}
        name='header'
        placeholder='headerTag : HEADER'
        value={article.header}
        className={headerStyle}
      />
      <SimpleMDE
        className={mdEditor}
        placeholder="What's the body?"
        value={article.body}
        onChange={(value) => setArticle({ ...article, body: value })}
      />
      {loaded && (
        <>
          <div className={float1}>
            <button className={button} type='button' onClick={createNewArticle}>
              Publish
            </button>
          </div>
          <div className={float2}>
            <button onClick={triggerOnChange} className={button}>
              Add cover image
            </button>
          </div>
        </>
      )}
      <input
        id='selectImage'
        className={hiddenInput}
        type='file'
        accept='image/*,.pdf'
        onChange={handleFileChange}
        ref={fileRef}
      />
    </div>
  )
}

const hiddenInput = css`
  display: none;
`

const coverImageStyle = css`
  max-width: 800px;
`

const mdEditor = css`
  margin: 40px auto;
  padding: 20px;

  background: rgba(255, 255, 255, 0.22);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9.1px);
  -webkit-backdrop-filter: blur(9.1px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`

const headerStyle = css`
  margin-top: 40px;
  border: none;
  outline: none;
  background-color: inherit;
  font-size: 44px;
  font-weight: 400;
  &::placeholder {
    color: #fff;
  }
`

const container = css`
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
`

const button = css`
  background-color: transparent;
  margin: 0 0 20px 20px;
  font-size: 1rem;
  text-transform: uppercase;
  cursor: pointer;
  color: inherit;
  outline: none;
  border: none;
`

const float1 = css`
	position:fixed;
	right:100px;
	top:220px;
	border-radius:12px;
	text-align:center;
}
`
const float2 = css`
	position:fixed;
	right:250px;
	top:220px;
	border-radius:12px;
	text-align:center;
}
`

export default CreateArticle
