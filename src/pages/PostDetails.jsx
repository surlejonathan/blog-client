import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import Suggestions from "../components/Suggestions";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const postId = pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  console.log("POST", post);
  return (
    <div className='post-details'>
      <div className='details'>
        <div className='image'>
          <img
            src={
              post?.image.startsWith("https" || "http")
                ? post?.image
                : `../uploads/${post?.image}`
            }
            alt=''
          />
        </div>
        <div className='author'>
          {post?.userImage && (
            <div className='avatar'>
              <img src={post?.userImage} alt='' />
            </div>
          )}

          <div className='information'>
            <div className='username'>
              <p>{post?.username}</p>
            </div>
            <div className='timestamp'>
              <span>Posted {moment(post?.date).fromNow()}</span>
            </div>
          </div>
          {currentUser?.username === post?.username && (
            <div className='actions'>
              <Link to={`/write?edit=${post?.id}`} state={post}>
                <FaRegEdit size={18} color='green' />
              </Link>
              <FaTrashAlt
                className='delete'
                size={18}
                color='tomato'
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
        <div className='post-content'>
          <h1>{post?.title}</h1>
          {post?.updatedAt && (
            <p>
              [<b>Updated {moment(post?.updatedAt).fromNow()}</b>]
            </p>
          )}

          {getText(post?.description)}
        </div>
      </div>
      <Suggestions category={post?.category} currentPostId={post?.id} />
    </div>
  );
};

export default PostDetails;
