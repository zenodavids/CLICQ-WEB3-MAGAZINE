import { css } from '@emotion/css'
import { useContext, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import Link from 'next/link'
import { AccountContext } from '../context'
import BlogTitle from '../components/BlogTitle'
import Footer from '../components/Footer'
import {
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
  QUICKNODE_HTTP_URL,
  OWNER_ADDRESS,
} from '../constants'

export default function Home(props) {
  /* posts are fetched server side and passed in as props
   see getServerSideProps */
  const { posts } = props
  const account = useContext(AccountContext)
  const router = useRouter()
  // ================================
  console.log('========= all post  ==========')
  console.log(posts)
  // ================================
  async function navigate() {
    router.push('/create-post')
  }

  return (
    <div>
      <BlogTitle />
      {/* -------------------------------------------------- */}
      {/* <div className='h2header'>
        <h2>LATEST NEWS</h2>
      </div> */}

      <div className='row'>
        {/* Left column */}
        <div className='leftcolumn'>
          <div className='w-layout-grid blog-grid'>
            {posts
              .map((post, index) => (
                // eslint-disable-next-line react/jsx-key
                <div className='content-left'>
                  <div className='blog-item boxShadow'>
                    <div className='blog-image-wrap'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://source.unsplash.com/1600x900/?${
                          post[1].split(' ')[0]
                        }`}
                        width='380'
                        height='380'
                        alt=''
                        className='blog-image'
                        style={{
                          transform:
                            'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                          transformStyle: 'preserve-3d',
                        }}
                      />
                    </div>
                    <div className='blog-content'>
                      <Link
                        href={`post/${post[2]}`}
                        key={index}
                        className='w-inline-block a'
                      >
                        <h3 className='heading-h2 h3'>
                          {`${post[1].substr(post[1].indexOf(' ') + 2)}`}
                        </h3>
                      </Link>
                      <div className='profile-block'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://source.unsplash.com/1600x900/?${
                            post[1].split(' ')[0]
                          }`}
                          width='50'
                          alt=''
                          className='profile-picture'
                        />
                        <div className='normal-wrapper'>
                          <div className='title-small'></div>
                          <Link
                            href={`post/${post[2]}`}
                            key={index}
                            className='w-inline-block a'
                          >
                            <p className='paragraph-detials-small'>
                              Read more.
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              .reverse()}
          </div>
        </div>
        {/* Right column */}
        <div className='rightcolumn'>
          <div className='card boxShadow'>
            <h3>Latest</h3>
            {posts
              .map((post, index) => (
                // eslint-disable-next-line react/jsx-key
                <div className='fakeimg'>
                  <Link
                    href={`post/${post[2]}`}
                    key={index}
                    className='w-inline-block a'
                  >
                    {`${post[1].substr(post[1].indexOf(' ') + 2)}`}
                  </Link>
                </div>
              ))
              .reverse()}

            <br />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
// ============= NEWS TICKER START =====================

// ============= NEWS TICKER END =====================

/////////////////////////////////
export async function getServerSideProps() {
  /* here we check to see the current environment variable */
  /* and render a provider based on the environment we're in */
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
  console.log('======== fetch all post titles ========')
  console.log(data)

  return {
    props: {
      posts: JSON.parse(JSON.stringify(data)),
    },
  }
}
const h3 = css`
  z-index: 2;
  mix-blend-mode: screen;
  background: white;
  font-weight: bold;
  padding: 2em 10px;
  max-width: 1100px;
`
const p = css`
  z-index: 2;
  padding: 2em 10px;
  mix-blend-mode: screen;
  background: white;
  font-weight: bold;
  color: transparent;

  max-width: 1100px;
  margin: 0;
  bottom: 6px;
`
const img = css`
  position: absolute;
  top: 0;
  height: 110%;
  width: 100%;
  z-index: -1;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
`
