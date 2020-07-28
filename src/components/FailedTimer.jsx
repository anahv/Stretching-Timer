import React from 'react'
import {
  useState,
  useEffect
} from 'react';

function Timer(props) {
  const {initialSeconds = 0} = props

  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(myInterval)
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });

  return ( <div className="timer"> {
      seconds === 0
      ? <h1>0</h1>
      : <h1> {seconds < 10
      ? `0${seconds}`
      : seconds} < /h1> } </div>)
  }

  export default Timer;

// Another failed attempt

const msToSec = ms => (ms / 1000);
const initialTime = 30 * 1000;

const SecondInterval = () => {
  const [timeLeft, start] = useCountDown(initialTime, 1000);

  // start the timer during the first render
  // React.useEffect(() => {
  //   start();
  // }, []);

  const restart = useCallback(() => {
    // if new value is not passed timer will start with initial value
    const newTime = 10 * 1000;
    start(newTime);
    setRemainingIntervals(remainingIntervals - 1)
  }, [start]);

  useEffect(() => {
    document.getElementById("intervalsLeft").innerHTML = `${remainingIntervals} / ${totalIntervals}`
  })

  function decreaseIntervals() {
    setRemainingIntervals(remainingIntervals - 1)
  }

  if (timeLeft === 0 && remainingIntervals > 0) {
    // function decreaseIntervals() {
    //   setRemainingIntervals(remainingIntervals - 1)
    // }
    console.log("time left " + timeLeft);
    console.log("remaining intervals " + remainingIntervals);
    restart()
    // setRemainingIntervals(remainingIntervals - 1)
  }

  function pauseTimer() {}
  function restartIntervals() {
    setRemainingIntervals(totalIntervals)
  }

  return (<div className="timer">
    <h1>{msToSec(timeLeft)}</h1>

    <div className="buttons">
      <button id="start" className="button" onClick={restart}>
        Start
        <i className="fa fa-play"></i>
      </button>
      <button id="pause" onClick={pauseTimer}>Stop<i className="fa fa-pause"></i>
      </button>
      <button id="restart" onClick={restartIntervals}>Restart<i className="fa fa-repeat"></i>
      </button>
    </div>
  </div>);
}
