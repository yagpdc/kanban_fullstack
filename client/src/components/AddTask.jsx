/* eslint-disable react/prop-types */
import { useRef } from "react";
import "../styles/AddTask.css";

const AddTask = ({ socket }) => {
  const taskRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskRef.current.value);
    socket.emit("createTask", taskRef.current.value);
    localStorage.setItem("taskId", taskRef.current.value);
    taskRef.current.value = "";
  };

  return (
    <div className="form_wrapper">
      <form className="form_input" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          id="task"
          className="input"
          placeholder="Type your task..."
          required
          ref={taskRef}
        />
        <button className="addTodoBtn">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M10 7L15 12L10 17"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AddTask;
