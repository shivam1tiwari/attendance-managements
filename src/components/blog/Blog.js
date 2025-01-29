import {useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Box } from "@mui/system";
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Blog = () => {
  const [blog, setBlog] = useState();
  const param = useParams();
  console.log(param)
  useEffect(()=>{
  const blog = JSON.parse(localStorage.getItem("blog"));
  const item = blog.filter((val)=>val.id == param.id) 
  console.log(item[0])
  setBlog(item[0])
  },[])
  return(
   <Box sx={{width:"60%",margin:"4rem auto"}} >
    <AppBar >
        <Toolbar sx={{width:"80%",margin:"0 auto"}} >
          <Typography variant='h5'>Create Blog</Typography>
        </Toolbar>
      </AppBar>
    <Box sx={{marginBottom:"1rem"}} > <Typography variant="h3">{blog?.title}</Typography></Box>
    <Box><img src={blog?.image} /></Box>
    <Box>{<FroalaEditorView model={blog?.model} />}</Box>
   </Box>
  )
}

export default Blog;