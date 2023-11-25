import React, { useState, createContext } from "react";
import { createSession, redirectToLogin } from "../middlewares/communicationMiddleware";
import { useNavigate } from "react-router-dom";
import { invalidLogin } from './messageUtil';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const login = async (log, password) => {
        try {
            const response = await createSession(log, password);
            const user = response.data.user;
            const token = response.data.token;

            localStorage.setItem("access_token", token);

            setUser(user);
            navigate("/");
        } catch (error) {
            invalidLogin();
        }
    };

    const logout = () => {
        setUser(null);
        redirectToLogin();
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, setUser }} >
            {children}
        </AuthContext.Provider>
    );
};

