'use client';
import React, { useState, useEffect } from 'react';

const Timer = ({ reset, onResetComplete}) => {
  // Initialize state for the time in seconds
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true); // State to track if the timer is running
  const redState = " scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-rose-500"

  useEffect(() => {
    let timer;

    if (isRunning && time < 180) { // 180 seconds = 3 minutes
      // Increment the time every second
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    

    // Cleanup the interval when the component unmounts or when the timer stops
    return () => clearInterval(timer);
  }, [time, isRunning]);


  // Effect to handle external reset logic based on the `reset` prop
  useEffect(() => {
    if (reset) {
      setTime(0); // Reset time to 0 when reset prop is true
      setIsRunning(true); // Optionally restart the timer if desired
      onResetComplete(); // Notify parent that reset is complete
    }
  }, [reset, onResetComplete]);

  // Convert time to minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className='mt-6 mb-6'>
      <div>
      <h1 className= {time === 180 ? redState : "  scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-sky-800"}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
      </div>
    </div>
  );
};

export default Timer;
