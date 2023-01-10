import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { css } from '@emotion/css'
import dynamic from 'next/dynamic'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import {
  OWNER_ADDRESS,
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
  QUICKNODE_HTTP_URL,
} from '../../constants'

// import { contractAddress } from "../../config";
// import Blog from "../../artifacts/contracts/Blog.sol/Blog.json";

const ipfsURI = 'https://himarkblog.infura-ipfs.io/ipfs/'
// const client = create("https://ipfs.infura.io:5001/api/v0");
/////////////////////////////////////

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

///////////////////////////////////

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

export default function Post() {
  const [post, setPost] = useState(null)
  const [editing, setEditing] = useState(true)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    fetchPost()
  }, [id])
  async function fetchPost() {
    /* we first fetch the individual post by ipfs hash from the network */
    if (!id) return
    let provider
    // if (process.env.NEXT_PUBLIC_ENVIRONMENT === "local") {
    //   provider = new ethers.providers.JsonRpcProvider();
    // } else if (process.env.NEXT_PUBLIC_ENVIRONMENT === "testnet") {
    provider = new ethers.providers.JsonRpcProvider(
      // "https://rpc-mumbai.matic.today"
      QUICKNODE_HTTP_URL
    )
    // } else {
    //   provider = new ethers.providers.JsonRpcProvider(
    //     "https://polygon-rpc.com/"
    //   );
    // }
    const contract = new ethers.Contract(
      SMART_CONTRACT_ADDRESS,
      SMART_CONTRACT_ABI,
      provider
    )
    const val = await contract.fetchPost(id)
    const postId = val[0].toNumber()

    /* next we fetch the IPFS metadata from the network */
    const ipfsUrl = `${ipfsURI}${id}`
    const response = await fetch(ipfsUrl)
    const data = await response.json()
    if (data.coverImage) {
      let coverImagePath = `${ipfsURI}${data.coverImage}`
      data.coverImagePath = coverImagePath
    }
    /* finally we append the post ID to the post data */
    /* we need this ID to make updates to the post */
    data.id = postId
    setPost(data)
  }

  async function savePostToIpfs() {
    try {
      const added = await client.add(JSON.stringify(post))
      return added.path
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function updatePost() {
    const hash = await savePostToIpfs()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      SMART_CONTRACT_ADDRESS,
      SMART_CONTRACT_ABI,
      signer
    )
    await contract.updatePost(post.id, post.title, hash, true)
    router.push('/')
  }

  if (!post) return null

  return (
    <div className={`${container} boxShadow`}>
      {/* editing state will allow the user to toggle between */
      /*  a markdown editor and a markdown renderer */}
      {editing && (
        <div>
          <input
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            name='title'
            placeholder='titleTag : TITLE'
            value={post.title}
            className={titleStyle}
          />
          <SimpleMDE
            className={mdEditor}
            placeholder="What's the Content?"
            value={post.content}
            onChange={(value) => setPost({ ...post, content: value })}
          />
          {/* update post button */}
          <div className={float1}>
            <button className={`${button} connect-btn`} onClick={updatePost}>
              Update post
            </button>
          </div>
        </div>
      )}
      {/* view / edit post button */}
      <div className={float2}>
        <button
          className={`${button} connect-btn`}
          onClick={() => setEditing(editing ? false : true)}
        >
          {editing ? 'View post' : 'Edit post'}
        </button>
      </div>

      {!editing && (
        <div>
          {post.coverImagePath && (
            <img src={post.coverImagePath} className={coverImageStyle} />
          )}
          <h1>{post.title}</h1>
          <div className={contentContainer}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

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
	right:40px;
	top:60px;
	border-radius:12px;
	text-align:center;
}
`
const float2 = css`
	position:fixed;
	right:200px;
	top:60px;
	border-radius:12px;
	text-align:center;
}
`

const titleStyle = css`
  margin-top: 40px;
  border: none;
  outline: none;
  background-color: inherit;
  font-size: 44px;
  font-weight: 400;
  &::placeholder {
    color: #999999;
  }
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

const coverImageStyle = css`
  width: 900px;
`

const container = css`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
`

const contentContainer = css`
  margin-top: 60px;
  padding: 0px 40px;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  & img {
    max-width: 900px;
  }
`
