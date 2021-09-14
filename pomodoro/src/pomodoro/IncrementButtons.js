import React from "react";
import { minutesToDuration } from "../utils/duration";

export default function IncrementButtons({
  focusDuration,
  breakDuration,
  handleIncrementClick,
}) {
  return (
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            {/* Completed: Update this text to display the current focus session duration */}
            Focus Duration: {minutesToDuration(focusDuration)}
          </span>
          <div className="input-group-append">
            {/* Completed: Implement decreasing focus duration and disable during a focus or break session */}
            <button
              type="button"
              onClick={handleIncrementClick}
              className="btn btn-secondary"
              name="decrease-focus"
              data-testid="decrease-focus"
            >
              <span className="oi oi-minus" name="decrease-focus" />
            </button>
            {/* Completed: Implement increasing focus duration and disable during a focus or break session */}
            <button
              type="button"
              className="btn btn-secondary"
              name="increase-focus"
              onClick={handleIncrementClick}
              data-testid="increase-focus"
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="float-right">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-break">
              {/* Completed: Update this text to display the current break session duration */}
              Break Duration: {minutesToDuration(breakDuration)}
            </span>
            <div className="input-group-append">
              {/* Completed: Implement decreasing break duration and disable during a focus or break session*/}
              <button
                type="button"
                className="btn btn-secondary"
                name="decrease-break"
                onClick={handleIncrementClick}
                data-testid="decrease-break"
              >
                <span className="oi oi-minus" />
              </button>
              {/* Completed: Implement increasing break duration and disable during a focus or break session*/}
              <button
                type="button"
                onClick={handleIncrementClick}
                className="btn btn-secondary"
                name="increase-break"
                data-testid="increase-break"
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}