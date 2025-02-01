
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import "./Attendance.css"
import { useState, useEffect } from 'react';
import AttendanceSummary from './AttendanceSummary';
import AttendanceList from './AttendanceList';
import Time from './Time';
import students from './constant/students';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  subject: {
   display:"flex" 
  },
  loader:{
    marginTop:"10rem"
  }
});

/**
 * The `Attendance` component manages the attendance for various subjects,
 * displays attendance details, and allows users to navigate to other pages like assignments and blogs.
 * It retrieves and updates attendance data stored in `localStorage` and provides a subject selector.
 * 
 * @returns {JSX.Element} The rendered JSX for the Attendance page.
 */
const Attendance = () => {
  const classes = useStyles();
  const [selectedSubject, setSelectedSubject] = useState("maths");
 /**
   * `useEffect` hook to initialize and update attendance data in `localStorage`
   * on component mount.
   * - Checks if attendance data exists in `localStorage`.
   * - If data exists, ensures the current date's attendance is initialized.
   * - If no attendance data exists, creates a new structure with subjects (hindi, maths, science).
   * 
   * @effect
   */
  useEffect(()=>{
    const attend = localStorage.getItem('attendance');
    if(attend){
      let now = new Date();
      let currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
      if(!(JSON.parse(attend)[currentDate])){
      const attendanceObj = JSON.parse(attend)  
      localStorage.setItem("attendance",JSON.stringify({...attendanceObj,...{
        [currentDate]:{
          hindi:{time:"",
            student:[]
          },
          maths:{
            time:"",
            student:[]
          },
          science:{
            time:"",
            student:[]
          }
        }
      }}))}
    }
    if(!attend){
      let now = new Date();
      let currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
      localStorage.setItem("attendance",JSON.stringify({
        [currentDate]:{
          hindi:{time:"",
            student:[]
          },
          maths:{
            time:"",
            student:[]
          },
          science:{
            time:"",
            student:[]
          }
        }
      })) 
    }
  },[])
  //  It set subject name
  const handleSubjectDetails = (e) => {
    setSelectedSubject(e.target.value)
  }
  
  return (
    <>
    <AppBar>
      <Toolbar sx={{width:"80%",margin:"0 auto",justifyContent:"space-between"}}>
      <Box className={classes.subject} >
      <Box> 
      <Typography variant={"h5"} sx={{marginRight:"2rem"}} >Subject</Typography> 
      </Box>  
      <Box sx={{ minWidth: 12,marginRight:"1rem" }}>
      <FormControl sx={{color:"white",borderBottom:"1px solid white"}} fullWidth>
        <NativeSelect onChange={(e)=>handleSubjectDetails(e)}
          sx={{color:"white"}}
          defaultValue={"Maths"}
          inputProps={{
            name: 'subject',
            id: 'uncontrolled-native',
          }}
        >
          <option value={"maths"}>Maths</option>
          <option value={"hindi"}>Hindi</option>
          <option value={"science"}>Science</option>
        </NativeSelect>
      </FormControl>
    </Box>
   <Link style={{color:"white",textDecoration:"none",marginRight:"1rem"}} to={"/assignments"} > <Typography>Take Assignments</Typography></Link>
   <Link style={{color:"white",textDecoration:"none",marginRight:"1rem"}} to={"/post"} > <Typography>Create Blog</Typography></Link>
   <Link style={{color:"white",textDecoration:"none"}} to={"/blogspot"} > <Typography>Blog</Typography></Link>
      </Box> 
       <Box>
        <Typography variant={"h5"} >{<Time/>}</Typography> 
       </Box>
      </Toolbar>
    </AppBar>
    <AttendanceList subject={selectedSubject} students={students} />
    <Box>
    <AttendanceSummary subject = {selectedSubject}  />
    </Box>
    </>
  )
}

export default Attendance;