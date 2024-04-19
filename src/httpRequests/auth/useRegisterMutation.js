import  axios  from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAuthUser } from "../../states/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const useRegisterMutation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const registerMutation = async (name, email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      // http request
        const response = await axios.post('/api/users', {name, email, password})
        const userAuth = await response.data
        
        // dispatch login auth action
        dispatch(loginAuthUser({...userAuth}))

        // navigate user to home page
        navigate('/')

      } catch (err) {
        setIsLoading(false)
        setError(err?.response ? err?.response?.data : err?.error)
      }
  }
  return {registerMutation, error, isLoading}
}

export default useRegisterMutation;