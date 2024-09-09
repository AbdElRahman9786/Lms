import { createContext, useState } from "react";

// Create the context with default values
export const LoginContext = createContext();

function LogInProvider(props) {
    const [logIn, setLogIn] = useState(false);

    return (
        <LoginContext.Provider value={{ logIn, setLogIn }}>
            {props.children}
        </LoginContext.Provider>
    );
}

export default LogInProvider;
