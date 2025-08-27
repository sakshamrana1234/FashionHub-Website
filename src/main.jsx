import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import App from './Routes/App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Routes/Home.jsx'
import Bag from './Routes/Bag.jsx'
import { Provider } from 'react-redux'
import myntraStore from './store/index.js'


const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {path:"/",element:<Home/>},
      {
        path:"/bag",
        element:<Bag/>,
       
      },
    ],
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <Provider store={myntraStore}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
