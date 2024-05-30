import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/index.scss";

import App from "./App.tsx";
import PrivateRoute from "./pages/PrivateRoute.tsx";

import RegisterUser from "./pages/RegisterUser.tsx";
import Profile from "./pages/Profile.tsx";
import CompanyInfo from "./pages/CompanyInfo.tsx";
import JobPosting from "./pages/JobPosting.tsx";
import JobpostingInfo from "./pages/JobpostingInfo.tsx";
import CreateJobpost from "./pages/CreateJobpost.tsx";
import EditJobpost from "./pages/EditJobpost.tsx";
import UpdatePassword from "./pages/UpdatePassword.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "jobposting",
    element: <JobPosting />,
  },
  {
    path: "registerUser",
    element: <RegisterUser />,
  },
  {
    path: "profile",
    element: (
      <PrivateRoute
        component={<Profile />}
        roles={["Normal user", "Company user", "Admin"]}
      />
    ),
  },
  {
    path: "jobpostingInfo/:id/editJobpost",
    element: (
      <PrivateRoute component={<EditJobpost />} roles={["Company user"]} />
    ),
  },
  {
    path: "jobpostingInfo/:id",
    element: (
      <PrivateRoute
        component={<JobpostingInfo />}
        roles={["Normal user", "Company user", "Admin"]}
      />
    ),
  },
  {
    path: "companyInfo/:id",
    element: (
      <PrivateRoute
        component={<CompanyInfo />}
        roles={["Normal user", "Company user", "Admin"]}
      />
    ),
  },
  {
    path: "createJobpost",
    element: (
      <PrivateRoute
        component={<CreateJobpost />}
        roles={["Company user", "Admin"]}
      />
    ),
  },
  {
    path: "updatePassword",
    element: <UpdatePassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
