import React, {useState, useEffect} from "react"

function App() {

  const [totalIntervals, setTotalIntervals] = useState(32)
  const [remainingIntervals, setRemainingIntervals] = useState(totalIntervals)
  const intervalDuration = 10

  const bringAudio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a")
  const popAudio = new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3")

  const Timer = ({seconds}) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    // const [isActive, setIsActive] = useState(false)

    // function toggle() {
    //   setIsActive(!isActive)
    // }

    useEffect(() => {
      if (!timeLeft)
        return;

      const interval = setInterval(function() {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return() => clearInterval(interval);
    }, [timeLeft]);

    if (remainingIntervals === 0) {
      if (!timeLeft) {
        bringAudio.play()
      } else if (timeLeft < 6) {
        popAudio.play()
      }
    } else if (remainingIntervals > 0 && !timeLeft) {
      setRemainingIntervals(remainingIntervals - 1)
      setTimeLeft(intervalDuration)
      bringAudio.play();
    }

    function start() {
      setTimeLeft(intervalDuration)
      // setIsActive(true)
    }
    function pauseTimer() {
      setRemainingIntervals(0)
      setTimeLeft(0)
      // toggle()
    }
    function restartIntervals() {
      setRemainingIntervals(totalIntervals)
      setTimeLeft(intervalDuration)
      // setIsActive(false)
    }

    return (<div>
      <div className="timer">
        <h1>{timeLeft}</h1>
      </div>
      <div className="buttons">
        <button id="start" className="button" onClick={start}>
          Start
          <i className="fa fa-play"></i>
        </button>
        <button id="pause" onClick={pauseTimer}>Stop<i className="fa fa-pause"></i>
        </button>
        <button id="restart" onClick={restartIntervals}>Restart<i className="fa fa-repeat"></i>
        </button>
      </div>
    </div>);
  };

  return (<div className="container">
    <header>
      <h1>Stretching Timer</h1>
    </header>

    <h2 id="intervalsLeft">
      {remainingIntervals}
      /{totalIntervals}
    </h2>
    <div className="buttons">
      <button id="plus" onClick={x => {
          setTotalIntervals(totalIntervals - 1);
        }}>
        <i className="fa fa-minus"></i>
      </button>
      <button id="plus" onClick={x => {
          setTotalIntervals(totalIntervals + 1);
        }}>
        <i className="fa fa-plus"></i>
      </button>
    </div>

    <Timer seconds={intervalDuration}/>

  </div>);
}

export default App

//https://stackoverflow.com/questions/57137094/implementing-a-countdown-timer-in-react-with-hooks
//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
