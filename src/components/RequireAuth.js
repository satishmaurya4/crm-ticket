import { useLocation, Outlet, Navigate } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    return (
        localStorage.getItem(("userTypes") === allowedRoles[0]) ? (<Outlet />) : (
            <Navigate to="unauthorised" state={{from: location}} replace />
        )
    )
}

export default RequireAuth;