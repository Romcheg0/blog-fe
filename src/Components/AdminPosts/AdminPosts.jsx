import axios from "axios"
import React, { useEffect, useState } from "react"

const Modal = ({
  currentPost,
  setCurrentPost,
  sendFormData,
  modalMode,
  buttonMode,
  users,
}) => {
  return (
    <div
      className="modal fade"
      id="postModal"
      tabIndex="-1"
      aria-labelledby="postModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-5" id="postModalTitle">
              {modalMode === "create" ? "Add" : "Edit"} a post
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="titleInput" className="form-label">
                  Title:
                </label>
                <input
                  type="text"
                  value={currentPost.title}
                  required
                  onChange={(e) => {
                    setCurrentPost({
                      ...currentPost,
                      title: e.target.value,
                    })
                  }}
                  className="form-control"
                  id="titleInput"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contentInput" className="form-label">
                  Content:
                </label>
                <textarea
                  value={currentPost.content}
                  required
                  onChange={(e) => {
                    setCurrentPost({
                      ...currentPost,
                      content: e.target.value,
                    })
                  }}
                  className="form-control"
                  id="contentInput"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="issueDateInput" className="form-label">
                  Issue date:
                </label>
                <input
                  type="datetime-local"
                  value={currentPost.issue_date}
                  required
                  onChange={(e) => {
                    console.log(currentPost.author_id, users[0].id)
                    setCurrentPost({
                      ...currentPost,
                      issue_date:
                        new Date(e.target.value)
                          .toISOString()
                          .replace("T", " ")
                          .replace(/\.\d\d\dZ/, "") ||
                        new Date()
                          .toISOString()
                          .replace("T", " ")
                          .replace(/\.\d\d\dZ/, ""),
                    })
                  }}
                  className="form-control"
                  id="issueDateInput"
                />
              </div>
              {users.length && (
                <div className="mb-3">
                  <label htmlFor="userSelect" className="form-label">
                    Author:{" "}
                  </label>
                  <select
                    id="userSelect"
                    className="form-select"
                    aria-label="Select the author"
                    required
                    value={currentPost.author_id || 0}
                    onChange={(e) => {
                      setCurrentPost({
                        ...currentPost,
                        author_id: e.target.value,
                      })
                    }}
                  >
                    <option value={0} disabled={true}>
                      -- Select an author --
                    </option>
                    {users.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.id} {item.username}
                        </option>
                      )
                    })}
                  </select>
                </div>
              )}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                sendFormData(e)
              }}
            >
              {buttonMode === "loading"
                ? "Loading"
                : buttonMode === "error"
                ? "Oops!"
                : buttonMode === "success"
                ? "Success"
                : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPosts() {
  const [posts, setPosts] = useState({ data: [], loading: true, error: null })
  const [users, setUsers] = useState({ data: [], loading: true, error: null })
  const [modalMode, setModalMode] = useState("create")
  const [buttonMode, setButtonMode] = useState(null)
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: "",
    content: "",
    issue_date: new Date()
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d\d\dZ/, ""),
    author_id: 0,
  })
  function sendFormData(e) {
    e.preventDefault()
    setButtonMode("loading")
    if (
      currentPost.title.length < 4 ||
      currentPost.content.length < 4 ||
      !currentPost.issue_date ||
      currentPost.author_id == 0
    ) {
      setButtonMode("error")
      alert("Incorrect data!")
      console.error(
        currentPost.title,
        currentPost.content,
        !!currentPost.issue_date,
        currentPost.issue_date,
        currentPost.author_id
      )
      setTimeout(() => {
        setButtonMode(null)
      }, 1000)
      return
    }
    if (modalMode === "create") {
      axios
        .post("http://localhost:4000/posts", currentPost)
        .then((res) => {
          if (res.status === 201) {
            setButtonMode("success")
          } else {
            setButtonMode("error")
          }
        })
        .catch((e) => {
          setButtonMode("error")
        })
        .finally(() => {
          setTimeout(() => {
            setButtonMode("null")
          }, 1000)
        })
    } else {
      axios
        .put(`http://localhost:4000/posts/${currentPost.id}`, currentPost)
        .then((res) => {
          if (res.status === 201) {
            setButtonMode("success")
          } else {
            setButtonMode("error")
          }
        })
        .catch((e) => {
          setButtonMode("error")
        })
        .finally(() => {
          setTimeout(() => {
            setButtonMode("null")
            fetchData()
          }, 1000)
        })
    }
  }
  function fetchData() {
    axios
      .get(`http://localhost:4000/posts`)
      .then((res) => {
        setPosts({ data: res.data, loading: false, error: null })
        if (currentPost.author_id === null) {
          console.log("a")
          setCurrentPost({ ...currentPost, author_id: res.data[0].author_id })
        }
      })
      .catch((e) => {
        setPosts({ data: [], loading: false, error: e.message })
      })
    axios
      .get(`http://localhost:4000/users`)
      .then((res) => {
        setUsers({ data: res.data, loading: false, error: null })
      })
      .catch((e) => {
        setUsers({ data: [], loading: false, error: e.message })
      })
  }

  useEffect(() => {
    fetchData()
    const reloadInterval = setInterval(() => {
      fetchData()
    }, 5000)
    return () => {
      clearInterval(reloadInterval)
    }
  }, [])
  return (
    <section className="mt-3 d-flex flex-column">
      <Modal
        currentPost={currentPost}
        setCurrentPost={setCurrentPost}
        sendFormData={sendFormData}
        modalMode={modalMode}
        buttonMode={buttonMode}
        users={users.data}
      />
      <button
        className="btn btn-primary mx-auto w-25 btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#postModal"
        onClick={() => {
          setModalMode("create")
        }}
      >
        Add post
      </button>
      <div className="container mt-3">
        {posts.data.map((item) => {
          return (
            <div className="card mb-3" key={item.id}>
              <div className="card-body">
                <button
                  className="btn btn-warning me-3"
                  onClick={() => {
                    setCurrentPost({
                      ...item,
                      issue_date: new Date(item.issue_date)
                        .toISOString()
                        .replace("T", " ")
                        .replace(/\.\d\d\dZ/, ""),
                    })
                    setModalMode("edit")
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#postModal"
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm("Are you sure?")) {
                      axios.delete(`http://localhost:4000/posts/${item.id}`)
                      fetchData()
                    }
                  }}
                >
                  Delete
                </button>
                <div className="card-title d-flex flex-row justify-content-between align-items-start mt-3">
                  <h3>{item.title}</h3>
                  <span>
                    {new Date(item.issue_date)
                      .toISOString()
                      .replace("T", " ")
                      .replace(/\.\d\d\dZ/, "")}
                  </span>
                </div>
                <div className="card-text">
                  Author: {item.author_id}
                  {" | "}
                  {users.data.filter(
                    (author) => author.id === item.author_id
                  )[0]?.username || ""}
                </div>
                <div className="card-text w-75">
                  {item.content.length > 400
                    ? `${item.content.substr(0, 400)}...`
                    : item.content}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
