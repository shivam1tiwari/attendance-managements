import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const BlogSpot = () => {
 const [blog, setBlog] = React.useState();
  useEffect(()=>{
    const blog = JSON.parse(localStorage.getItem("blog"));
    setBlog(blog);
  },[])
  return(
    <Box sx={{ flexGrow: 1,width:"70%",margin:"7rem auto",overflow:"hidden" }}>
      <AppBar >
        <Toolbar sx={{width:"80%",margin:"0 auto"}} >
          <Typography variant='h5'> Blog </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        {
        !blog?<Typography variant='h4' >Blog Not Available</Typography>: blog?.map((item)=>
        <Grid key={item.id} size={12}>
          <Item sx={{display:"flex",gap:"2rem"}}>
            <Box>
              <img width={250} height={200} src={item.image} alt='' />
            </Box>
            <Box sx={{display:"flex",flexDirection:"column",alignContent:"space-between"}}>
              <Box sx={{width:"92%", height:"200px",wordWrap:"break-word",overflow:"hidden"}} >
              <Link to={`/blogspot/${item.id}`} ><Typography variant='h5' >{item.title}</Typography></Link>
              <Typography variant='body1' >{<FroalaEditorView model={item.model} />}</Typography>
              </Box>
              <Box sx={{display:"flex",gap:"2rem"}}>
              <Typography variant='body1' >Published: {item.date}</Typography>
              <Typography variant='body1' >Author: {item.author}</Typography> 
              </Box>
            </Box>
          </Item>
        </Grid>
         )
        }
      </Grid>
    </Box>
  )
}

export default BlogSpot