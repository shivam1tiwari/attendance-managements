import  {React, useEffect, useState} from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box,Button, Typography, AppBar, Toolbar } from '@mui/material';
import quizData from '../constant/quize';
import { positions } from '@mui/system';

const AnswerSummary = ({ value, answer}) => {
  const [result, setResult] = useState();
  useEffect(()=>{
    let correct = 0;
    quizData?.[value?.subject]?.map((question, i)=>{
      console.log(question.correctAnswer, answer?.[question.id] || "","0ppppppppp")
      if(question.correctAnswer == answer?.[question.id] || ""){
        correct++; 
        

      }
    })
  console.log(correct,"jjjjj")
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
 console.log(result)
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
      {/* <Button onClick={()=>handleSubmit()} variant="contained">Submit</Button> */}
    </Box>
    </>
  );
};

export default AnswerSummary;
