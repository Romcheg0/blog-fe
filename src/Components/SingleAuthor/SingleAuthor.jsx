import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

export default function SingleAuthor() {
  const [author, setAuthor] = useState({ data: {}, loading: true, error: null })
  const [posts, setPosts] = useState({ data: [], loading: true, error: null })
  const { id } = useParams()
  function fetchAuthor() {
    axios
      .get(`http://localhost:4000/users/${id}`)
      .then((res) => {
        setAuthor({ data: res.data[0], loading: false, error: null })
      })
      .catch((e) => {
        setAuthor({ data: {}, loading: false, error: e.message })
      })
  }
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchAuthor()
    }, 5000)

    return () => {
      clearInterval(fetchInterval)
    }
  }, [])

  useEffect(() => {
    if (!(author.loading || author.error)) {
      axios
        .get(`http://localhost:4000/posts/author/${id}`)
        .then((res) => {
          setPosts({ data: res.data, loading: false, error: null })
        })
        .catch((e) => {
          setPosts({ data: {}, loading: false, error: e.message })
        })
    }
  }, [author])
  return (
    <div className="card w-75 mx-auto mt-5">
      <div className="card-body">
        <div className="card-title">
          <h2>
            {author.data.first_name} {author.data.last_name}
          </h2>
          <h6>@{author.data.username}</h6>
          <span className="d-flex flex-row justify-content-start align-items-center gap-3">
            <span>Date of birth:</span>
            <span>
              {new Date(author.data.date_of_birth).toLocaleDateString()}
            </span>
          </span>
        </div>
      </div>
      {posts.data.length && (
        <div className="card-body">
          <h5 className="card-title">Posts of {author.data.first_name}:</h5>
          <div className="card-body d-flex flex-row flex-wrap gap-3 justify-content-start align-items-start">
            {posts.data.map((item) => {
              return (
                <div className="card w-25 ratio ratio-1x1" key={item.id}>
                  <div className="card-body">
                    <div className="card-title d-flex flex-row justify-content-between align-items-start">
                      <h3>{item.title}</h3>
                      <span>{new Date(item.issue_date).toLocaleString()}</span>
                    </div>
                    <div className="card-body h-50">
                      <div className="card-text w-75">
                        {item.content.length > 400
                          ? `${item.content.substr(0, 400)}...`
                          : item.content}
                      </div>
                    </div>
                    <div className="card-body mt-5">
                      <Link className="card-link" to={`/post/${item.id}`}>
                        Show more
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
