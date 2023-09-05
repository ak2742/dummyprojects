import NewsContext from "./NewsContext";
import { useState } from "react";

const NewsStates = (props) => {
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const fetchData = async (obj) => {
    try {
      obj.setProgress(40)
      setLoading(true)
      const url = `https://newsapi.org/v2/top-headlines?country=${obj.country}&category=${obj.category}&apiKey=${obj.apiKey}&page=${page + 1}&pageSize=${obj.pageSize}`
      let data = await fetch(url)
      obj.setProgress(60)
      let parsed = await data.json()
      obj.setProgress(80)
      setArticles(parsed.articles)
      setTotalResults(parsed.totalResults)
      obj.setProgress(100)
      setLoading(false)
      return 0
    } catch (error) {
      console.log("could not connect to server")
      return -1
    }
  }

  const fetchMoreData = async (obj) => {
    try {
      obj.setProgress(40)
      setLoading(true)
      const url = `https://newsapi.org/v2/top-headlines?country=${obj.country}&category=${obj.category}&apiKey=${obj.apiKey}&page=${page + 1}&pageSize=${obj.pageSize}`
      setPage(page + 1)
      let data = await fetch(url)
      obj.setProgress(60)
      let parsed = await data.json()
      obj.setProgress(80)
      setArticles(articles.concat(parsed.articles))
      setTotalResults(parsed.totalResults)
      obj.setProgress(100)
      setLoading(false)
      return 0
    } catch (error) {
      console.log("could not connect to server")
      return -1
    }
  }

  return (
    <NewsContext.Provider
      value={{ loading, articles, totalResults, fetchData, fetchMoreData }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsStates;
