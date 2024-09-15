import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import UserList from './components/user-list'
import store from './redux/store'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Provider store={store}>
          <UserList />
        </Provider>
      ),
    },
  ],
  {
    basename: '/geektrust-admin-ui/',
  },
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
