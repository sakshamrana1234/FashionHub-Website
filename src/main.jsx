import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import App from './Routes/App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Routes/Home.jsx'
import Bag from './Routes/Bag.jsx'
import Wishlist from './Routes/Wishlist.jsx'
import Category from './Routes/Category.jsx'
import { Provider } from 'react-redux'
import myntraStore from './store/index.js'
import NotFound from './Routes/NotFound.jsx'

const routerBaseName = !import.meta.env.PROD || import.meta.env.BASE_URL === "/"
  ? undefined
  : import.meta.env.BASE_URL.replace(/\/$/, "");

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<NotFound/>,
    children:[
      {path:"/",element:<Home/>},
      {path:"/women",element:<Category type="women"/>},
      {path:"/men",element:<Category type="men"/>},
      {path:"/sale",element:<Category type="sale"/>},
      {
        path:"/bag",
        element:<Bag/>,
       
      },
      {
        path:"/wishlist",
        element:<Wishlist/>,
      },
      {
        path:"*",
        element:<NotFound/>,
      },
    ],
  },
], {
  basename: routerBaseName,
})
createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <Provider store={myntraStore}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
