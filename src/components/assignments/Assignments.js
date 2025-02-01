
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import "../Attendance.css"
import { useState, useEffect } from 'react';
import AnswerSummary from './AnswerSummary';
import Time from '../Time';
import students from '../constant/students';
import Questions from './Questions';

const useStyles = makeStyles({
  subject: {
   display:"flex" 
  },
  loader:{
    marginTop:"10rem"
  }
});
/**
 * `Assignments` is a component that allows a user to select a subject and student roll number 
 * to display quiz questions and their corresponding answer summary.
 * 
 * It tracks the current state of the subject selection and the student’s roll number.
 * The component also includes a time display and allows for updating the answers using the `Questions` component.
 * The selected answers are retrieved from `localStorage`, and the `AnswerSummary` component shows the student's selected answers.
 * 
 * @returns {JSX.Element} The rendered JSX for the assignment interface.
 */
const Assignments = () => {
  const classes = useStyles();
  const [state, setState] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState({
    subject:"maths",
    rollNumber:101,
    name:"Rakesh"
  });

  const [answ, setAnswer] = useState();

  useEffect(()=>{
    const answer = JSON.parse(localStorage.getItem('answer'))
    setAnswer(answer?.[selectedSubject.rollNumber]?.[selectedSubject?.subject]);
  },[selectedSubject,state])
/**
 * Handles changes to the selected subject and roll number.
 * Updates the state with the selected subject and roll number.
 * 
 * @param {Object} e - The event object from the select dropdown.
 * @returns {void}
 */
  const handleSubjectDetails = (e) => {
    const {name, value} = e.target;
    const stuName = students.filter((val)=>val.rollNumber == value)[0]?.name
    setSelectedSubject((prev)=>{
      return   ({
        ...prev,[name]:value,name:stuName??prev.name
      })
  })
  }

  const handleState = () =>{
    setState(!state)
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
      </Box>
      <Box className={classes.subject} >
      <Box> 
      <Typography variant={"h5"} sx={{marginRight:"2rem"}} >Roll Number</Typography> 
      </Box>  
      <Box sx={{ minWidth: 12,marginRight:"1rem" }}>
      <FormControl sx={{color:"white",borderBottom:"1px solid white"}} fullWidth>
        <NativeSelect onChange={(e)=>handleSubjectDetails(e)}
          sx={{color:"white"}}
          defaultValue={""}
          inputProps={{
            name: 'rollNumber',
            id: 'uncontrolled-native',
          }}
        > {students.map((student)=><option key={student.rollNumber} value={student.rollNumber}>{student.rollNumber}</option>)}
        </NativeSelect>
      </FormControl>
    </Box>
    <Typography variant='h6' >{selectedSubject.name}</Typography>
      </Box>  
       <Box>
        <Typography variant={"h5"} >{<Time/>}</Typography> 
       </Box>
      </Toolbar>
    </AppBar>
    <Questions subject = {selectedSubject.subject} rollNumber = {selectedSubject.rollNumber} state={handleState} />
    <Box>
    <AnswerSummary value = {selectedSubject} answer = {answ}  />
    </Box>
    </>
  )
}

export default Assignments;