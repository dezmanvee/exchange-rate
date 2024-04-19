import {Navigate, Outlet} from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
    const { user } = useSelector((state) => state.auth);

  return (
    <div>
        {user ? <Outlet /> : <Navigate to='/login' replace={true}/>}
    </div>
  )
}
export default ProtectedRoutes