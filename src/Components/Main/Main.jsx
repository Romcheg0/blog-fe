import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Main() {
  const [posts, setPosts] = useState({ data: [], error: null, loading: true })
  function fetchData() {
    axios
      .get("http://localhost:4000/posts")
      .then((res) => {
        setPosts({ data: res.data, error: null, loading: false })
      })
      .catch((e) => {
        setPosts({ data: [], error: e, loading: false })
      })
  }
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchData()
    }, 5000)
    return () => {
      clearInterval(fetchInterval)
    }
  }, [])
  return posts.error ? (
    <h2>Error! {posts.error.message}</h2>
  ) : (
    <section>
      {posts.loading ? (
        <h2>Loading...</h2>
      ) : (
        <section className="container mt-5">
          {posts.data.map((item) => {
            return (
              <div className="card mb-3" key={item.id}>
                <div className="card-body">
                  <div className="card-title d-flex flex-row justify-content-between align-items-start">
                    <h3>{item.title}</h3>
                    <span>{new Date(item.issue_date).toLocaleString()}</span>
                  </div>
                  <div className="card-text w-75">
                    {item.content.length > 400
                      ? `${item.content.substr(0, 400)}...`
                      : item.content}
                  </div>
                  <Link className="card-link" to={`/post/${item.id}`}>
                    Show more
                  </Link>
                </div>
              </div>
            )
          })}
        </section>
      )}
    </section>
  )
}
