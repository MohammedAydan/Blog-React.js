import React, { useEffect, useState } from "react";
import { MediaPostsPath } from "../../MyMethods/MyMethods";
import OpenImage from "../OpenImage";
import { IoMdCloudDownload } from "react-icons/io";
import axiosClient from "../../axios/axios";
import IFCondition from "../IFCondition";
import Post from "./Post";
import Loading from "../Loading";
import LoadingPost from "./LoadingPost";
function MediaPost({ post }) {
  const [showImg, setShowImg] = useState(null);

  // const handleGetPost = async () => {
  //   setLoadingSharingPost(true);
  //   try {
  //     const res = await axiosClient.get(`posts/${post.sharing_post_id}`);
  //     if (res.status == 200) {
  //       setSharingPost(res.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoadingSharingPost(false);
  //   }
  // };

  // useEffect(() => {
  //   if (post.sharing_post_id) {
  //     handleGetPost();
  //   }
  // }, [post]);

  return (
    <div>
      {post.media_type && post.media_type.startsWith("image") && (
        <div className="al-photos w-full overflow-auto flex flex-row p-2">
          <>
            <img
              loading="lazy"
              onClick={() => setShowImg(post.media_url)}
              src={MediaPostsPath + post.media_url}
              alt={post.media_url}
              className="mt-2 w-full rounded-xl shadow-lg cursor-pointer"
            />
          </>
        </div>
      )}
      {post.media_type && post.media_type.startsWith("video") && (
        <div className="al-photos w-full overflow-auto flex flex-row p-2">
          <>
            <video
              src={MediaPostsPath + post.media_url}
              controls
              className="mt-2 w-full rounded-xl shadow-lg cursor-pointer"
            ></video>
          </>
        </div>
      )}
      {post.media_type && post.media_type.startsWith("audio") && (
        <div className="al-photos w-full overflow-auto flex flex-row p-2">
          <>
            <audio
              src={MediaPostsPath + post.media_url}
              controls
              className="mt-2 w-full rounded-xl shadow-lg cursor-pointer"
            ></audio>
          </>
        </div>
      )}

      {post.media_type && post.media_type.startsWith("application") && (
        <div className="al-photos w-full overflow-auto flex flex-row p-2">
          <>
            <a
              href={MediaPostsPath + post.media_url}
              download={true}
              target="_blank"
              className="mt-2 w-full rounded-lg shadow-lg cursor-pointer border border-slate-700 py-2 px-3 bg-slate-800 hover:bg-slate-950"
            >
              <div className="flex items-center justify-between">
                <p>{post.media_url}</p>
                <IoMdCloudDownload className="" />
              </div>
            </a>
          </>
        </div>
      )}

      <IFCondition condition={post.sharing != null}>
        <Post post={post.sharing} borderFull />
      </IFCondition>

      {showImg && (
        <OpenImage imgUrl={showImg} onClose={() => setShowImg(null)} />
      )}
    </div>
  );
}

export default MediaPost;
