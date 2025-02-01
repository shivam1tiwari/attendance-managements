import  {React, useEffect, useState} from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, Typography, AppBar, Toolbar } from '@mui/material';
import quizData from '../constant/quize';
/**
 * `AnswerSummary` Component that calculates the student's grade based on their quiz answers.
 * It compares the provided answers with the correct ones and displays a summary including the grade.
 * @param {Object} props takes props 
 * @param {Object} value it has value.subject, value.rollNumber, value.name
 * @param {Object} answer set of answer key value pair
 * 
 * @return {JSX.Elemets} This return summary
 */
const AnswerSummary = ({ value, answer}) => {
  const [result, setResult] = useState();
/**
 *  It set Grade and update after changing 
 * answer and value props
 * 
 */ 

  useEffect(()=>{
    let correct = 0;
    quizData?.[value?.subject]?.map((question, i)=>{
      if(question.correctAnswer == answer?.[question.id] || ""){
        correct++; 
      }
    })
  let perc = (correct*100)/10;
  if(perc >= 33 && perc <= 50){
    setResult("E")
  }
  else if(perc >= 51  && perc <= 60){
    setResult("D")
  }
  else if(perc >= 61  && perc <= 74){
    setResult("C")
  }
  else if(perc >= 75 && perc <= 89){
    setResult("B")
  }
  else if(perc >= 90 && perc <= 100){
    setResult("A")
  }
  else{
    setResult("Fail")
  }
  },[answer,value])

  return (
    <>
    <AppBar sx={{position:"static"}} >
      <Toolbar sx={{width:"82%",margin:"0 auto"}} >
        <Typography sx={{width:"82%",margin:"0 auto"}} variant='h5'>Answer Summary</Typography>
        <Typography  variant='h5'>Grade: {result}</Typography>
      </Toolbar>
    </AppBar>
    <Box sx={{ width: "50%", margin: "6rem auto" }}>
      {!(answer && !(Object.keys(answer).length == 0)) ? <Typography variant='h4' >No Record Found!</Typography> : quizData[value?.subject]?.map((question, i) => (
        <FormControl key={`question-${question.id}`} sx={{ width: "100%", margin: ".5rem auto" }}>
          <FormLabel
            sx={{ fontSize: "1.2rem", fontWeight: "600" }}
            id="demo-controlled-radio-buttons-group"
          >
            Q.{question.id} {question.question}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name={`question-${question.id}`}
            value={answer?.[question.id] || ""}
          >
            {question.options.map((option, index) => (
              <FormControlLabel
                key={`option-${question.id}-${index}`}
                disabled
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          <Typography variant='body1' >Correct Answer: {question.correctAnswer}</Typography>
        </FormControl>
        
      ))}
    </Box>
    </>
  );
};

export default AnswerSummary;
