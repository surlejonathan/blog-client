import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { posts } from "./Home";

const PostDetails = () => {
  const {
    state: { post },
  } = useLocation();

  return (
    <div className='post-details'>
      <div className='details'>
        <div className='image'>
          <img src={post.img} alt='' />
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
            <Link to={`/write?id=${post.id}`}>
              <FaRegEdit size={18} color='green' />
            </Link>
            <FaTrashAlt className='delete' size={18} color='tomato' />
          </div>
        </div>
        <div className='post-content'>
          <h1>{post.title}</h1>
          <p>
            [<b>Updated</b>]
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            fuga totam accusantium! Pariatur at, voluptatibus reprehenderit
            atque ad quam dolor possimus odio, hic cumque officia fugiat
            quisquam vel? Minus, hic.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            fuga totam accusantium! Pariatur at, voluptatibus reprehenderit
            atque ad quam dolor possimus odio, hic cumque officia fugiat
            quisquam vel? Minus, hic.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            fuga totam accusantium! Pariatur at, voluptatibus reprehenderit
            atque ad quam dolor possimus odio, hic cumque officia fugiat
            quisquam vel? Minus, hic.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            fuga totam accusantium! Pariatur at, voluptatibus reprehenderit
            atque ad quam dolor possimus odio, hic cumque officia fugiat
            quisquam vel? Minus, hic.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            fuga totam accusantium! Pariatur at, voluptatibus reprehenderit
            atque ad quam dolor possimus odio, hic cumque officia fugiat
            quisquam vel? Minus, hic.
          </p>
        </div>
      </div>
      <div className='suggestions'>
        <h1>Other posts you may like</h1>
        {posts
          .filter(({ id }) => id !== post.id)
          .map((post) => {
            return (
              <div className='post' key={post.id}>
                <div className='image'>
                  <img src={post.img} alt='' />
                </div>
                <div className='content'>
                  <h2>{post.title}</h2>
                  <Link to={`/post/${post.id}`} state={{ post }}>
                    <button>Read more</button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PostDetails;
