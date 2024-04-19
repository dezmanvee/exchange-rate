import { useDispatch } from "react-redux";
import { logoutAuthUser } from "../../states/features/auth/authSlice"; 
import axios from "axios";
import {useNavigate} from "react-router-dom";


const useLogoutMutation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const logoutMutation = async () => {

    try {
        const response = await axios.post('/api/users/logout'); // Destroys the cookie
         await response.data

        dispatch(logoutAuthUser()) // Removes user from local storage
        navigate('/login')

    } catch (error) {
        console.log(error);
    }
  }

  return {logoutMutation}
}
export default useLogoutMutation