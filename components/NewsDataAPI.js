// pub_1544906886250f1652f6501ba09bf847b25c1
import React, { useState, useEffect } from 'react'

const NewsdataAPI = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiKey = 'pub_1544906886250f1652f6501ba09bf847b25c1'
        const response = await fetch(
          `https://newsdata.io/api/1/crypto?apikey=${apiKey}`
        )
        const data = await response.json()
        setArticles(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchArticles()
  }, [])

  return (
    <div className='card boxShadow'>
      <div className='fakeimg'>
        <h1>Latest News Articles</h1>
        <ul>
          {articles.map((article) => (
            <li key={article._id}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url}>Read More</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NewsdataAPI
