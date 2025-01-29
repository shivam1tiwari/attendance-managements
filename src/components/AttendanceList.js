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
import { Button } from '@mui/material';
import { useState,memo,useEffect } from 'react';

const AttendanceList = ({subject, students}) => {
  const [checked, setChecked] = useState([]);

  useEffect(()=>{
   
  },[])
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSubmit = () => {
    const attend = JSON.parse(localStorage.getItem('attendance'));
    let now = new Date();
    let currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
    let currentTime = new Date().toLocaleTimeString();
    console.log(currentTime,"tiem",currentDate) ;
    const studentArr = [...students];
    console.log(studentArr,"before")
    students.map((val, i)=>checked.map((isPre)=>{
      const arr = []
      if(val.rollNumber == isPre){
        const obj1 = {...val,["present"]:true}
        console.log(obj1)
        studentArr.splice(i, 1, obj1);
      }
    }));
    console.log("===========")
    let obj2 = {
      ...attend[currentDate]
    }
    console.log( obj2,"===========")
    switch (subject) {
      case "maths":
        obj2 = {...obj2, ["maths"]:{time:`${currentTime}`,
        student:[...studentArr]}};
        console.log(subject,"maths")
        break;
        case "science":
          obj2 = {...obj2, ["science"]:{time:`${currentTime}`,
          student:[...studentArr]}};
          console.log(subject,"science")
          break;  
        case "hindi":
          obj2 = {...obj2, ["hindi"]:{time:`${currentTime}`,
          student:[...studentArr]}};
          console.log(subject,"hindi")
            break; 
      default:
        obj2 = {...obj2};
        break;
    }
    const obj = { [currentDate]:{...obj2}}
    console.log(obj);
    localStorage.setItem("attendance",JSON.stringify({...attend,...obj}));
    setChecked([]);
   }

  return (
    <List dense sx={{ width: '100%', maxWidth: "60%",margin:"8rem auto", bgcolor: 'background.paper' }}>
      <ListItem sx={{display:"flex",justifyContent:"space-between",backgroundColor:"#1977D3"}} >
       <Typography variant='h6' color='white' >Student Name</Typography>
       <Typography variant='h6' color='white'>Roll Number</Typography>
       <Typography variant='h6' color='white'>Attendance</Typography>
      
      </ListItem>
      
      {students.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.rollNumber}`;
        return (
          <ListItem
            key={value.rollNumber}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value.rollNumber)}
                checked={checked.includes(value.rollNumber)}
                inputProps={{ 'aria-labelledby': labelId }}
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
      <Box sx={{display:"flex",justifyContent:"flex-end",marginTop:"1rem"}} >
      <Button onClick = {()=>{handleSubmit()}} variant="contained">Submit</Button>
      </Box>
    </List>
  )
}

export default AttendanceList;