import React, { useState, useEffect } from "react";
import TextInput from "../../components/TextInput";
import AdminLayout from "../../layouts/AdminLayout";
import axiosClient from "../../axios/axios";
import IFCondition from "../../components/IFCondition";
import Loading from "../../components/Loading";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import Post from "../../components/Post/Post";
import DangerButton from "../../components/Buttons/DangerButton-1";

function ShowPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(0);

  const handleGetPosts = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`admin/posts/list/${limit}/${page}`);
      if (res.status == 200) {
        setPosts(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByName = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`admin/posts/search/${search}`);
      if (res.status == 200) {
        setPosts(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchById = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`admin/posts/byId/${search}`);
      if (res.status == 200) {
        console.log(res.data);
        setPosts(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByUserId = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`admin/posts/byUserId/${search}`);
      if (res.status == 200) {
        setPosts(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      if (searchBy == 0) {
        handleSearchByName();
        return;
      }

      if (searchBy == 1) {
        handleSearchById();
        return;
      }

      if (searchBy == 2) {
        handleSearchByUserId();
        return;
      }
    } else {
      handleGetPosts();
    }
  }, [page, search, searchBy]);

  const getMoreRequests = () => {
    setPage((p) => p + 1);
  };

  const getPrevRequests = () => {
    setPage((p) => p - 1);
  };

  const handleDeletePost = async () => {};

  return (
    <AdminLayout>
      <div className="text-white">
        <div className="w-full p-3 bg-slate-800 sticky top-16 z-10">
          <div className="max-w-xl mx-auto flex">
            <TextInput
              placeholder={"search posts"}
              className={"mr-1"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              onChange={(e) => {
                if (e.target.value == "name") {
                  setSearchBy(0);
                  return;
                }

                if (e.target.value == "id") {
                  setSearchBy(1);
                  return;
                }

                if (e.target.value == "userId") {
                  setSearchBy(2);
                  return;
                }
              }}
              className="bg-slate-800 border border-slate-700 p-2 rounded-lg ml-1"
            >
              <option value="name">By name</option>
              <option value="id">By id</option>
              <option value="userId">By user id</option>
            </select>
          </div>
        </div>
        <div className="max-w-xl mx-auto p-3">
          <IFCondition condition={loading}>
            <center className="p-2 w-">
              <Loading />
            </center>
          </IFCondition>
          <IFCondition condition={!loading && posts.length == 0}>
            <center className="p-2 w-">
              <p>Not found</p>
            </center>
          </IFCondition>
          <IFCondition condition={!loading}>
            {posts.map((post) => {
              return (
                <div
                  key={post.id}
                  className="border border-slate-800 rounded-2xl shadow-2xl my-2"
                >
                  <div className="flex items-center justify-between px-4 pt-4">
                    <p>ID: {post.id}</p>
                    <DangerButton className={"max-w-fit"}>DELETE</DangerButton>
                  </div>
                  <Post post={post} />
                </div>
              );
            })}
          </IFCondition>
        </div>
        <div className="flex max-w-fit mx-auto">
          <IFCondition condition={page > 1}>
            <OutlinedButton onClick={getPrevRequests}>Prev</OutlinedButton>
          </IFCondition>
          <IFCondition condition={posts.length > 0}>
            <OutlinedButton onClick={getMoreRequests}>Next</OutlinedButton>
          </IFCondition>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ShowPosts;
