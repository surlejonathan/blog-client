import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import Suggestions from "../components/Suggestions";
import { getText } from "../utils/htmlParser";
import { ModalContext } from "../context/modalContext";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const postId = pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  const { toggle, setModal, setIsOpen } = useContext(ModalContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/posts/${postId}`
        );
        setPost(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`);
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const openModal = () => {
    toggle();
    setModal({
      title: "Delete post",
      content: "Do you really want to delete this post ?",
      actionLabel: "Delete",
      action: () => {
        handleDelete();
      },
    });
  };

  return (
    <div className='post-details'>
      <div className='details'>
        <div className='image'>
          <img
            src={
              post?.image && post?.image?.startsWith("https")
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
                onClick={openModal}
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
