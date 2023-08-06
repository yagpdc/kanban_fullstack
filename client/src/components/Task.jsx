import AddTask from "./AddTask"
import Nav from "./Nav"
import TaskContainer from "./TaskContainer"

import io from "socket.io-client"

const socket = io.connect("http://localhost:5000")

export const Task = () => {
  return ( 
    <>
    <div className="header_task">
      <Nav />
      <AddTask socket={socket}/>
    </div>
      <TaskContainer socket={socket} />
    </>
  )
}
