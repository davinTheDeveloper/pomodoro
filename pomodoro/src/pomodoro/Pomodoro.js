import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import FocusSection from "./FocusSection";
import IncrementButtons from "./IncrementButtons";
import PlayStopButtons from "./PlayStopButtons";

function Pomodoro() {
  // Initial values of focus duration, break duration, timerRunning & session countdown
  const initialStates = {
    focusDuration: 25,
    breakDuration: 5,
    isTimerRunning: false,
    sessionCountdown: 0,
    focusSessionActive: false,
    sessionActive: false,
    ariaValue: 0,
  };
  // Initialize state for focus bar
  const [ariaValue, setAriaValue] = useState(initialStates.ariaValue);

  // Initialize timer state and set to zero so timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(
    initialStates.isTimerRunning
  );

  // Initialize focus state and set default to 25 minutes
  const [focusDuration, setFocusDuration] = useState(
    initialStates.focusDuration
  );

  // Initialize break state and set default to 5 minutes
  const [breakDuration, setBreakDuration] = useState(
    initialStates.breakDuration
  );

  // Initialize state to update session timer
  const [sessionCountdown, setSessionCountdown] = useState(
    initialStates.sessionCountdown
  );

  // Initialize state to track when focus and break sessions are active
  const [focusSessionActive, setFocusSessionActive] = useState(
    initialStates.focusSessionActive
  );

  //Initialize state for when session it active
  const [sessionActive, setSessionActive] = useState(
    
    initialStates.sessionActive
  );

  // Handle increment button clicks
  const handleIncrementClick = ({ target }) => {
    /*
    ISSUE: The icons on the buttons and the buttons themselves return different values,
    so I only place handle event on buttons themselves.
    */

    // Handling decrease and increase buttons for focus duration and break duration when not in session
    if (!focusSessionActive && sessionCountdown === 0) {
      switch (target["name"]) {
        case "decrease-focus":
          setFocusDuration((currentFocusDuration) =>
            Math.max(5, currentFocusDuration - 5)
          );
          break;
        case "increase-focus":
          setFocusDuration((currentFocusDuration) =>
            Math.min(60, currentFocusDuration + 5)
          );
          break;
        case "decrease-break":
          setBreakDuration((currentBreakDuration) =>
            Math.max(1, currentBreakDuration - 1)
          );
          break;
        case "increase-break":
          setBreakDuration((currentBreakDuration) =>
            Math.min(15, currentBreakDuration + 1)
          );
          break;
        default:
          break;
      }
    }
  };

  useInterval(
    () => {
      // Completed: Implement what should happen when the timer is running

      // Functionality for the progress bar
      if (focusSessionActive) {
        setAriaValue((sessionCountdown / (focusDuration * 60)) * 100);
      } else if (!focusSessionActive & (sessionCountdown !== 0)) {
        setAriaValue((sessionCountdown / (breakDuration * 60)) * 100);
      }

      /*
      If session is active and countdown equals focus duration, set focus session to false and start counting break duration.
      Is focus session is false and countdown equals break duration, set focus session to true and count to focus duration.
      Else, increment countdown by one each second.
      */
      setSessionCountdown((currentSessionCountdown) => {
        if (
          focusSessionActive &&
          currentSessionCountdown === focusDuration * 60
        ) {
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
          setFocusSessionActive(!focusSessionActive); console.log("Play");
          return (currentSessionCountdown = 0);
        } else if (
          !focusSessionActive &&
          currentSessionCountdown === breakDuration * 60
        ) {
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();console.log("Play");
          setFocusSessionActive(!focusSessionActive);
          return (currentSessionCountdown = 0);
        } else {
          return (currentSessionCountdown += 1);
        }
      });
    },
    isTimerRunning ? 1000 : null
  );

  // This function stops and starts the timer
  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  // Handle what happens when the play/pause button is clicked
  const handlePlayPause = ({ target }) => {
    // Set session to active when play is clicked
    if (!sessionActive) setSessionActive(true);

    // If the timer is not running and the current focus session is not active, start timer and focus session
    if (!focusSessionActive && sessionCountdown === 0) {
      setFocusSessionActive((currentFocusSession) => {
        return !currentFocusSession;
      });
    }

    // Pause and play the timer
    playPause();
  };

  // Handle when stop button is clicked
  const handleStop = ({ target }) => {
    // Return all states to their initial when stop button is clicked
    setIsTimerRunning(initialStates.isTimerRunning);
    setFocusDuration(initialStates.focusDuration);
    setBreakDuration(initialStates.breakDuration);
    setSessionCountdown((currentSessionCountdown) => initialStates.sessionCountdown);
    setFocusSessionActive(initialStates.focusSessionActive);
    setSessionActive(initialStates.sessionActive);
  };

  return (
    <div className="pomodoro">
      <IncrementButtons
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        handleIncrementClick={handleIncrementClick}
      />
      <PlayStopButtons 
      isTimerRunning={isTimerRunning}
      handlePlayPause={handlePlayPause}
      handleStop={handleStop}
      />
      <FocusSection
      sessionActive={sessionActive}
      focusDuration={focusDuration}
      breakDuration={breakDuration}
      focusSessionActive={focusSessionActive}
      sessionCountdown={sessionCountdown}
      ariaValue={ariaValue}
      />
    </div>
  );
}

export default Pomodoro;