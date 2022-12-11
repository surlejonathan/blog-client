import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Suggestions = ({ category, currentPostId }) => {
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/posts?category=${category}`
        );
        setRecommendedPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [category]);

  return (
    <div className='suggestions'>
      <h1>Other posts you may like</h1>
      <div className='posts'>
        {recommendedPosts
          ?.filter(({ id }) => id !== currentPostId)
          ?.map((post) => {
            return (
              <div className='post' key={post?.id}>
                <div className='image'>
                  <img
                    src={
                      post?.image?.startsWith("https")
                        ? post?.image
                        : `../uploads/${post?.image}`
                    }
                    alt=''
                  />
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
  );
};

export default Suggestions;
