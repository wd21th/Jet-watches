import { useState } from "react";

import './stopwatch.scss';

export function StopWatchPage() {
  const fullDeg: number = 360;
  const arr = Array(fullDeg).fill(0).map((_: number, i: number) => i);
  const hours = Array(12).fill(0).map((_: number, i: number) => i + 1);
  let [time, setTime] = useState<number>(0);
  const [tik, setTike] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<null | number>(null);
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [arrowRotate, setArrowRotate] = useState<number>(0);
  const [marks, setMarks] = useState<number[]>([]);

  function start(): void {
    const interval = setInterval(() => {
      const increase = time + 0.01;
      setTime(increase);
      time = time + 0.01;
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = Math.floor(time % 60);
      const milliseconds = Math.floor((time - Math.floor(time)) * 100);
      setArrowRotate(time * 6);
      setHour(hours);
      setMinute(minutes);
      setSecond(seconds);
      setMilliseconds(milliseconds);
    }, 10);
    setIntervalId(interval);
    setTike(true);
  }

  function stop() {
    clearInterval(intervalId ? intervalId : 0);
    setTike(false);
  }

  function reset() {
    clearInterval(intervalId ? intervalId : 0);
    setTime(0);
    setTike(false);
    setHour(0);
    setMinute(0);
    setSecond(0);
    setMilliseconds(0);
    setArrowRotate(0);
    marks.length = 0;
  }

  function markTime() {
    marks.unshift(+time.toFixed(2));
  }
  
  return (
    <>
      <div className="in-col full-height scroll-y">
        <div className="stopwatch-wrapper clock-wrapper">
          <div className="clock-body">
            <div className="stopwatch clock">
              {
                hours.map((hour: number) => (
                  <div key={hour} className="serif-wrapper number" style={{ transform: `rotate(${hour * 30}deg)` }}>
                    <span className="serif-text" style={{ transform: `translateX(-50%) translateY(15px) rotate(-${hour * 30}deg)` }}>{hour * 5}</span>
                  </div>
                ))
              }
              {
                arr.map((degree: number) => (
                  <div key={degree} className="serif-wrapper" style={{ transform: `rotate(${degree}deg)` }}>
                    <span className={Number.isInteger(degree / 30) ? 'serif' : Number.isInteger(degree / 6) ? 'smal-serif' : 'super-small-serif'}></span>
                  </div>
                ))
              }
              <div className="arrow-w second-hand" style={{ transform: `rotate(${arrowRotate}deg)` }}></div>
            </div>
          </div>
          <div className="stopwatch-time">
            <span className="hour">
              {hour < 10 ? `0${hour}` : hour}
            </span>:
            <span className="min">
              {minute < 10 ? `0${minute}` : minute}
            </span>:
            <span className="sec">
              {second < 10 ? `0${second}` : second}
            </span>:
            <span className="ms">
              {milliseconds < 10 ? `0${milliseconds}` : milliseconds}
            </span>
          </div>
        </div>
        <div className="press scroll-y">
          <div className="stopwatch-marks">
            {
              marks.map((mark, index) => (
                <div key={index} className="mark">
                  <div className="press">Interval {marks.length - index}</div> {mark}
                </div>
              ))
            }
          </div>
        </div>
        <div className="stopwatch-controls press">
          <button className={`reset ${!tik && !time && 'disabled'}`} onClick={reset}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 13C6 11.35 6.67 9.85 7.76 8.76L6.34 7.34C4.9 8.79 4 10.79 4 13C4 17.08 7.05 20.44 11 20.93V18.91C8.17 18.43 6 15.97 6 13ZM20 13C20 8.58 16.42 5 12 5C11.94 5 11.88 5.01 11.82 5.01L12.91 3.92L11.5 2.5L8 6L11.5 9.5L12.91 8.09L11.83 7.01C11.89 7.01 11.95 7 12 7C15.31 7 18 9.69 18 13C18 15.97 15.83 18.43 13 18.91V20.93C16.95 20.44 20 17.08 20 13Z" fill="black" />
            </svg>
          </button>
          {
            tik ?
              <button
                className="stop"
                onClick={stop}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16H11V8H9V16ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM13 16H15V8H13V16Z" fill="black" />
                </svg>
              </button>
              :
              <button
                className="start"
                onClick={start}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM10 16.5L16 12L10 7.5V16.5Z" fill="black" />
                </svg>
              </button>
          }
          <button className={`mark-time ${!tik && 'disabled'}`} onClick={markTime}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 1H9V3H15V1ZM11 14H13V8H11V14ZM19.03 7.39L20.45 5.97C20.02 5.46 19.55 4.98 19.04 4.56L17.62 5.98C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13C3 17.97 7.02 22 12 22C16.98 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39ZM12 20C8.13 20 5 16.87 5 13C5 9.13 8.13 6 12 6C15.87 6 19 9.13 19 13C19 16.87 15.87 20 12 20Z" fill="black" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
