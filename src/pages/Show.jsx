import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post/Post";
import axiosClient from "../axios/axios";
import Loading from "../components/Loading";
import AuthLayout from "../layouts/AuthLayout";
import CommentsSection from "../components/Post/CommentsSection";
import IFCondition from "../components/IFCondition";

function Show() {
  const { id } = useParams();
  const [res, setRes] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentsC, setCommentsCount] = useState(
    res != null ? res.comments_count : 0
  );

  useEffect(() => {
    const getPost = async () => {
      setIsLoadingPost(true);
      try {
        const res = await axiosClient.get(`/posts/${id}`);
        if (res.status === 200) {
          setRes(res.data);
          setCommentsCount(res.data.commentsCount);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoadingPost(false);
      }
    };

    getPost().then(() => getComments());
  }, [id]);

  const getComments = async () => {
    setIsLoadingComments(true);
    try {
      const resComments = await axiosClient.get(`/comments/${id}`);
      if (resComments.status === 200) {
        setComments(resComments.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-white">
        <IFCondition condition={isLoadingPost}>
          <div className="fixed w-full h-screen flex items-center justify-center">
            <Loading />
          </div>
        </IFCondition>

        <IFCondition condition={!isLoadingPost}>
          <IFCondition condition={res !== null}>
            {res != null && (
              <Post key={res.id} post={res} />
            )}
          </IFCondition>
        </IFCondition>

        <IFCondition condition={!isLoadingPost}>
          <CommentsSection
            post={res}
            comments={comments}
            isLoadingComments={isLoadingComments}
            setComments={setComments}
            setPost={setRes}
          />
        </IFCondition>
      </div>
    </AuthLayout>
  );
}

export default Show;
