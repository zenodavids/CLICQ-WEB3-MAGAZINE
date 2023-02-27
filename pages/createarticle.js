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

const TextEditor = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

const CreateArticle = () => {
  const [article, setArticle] = useState({ header: '', body: '' })
  const [ifReady, setIfReady] = useState(false)
  const [banner, setBanner] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setIfReady(true)
    }, 500)
  }, [])

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

  const { header, body } = article

  const onChange = (e) => {
    setArticle(() => ({ ...article, [e.target.name]: e.target.value }))
  }

  const reRouteToHome = useRouter()

  const saveArticleToIpfs = async () => {
    try {
      const added = await client.add(JSON.stringify(article))
      return added.path
    } catch (err) {
      console.log('error: ', err)
    }
  }

  const saveArticle = async (hash) => {
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
        console.log('val: ', val)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  const createNewArticle = async () => {
    if (!header || !body) return
    const hash = await saveArticleToIpfs()
    await saveArticle(hash)
    reRouteToHome.push(`/`)
  }

  const articleUseRef = useRef(null)

  const activateHandleFile = () => {
    articleUseRef.current.click()
  }

  const uploadImageToIPFS = async (e) => {
    const uploadedFile = e.target.files[0]
    if (!uploadedFile) return
    const added = await client.add(uploadedFile)
    setArticle((state) => ({ ...state, articleBanner: added.path }))
    setBanner(uploadedFile)
  }

  return (
    <div className='createArticlecontainer'>
      {banner && (
        <img
          className='createArticleBannerStyle'
          src={URL.createObjectURL(banner)}
        />
      )}
      <input
        onChange={onChange}
        name='header'
        placeholder='headerTag : HEADER'
        value={article.header}
        className='createArticleheaderStyle'
      />
      <TextEditor
        className='createArticletextEditorStyling'
        placeholder="What's the body?"
        value={article.body}
        onChange={(value) => setArticle({ ...article, body: value })}
      />
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
