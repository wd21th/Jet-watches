import { useState } from 'react';

import './timer.scss';

export function TimerPage() {
  const
    fullDeg = 360,
    serifs = Array(fullDeg).fill(0).map((_: number, i: number) => i + 1).reverse();
  const [rotatedDegAmount, setRotatedDegAmount] = useState(0);
  const [hoursElements, setHoursElements] = useState(Array(102).fill(0).map((_: number, i: number) => (i - 2) + 1));
  const [minutesElements, setMinutesElements] = useState(Array(62).fill(0).map((_: number, i: number) => (i - 2) + 1));
  const [secondsElements, setSecondsElements] = useState(Array(62).fill(0).map((_: number, i: number) => (i - 2) + 1));
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timerIntervalId, setTimerIntervalId] = useState(0);
  let [timerTime, setTimerTime] = useState(0);
  const [launchTimer, setLaunchTimer] = useState(false);
  const [toggler, setToggler] = useState(false);
  const [animationTime, setAnimationTime] = useState(0);

  const
    elLineHeight = 40,
    showElementCounts = 3;
  const secInHour = 3600, secInMinute = 60;

  function start() {
    setLaunchTimer(true);
    
    if (timerTime && !animationTime) {
      setAnimationTime(timerTime);
    }
    
    setToggler(true);
    const id = setInterval(() => {
      if (timerTime) {
        setTimerTime(--timerTime);
        setHour(Math.floor(timerTime / secInHour));
        setMinute(Math.floor((timerTime % secInHour) / secInMinute));
        setSecond(timerTime % secInMinute);
      } else {
        setTimeout(() => {
          clearInterval(id);
          reset();
        }, 1000);
      }
    }, 1000)
    setTimerIntervalId(id);
  }

  function pause() {
    clearInterval(timerIntervalId);
    setToggler(false);
  }

  function reset() {
    setHour(0);
    setMinute(0);
    setSecond(0);
    clearInterval(timerIntervalId);
    setToggler(false);
    setLaunchTimer(false);
    setTimerTime(0);
    setRotatedDegAmount(0);
    setAnimationTime(0);
    document.querySelector('.hours')!.scrollTop = 0;
    document.querySelector('.minutes')!.scrollTop = 0;
    document.querySelector('.seconds')!.scrollTop = 0;
  }

  return (
    <div className="in-col center-y full-height page">
      <div className="timer-wrapper clock-wrapper center-x center-y">
        <div className="timer clock">
          {
            <style>
              {`
                .rotate {
                  animation-duration: ${animationTime}s;
                  animation-play-state: ${toggler ? 'running' : 'paused'};
                }
              `}
            </style>
          }
          <div
            className={`arrow-w ${launchTimer ? 'rotate' : ''} second-hand`}
          ></div>
          {
            serifs.map((degree: number) => (
              <div
                key={degree}
                className="serif-wrapper"
                style={{
                  transform: `rotate(${degree}deg)`
                }}
              >
                <span
                  className="super-small-serif"
                ></span>
              </div>
            ))
          }
        </div>
      </div>
      <div className="digits">
        {
          (hour < 10 ? `0${hour}` : hour + '').split('').map((str, index) => (
            <div className="digit" key={index}>{str}</div>
          ))
        }
        <div className="separator">:</div>
        {
          (minute < 10 ? `0${minute}` : minute + '').split('').map((str, index) => (
            <div className="digit" key={index}>{str}</div>
          ))
        }
        <div className="separator">:</div>
        {
          (second < 10 ? `0${second}` : second + '').split('').map((str, index) => (
            <div className="digit" key={index}>{str}</div>
          ))
        }
      </div>
      <div
        className="timer-controls"
        style={{
          opacity: launchTimer ? 0 : 1
        }}
      >
        <div className="gradient-wrapper">
          <div
            className="hours"
            style={{
              maxHeight: (elLineHeight * showElementCounts) + 'px',
            }}
            onScroll={(e) => {
              const el: HTMLElement = e.target, scrollTop = el.scrollTop;
              const children = Math.floor(scrollTop / elLineHeight);
              setHour(children);
              setTimerTime((children * 3600) + (minute * 60) + second);
            }}
          >
            {
              hoursElements.map((hour: number, i: number) => (
                <div
                  key={i}
                  className="number"
                  style={{
                    lineHeight: elLineHeight + 'px',
                    opacity: i === 0 || i === hoursElements.length - 1 ? 0 : 1
                  }}
                >
                  <div>
                    {hour < 10 ? `0${hour}` : hour}
                  </div>
                </div>
              ))
            }
          </div>
          <div
            className="liner-top-gradient"
            style={{
              maxHeight: (elLineHeight * showElementCounts) + 'px',
            }}
          ></div>
          <div
            className="liner-bottom-gradient"
            style={{
              maxHeight: (elLineHeight * showElementCounts) + 'px',
            }}
          ></div>
        </div>
        <div className="gradient-wrapper">
          <div
            className="minutes"
            style={{
              maxHeight: (elLineHeight * showElementCounts) + 'px'
            }}
            onScroll={(e) => {
              const el = e.target, scrollTop = el.scrollTop;
              const children = Math.floor(scrollTop / elLineHeight);
              setMinute(children);
              setTimerTime((hour * 3600) + (children * 60) + second);
            }}
          >
            {
              minutesElements.map((minute: number, i: number) => (
                <div
                  key={i}
                  className="number"
                  style={{
                    lineHeight: elLineHeight + 'px',
                    opacity: i === 0 || i === minutesElements.length - 1 ? 0 : 1
                  }}
                >
                  <div>
                    {
                      (minute < 10 ? `0${minute}` : minute + '').split('').map((str, index) => (
                        <span key={index}>{str}</span>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
          <div
            className="liner-top-gradient"
            style={{
              maxHeight: (elLineHeight * showElementCounts) + 'px',
            }}
          ></div>
          <div
            className="liner-bottom-gradient"
            style={{
              maxHeight: (elLineHeight * showElementCounts) + 'px',
            }}
          ></div>
        </div>
        <div className="gradient-wrapper">
          <div
            className="seconds"
            style={{
              maxHeight: (elLineHeight * showElementCounts) + 'px'
            }}
            onScroll={(e) => {
              const el = e.target, scrollTop = el.scrollTop;
              const children = Math.floor(scrollTop / elLineHeight);
              setSecond(children);
              setTimerTime((hour * 3600) + (minute * 60) + children);
            }}
          >
            {
              secondsElements.map((second: number, i: number) => (
                <div
                  key={i}
                  className="number"
                  style={{
                    lineHeight: elLineHeight + 'px',
                    opacity: i === 0 || i === secondsElements.length - 1 ? 0 : 1
                  }}
                >
                  {second < 10 ? `0${second}` : second}
                </div>
              ))
            }
          </div>
          <div
            className="liner-top-gradient"
            style={{
              maxHeight: (elLineHeight * showElementCounts) + 'px',
            }}
          ></div>
          <div
            className="liner-bottom-gradient"
            style={{
              maxHeight: (elLineHeight * showElementCounts) + 'px',
            }}
          ></div>
        </div>
      </div>
      <div className="timer-controls">
        {
          toggler ?
            <button type="button" className="btn" onClick={pause}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16H11V8H9V16ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM13 16H15V8H13V16Z" fill="black" />
              </svg>
            </button>
            :
            <button type="button" onClick={start} className={
              `btn ${!timerTime && 'disabled'}`
            }>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM10 16.5L16 12L10 7.5V16.5Z" fill="black" />
              </svg>
            </button>
        }
        <button
          type="button"
          onClick={reset}
          className={
            `btn ${!timerTime && 'disabled'}`
          }
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 13C6 11.35 6.67 9.85 7.76 8.76L6.34 7.34C4.9 8.79 4 10.79 4 13C4 17.08 7.05 20.44 11 20.93V18.91C8.17 18.43 6 15.97 6 13ZM20 13C20 8.58 16.42 5 12 5C11.94 5 11.88 5.01 11.82 5.01L12.91 3.92L11.5 2.5L8 6L11.5 9.5L12.91 8.09L11.83 7.01C11.89 7.01 11.95 7 12 7C15.31 7 18 9.69 18 13C18 15.97 15.83 18.43 13 18.91V20.93C16.95 20.44 20 17.08 20 13Z" fill="black" />
          </svg>
        </button>
      </div>
    </div>
  );
}
