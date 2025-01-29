import React, { useState, useEffect } from 'react';
import { Box} from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const Post = () => {
  const [model, setModel] = useState({
    title:"",
    author:"",
    model:"",
    imageData:""
  });

  const location = useNavigate()

  const handleModelChange = (event) => {
    setModel({
      ...model,
      model:event
    });
  };

  const handleContent = (e) => {
    const {name, value} = e.target;
    setModel(
      {
        ...model,
        [name]:value
      }
    )
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setModel({
          ...model,
           ["imageData"]:base64String
        })
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const blog = JSON.parse(localStorage.getItem("blog"))
    const now = new Date()
    const date = `${now.getFullYear().toString().padStart(2)}-${(now.getDate()).toString().padStart(2,0) }-${(now.getMonth() +1).toString().padStart(2,0)}`
    console.log(date)
    const obj = {
     id:blog ? blog.length + 1 : 1, 
     date:date,
     author:model.author,
     title:model.title,
     model:model.model,
     image:model.imageData
    }
    if(blog){
      localStorage.setItem('blog',JSON.stringify([...blog,obj]))
    }
    if(!blog){
      localStorage.setItem('blog',JSON.stringify([obj]))
    }
    if(model.title && model.author && model.model && model.imageData){
      location("/blogspot")
      setModel(
        {
          title:"",
          author:"",
          model:"",
          imageData:""
        }
       ) 
    }
  
  
  }

  return (
    <Box sx={{ width: '60%', margin: '6rem auto' }}>
      <AppBar >
        <Toolbar sx={{width:"80%",margin:"0 auto"}} >
          <Typography variant='h5'>Create Blog</Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '98%' } }}
        noValidate
        onChange={(e)=>handleContent(e)}
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="filled-title"
            label="Title"
            placeholder="Enter Blog title"
            variant="filled"
            name='title'
          />
        </div>
        <div>
          <TextField
            required
            id="filled-author"
            label="Author"
            placeholder="Enter Author Name"
            variant="filled"
            name='author'
          />
        </div>
        <div style={{width:"98%",margin:"0 auto"}} >
        <FroalaEditorComponent
          tag="textarea"
          model={model.model}
          onModelChange={handleModelChange}
        />
        </div>
      </Box>

      <form style={{marginTop:"1rem",marginLeft:".5rem"}}>
        <Typography variant='body1' >POST ICON IMAGE</Typography>
        <input onChange={handleChange} type="file" accept="image/*" />
        <div >
          {model.imageData && <img src={model.imageData} alt="Uploaded" style={{ width: '100px', height: '100px' }} />}
        </div>
      </form>
      <Box sx={{textAlign:"right"}}>
      <Button onClick={()=>handleSubmit()} variant="contained">POST</Button>
      </Box>
    </Box>
  );
};

export default Post;
