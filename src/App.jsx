import { useEffect, useState } from "react";
import "./App.css";

import { Header, Footer } from "./components/index";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import { login, logout } from "./app/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getcurrentuser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login({ userdata }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        LOADING.......
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
