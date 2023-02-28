import { ethers } from 'ethers'
import Link from 'next/link'
import MagazineName from '../components/MagazineName'
import Greetings from '../components/Greetings'
import Footer from '../components/Footer'
import {
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
  QUICKNODE_HTTP_URL,
} from '../constants/contractUtils'

// This component receives props that include an array of articles.
const MagazineMainPage = (props) => {
  const { articles } = props

  // This component renders a div containing the magazine name, left and right columns with articles, and a footer.
  return (
    <div>
      {/* This component displays the magazine name. */}
      <MagazineName />

      {/* This div contains the left and right columns for the articles. */}
      <div className='row'>
        <Greetings position='right' />

        {/* Left column */}
        <div className='leftcolumn'>
          {/* This div contains a grid of articles. */}
          <div className='w-layout-grid blog-grid'>
            {/* We use the map method to loop through the articles and create a div for each article. */}
            {articles
              .map((article, index) => (
                // eslint-disable-next-line react/jsx-key
                <div className='content-left'>
                  {/* This div contains the blog item, including the image and content. */}
                  <div className='blog-item boxShadow'>
                    {/* This div contains the blog image. */}
                    <div className='blog-image-wrap'>
                      {/* This img tag displays the image for the article. */}
                      {/* We use the Unsplash API to get a random image for the article's topic. */}
                      {/* The article topic is the first word in the article's title. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://source.unsplash.com/1600x900/?${
                          article[1].split(' ')[0]
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

                    {/* This div contains the blog content. */}
                    <div className='blog-content'>
                      {/* This link takes the user to the article page when clicked. */}
                      <Link
                        href={`article/${article[2]}`}
                        key={index}
                        className='w-inline-block a'
                      >
                        {/* This h3 tag displays the article's title. */}
                        <h3 className='heading-h2 h3'>
                          {`${article[1].substr(article[1].indexOf(' ') + 2)}`}
                        </h3>
                      </Link>

                      {/* This div contains the profile block. */}
                      <div className='profile-block'>
                        {/* This img tag displays the author's profile picture. */}
                        {/* We use the Unsplash API to get a random image for the author. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://source.unsplash.com/1600x900/?${
                            article[1].split(' ')[0]
                          }`}
                          width='50'
                          alt=''
                          className='profile-picture'
                        />
                        {/* This div contains the author's name and the "Read more" link. */}
                        <div className='normal-wrapper'>
                          <div className='title-small'></div>
                          <Link
                            href={`article/${article[2]}`}
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
        {/* right column */}
        <div className='rightcolumn'>
          {/* Adverts */}
          <div className='card boxShadow'>
            <h3>ADVERTISEMENT</h3>
            <div className='fakeimg' style={{ textAlign: 'center' }}>
              <h1>Adverts</h1>
            </div>
          </div>

          {/* Latest News */}
          <div className='card boxShadow'>
            <h3>Latest</h3>
            {articles
              .map((article, index) => (
                // eslint-disable-next-line react/jsx-key
                <div className='fakeimg'>
                  <Link
                    href={`article/${article[2]}`}
                    key={index}
                    className='w-inline-block a'
                  >
                    {`${article[1].substr(article[1].indexOf(' ') + 2)}`}
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

export default MagazineMainPage

// This function is asynchronous and will return server-side props.
export async function getServerSideProps() {
  // We are creating a new instance of the JSON RPC provider from the ethers library.
  // We pass in a URL endpoint for the Ethereum network we want to connect to.
  let provider = new ethers.providers.JsonRpcProvider(
    QUICKNODE_HTTP_URL // Here, we are using the URL stored in the QUICKNODE_HTTP_URL variable to connect to a specific network.
  )

  // We are creating a new instance of the smart contract using the Contract class from the ethers library.
  // We pass in the contract address and ABI as arguments, along with the provider we just created.
  const contract = new ethers.Contract(
    SMART_CONTRACT_ADDRESS,
    SMART_CONTRACT_ABI,
    provider
  )

  // We are calling the fetchArticles function on the smart contract and waiting for it to return data.
  const data = await contract.fetchArticles()

  // We are logging the data we received from the smart contract to the console.
  console.log('======== fetch all Article headers ========')
  console.log(data)

  // We are returning an object that contains the props we want to pass to the component.
  // We stringify the data and parse it again to avoid issues with serialization.
  return {
    props: {
      articles: JSON.parse(JSON.stringify(data)),
    },
  }
}
