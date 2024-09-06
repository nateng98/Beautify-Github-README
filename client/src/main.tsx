import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Layout from './ui/Layout.tsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Product from './pages/Product.tsx'
import Category from './pages/Category.tsx'
import Profile from './pages/Profile.tsx'
import Cart from './pages/Cart.tsx'
import Orders from './pages/Orders.tsx'
import Favorite from './pages/Favorite.tsx'
import Success from './pages/Success.tsx'
import NotFound from './pages/NotFound.tsx'
import Cancel from './pages/Cancel.tsx'

const RouterLayout = () => {
  return (
    <Layout>
      {/*
      Outlet is a placeholder component from react-router-dom that renders whatever child route matches the current path; allowing child routes to be nested within the Layout 
      The child route component (App and components from pages) will be rendered here
      */}
      <Outlet /> 
    </Layout>
  )
}

const router = createBrowserRouter([{
  path: '/', // the base URL of the app
  element: <RouterLayout />, // every time the base URL is visited, <RouterLayout /> is rendered
  children: [ // the child routes that will be rendered inside the Outlet of the RouterLayout
    {
      path: '/', // the home route
      element: <App /> // the App component is rendered at the root path
    },
    {
      path: '/product', // all products
      element: <Product /> 
    },
    {
      path: '/product/:id', // single product
      element: <Product /> 
    },
    {
      path: '/category',
      element: <Category /> 
    },
    {
      path: '/category/:id',
      element: <Category /> 
    },
    {
      path: '/profile',
      element: <Profile /> 
    },
    {
      path: '/cart',
      element: <Cart /> 
    },
    {
      path: '/orders',
      element: <Orders /> 
    },
    {
      path: '/favorite',
      element: <Favorite /> 
    },
    {
      path: '/success',
      element: <Success /> 
    },
    {
      path: '*',
      element: <NotFound /> 
    },
    {
      path: '/cancel',
      element: <Cancel /> 
    },
  ],
}]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
