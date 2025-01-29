import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AttendanceList from './AttendanceList';
import ShowAttendance from './ShowAttendance.js';

const AttendanceSummary = ({subject}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(null)
  const color = "white";
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(()=>{
   const attendance = JSON.parse(localStorage.getItem('attendance'))  
   console.log(attendance);
  },[selectedDate])

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

