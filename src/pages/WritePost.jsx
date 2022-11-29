import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const WritePost = () => {
  const [value, setValue] = useState("");

  return (
    <div className='edit'>
      <div className='content'>
        <input type='text' placeholder='Title' />
        <ReactQuill
          className='text-editor'
          theme='snow'
          value={value}
          onChange={setValue}
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
            <input type='file' id='upload' />
            <label htmlFor='upload'>Upload an image</label>
          </div>
          <div className='actions'>
            <button>Save as a draft</button>
            <button>Update</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='category'>
            <input type='radio' name='category' value='design' id='design' />
            <label htmlFor='design'>Design</label>
          </div>
          <div className='category'>
            <input type='radio' name='category' value='tech' id='tech' />
            <label htmlFor='tech'>Tech</label>
          </div>
          <div className='category'>
            <input type='radio' name='category' value='news' id='news' />
            <label htmlFor='news'>News</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
