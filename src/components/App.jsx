import React, { useState, useEffect } from "react";

function App() {
  const initialIntervals = 1;
  const initialIntervalDuration = 5;

  const [totalIntervals, setTotalIntervals] = useState(initialIntervals);
  const [intervalDuration, setIntervalDuration] = useState(initialIntervalDuration);
  const [remainingIntervals, setRemainingIntervals] = useState(totalIntervals);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialIntervalDuration);

  const bringAudio = new Audio(
    "http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a");
  const popAudio = new Audio(
    "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3");

  const Timer = () => {
    useEffect(
      () => {
          let interval = setInterval(function() {
            if (isActive && timeLeft !== 0) {
              setTimeLeft(timeLeft - 1)
            } else if (isActive) {
              setRemainingIntervals(remainingIntervals - 1)
              setTimeLeft(intervalDuration)
              bringAudio.play()
            }
          }, 1000);
        if (!isActive && timeLeft !== 0) {
          clearInterval(interval);
        } else if (isActive && timeLeft !== 0 && remainingIntervals == 0)
        {
          setIsActive(false)
          setTimeLeft(0)
        }
        return () => clearInterval(interval);
      },
      [isActive]
    );

    if (remainingIntervals === 1) {
      if (timeLeft === 0) {
        bringAudio.play();
        console.log("called 1");
      } else if (timeLeft < 6) {
        popAudio.play();
        console.log("called 2 ");
      }
    }


    function start() {
      setIsActive(true);
    }

    function pauseTimer() {
      setIsActive(false);
    }

    function restartIntervals() {
      setRemainingIntervals(totalIntervals);
      setTimeLeft(intervalDuration);
      setIsActive(false);
    }

    return (
      <div>
        <div className="timer row">
          <div className="col-md-12">
            <h1>{timeLeft} </h1>
          </div>
        </div>
        <div className="buttons row">
          <button id="start" className="button col-md-2" onClick={start}>
            Start <i className="fa fa-play"> </i>
          </button>
          <button id="pause" className="button col-md-2" onClick={pauseTimer}>
            Stop <i className="fa fa-pause"> </i>
          </button>
          <button
            id="restart"
            className="button col-md-2"
            onClick={restartIntervals}>
            Reset <i className="fa fa-repeat"> </i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row header">
        <div className="col-md-12 ">
          <h1> Stretching Timer </h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 offset-md-3">
          <p id="intervalsTitle"> Intervals Left </p>
          <h2 id="intervalsLeft">
            {remainingIntervals}{" "}
            / {totalIntervals}
          </h2>
          <div className="buttons">
            <button
              id="plus"
              onClick={x => {
                setTotalIntervals(totalIntervals - 1);
                setRemainingIntervals(remainingIntervals - 1)
              }}
            >
              <i className="fa fa-minus"> </i>
            </button>
            <button
              id="plus"
              onClick={x => {
                setTotalIntervals(totalIntervals + 1)
                setRemainingIntervals(remainingIntervals + 1)
              }}
            >
              <i className="fa fa-plus"> </i>
            </button>
          </div>
        </div>

        <div className="col-md-3">
          <p id="intervalsTitle"> Interval duration </p>
          <h2 id="intervalsLeft">{intervalDuration}s</h2>
          <div className="buttons">
            <button
              id="plus"
              onClick={x => {
                setIntervalDuration(intervalDuration - 5)
                setTimeLeft(timeLeft - 5)
              }}
            >
              <i className="fa fa-minus"> </i>
            </button>
            <button
              id="plus"
              onClick={x => {
                setIntervalDuration(intervalDuration + 5)
                setTimeLeft(timeLeft + 5)
              }}>
              <i className="fa fa-plus"> </i>
            </button>
          </div>
        </div>
      </div>
      <Timer />
    </div>
  );
}

export default App;

//https://stackoverflow.com/questions/57137094/implementing-a-countdown-timer-in-react-with-hooks
//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
