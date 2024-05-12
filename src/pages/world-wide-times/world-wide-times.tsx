import { useEffect, useState } from 'react';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import moment from 'moment-timezone';

import { Clock } from '../../components/clock/clock';
import { Column } from '../../components/column/column';
import { Modal } from '../../components/modal/modal';
import { Time } from '../../interfaces/time.interface';

import './world-wide-times.scss';

export function WorldWideTimesPage() {
  const [searchCityString, setSearchCityString] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Time[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [dndModalIsOpen, setDndModalIsOpen] = useState<boolean>(false);
  const timezones = moment.tz.names().map((timezone: string) => {
    let city = timezone.split('/').pop();
    city = (city || '').replace(/_/g, ' ');
    return {
      city,
      timezone
    }
  }).sort((a: any, b: string) => a.city.localeCompare(b));
  const [times, setTimes] = useState<Time[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('times')) {
        setTimes(JSON.parse(localStorage.getItem('times') as string || '[]'));
      } else {
        setTimes([
          {
            id: "Asia/Almaty",
            city: 'Almaty',
            date: new Date('2021-09-30T00:00:00'),
          },
        ])
      }
    }, 2000);
  }, []);
 
  const getTimePos = (id: string) => times.findIndex((time) => time.id === id);
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const originalPos = getTimePos(active.id);
    const newPos = getTimePos(over.id);
    const newArr = arrayMove(times, originalPos, newPos);
    setTimes(newArr);
    localStorage.setItem('times', JSON.stringify(newArr));
  };

  return (
    <>
      <div className="parent full-height">
        <div className="time-list snapping">
          {
            times.length === 0 ? (
              <div className="spinner">
                <div className="bounce"></div>
                <div className="bounce"></div>
                <div className="bounce"></div>
              </div>
            ) : 
            times.map((time: Time) => (
              <Clock
                key={time.city}
                timezone={time.id}
              />
            ))
          }
        </div>
        <div className="time-controls">
          <button onClick={() => { setModalIsOpen(true) }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5" stroke="black" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 12H19" stroke="black" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {
            times.length > 1 && <button onClick={() => { setDndModalIsOpen(true) }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 8H21M7 12H21M7 16H21M3 8H3.01M3 12H3.01M3 16H3.01" stroke="black" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          }
        </div>
        <Modal
          show={modalIsOpen}
          onClose={() => { setModalIsOpen(false) }}
        >
          <div className="select-wrapper">
            <input
              type="text"
              className="select-search"
              placeholder="Search"
              onChange={(e) => {
                setSearchCityString(e.target.value);
                setSearchResult(
                  timezones.filter(x => x.city.toLowerCase().includes(e.target.value.toLowerCase()))
                )
              }}
              onFocus={(e) => {
                e.target.nextElementSibling && e.target.nextElementSibling.classList.add('show');
              }}
            />

            <div className="select-list">
              {
                (searchCityString.length ? searchResult : timezones).map((time: any, index: number) => (
                  <div
                    key={index}
                    className="select-list-item"
                    onClick={() => {
                      if (
                        times.find((x: Time) => x.city === time.city)
                      ) {
                        const newTimes = times.filter((x: Time) => x.city !== time.city);
                        setTimes(newTimes);
                        localStorage.setItem('times', JSON.stringify(newTimes));
                        return;
                      }
                      
                      const newTime: Time = {
                          id: time.timezone,
                          city: time.city,
                          date: new Date(),
                      }
                      setInterval(() => {
                        const date = new Date(moment().tz(newTime.id).format('YYYY-MM-DD HH:mm:ss'));
                        newTime.date = date;
                      }, 1000);
                      times.push(newTime);
                      setTimes([...times]);
                      localStorage.setItem('times', JSON.stringify(times));
                    }}
                  >
                    {time.city} {
                      times.find((x: Time) => x.city === time.city) && <span className="selected">✓</span>
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </Modal>
        <Modal
          show={dndModalIsOpen}
          onClose={() => { setDndModalIsOpen(false) }}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <Column list={times} />
          </DndContext>
        </Modal>
      </div>
    </>
  );
}
