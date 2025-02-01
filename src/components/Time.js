import { Box } from "@mui/system";
import { useState,useEffect } from "react";

/**
 * The `Time` component displays the current time and updates it every second.
 * It uses the `setInterval` method to update the time every second and displays
 * it in a formatted `HH:MM:SS` format.
 *
 * The component uses `useState` to manage the current time and `useEffect` to set
 * up and clean up the interval for updating the time every second.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered JSX displaying the current time in `HH:MM:SS` format.
 */
const Time = () => {
  const [time, setTime] = useState(new Date());
/**
 * This `useEffect` sets up an interval to update the `time` state every second.
 * It clears the interval when the component is unmounted or the effect is no longer needed.
 */
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date()); 
    }, 1000);
    return () => clearInterval(interval); // Clean up the interval
  }, []);
  
/**
 * This function formats a `Date` object into a string in the format `HH:MM:SS`.
 * It ensures that hours, minutes, and seconds are always two digits, even for single-digit values.
 *
 * @param {Date} date - The `Date` object to format.
 * @returns {string} The formatted time string in `HH:MM:SS` format.
 */
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