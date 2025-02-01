import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ShowAttendance from './ShowAttendance.js';
/**
 * The `AttendanceSummary` component displays a summary of attendance for a given subject.
 * It allows the user to select a date via a date picker, and it fetches and displays the attendance data 
 * for that specific date from `localStorage`.
 * 
 * @param {Object} props - The properties passed to this component.
 * @param {string} props.subject - The subject for which the attendance summary is being displayed (e.g., "maths", "science", "hindi").
 * 
 * @returns {JSX.Element} The rendered JSX for the attendance summary, including the date picker and attendance display.
 */
const AttendanceSummary = ({subject}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(null)
  const color = "white";
  const currentDate = new Date().toISOString().split('T')[0];
 /**
 * Fetches and logs the attendance data from `localStorage` whenever the selected date changes.
 */
  useEffect(()=>{
   const attendance = JSON.parse(localStorage.getItem('attendance'))  
   console.log(attendance);
  },[selectedDate])
/**
   * Handles the date change in the date picker. Updates both `selectedDate` and `date` state.
   * 
   * @param {object} newDate - The new date selected in the date picker.
   */
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setDate(newDate.format('YYYY-MM-DD'))
  };
  
  return (
    <>
    <AppBar sx={{ position: "static" }}>
      <Toolbar sx={{ width: "80%", margin: "0 auto", justifyContent: "space-between",alignItems:"center" }}>
        <Box>
        <Typography variant="h5">
          SUMMARY
        </Typography>
        </Box>
        <Box sx={{marginTop:"-.5rem",padding:".5rem 0"}} >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker 
              sx={{
                  svg: { color },
                  input: { color  },
                  label: { color },
                }}
              label="Choose date"
              value={selectedDate}
              onChange={(newDate) => handleDateChange(newDate)} 
              format="YYYY-MM-DD"
            />
          </DemoContainer>
        </LocalizationProvider>
        </Box>
      </Toolbar>
    </AppBar>
    <Box>
      <ShowAttendance subject = {subject} date = {date}/>
    </Box>
    </>
  );
};

export default AttendanceSummary;

