"use client"

import { useEffect, useState } from "react"

export default function News() {
  const [news, setNews] = useState([])
  const [articleNum, setArticleNum] = useState(3)

  useEffect(() => {
    // fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json')
    fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json')
      .then(res => res.json())
      .then(data => {
        setNews(data.articles)

        console.log(data)
        // console.log(data.totalResults)
        // console.log(data.status)
        console.log(data.articles)
        // console.log(data.articles[0])
      })
  }, [])

  return (
    <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl py-4">
      <h4 className="font-bold text-xl px-4">{`What\'s Happening`}</h4>
      {news.slice(0, articleNum).map((article, index) => (
        <div key={index}>
          <a href={article.url} target='_blank'>
            <div className="flex item-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
              <div className="space-y-0.5">
                <h6 className="text-sm font-bold">{article.title}</h6>
                <p className="text-xs font-medium text-gray-500">{article.source.name}</p>
              </div>
              <img 
                src={article.urlToImage} 
                width={70} 
                className="rounded-md"/>
            </div>
          </a>
        
        </div>
        )
      )}
      <button 
        className="text-blue-300 pl-4 hover:text-blue-400 text-sm"
        onClick={() => setArticleNum(articleNum + 3)}>
          Load more 
      </button>
    </div>
  )
}
