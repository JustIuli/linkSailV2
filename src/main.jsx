import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Views/App.jsx'
import CreateLink from './Views/CreateLink.jsx'
import AnalyticsLink from './Views/AnalyticsLink.jsx'
import ErrorPage from './Views/ErrorPage.jsx'
import RedirectView from './Views/RedirectVIew.jsx'
import './css/App.css'
import './css/index.css'
import './css/main.css'

import { createRoot } from "react-dom/client";
import { createBrowserRouter,RouterProvider,Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path:'/create-link',
    element: <CreateLink />,
    errorElement: <ErrorPage />
  },
  {
    path:'/analytics',
    element: <AnalyticsLink />,
    errorElement: <ErrorPage />
  },
  {
    path:'/r/:uniqueId',
    element: <RedirectView />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
