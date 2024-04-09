import { createContext, useContext, useEffect, useRef, useState } from "react";
import axiosClient from "../axios/axios";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [usersSearch, setUsersSearch] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const isNotMorePost = useRef(false);

    const fetchPosts = async (limit, page) => {
        if (!isNotMorePost.current) {
            setIsLoading(true);
            try {
                const res = await axiosClient.get(`/posts/${limit}/${page}`);
                if (res.status == 200) {
                    if (res.data.length > 0) {
                        setPosts((prevPosts) => [...prevPosts, ...res.data]);
                    } else {
                        isNotMorePost.current = true;
                        setIsLoading(false);
                        return;
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

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
        posts,
        setPosts,
        isLoading,
        setIsLoading,
        fetchPosts,
        searchUsers,
        usersSearch,
        clearUsersSharch,
        isNotMorePost,
        loadingSearch,
        setLoadingSearch,
    };

    return (
        <HomeContext.Provider value={values}>{children}</HomeContext.Provider>
    );
};

export const useHomeContext = () => {
    return useContext(HomeContext);
};
