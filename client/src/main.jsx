import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import { createRoot } from 'react-dom/client'; 
import './App.css'

import { Login } from './Components/Login.jsx';
import { Task } from './Components/Task.jsx';
import { Comments } from "./components/Comentarios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/task",
    element: <Task />
  },
  {
    path: "/comments",
    element: <Comments />
  },
  {
    path: "/comments/:category/:id",
    element: <Comments />
  }
]);

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
