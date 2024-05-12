import { useEffect, useState } from 'react';
import moment from 'moment';

import './clock.scss';

export function Clock(props: {timezone: string}) {
  const
    hoursArr = Array(12).fill(0).map((_: number, i: number) => i + 1),
    minutesArr = Array(60).fill(0).map((_: number, i: number) => i);
  const [animate, setAnimate] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date('2021-09-30T00:00:00'));

  useEffect(() => {
    setInterval(() => {
      setDate(new Date(moment().tz(props.timezone).format('YYYY/MM/DD HH:mm:ss')));
    }, 1000);
    setTimeout(() => {
      setAnimate(false);
    }, 2000);
  }, []);
  
  return <>
    <div className="time time-wrapper snap-block">
      <div className="clock-wrapper">
        <div className="clock-body center-x">
          <div className="clock clock-dark">
            {
              hoursArr.map((hour: number) => (
                <div
                  key={hour}
                  className="serif-wrapper number"
                  style={{ transform: `rotate(${hour * 30}deg)` }}
                >
                  <span
                    className="serif-text"
                    style={{
                      transform: `translateX(-50%) translateY(15px) rotate(-${hour * 30}deg)`
                    }}
                  >
                    {hour}
                  </span>
                </div>
              ))
            }
            {
              minutesArr.map((_: number, i: number) => (
                <div
                  key={i}
                  className="serif-wrapper"
                  style={{
                    transform: `rotate(${i * 6}deg)`
                  }}
                >
                  <span
                    className={Number.isInteger(i / 5) ? 'serif' : 'smal-serif'}
                    style={{
                      opacity: ((date.getSeconds() * 6) === i * 6) && !animate ? 0 : 1,
                    }}
                    ></span>
                </div>
              ))
            }
              <div
              className="arrow-w minute-hand animate"
              style={{
                transform: `rotate(${date.getMinutes() * 6}deg)`
              }}
            >
              <div className="line"></div>
            </div>
            <div
              className="arrow-w hour-hand animate"
              style={{
                transform: `rotate(${date.getHours() > 12 ? (date.getHours() - 12) * 30 : date.getHours() * 30}deg)`
              }}
            >
              <div className="core"></div>
              <div className="line"></div>
            </div>
            <div
              className={`arrow-w second-hand ${animate && 'animate'}`}
              style={{
                transform: `rotate(${date.getSeconds() * 6}deg)`,
              }}
            >
            </div>
          </div>
        </div>
      </div>
      <h1 className="city-name">
        {
          date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
        }
        :
        {
          date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
        }
        :
        {
          date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`
        }
      </h1>
      <h1 className="city-name">
        {
          (props.timezone.split('/').pop() || '').replace(/_/g, ' ')
        }
      </h1>
    </div>
  </>;
}