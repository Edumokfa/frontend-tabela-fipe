import React, { useState, createContext } from "react";
import { createSession, redirectToLogin } from "../middlewares/communicationMiddleware";
import { useNavigate } from "react-router-dom";
import { invalidLogin } from './messageUtil';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (log, password) => {
        try {
            const response = await createSession(log, password);
            const user = response.data.user;
            const token = response.data.token;

            localStorage.setItem("access_token", token);

            //api.defaults.headers.Authorization = `Bearer ${token}`;

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
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, setUser, setLoading }} >
            {children}
        </AuthContext.Provider>
    );
};

