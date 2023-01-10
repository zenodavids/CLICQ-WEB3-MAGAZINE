import ReactMarkdown from 'react-markdown'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { AccountContext } from '../../context'
import {
  OWNER_ADDRESS,
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
  QUICKNODE_HTTP_URL,
} from '../../constants'

const ipfsURI = 'https://himarkblog.infura-ipfs.io/ipfs/'

export default function Post({ post }) {
  const account = useContext(AccountContext)
  const router = useRouter()
  const { id } = router.query

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {post && (
        <div className={`${container} boxShadow`}>
          {
            /* if the owner is the user, render an edit button */
            OWNER_ADDRESS === account && (
              <div className={editPost}>
                {/* <Link href={`/edit-post/${id}`}>Edit post</Link> */}
                <Link href={`/edit-post/${[id]}`}>Edit post</Link>
              </div>
            )
          }
          {
            /* if the post has a cover image, render it */
            post.coverImage && (
              <img src={post.coverImage} className={coverImageStyle} />
            )
          }
          <h1 style={{ paddingTop: '1rem' }}>{post.title}</h1>
          <div className={contentContainer}>
            <p className={postTitle}>{post.content}</p>
            {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
          </div>
        </div>
      )}
    </div>
  )
}

export async function getStaticPaths() {
  /* here we fetch the posts from the network */
  let provider
  provider = new ethers.providers.JsonRpcProvider(
    // "https://rpc-mumbai.matic.today"
    QUICKNODE_HTTP_URL
  )

  const contract = new ethers.Contract(
    SMART_CONTRACT_ADDRESS,
    SMART_CONTRACT_ABI,
    provider
  )
  const data = await contract.fetchPosts()

  /* then we map over the posts and create a params object passing the id property to getStaticProps which will run for every post in the array and generate a new page */
  const paths = data.map((d) => ({ params: { id: d[2] } }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  /* using the id property passed in through the params object */
  /* we can us it to fetch the data from IPFS and pass the */
  /* post data into the page as props */
  const { id } = params
  const ipfsUrl = `${ipfsURI}${id}`
  const response = await fetch(ipfsUrl)
  const data = await response.json()

  if (data.coverImage) {
    let coverImage = `${ipfsURI}${data.coverImage}`
    data.coverImage = coverImage
  }

  return {
    props: {
      post: data,
    },
  }
}

const editPost = css`
  margin: 0;
  padding: 1rem;
  background: none;
`

const coverImageStyle = css`
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: bottom;
`

const container = css`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 10px;
`

const contentContainer = css`
  width: 98%;
  padding: 20px;
  margin: 60px -20px 0 0;
  padding: 0px 40px;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  & img {
    max-width: 900px;
  }
`
const postTitle = css`
  width: 100%;
  margin: 40px auto;
  padding: 0;
`
