import { Box } from "@mui/system";
import { useState,useEffect } from "react";

// Time component
const Time = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date()); 
    }, 1000);
    return () => clearInterval(interval); // Clean up the interval
  }, []);
  
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return(
    <Box>Time: {formatTime(time)}</Box>
  )
}

export default Time;