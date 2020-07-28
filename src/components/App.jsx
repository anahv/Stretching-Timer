import React, {useState, useEffect} from "react"

function App() {

  const [totalIntervals, setTotalInvervals] = useState(10)
  const [remainingIntervals, setRemainingIntervals] = useState(10)

  const Timer = ({seconds}) => {
    // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [isActive, setIsActive] = useState(false)

    const bringAudio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a")
    const popAudio = new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3")
    function toggle() {
      setIsActive(!isActive)
    }

    useEffect(() => {
      document.getElementById("intervalsLeft").innerHTML = `${remainingIntervals} / ${totalIntervals}`
    })

    useEffect(() => {
      if (!timeLeft)
        return;

      // let interval = null

      // save intervalId to clear the interval when the
      // component re-renders
      // if (isActive) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      //   {
      //   interval = setInterval(() => {
      //     setTimeLeft(timeLeft - 1);
      //   }, 1000);
      // }
      // else if (!isActive && timeLeft !== 0 ) {clearInterval(interval)}

      // clear interval on re-render to avoid memory leaks
      return() => clearInterval(intervalId);
      // }
    }, [isActive, timeLeft]);

    if (!timeLeft && remainingIntervals > 0) {
      start()
      setRemainingIntervals(remainingIntervals - 1)
      bringAudio.play();
    } else if (timeLeft < 5 && remainingIntervals === 0) {
      popAudio.play()
    } else if (!timeLeft && remainingIntervals === 0) {
      bringAudio.play();
    }

    function start() {
      setTimeLeft(30)
      setIsActive(true)
    }
    function pauseTimer() {
      toggle()
      setRemainingIntervals(0)
      setTimeLeft(0)
    }
    function restartIntervals() {
      setRemainingIntervals(totalIntervals)
      setTimeLeft(30)
      setIsActive(false)
    }

    return (<div>
      <div className="timer">
        <h1>{timeLeft}</h1>
      </div>
      {/* <span id="audio"><audio preload="auto" id="audioElement" crossOrigin="anonymous" src="../../public/BeepPing.wav"></audio></span> */}
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

    <h2 id="intervalsLeft">`${remainingIntervals}
      / ${totalIntervals}`</h2>

    <div className="buttons">
      <button id="plus" onClick={x => {
          setTotalInvervals(totalIntervals - 1)
        }}>
        <i className="fa fa-minus"></i>
      </button>
      <button id="plus" onClick={x => {
          setTotalInvervals(totalIntervals + 1)
        }}>
        <i className="fa fa-plus"></i>
      </button>
    </div>

    <Timer seconds="30"/>

  </div>);
}

export default App

//https://stackoverflow.com/questions/57137094/implementing-a-countdown-timer-in-react-with-hooks
//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
