import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share'
const App = () => {
  return (
    <div>
      <FacebookShareButton
        url={'https://www.example.com'}
        quote={'Dummy text!'}
        hashtag='#muo'
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={'https://www.example.com'}
        quote={'Dummy text!'}
        hashtag='#muo'
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  )
}

export default App
