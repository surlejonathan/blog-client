import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
//import { posts } from "./Home";
import { AuthContext } from "../context/authContext";

const recommendedPosts = [];

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { pathname } = useLocation();
  const postId = pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        console.log("RES", res);
        setPost(res.data[0]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <div className='post-details'>
      <div className='details'>
        <div className='image'>
          <img src={post?.image} alt='' />
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
              <Link to={`/write?id=${post?.id}`}>
                <FaRegEdit size={18} color='green' />
              </Link>
              <FaTrashAlt className='delete' size={18} color='tomato' />
            </div>
          )}
        </div>
        <div className='post-content'>
          <h1>{post?.title}</h1>
          <p>
            [<b>Updated</b>]
          </p>
          {post?.description}
        </div>
      </div>
      <div className='suggestions'>
        <h1>Other posts you may like</h1>
        <div className='posts'>
          {recommendedPosts
            ?.filter(({ id }) => id !== post?.id)
            ?.map((post) => {
              return (
                <div className='post' key={post?.id}>
                  <div className='image'>
                    <img src={post?.image} alt='' />
                  </div>
                  <div className='content'>
                    <h2>{post?.title}</h2>
                    <Link to={`/post/${post?.id}`} state={{ post }}>
                      <button>Read more</button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
