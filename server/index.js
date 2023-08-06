const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const UID = () => Math.random().toString(36).substring(2, 10);
const port = 5000;

app.use(cors());

const tasks = {
  requested: {
    title: "requested",
    items: [
      {
        id: UID(),
        title: "Upload the new logo",
        comments: [
          {
            name: "John Doe",
            text: "I think the logo should be blue",
            id: UID(),
          },
        ],
      },
    ],
  },
  pending: {
    title: "pending",
    items: [
      {
        id: UID(),
        title: "Doing some stuff",
        comments: [
          {
            name: "John Johnson",
            text: "I think the stuff should be done",
            id: UID(),
          },
        ],
      },
    ],
  },
  ongoing: {
    title: "ongoing",
    items: [
      {
        id: UID(),
        title: "Reviewing some code",
        comments: [
          {
            name: "Mary Jane",
            text: "I think the code should be refactored",
            id: UID(),
          },
        ],
      },
    ],
  },
  completed: {
    title: "completed",
    items: [
      {
        id: UID(),
        title: "Add a new feature",
        comments: [
          {
            name: "Gavin Belson",
            text: "I think the feature should be added",
            id: UID(),
          },
        ],
      },
    ],
  },
};

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/api", (req, res) => {
  res.json(tasks);
});

io.on("connection", (socket) => {
  console.log(`User connected, User ID = (${socket.id})`);

  socket.on("createTask", (data) => {
    const newTask = { id: UID(), title: data, comments: [] };
    tasks["requested"].items.push(newTask);
    console.log(tasks);

    io.sockets.emit("tasks", tasks);
  });

  socket.on("deleteTask", (taskId) => {
    for (const category in tasks) {
      const taskIndex = tasks[category].items.findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex !== -1) {
        tasks[category].items.splice(taskIndex, 1);
        console.log(
          `Task with ID ${taskId} has been deleted from ${category}.`
        );
      }
    }

    io.sockets.emit("tasks", tasks);
  });

  socket.on("addComment", (data) => {
    const taskItems = tasks[data.category].items;

    for (let i = 0; i < taskItems.length; i++) {
      if (taskItems[i].id === data.id) {
        taskItems[i].comments.push({
          name: data.userId,
          text: data.comment,
          id: UID(),
        });

        socket.emit("comments", taskItems[i].comments);
      }
    }
  });

  socket.on("taskDragged", (data) => {
    const { source, destination } = data;
    const itemMoved = {
      ...tasks[source.droppableId].items[source.index],
    };

    tasks[source.droppableId].items.splice(source.index, 1);
    tasks[destination.droppableId].items.splice(
      destination.index,
      0,
      itemMoved
    );

    io.sockets.emit("tasks", tasks);
  });

  io.on("disconnect", () => {
    socket.disconnect();
    console.log(`(${socket.id}) <== User disconnected '-' `);
  });
});

server.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
