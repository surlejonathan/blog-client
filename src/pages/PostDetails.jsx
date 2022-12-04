import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
//import { posts } from "./Home";

const recommendedPosts = [];

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { pathname } = useLocation();
  const postId = pathname.split("/")[2];

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
          <div className='avatar'>
            <img
              src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/02/0251cb6eaa5786c994e6cb7c340f701269ca6f1a_full.jpg'
              alt=''
            />
          </div>
          <div className='information'>
            <div className='username'>
              <p>John</p>
            </div>
            <div className='timestamp'>
              <span>Posted 2 hours ago</span>
            </div>
          </div>
          <div className='actions'>
            <Link to={`/write?id=${post?.id}`}>
              <FaRegEdit size={18} color='green' />
            </Link>
            <FaTrashAlt className='delete' size={18} color='tomato' />
          </div>
        </div>
        <div className='post-content'>
          <h1>{post?.title}</h1>
          <p>
            [<b>Updated</b>]
          </p>
          <p>{post?.description}</p>
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
