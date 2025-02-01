import * as React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Button,
} from "@mui/material";
import quizData from "../constant/quize";
import AnswerSummary from "./AnswerSummary";
/**
 * The `Questions` component renders a series of multiple-choice questions for a quiz.
 * It tracks and updates the selected answers for each question and allows the user to submit their answers.
 *
 * When the user clicks the "Submit" button, the answers are saved to `localStorage` under the respective student's roll number
 * and subject, ensuring persistence of the data.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.subject - The subject of the quiz (e.g., 'maths', 'science', 'hindi').
 * @param {string} props.rollNumber - The roll number of the student taking the quiz.
 * @param {function} props.state - A callback function to update the parent component's state when the quiz is submitted.
 *
 * @returns {JSX.Element} The rendered JSX for the quiz questions and submission button.
 */
const Questions = ({ subject, rollNumber, state }) => {
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

  /**
   * Handles the submission of the quiz. It stores the student's answers in `localStorage` under their roll number and subject.
   * If the student does not already have answers saved in `localStorage`, it initializes the answer object.
   *
   * @returns {void}
   */
  const handleSubmit = () => {
    const ans = JSON.parse(localStorage.getItem("answer"));
    if (!ans) {
      localStorage.setItem(
        "answer",
        JSON.stringify({
          [rollNumber]: {
            maths: {},
            hindi: {},
            science: {},
            [subject]: answer,
          },
        })
      );
    }

    if (ans) {
      if (ans[rollNumber]) {
        localStorage.setItem(
          "answer",
          JSON.stringify({
            ...{
              ...ans,
              [rollNumber]: {
                ...ans[rollNumber],
                [subject]: answer,
              },
            },
          })
        );
      }
      if (!ans[rollNumber]) {
        localStorage.setItem(
          "answer",
          JSON.stringify({
            ...ans,
            [rollNumber]: {
              maths: {},
              sceince: {},
              hindi: {},
              [subject]: { ...answer },
            },
          })
        );
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
    });
    state();
  };
  /**
   * Handles the change in selected answer for a specific question.
   * Updates the state with the new selected answer for the given question.
   *
   * @param {Object} e - The event object from the change event.
   * @param {number} questionNumber - The ID of the question being answered.
   *
   * @returns {void}
   */
  const handleChange = (e, questionNumber) => {
    setAnswer((prevState) => ({
      ...prevState,
      [questionNumber]: e.target.value,
    }));
  };

  return (
    <Box sx={{ width: "50%", margin: "6rem auto" }}>
      {quizData[subject]?.map((question) => (
        <FormControl
          key={`question-${question.id}`}
          sx={{ width: "100%", margin: ".5rem auto" }}
        >
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
      <Button
        onClick={() => {
          handleSubmit();
        }}
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  );
};

export default Questions;
