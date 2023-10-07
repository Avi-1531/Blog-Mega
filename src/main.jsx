import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.js";
import {
  HashRouter,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Protected from "./components/AuthLayout.jsx";
import Login from "./components/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Allposts from "./pages/Allposts.jsx";
import Addpost from "./pages/Addpost.jsx";
import Editpost from "./pages/Editpost.jsx";
import Post from "./pages/Post.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <Protected authentication={false}>
            <Login />{" "}
          </Protected>
        }
      />
      <Route
        path="/signup"
        element={
          <Protected authentication={false}>
            <Signup />{" "}
          </Protected>
        }
      />
      <Route
        path="/all-posts"
        element={
          <Protected authentication={true}>
            <Allposts />{" "}
          </Protected>
        }
      />
      <Route
        path="/add-post"
        element={
          <Protected authentication={true}>
            <Addpost />{" "}
          </Protected>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <Protected authentication={true}>
            <Editpost />{" "}
          </Protected>
        }
      />
      <Route path="/post/:slug" element={<Post />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
