import  axios  from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAuthUser } from "../../states/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const useLoginMutation = () => {
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const loginMutation = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      // http request
        const response = await axios.post('/api/users/auth', {email, password})
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
  return {loginMutation, error, isLoading}
}

export default useLoginMutation