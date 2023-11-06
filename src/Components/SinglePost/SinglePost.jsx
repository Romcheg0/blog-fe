import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

export default function SinglePost() {
  const [post, setPost] = useState({ data: {}, loading: true, error: null })
  const [author, setAuthor] = useState({ data: {}, loading: true, error: null })
  const { id } = useParams()
  useEffect(() => {
    axios
      .get(`http://localhost:4000/posts/${id}`)
      .then((res) => {
        setPost({ data: res.data[0], loading: false, error: null })
      })
      .catch((e) => {
        setPost({ data: {}, loading: false, error: e.message })
      })
  }, [])

  useEffect(() => {
    if (!(post.loading || post.error)) {
      axios
        .get(`http://localhost:4000/users/${post.data.author_id}`)
        .then((res) => {
          setAuthor({ data: res.data[0], loading: false, error: null })
        })
        .catch((e) => {
          setAuthor({ data: {}, loading: false, error: e.message })
        })
    }
  }, [post])
  return post.error ? (
    <h2>Error! {post.error}</h2>
  ) : post.loading ? (
    <h2>Loading...</h2>
  ) : (
    <section className="card w-75 mx-auto mt-5">
      <div className="card-body">
        <div className="card-title d-flex flex-row justify-content-between align-items-start">
          <h2>{post.data.title}</h2>
          <h6>{new Date(post.data.issue_date).toLocaleString()}</h6>
        </div>
        <Link to={`/author/${post.data.author_id}`} className="card-text">
          Author: {author.data.first_name} {author.data.last_name}
        </Link>
        <p className="card-text mt-5">{post.data.content}</p>
      </div>
    </section>
  )
}
