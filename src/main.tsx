import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import CreateUser from "./components/Sites/CreateUser.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <h1>Error</h1>,
  
    children: [
      {
        path: "reg-user",
        element: <CreateUser/>
      }
    ]
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
