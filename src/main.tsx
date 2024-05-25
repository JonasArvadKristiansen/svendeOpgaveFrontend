import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/index.scss"

import App from "./App.tsx";
import RegisterUser from "./pages/RegisterUser.tsx";
import Profile from "./pages/Profile.tsx";
import CompanyInfo from "./pages/CompanyInfo.tsx";
import JobPosting from "./pages/JobPosting.tsx";
import JobpostingInfo from "./pages/JobpostingInfo.tsx";
import CreateJobpost from "./pages/CreateJobpost.tsx";
import EditJobpost from "./pages/EditJobpost.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "companyInfo/:id",
    element: <CompanyInfo/>
  },
  {
    path: "registerUser",
    element: <RegisterUser/>
  },
  {
    path: "profile",
    element: <Profile/>
  },


  {
    path: "jobposting",
    element: <JobPosting/>
  },
  {
    path: "jobpostingInfo/:id/editJobpost",
    element: <EditJobpost/>
  },




  {
    path: "jobpostingInfo/:id",
    element: <JobpostingInfo/>
  },
  {
    path: "createJobpost",
    element: <CreateJobpost/>
  },

]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
