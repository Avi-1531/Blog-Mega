import { useDispatch } from "react-redux";
import authservice from "../../../appwrite/auth";
import { logout } from "../../app/authSlice";

const Logoutbtn = () => {
  const dispatch = useDispatch();
  const logouthandler = () => {
    authservice
      .logout()
      .then(() => dispatch(logout()))
      .catch((err) => console.log(err));
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logouthandler}
    >
      Logout
    </button>
  );
};

export default Logoutbtn;
