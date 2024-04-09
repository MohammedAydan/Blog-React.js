import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../contexts/AuthContext";
import AddPost from "../components/Post/AddPost";
import Post from "../components/Post/Post";
import { useHomeContext } from "../contexts/HomeContext";
import LoadingPost from "../components/Post/LoadingPost";
import { generateRandomId } from "../MyMethods/MyMethods";
import FlotAddButton from "../components/Buttons/FlotAddButton";

function HomeScreen() {
    const { user, loading } = useAuth();
    const { posts, isLoading, fetchPosts, isNotMorePost } = useHomeContext();
    const [showAddAlert, setShowAddAlert] = useState(false);
    const isFGet = useRef(true);
    const [limit, setLimit] = useState(5);
    const page = useRef(1);

    function handleScroll() {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        )
            return;

        if (!isNotMorePost.current) {
            page.current = page.current + 1;
            fetchPosts(limit, page.current);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isFGet.current && !isNotMorePost.current) {
            fetchPosts(limit, page.current);
            page.current = page.current + 1;
        }

        isFGet.current = false;
    }, [isNotMorePost.current]);

    return (
        <AuthLayout>
            <div className="text-white">
                {!isLoading && posts.length == 0 ? (
                    <center className="p-2 my-2">
                        <p>No posts</p>
                    </center>
                ) : (
                    posts.map((res) => (
                        <Post key={generateRandomId(10)} {...res} />
                    ))
                )}

                {(!isNotMorePost && loading) || (isLoading && <LoadingPost />)}
            </div>

            {showAddAlert && (
                <AddPost onClose={() => setShowAddAlert(!showAddAlert)} />
            )}

            <FlotAddButton onClick={() => setShowAddAlert(!showAddAlert)} />
        </AuthLayout>
    );
}

export default HomeScreen;
