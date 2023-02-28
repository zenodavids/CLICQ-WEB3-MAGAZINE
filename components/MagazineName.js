import Link from 'next/link'
const BlogTitle = () => {
  return (
    <div>
      <div className='title-wrap'>
        <Link href='/'>
          <h2 className='title'>
            <span className='title__shadow' aria-hidden='true'>
              ClicQ
            </span>
            <span className='title__text'>CLICQ</span>
          </h2>
        </Link>
      </div>
    </div>
  )
}

export default BlogTitle
