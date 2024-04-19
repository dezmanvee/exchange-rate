import  axios  from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAuthUser } from "../../states/features/auth/authSlice";



const useUpdateMutation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch();


  const updateMutation = async (_id, name, email, password) => {
    setIsLoading(true)
    setError(null)

    try {
        setIsLoading(true)
        setError(null)
      // http request
        const response = await axios.put('/api/users/profile', {_id, name, email, password})
        const userAuth = await response.data
        
        // dispatch login auth action
        dispatch(loginAuthUser({...userAuth}))
        setIsLoading(false)

      } catch (err) {
        setIsLoading(false)
        setError(err?.response ? err?.response?.data : err?.error)
      }
  }
  return {updateMutation, error, isLoading}
}

export default useUpdateMutation;