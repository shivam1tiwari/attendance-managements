import * as React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box,Button } from '@mui/material';
import quizData from '../constant/quize';
import AnswerSummary from './AnswerSummary';

const Questions = ({ subject, rollNumber,state }) => {
  const [answer, setAnswer] = React.useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
  });

  const handleSubmit = () => {

    const ans = JSON.parse(localStorage.getItem('answer'));
    console.log(ans,"shivam")
    if(!ans){ 
      localStorage.setItem("answer",JSON.stringify({
        [rollNumber]:{
          maths:{},
          hindi:{},
          science:{},
          [subject]:answer
        }
      }))
    }

    if(ans){
      if(ans[rollNumber]){
        localStorage.setItem("answer",JSON.stringify({...{...ans,
                [rollNumber]:{
                  ...ans[rollNumber],
                  [subject]:answer
                }
              }}))
    }
    if(!(ans[rollNumber])){
      localStorage.setItem("answer",JSON.stringify({...ans,
              [rollNumber]:{
                maths:{},
                sceince:{},
                hindi:{},
                [subject]:{...answer}
              }
            })) 

  }
  }
    setAnswer({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
      10: "",
    })
    state();
  }

  const handleChange = (e, questionNumber) => {
    console.log(e.target.value, questionNumber)
    setAnswer((prevState) => ({
      ...prevState,
      [questionNumber]: e.target.value,
    }));
  };
 console.log(answer)
  return (
    <Box sx={{ width: "50%", margin: "6rem auto" }}>
      {quizData[subject]?.map((question) => (
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
            value={answer[question.id]}
            onChange={(e) => handleChange(e, question.id)}
          >
            {question.options.map((option, index) => (
              <FormControlLabel
                key={`option-${question.id}-${index}`}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
        
      ))}
      <Button onClick={()=>{handleSubmit()}} variant="contained">Submit</Button>
      
    </Box>
  );
};

export default Questions;
