import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/index.scss";

import App from "./App.tsx";
import PrivateRoute from "./pages/PrivateRoute.tsx";

import JobPosting from "./pages/mainContentPages/JobPosting.tsx";
import JobpostingInfo from "./pages/infoPages/JobpostingInfo.tsx";
import CompanyInfo from "./pages/infoPages/CompanyInfo.tsx";

import RegisterUser from "./pages/CreateUser.tsx";
import UpdatePassword from "./pages/UpdatePassword.tsx";

import Profile from "./pages/Profile.tsx";
import Statistics from "./pages/Statistics.tsx";

import CreateJobpost from "./pages/jobpostPages/CreateJobpost.tsx";
import EditJobpost from "./pages/jobpostPages/EditJobpost.tsx";


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
    path: "updatePassword",
    element: <UpdatePassword />,
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
        roles={[
          "Normal user",
          "Company user",
          "Admin",
          "Facebook user",
          "Google user",
        ]}
      />
    ),
  },
  {
    path: "companyInfo/:id",
    element: (
      <PrivateRoute
        component={<CompanyInfo />}
        roles={[
          "Normal user",
          "Company user",
          "Admin",
          "Facebook user",
          "Google user",
        ]}
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
    path: "statistic",
    element: (
      <PrivateRoute
        component={<Statistics />}
        roles={["Admin"]}
      />
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
