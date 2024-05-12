import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { URL_CONFIG } from "../utils/constants";
import { setCurrentUser } from "../../store/user/user.reducer";

function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(`${URL_CONFIG.CHAT_APP_BASE_URL}/auth/logout`);
      dispatch(setCurrentUser(null));
      navigate('/login');
    } catch (error) {
      console.log("Error while logging out: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
}

export default useLogout;
