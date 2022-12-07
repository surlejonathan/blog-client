import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const WritePost = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [category, setCategory] = useState(state?.category || null);

  const upload = async () => {
    try {
      if (uploadedImage) {
        const formData = new FormData();
        formData.append("uploadedImage", uploadedImage);
        const res = await axios.post("/upload", formData);
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = await upload();

    try {
      if (title && value) {
        state
          ? await axios.put(`/posts/${state.id}`, {
              title,
              description: value,
              image: state.image ? state.image : image,
              category,
            })
          : await axios.post("/posts", {
              title,
              description: value,
              image,
              category,
            });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='edit'>
      <div className='content'>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <ReactQuill
          className='text-editor'
          theme='snow'
          value={value}
          onChange={setValue}
          required
        />
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <div className='status'>
            <b>Status : </b> <span>Draft</span>
          </div>
          <div className='visibility'>
            <b>Visibility : </b> <span>Public</span>
          </div>
          <div className='image-upload'>
            {uploadedImage && (
              <div className='preview'>
                <img src={URL.createObjectURL(uploadedImage)} />
              </div>
            )}
            <input
              type='file'
              id='upload'
              onChange={(e) => setUploadedImage(e.target.files[0])}
            />
            <label htmlFor='upload'>Upload an image</label>
          </div>
          <div className='actions'>
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>
              {state ? "Update" : "Publish"}
            </button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='category'>
            <input
              type='radio'
              name='category'
              value='design'
              id='design'
              checked={category === "design"}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor='design'>Design</label>
          </div>
          <div className='category'>
            <input
              type='radio'
              name='category'
              value='tech'
              id='tech'
              checked={category === "tech"}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor='tech'>Tech</label>
          </div>
          <div className='category'>
            <input
              type='radio'
              name='category'
              value='news'
              id='news'
              checked={category === "news"}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor='news'>News</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
