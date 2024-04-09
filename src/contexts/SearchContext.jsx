import { createContext, useContext, useState } from "react";
import axiosClient from "../axios/axios";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [usersSearch, setUsersSearch] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const searchUsers = async (search) => {
        if (search.length == 0) {
            setUsersSearch([]);
        }

        try {
            setLoadingSearch(true);

            const res = await axiosClient.get(`/users/${search}`);
            if (res.status == 200) {
                if (res.data.length > 0) {
                    setUsersSearch(res.data);
                } else {
                    setUsersSearch([]);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingSearch(false);
        }
    };

    const clearUsersSharch = () => setUsersSearch([]);

    const values = {
        searchUsers,
        usersSearch,
        clearUsersSharch,
        loadingSearch,
        setLoadingSearch,
    };

    return (
        <SearchContext.Provider value={values}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    return useContext(SearchContext);
};
