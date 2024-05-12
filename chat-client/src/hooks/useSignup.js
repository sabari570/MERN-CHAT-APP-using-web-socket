import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { URL_CONFIG } from "../utils/constants";
import { useNavigate } from "react-router-dom";

// This is how we create a custom hook
function useSignup() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const signUp = async (userData) => {
    const success = handleInputErrors({ ...userData });

    if (!success) return;
    setloading(true);
    try {
      const response = await axios.post(
        `${URL_CONFIG.CHAT_APP_BASE_URL}/auth/signup`,
        userData
      );
      const newUser = await response.data;
      console.log("Register response: ", newUser);
      if(!newUser){
        toast.error("Couldn't reqgister user. Please try again later");
      }
      toast.success("User registered successfully");
      navigate('/login');
    } catch (error) {
      console.log("Error while singing up: ", error.response.data.error);
      if (error.response.data.error.email != "") {
        toast.error(error.response.data.error.email);
      } else if (error.response.data.error.password != "") {
        toast.error(error.response.data.error.password);
      }
    } finally {
      setloading(false);
    }
  };

  return { loading, signUp };
}

export default useSignup;

const handleInputErrors = ({ name, email, gender, password, password2 }) => {
  if (!name || !email || !gender || !password || !password2) {
    // this is how we use the react hot toast
    toast.error("Please fill in all the fields");
    return false;
  }

  if (password !== password2) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be atlease 6 characters");
    return false;
  }

  return true;
};
