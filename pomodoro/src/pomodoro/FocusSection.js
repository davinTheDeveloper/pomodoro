import React from "react";
import classNames from "../utils/class-names";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

export default function FocusSection({ 
    sessionActive, 
    focusDuration, 
    focusSessionActive, 
    breakDuration,
    sessionCountdown,
    ariaValue
    }) {
    return (<div>
        {/* Completed: This area should show only when a focus or break session is running or pauses */}
        <div
          className={classNames({
            "row mb-2": sessionActive,
            "d-none": !sessionActive,
          })}
        >
          <div className="col">
            {/* Completed: Update message below to include current session (Focusing or On Break) and total duration */}
            {sessionActive && (
              <h2 data-testid="session-title">
                {focusSessionActive ? "Focusing" : "On Break"} for{" "}
                {focusSessionActive
                  ? `${minutesToDuration(focusDuration)}`
                  : `${minutesToDuration(breakDuration)}`}{" "}
                minutes
              </h2>
            )}
            {/* Completed: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {focusSessionActive ? `${secondsToDuration(focusDuration * 60 - sessionCountdown)}` : `${secondsToDuration(breakDuration * 60 - sessionCountdown)}`}{" "}
              remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            {/* Progress bar only displays when session is active*/}
            <div
              className={classNames({
                progress: sessionActive,
                "d-none": !sessionActive,
              })}
              style={{ height: "20px" }}
            >
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={ariaValue} // Completed: Increase aria-valuenow as elapsed time increases
                style={{ width: `${ariaValue}%` }} // Completed: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>)
}