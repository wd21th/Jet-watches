import { useEffect, useState } from 'react';

import { Clock } from '../../components/clock/clock';
import { Modal } from '../../components/modal/modal';

import './alarm.scss';

interface Alarm {
  time: Date;
  days: string[];
  description: string;
  isActive: boolean;
}

export function AlarmPage() {
  const
    alarmTime = new Date('2021-09-30T00:00:00');
  const days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState<Alarm | null>(null);
  const [newAlarm, setNewAlarm] = useState<Alarm>(
    {
      time: alarmTime,
      days: [],
      description: '',
      isActive: false
    }
  );

  useEffect(() => {
    if(localStorage.getItem('alarms')) {
      const parsedAlarms = 
      JSON.parse(localStorage.getItem('alarms') as string).map((value: Alarm) =>
        ({
          time: new Date(value.time),
          days: value.days,
          description: value.description,
          isActive: value.isActive
        })
      )
      setAlarms(parsedAlarms)
    }
  }, []);

  return (
    <>
      <div className="parent full-height">
        <div className="snapping full-height">
          <div className="snap-block">
            <Clock
              timezone={'Asia/Almaty'}
            />
          </div>
        <div
          className="snap-block full-height"
        >
          <div className="snapping alarm-list">
            {
              alarms.length === 0 ? (
                <div className="no-alarms">No alarms</div>
              ) : alarms.map((alarm, index) => (
                <div key={index} className="alarm snap-block">
                  <div className="alarm-time press in-row">
                    <div
                      className="press"
                      onClick={() => {
                        setSelectedAlarm(alarm);
                      }}
                    >
                      <div className="in-col">
                        <h1>
                          {alarm.time.getHours() < 10 ? `0${alarm.time.getHours()}` : alarm.time.getHours()}:
                          {alarm.time.getMinutes() < 10 ? `0${alarm.time.getMinutes()}` : alarm.time.getMinutes()}
                        </h1>
                        <p>
                          {alarm.description.length > 0 ? alarm.description : 'Wake up'}
                          <>,&nbsp;</>
                          {
                            days.every((day) => alarm.days.find(alarmDay => alarmDay === day)) ? (
                              <span>Every day</span>
                            ) :
                              alarm.days.map((day, index, arr) => (
                                <span key={index}>
                                  {day}
                                  {
                                    index === arr.length - 1 ? '' :  <span>,&nbsp;</span>
                                  }
                                </span>
                            ))
                          }
                          {
                            alarm.days.length === 0 ? <span>Once</span> : ''
                          }
                        </p>
                      </div>
                    </div>
                    <div className="toggle">
                      <input type="checkbox" id="check-2" checked={alarm.isActive} onChange={() => {
                        alarm.isActive = !alarm.isActive;
                        setAlarms([...alarms]);
                        localStorage.setItem('alarms', JSON.stringify(alarms));
                      }} />
                      <label htmlFor="check-2"></label>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        </div>
        <div className="time-controls">
          <button onClick={() => { setModalIsOpen(true); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5" stroke="black" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 12H19" stroke="black" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <Modal
          onClose={() => setModalIsOpen(false)}
          show={modalIsOpen}
        >
            <div className="modal-body">
              <div className="in-col">
                <div className="in-row">
                  <label htmlFor="time">
                    {newAlarm.time.getHours() < 10 ? `0${newAlarm.time.getHours()}` : newAlarm.time.getHours()}
                    :
                    {newAlarm.time.getMinutes() < 10 ? `0${newAlarm.time.getMinutes()}` : newAlarm.time.getMinutes()}
                  </label>
                  <input
                    type="time"
                    id="time"
                    onChange={(e) => {
                      if (e.target.value !== '') {
                        newAlarm.time = new Date(`2021-09-30T${e.target.value}:00`);
                        setNewAlarm({ ...newAlarm });
                      }
                    }}
                  />
                </div>
                <div className="in-row">
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={3}
                    placeholder='Description'
                    value={newAlarm.description}
                    onChange={(e) => {
                      newAlarm.description = e.target.value;
                      setNewAlarm({ ...newAlarm });
                    }}
                  ></textarea>
                </div>
                <div className="in-row">
                  <div className="days">
                    {
                      days.map((day, index) => (
                        <div key={index} className="day press">
                          <input type="checkbox" id={`day-${index}`}
                            checked={newAlarm.days.find(newAlarmDay => newAlarmDay === day) ? true : false}
                            onChange={(e) => {
                              if (newAlarm.days.find(newAlarmDay => newAlarmDay === day)) {
                                newAlarm.days = newAlarm.days.filter(newAlarmDay => newAlarmDay !== day);
                              } else {
                                newAlarm.days.push(day);
                              }
                              setNewAlarm({ ...newAlarm });
                            }}
                          />
                          <label htmlFor={`day-${index}`}>{day}</label>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  setAlarms([...alarms, newAlarm]);
                  setModalIsOpen(false);
                  setNewAlarm({
                    time: alarmTime,
                    days: [],
                    description: '',
                    isActive: false
                  });
                  localStorage.setItem('alarms', JSON.stringify([...alarms, newAlarm]));
                }}
              >Create</button>
            </div>
        </Modal>
        <Modal
          onClose={() => setSelectedAlarm(null)}
          show={selectedAlarm ? true : false}
        >
          {
            selectedAlarm &&
            <>
              <div className="parent in-row">
                <label htmlFor="select-time">
                  {selectedAlarm.time.getHours() < 10 ? `0${selectedAlarm.time.getHours()}` : selectedAlarm.time.getHours()}:
                  {selectedAlarm.time.getMinutes() < 10 ? `0${selectedAlarm.time.getMinutes()}` : selectedAlarm.time.getMinutes()}
                </label>
                <input
                  id="select-time"
                  type="time"
                  value={`${selectedAlarm.time.getHours() < 10 ? `0${selectedAlarm.time.getHours()}` : selectedAlarm.time.getHours()}:${selectedAlarm.time.getMinutes() < 10 ? `0${selectedAlarm.time.getMinutes()}` : selectedAlarm.time.getMinutes()}`}
                  onChange={(e) => {
                    if (e.target.value !== '') {
                      selectedAlarm.time = new Date(`2021-09-30T${e.target.value}:00`);
                      setAlarms([...alarms]);
                      localStorage.setItem('alarms', JSON.stringify(alarms));
                    }
                  }}
                />
              </div>
              <div>
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={10}
                  placeholder='Description'
                  value={selectedAlarm?.description}
                  onChange={(e) => {
                    selectedAlarm.description = e.target.value;
                    setAlarms([...alarms]);
                    localStorage.setItem('alarms', JSON.stringify(alarms));
                  }}
                ></textarea>
              </div>
              <div className="select-wrapper">
                {
                  days.map((day, index) => (
                    <div key={index} className="select-list-item" onClick={() => {
                      if (selectedAlarm.days.find(selectedDay => selectedDay === day)) {
                        selectedAlarm.days = selectedAlarm.days.filter(selectedDay => selectedDay !== day);
                      } else {
                        selectedAlarm.days.push(day);
                      }
                      setAlarms([...alarms]);
                      localStorage.setItem('alarms', JSON.stringify(alarms));
                    }}>
                      {day} {
                        selectedAlarm.days.find(selectedDay => selectedDay === day) ? (
                          <span>✓</span>
                        ) : ''
                      }
                    </div>
                  ))
                }
              </div>
            </>
          }
        </Modal>
      </div>
    </>
  );
}
