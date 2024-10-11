import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AppProvider } from './context/AppContext.jsx';
import Layout from './components/Layout.jsx';

import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';
import ErrorPage from './pages/error-page.jsx';
import LoginUser from './pages/login.jsx';
import Header from './components/Header.jsx';
import SignUpUser from './pages/Signup.jsx';
import Books from './pages/Books.jsx';
import { getAllBooks, getAllUserReservations } from './services/get.mjs';
import UserReservations from './pages/UserReservations.jsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <App />, errorElement: <ErrorPage /> },
      { path: '/login', element: <LoginUser />, errorElement: <ErrorPage /> },
      { path: '/signup', element: <SignUpUser />, errorElement: <ErrorPage /> },
      {
        path: '/books',
        element: <Books />,
        errorElement: <ErrorPage />,
        loader: getAllBooks,
      },
      {
        path: '/myreservations',
        element: <UserReservations/>,
        errorElement: <ErrorPage />,
        loader: getAllUserReservations,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      {/* <App /> */}
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
