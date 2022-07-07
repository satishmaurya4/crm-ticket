import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();



const AppProvider = ({children}) => {
    const [initialState, setInitialState] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const notify = () => toast("hello");
    return (
        <AppContext.Provider value={{initialState, setInitialState, isLoading, setIsLoading, notify}}>
{children}
        </AppContext.Provider>
    )
}


export const Consume = () => useContext(AppContext);

export default AppProvider;