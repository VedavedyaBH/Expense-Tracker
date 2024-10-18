import { useContext, useState, createContext } from "react";

const UserContext = createContext<any>(null);

export function UserContextProvider({ children }: any) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : "";
    });

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const _logout = () => {
        setUser("");
        setToken("");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload();
    };

    const contextValue = {
        _logout,
        token,
        user,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useAuth must be used within a UserContextProvider");
    }

    return context;
};
