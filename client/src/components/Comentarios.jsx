import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import "../styles/Comentario.css";

const socket = socketIO.connect("http://localhost:5000");

export const Comments = () => {
  const { category, id } = useParams();
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    socket.emit("fetchComments", { category, id });
    socket.on("comments", (data) => setCommentList(data)); // Carregar os comentários existentes
  }, [category, id]);

  useEffect(() => {
    const fetchCommentsFromServer = async () => {
      try {
        const response = await fetch("http://localhost:5000/api");
        const data = await response.json();
        const item = data[category].items.find((item) => item.id === id);
        if (item) {
          setCommentList(item.comments);
        }
      } catch (error) {
        console.error("Erro ao obter os comentários:", error);
      }
    };
    fetchCommentsFromServer();
  }, [category, id]);

  const addComment = (e) => {
    e.preventDefault();
    socket.emit("addComment", {
      comment,
      category,
      id,
      userId: localStorage.getItem("usernameId"),
    });
    setComment("");
    setShowModal(false);
  };

  const commentsElements =
    commentList.length === 0 ? (
      <p>No comments found</p>
    ) : (
      commentList.map((comment) => (
        <div className="comments" key={comment.id}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 24,
              color: "#6D5032",
              margin: "0% 1%",
            }}
          >
            {comment.name}{" "}
          </div>
          <div
            style={{ color: "#333134", margin: "3% 2%", fontWeight: "bold" }}
          >
            {comment.text}
          </div>
        </div>
      ))
    );

  return (
    <div className="comments_container">
      <div className="header_comments">
        <h1>Comments</h1>
        <button onClick={() => setShowModal(true)}>+ Write a comment</button>
      </div>
      {showModal && (
        <div>
          <form className="comment_form" onSubmit={addComment}>
            <textarea
              placeholder="Type your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              id="comment"
              name="comment"
              required
            ></textarea>
            <div className="button_containers">
              <p></p>
              <p></p>
              <p></p>
              <button className="submit_button" type="submit">
                SUBMIT
              </button>
              <div></div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="commentBtn"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}
      <hr />
      <div className="comments_section">{commentsElements}</div>
      <p>{comment.text}</p>
      <button className="goBack">
        <Link to="/task">
          <svg
            viewBox="0 0 1024 1024"
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#000000"
                d="M224 480h640a32 32 0 110 64H224a32 32 0 010-64z"
              ></path>
              <path
                fill="#000000"
                d="M237.248 512l265.408 265.344a32 32 0 01-45.312 45.312l-288-288a32 32 0 010-45.312l288-288a32 32 0 1145.312 45.312L237.248 512z"
              ></path>
            </g>
          </svg>
          
        </Link>
      </button>
    </div>
  );
};

export default Comments;
