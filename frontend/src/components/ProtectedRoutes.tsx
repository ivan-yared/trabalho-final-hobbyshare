import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

type Props = {
    children: React.ReactElement
};

const ProtectedRoute:React.FC<Props> = ({children}) => {
    const isAuthenticated = cookies.get("TOKEN");
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return (
            <Navigate to={"/"}/>
        )
    }
    return children
}

export default ProtectedRoute;