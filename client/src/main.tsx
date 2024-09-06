import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Layout from './ui/Layout.tsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

const RouterLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

const router = createBrowserRouter([{
  path: '/',
  element: <RouterLayout />,
  children: [
    {
      path: '/',
      element: <App />
    },
  ],
}]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
