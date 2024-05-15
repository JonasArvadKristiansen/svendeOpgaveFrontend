import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import RegisterUser from "./pages/RegisterUser.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <h1>Error</h1>,
  
    children: [
      {
        path: "registerUser",
        element: <RegisterUser/>
      }
    ]
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
