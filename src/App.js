import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import PostDetails from "./pages/PostDetails";
import WritePost from "./pages/WritePost";
import "./styles.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <PostDetails />,
      },
      {
        path: "/write",
        element: <WritePost />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return (
    <div className='app'>
      <div className='app-container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
