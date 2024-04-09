import React, { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Loading from "../Loading";
import axiosClient from "../../axios/axios";
import { useAuth } from "../../contexts/AuthContext";
import { useHomeContext } from "../../contexts/HomeContext";
import TextInput from "../TextInput";
import DangerButton from "../Buttons/DangerButton-1";
import UserAvater from "../UserAvater";
import { Link } from "react-router-dom";

function CommentsSection({
  post,
  comments,
  isLoadingComments,
  setComments,
  setPost,
}) {
  const { user } = useAuth();
  const { setPosts } = useHomeContext();
  const [comment, setComment] = useState({
    post_id: post.id,
    comment: "",
  });

  const handleAddComment = async () => {
    try {
      const resComments = await axiosClient.post("/comments", comment);
      if (resComments.status === 200) {
        setComments((prevComments) => [...prevComments, resComments.data]);
        setComment({ post_id: post.id, comment: "" });

        setPosts((prevPost) =>
          prevPost.map((p) => {
            if (p.id == post.id) {
              p.comments_count = p.comments_count + 1;
              return p;
            }
            return p;
          })
        );
        setPost({
          ...post,
          comments_count: post.comments_count + 1,
        });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDestroyComment = async (commentId) => {
    try {
      await axiosClient.delete(`/comments/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((c) => c.id !== commentId)
      );
      setPosts((prevPost) =>
        prevPost.map((p) => {
          if (p.id == post.id) {
            p.comments_count = p.comments_count - 1;
            return p;
          }
          return p;
        })
      );
      setPost({
        ...post,
        comments_count: post.comments_count - 1,
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <div className="max-w-xl p-4 bg-slate-900 border-b border-slate-800  m-4 mx-auto text-white font-bold sticky top-0">
        <p>Comments</p>
      </div>
      <div className="comments max-w-xl mx-auto pb-32 p-2">
        {isLoadingComments ? (
          <center>
            <Loading />
          </center>
        ) : comments.length > 0 ? (
          comments
            .sort((a, b) => b.id - a.id)
            .map((comment) => {
              return (
                <div
                  key={comment.id}
                  className="comment max-w-max bg-slate-700 p-3 rounded-lg mb-2"
                >
                  <div className="header flex items-center justify-between">
                    <Link to={`/profile/${comment.user.id}`}>
                      <div className="user flex flex-row items-center">
                        <UserAvater
                          imgUrl={comment.user.img_url}
                          user={comment.user}
                        />
                        <p>{comment.user.name}</p>
                      </div>
                    </Link>
                    <div className="ml-3">
                      {user.id == comment.owner_id && (
                        <DangerButton
                          onClick={() => handleDestroyComment(comment.id)}
                        >
                          Delete
                        </DangerButton>
                      )}
                    </div>
                  </div>
                  <div className="body">{comment.comment}</div>
                </div>
              );
            })
        ) : (
          <div className="flex items-center justify-center">
            <p>No comments</p>
          </div>
        )}
      </div>
      <div className="add-comment flex max-w-xl mx-auto p-4 rounded-2xl border border-slate-700 bg-slate-900 shadow-xl fixed bottom-3 left-3 right-3">
        <TextInput
          disabled={isLoadingComments}
          name={"comment"}
          placeholder={"Enter comment"}
          value={comment.comment}
          onChange={(e) =>
            setComment({
              ...comment,
              comment: e.target.value,
            })
          }
        />
        {comment.comment.length > 0 && (
          <PrimaryButton
            onClick={handleAddComment}
            className={"max-w-max ml-3"}
          >
            Add
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
