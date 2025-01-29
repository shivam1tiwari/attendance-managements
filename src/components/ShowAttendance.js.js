import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState,memo,useEffect } from 'react';

const ShowAttendance = memo(({subject, date}) => {
  const [students, setStudents] = useState({time:"",students:[]});

  useEffect(()=>{
   const stu = JSON.parse(localStorage.getItem('attendance'));
   let now = new Date();
   let currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
   setStudents({time:stu[currentDate]?.[subject]?.time || " ",students:stu[currentDate]?.[subject]?.student || []})  
  },[])

  useEffect(()=>{
    const stu = JSON.parse(localStorage.getItem('attendance'));
    let now = new Date();
    let currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
    console.log(stu[date]?.[subject]?.student || [],"gajab")
    setStudents({time:stu[date??currentDate]?.[subject]?.time || " ",students:stu[date??currentDate]?.[subject]?.student || []})  
   },[subject,date])

  return (
    <List dense sx={{ width: '100%', maxWidth: "60%",margin:"8rem auto", bgcolor: 'background.paper' }}>
       <Box sx={{backgroundColor:"#1977D3",display:"flex",justifyContent:"space-between",padding:".3rem 1rem",margin:"1rem 0"}}>
       <Typography variant='h6' color='white'>Subject: {(subject.substring(0,1).toUpperCase()+ subject.substring(1))??"Maths"}</Typography>
       <Typography variant='h6' color='white'>Date: {date??"Today"}</Typography>
       <Typography variant='h6' color='white'>Time: {students?.time}</Typography>
       </Box>
      <ListItem sx={{display:"flex",justifyContent:"space-between",backgroundColor:"#1977D3"}} >
       <Typography variant='h6' color='white' >Student Name</Typography>
       <Typography variant='h6' color='white'>Roll Number</Typography>
       <Typography variant='h6' color='white'>Attendance</Typography>
      </ListItem>
      {(students.students.length == 0) ?<><h1>No Records Found!</h1></> : students.students.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.rollNumber}`;
        return (
          <ListItem
            key={value.rollNumber}
            secondaryAction={
              <Checkbox
                edge="end"
                checked={value.present}
                inputProps={{ 'aria-labelledby': labelId }}
                disabled={true}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>{value.name.substring(0,1)}</Avatar>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name}`} /> 
              <Box sx={{marginRight:"21rem"}} >
              <ListItemText id={labelId} primary={value.rollNumber} />
              </Box>
            </ListItemButton> 
          </ListItem> 
        );
      })}
    </List>
  )
})

export default ShowAttendance;