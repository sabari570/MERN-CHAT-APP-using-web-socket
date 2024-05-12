import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_CONFIG } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/user/user.reducer";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${URL_CONFIG.CHAT_APP_BASE_URL}/auth/login`,
        userData
      );
      const user = await response.data;
      console.log("Response after login: ", user);
      if (!user) {
        toast.error("Cpuldn't login user. Please try again later");
        return;
      }
      dispatch(setCurrentUser(user));
      toast.success("User logged in successfully");
      navigate("/");
    } catch (error) {
      console.log("Error while loggin in: ", error.response.data.error);
      if (error.response.data.error.email != "") {
        toast.error(error.response.data.error.email);
      } else if (error.response.data.error.password != "") {
        toast.error(error.response.data.error.password);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}

export default useLogin;
